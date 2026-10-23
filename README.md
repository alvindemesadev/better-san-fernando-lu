# Better San Fernando, La Union

An independent civic data guide for San Fernando, La Union. It brings city services, officials, barangays, budgets, procurement records, election history, and news into one fast, accessible site.

This is not an official City Government website. Official sources are linked throughout the site.

## What is included

- 242 city services across 12 categories
- City officials, offices, hotlines, and all 59 barangays
- Barangay profiles and an interactive MapLibre map with population shading and a 3D selected-area view
- FY2024 revenue, spending, SEF, and LDRRMF data
- Budget documents, audit reports, procurement records, and a DPWH project map
- Legislation, election results, and a searchable City Government news archive
- Site-wide search suggestions, sitemap, accessibility, privacy, and terms pages
- Responsive desktop and mobile navigation with sticky-header-aware in-page links

## Maps and navigation

The barangay map is rendered with MapLibre GL JS from the checked-in GeoJSON at `src/data/san-fernando-barangays.geojson`. Its simplified boundary shapes are attributed to the PSA/NAMRIA 2023 boundary release; the population colors use 2024 Census of Population figures. These are separate data vintages. Boundaries are approximate and intended for civic exploration, not cadastral or legal use.

Hover a barangay to preview it. Click or tap one to zoom to it and raise the selected polygon in 3D; select it again or use **Reset map** to return to the city view. The map supports scroll or touch zoom and bounded drag-to-pan. The selected barangay's profile is linked from its preview.

The map implementation lives in `src/components/BarangayMapCanvas.tsx`; the GeoJSON file supplies boundary data, not the rendering code. In-page links such as `#services`, `#news`, and the skip-to-content link account for the sticky header. Smooth scrolling respects the user's reduced-motion preference.

## Development

Requires Node.js 22.

```bash
npm install
npm run dev
```

The GitHub Actions CI workflow runs linting, tests, the production build, and a Python syntax check on pushes to `main` and on pull requests. Run the same checks locally with:

```bash
npm run lint
npm test
npm run build
python -m py_compile scripts/refresh_data.py
```

## Production build

```bash
npm run build
npm run preview
```

## Refreshing data

Requires Python 3.12.

```bash
python -m pip install -r scripts/requirements.txt
npm run refresh:data
```

The refresh script updates the checked-in snapshots for fiscal data, elections, procurement, barangay boundaries, and news. It downloads about 603 MB of source data on the first online run and caches it in `scripts/.cache/`.

`.github/workflows/refresh-data.yml` runs monthly and opens a pull request with the updated snapshots. To enable it, allow GitHub Actions to create pull requests under **Settings → Actions → General**.

The workflow caches `scripts/.cache/` between runs and revalidates cached sources with their HTTP validators. The production build also prerenders route-specific titles and descriptions. Set `VITE_SITE_ORIGIN` to the site's public origin in the Cloudflare Pages build environment so canonical and social URLs use the production domain; without it, route paths are used as relative URLs.

Each production build prints a manual data freshness report. Records with no recorded verification date are listed for review; this report does not claim those records have been rechecked.

See [DATA-INVENTORY.md](DATA-INVENTORY.md) for sources and data caveats.

## Deployment

The site is built for Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: `22` from `.nvmrc`

Do not use `npm run build:fresh` in Pages; data refreshes run through the monthly workflow. SPA routing is handled automatically, and `public/_headers` sets cache policy.
