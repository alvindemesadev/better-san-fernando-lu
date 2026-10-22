# Better San Fernando, La Union

An independent civic data guide for San Fernando, La Union. It brings city services, officials, barangays, budgets, procurement records, election history, and news into one fast, accessible site.

This is not an official City Government website. Official sources are linked throughout the site.

## What is included

- 243 city services across 12 categories
- City officials, offices, hotlines, and all 59 barangays
- FY2024 revenue, spending, SEF, and LDRRMF data
- Budget documents, audit reports, and procurement records
- DPWH projects and PhilGEPS awards
- Election results and recent City Government news
- Search, sitemap, accessibility, privacy, and terms pages

## Development

Requires Node.js 22.

```bash
npm install
npm run dev
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

See [DATA-INVENTORY.md](DATA-INVENTORY.md) for sources and data caveats.

## Deployment

The site is built for Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: `22` from `.nvmrc`

Do not use `npm run build:fresh` in Pages; data refreshes run through the monthly workflow. SPA routing is handled automatically, and `public/_headers` sets cache policy.
