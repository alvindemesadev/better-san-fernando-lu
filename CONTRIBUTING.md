# Contributing

Contributions that improve access to reliable San Fernando, La Union civic information are welcome. This project is built with React, TypeScript, Vite, and Tailwind CSS.

## Before contributing

- For a bug, include the page or route, steps to reproduce, expected result, actual result, and device or browser when relevant.
- For a data change, include the direct source, the date checked, and any limits or uncertainty. Prefer primary government or organization sources.
- For a UI change, consider keyboard use, screen readers, reduced motion, narrow mobile screens, and touch targets.
- Check existing issues or discussions for related work.

## Local setup

Use Node.js 22 and Python 3.12 for the data refresh scripts.

```bash
npm install
npm run dev
```

Before opening a pull request, run the project checks:

```bash
npm run lint
npm test
python -m unittest discover -s scripts -p test_refresh_data.py
npm run build
python -m py_compile scripts/refresh_data.py scripts/test_refresh_data.py
```

## Pull requests

1. Create a focused branch for the change.
2. Keep changes scoped and preserve unrelated work.
3. Update relevant documentation and source notes when behavior or data changes.
4. Describe the change and the checks you ran in the pull request.
5. Include screenshots for visible UI changes, especially mobile layouts.

Do not add unverified government data or imply that this independent guide is an official city service.
