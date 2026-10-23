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
- City life and tourism page with city-sourced photography, a visitor-map preview, and expandable activity details
- Searchable city places directory for public agencies, health, schools, shopping, dining, stays, attractions, transport, and everyday services, with live Google Maps category searches
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

The places directory at `/city/places` is a discovery index, not a business-permit census. It includes the site's city-office and 59 barangay profiles, named regional/provincial public-agency offices from La Union's February 27, 2026 roster, tertiary schools from the province's 2026 list, destination entries from its 2023 tourism inventory, and mall/operator listings. Category buttons open live Google Maps searches for additional listings. Check the linked sources and current map/business profile before relying on operating status, hours, or access.

See [DATA-INVENTORY.md](DATA-INVENTORY.md) for sources and data caveats.

## Data dates and source changes

Data vintages are labeled per dataset rather than with one site-wide “last verified” date. The barangay map uses
PSA/NAMRIA 2023 geometry, while population shading uses the 2024 Census; the boundary release and census year are
different. The 59-barangay count and names were checked against the latest PSA PSGC listing available on October 23,
2026, but that check does not change the geometry vintage.

The budget page shows the latest validated full-year figures available in this project (FY2024). BLGF lists FY2025
quarterly SRE files, which are linked separately; partial-year values are not presented as annual totals. CY2026 city
budget and investment-plan files, the COA 2024 audit report, and recent 2026 executive orders through No. 61 are linked from their
respective pages. Current wage rates use NWPC Region I Wage Order RB 1-24. LUECO electricity rates link to its
period-specific tariff schedule because they change over time. Republic Act No. 12326 moved the next regular barangay
and SK elections to the second Monday of November 2028; the site continues to identify the currently published
incumbents. Barangay names and population are checked against PSA, and barangay captains and kagawads against the city
roster. The DILG directory page was reachable on October 23, 2026, but its Barangay Information System records
request failed with a 502 error. The local SK roster has 58 names and no verified Puspus entry; the remaining names
could not be rechecked against DILG, so the roster stays marked unverified.

## Deployment

The site is built for Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: `22` from `.nvmrc`

Do not use `npm run build:fresh` in Pages; data refreshes run through the monthly workflow. SPA routing is handled automatically, and `public/_headers` sets cache policy.
