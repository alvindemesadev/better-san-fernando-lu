import io
import os
import tempfile
import unittest
import urllib.error
from contextlib import redirect_stdout
from pathlib import Path
from unittest.mock import patch

from refresh_data import download_source, write_refresh_status


class DownloadSourceTests(unittest.TestCase):
    def test_offline_mode_uses_existing_cache_without_network(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            cache_dir = Path(temp_dir)
            cached_file = cache_dir / "source.csv"
            cached_file.write_bytes(b"cached")
            fallbacks: list[str] = []

            with patch("refresh_data.urllib.request.urlopen") as urlopen:
                with redirect_stdout(io.StringIO()):
                    result = download_source(
                        "sample",
                        {"filename": "source.csv", "url": "https://example.test/source.csv"},
                        cache_dir,
                        force=False,
                        offline=True,
                        cached_fallbacks=fallbacks,
                    )

            self.assertEqual(result, cached_file)
            self.assertEqual(result.read_bytes(), b"cached")
            self.assertEqual(fallbacks, [])
            urlopen.assert_not_called()

    def test_download_failure_uses_cache_and_records_fallback(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            cache_dir = Path(temp_dir)
            cached_file = cache_dir / "source.csv"
            cached_file.write_bytes(b"cached")
            fallbacks: list[str] = []

            with patch(
                "refresh_data.urllib.request.urlopen",
                side_effect=urllib.error.URLError("network unavailable"),
            ):
                with redirect_stdout(io.StringIO()):
                    result = download_source(
                        "sample",
                        {"filename": "source.csv", "url": "https://example.test/source.csv"},
                        cache_dir,
                        force=False,
                        offline=False,
                        cached_fallbacks=fallbacks,
                    )

            self.assertEqual(result, cached_file)
            self.assertEqual(result.read_bytes(), b"cached")
            self.assertEqual(fallbacks, ["sample"])

    def test_offline_mode_fails_when_required_cache_is_missing(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            with self.assertRaises(FileNotFoundError):
                download_source(
                    "sample",
                    {"filename": "missing.csv", "url": "https://example.test/missing.csv"},
                    Path(temp_dir),
                    force=False,
                    offline=True,
                    cached_fallbacks=[],
                )


class RefreshStatusTests(unittest.TestCase):
    def test_status_output_deduplicates_fallbacks_and_writes_ci_notices(self):
        with tempfile.TemporaryDirectory() as temp_dir:
            output_path = Path(temp_dir) / "github-output.txt"
            summary_path = Path(temp_dir) / "summary.md"
            environment = {
                "GITHUB_OUTPUT": str(output_path),
                "GITHUB_STEP_SUMMARY": str(summary_path),
                "GITHUB_ACTIONS": "true",
            }
            stdout = io.StringIO()

            with patch.dict(os.environ, environment, clear=False), redirect_stdout(stdout):
                write_refresh_status(["sre", "news", "sre"])

            self.assertEqual(output_path.read_text(encoding="utf-8"), "cached_fallbacks=sre,news\n")
            self.assertIn("`sre`, `news`", summary_path.read_text(encoding="utf-8"))
            self.assertEqual(stdout.getvalue().count("::warning title=Cached source used::"), 2)


if __name__ == "__main__":
    unittest.main()
