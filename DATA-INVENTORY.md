# BetterSanFernandoLU — Data & Page Inventory

Survey of the BetterGov.ph LGU network, compiled October 2026.

## Survey scope

- 65 BetterLGU portals listed with URLs (49 Active, 15 Work in Progress, 1 Planned).
- 51 portals were crawlable via sitemap or static homepage links.
- 3,659 unique pages analyzed.
- 14 portals had no crawlable sitemap/static links (SPA, WIP, or unreachable): Baler, Bulakan, Cabuyao, Carigara, Dasmariñas, Koronadal, Maasin, Manila, Olongapo, Trece Martires, Bacoor, Caloocan, San Pablo, Tagaytay.

This document records the October 2026 network survey and its planning baseline. The site's current routes and implemented features have since expanded; see the repository [README](README.md) for current setup and feature notes.

## Page frequency across 51 portals

| Page type | Sites | % |
|---|---:|---:|
| Home | 48 | 94% |
| Services hub | 44 | 86% |
| Government hub | 41 | 80% |
| Statistics/data | 33 | 65% |
| Service categories | 33 | 65% |
| Sitemap | 28 | 55% |
| About/history | 27 | 53% |
| Service detail | 24 | 47% |
| Accessibility | 23 | 45% |
| Privacy / Contact | 22 each | 43% |
| Terms | 21 | 41% |
| Officials / Ordinances / Transparency / News / Budget | 18 each | 35% |
| Barangay directory / Departments | 17 each | 33% |
| FAQ / Legislation hub | 16 each | 31% |
| Citizens' Charter / Resolutions | 14 each | 27% |
| Search | 12 | 24% |
| Tourism | 11 | 22% |
| Hotlines | 10 | 20% |
| Projects | 9 | 18% |
| Procurement/bids | 7 | 14% |
| Barangay profiles | 4 | 8% |
| Open data / Full disclosure / Executive orders | 2 each | 4% |
| City monitor / civic map / jobs | 1 each | 2% |

## Page blueprint

### Tier 1 — universal
- Home
- Services hub + categories
- Government hub
- About/history
- Statistics/data
- Sitemap, accessibility, privacy, terms, contact

### Tier 2 — common
- Service detail pages
- Officials
- Departments/offices
- Barangay directory
- Transparency hub
- Budget/finance
- News/updates
- Legislation hub: ordinances, resolutions
- FAQ, search
- Citizens' Charter
- Tourism

### Tier 3 — differentiating
- Project tracker
- Procurement/bids/contracts
- Barangay profiles with officials
- Hotlines/emergency page
- Full disclosure reports
- Executive orders
- Open data
- Report/feedback

### Tier 4 — advanced
- City monitor / civic map
- Data provenance/methodology/evidence pages
- Project map
- Calendar/events
- Jobs/careers

## Data required per page

### LGU profile
Name, type, province, region, district, PSGC, income class, land area, population + census year, households, barangay count, coordinates, ZIP, address, trunkline, email, office hours, social links, seal/logo, vision, mission, history, awards.

### Officials
Full name, position, photo, office, contact, email, term, committee roles, bio; district and ex-officio role for Sanggunian members.

### Departments/offices
Name, acronym, head, contact, email, address, hours, mandate/functions, services handled, links.

### Barangays
Name, district, population, households, land area, punong barangay, seven kagawads, SK chair, contact, facilities, coordinates, photo.

### Services
```
category, title, summary, who can apply,
requirements[], steps[], fees (with breakdown),
processing time, office, contact, forms[],
online link, walk-in/appointment, FAQs[],
related services, last verified, source
```

### Budget/transparency
Fiscal year, total income (local vs NTA/external), expenditures by sector and object (PS, MOOE, CO), fund balance, 20% Development Fund, SEF, DRRM fund, trust fund, debt service, RA 7171, quarterly BFARs, COA audit, document links.

### Procurement
Bid/project number, title, stage (invitation, bid result, award, contract), ABC, winning bidder, contract amount, date, office, documents, source.

### Projects
Name, description, type, barangay/location, coordinates, funding source, appropriation, contractor, start/end, status, progress, evidence, photos, source.

### Legislation
Type, number, series, title, date enacted, author/sponsor, status, full-text PDF, category.

### Statistics
Census years, population, growth rate, barangay population/rank, households, age/sex, urban/rural, dependency ratio, income class, poverty incidence, revenue/expenditure, CMCI rankings, land use, schools, health facilities, businesses.

### News
Title, date, category, body, image, author, source.

### Tourism
Attraction, description, location, hours, fees, contact, photos, festivals.

### Hotlines
Agency/office, number(s), coverage/hours.

## Benchmarks

| Benchmark | Site | Depth |
|---|---|---|
| Service detail | San Fernando (Pampanga) | 177 detail pages |
| Service detail | Alaminos City | 174 detail pages |
| Service detail | Makati | 162 detail pages |
| Service categories | Mapandan | 86 categories |
| Departments/offices | San Fernando (Pampanga) | 45 office records |
| Projects + evidence | San Fernando (Pampanga) | 303 projects, 617 evidence records, 23 datasets |
| Project tracker | Baguio | Live PRISM sync, weekly updates |
| Barangay profiles | Makati, Calatagan | 25 each |
| Transparency | Solano, Agoo | BLGF + DPWH + flood-control data |
| Advanced civic data | Makati | City monitor, civic map, barangay pages |
| Multilingual | San Fernando (Pampanga), Agoo, Solano | EN/FIL/ILO |
| Methodology/provenance | San Fernando (Pampanga) | Sources, methodology, limitations pages |

## Original recommended sitemap (planning baseline)

The phase groupings below describe the original proposal from the survey, not a list of unfinished work. Several items are implemented under different route names; the current implementation is summarized here.

### Current implementation snapshot — 2026-10-23

- Services: `/services`, category and service detail routes, with 242 service records.
- Government: officials, offices and office profiles, all 59 barangays and profiles, hotlines, and legislation.
- City: profile, life and tourism, places directory, and business pages.
- Places directory: searchable place index for agencies, safety and justice, health and recovery, schools, shopping, food, personal services, accommodation, tourism, parks, transport, finance, faith, and everyday essentials. Category links search live Google Maps listings to surface additional candidates.
- Life and tourism: activity and travel details follow the City Government's [Life in CSF](https://www.sanfernandocity.gov.ph/life-in-csf/) page. The page uses individually credited city and provincial photos, a compressed preview of the official 2022 City AdvenTour map, and prompts visitors to confirm current access, business details, dates, and schedules.
- Transparency: budget, procurement, DPWH infrastructure projects and project map, and open data.
- News: latest updates, archive, and individual stories.
- Site support: search, sitemap, accessibility, privacy, terms, and FAQ pages.
- Maps: MapLibre GL barangay boundaries with a selected-area 3D extrusion; project locations are shown separately on the project map. Boundary and population data use different vintages (2023 boundary source and 2024 census population).

### Source review — 2026-10-23

- PSA's current PSGC masterlist is dated September 30, 2026. Its third-quarter 2026 name correction is for Lambagan in Cabanglasan, Bukidnon; San Fernando's PSA city page still lists 59 barangays and 2024 POPCEN values. The map package was refreshed June 16, 2026, but its underlying geometry remains the PSA snapshot from October 24, 2023 and NAMRIA release from November 6, 2023. Names/count and polygon-version dates are shown separately; the review did not find a newer official boundary release. Structural checks found 59 unique boundary features, all resolving to map records after the documented name aliases; all polygon geometries are valid and have no overlapping area. This does not independently survey legal boundary accuracy.
- The PSA barangay table and city roster were checked against all 59 local records. Barangay names and 2024 population values remain unchanged. The city's published roster has one spelling discrepancy, “Sibuan-Otong”; the site uses PSA's “Siboan-Otong.” All local punong barangay and kagawad names match the city-published district roster. The DILG directory landing page was reachable, but its linked Barangay Information System records request failed with a 502 error on October 23, 2026. The local file contains 58 SK chairperson names; Puspus is missing. No current official alternate source for that name was found, so the SK roster remains unverified and the missing entry must not be guessed.
- Republic Act No. 12326, approved September 24, 2026, moved the next regular barangay and SK elections to the second Monday of November 2028 and set five-year terms. The planned November 2026 election therefore will not replace the currently published incumbent barangay officials; monitor official announcements for any intervening vacancies or changes.
- The city department directory was compared against all 35 entries currently published there, and BAC, CRO, and LUSCM were checked against their own Citizens' Charter pages. Four previously blank heads were filled from the live city directory: General Services Office, CICTO, Office of the Secretary to the Sangguniang Panlungsod, and Office for Strategy Management. Other published office details remain unchanged. GAD is split across sources: the city directory provides `gad@sanfernandocity.gov.ph`, while its Citizens' Charter lists the CRO shared email and local numbers 142 / 121; the site uses the direct GAD email and charter phone. The 15 named local elected-official records match the current City Officials listing and were cross-checked against current SP session records. The city page also lists the ABC executive vice-president position without a name, so no unnamed record was added.
- Population and barangay totals remain 2024 Census values. The city profile also remains on 2024 revenue and expenditure values; BLGF lists FY2025 quarterly SRE files, but no validated full-year FY2025 city figures were available for the local charts. FY2025 quarterly workbook is linked and is not treated as annual data.
- Minimum wage was updated to NWPC Region I Wage Order RB 1-24, effective November 19, 2025: ₱505/day for non-agriculture establishments with 10 or more employees, and ₱480/day for agriculture and smaller non-agriculture establishments. Static August 2025 LUECO tariffs were removed in favor of the provider's current tariff schedule.
- The city's CY2026 annual budget and AIP, latest COA City Annual Audit Report (CY2024), and Executive Orders 56-2026 through 61-2026 were added to the linked records. On the October 23, 2026 source check, the city executive-order index listed Orders 60 and 61 as the newest entries; both are included in the legislation data.
- SM Prime confirms SM City La Union opened October 17, 2025; the outdated “set to open” description was corrected. City-published rental ranges remain as undated reference figures and are labeled accordingly.
- The places directory includes city-office profiles and all 59 barangay hall profiles from the local site data; named regional/provincial agency offices from the provincial government's February 27, 2026 RLA/PLA/GOCC directory; tertiary schools from the province's 2026 list; attractions from its 2023 tourism inventory; and mall/operator listings. Google Maps is a discovery layer for broader current searches, not proof that each listing is operating. A complete current commercial-place inventory still requires a current city BPLO/LEBDO permit dataset; no public full roster was found during this review.
- Current city department contacts were checked against the city directory, including CDRRMO, City Health Office, CSWDO, and Office for Public Safety. Police and fire direct numbers are only found in the city’s 2023 stakeholder directory; those numbers are identified as older and should be confirmed with the agency. Provincial DRRMO currently lists 0998-561-1519.
- Other reviewed data that remained unchanged: 124,809 city residents in the 2024 Census; 59 barangays across 12 districts; FY2024 city-profile revenue and spending totals; 242 Citizens’ Charter services; the current city online-services list; current city tourism source content; and the latest city news found, dated October 19, 2026. See each publisher for its own release date.
- The City Government facts-and-figures page returned zero in its animated counter fields during text-based source retrieval. Population and land-area figures were therefore cross-checked against PSA's 2024 Census release and 2025 Statistical Yearbook; the city page's static profile claims remain separately cited where used.

The City, province, and PSA/PhilAtlas publish different land-area figures (105.26 km², 106.88 km², and 102.72 km² respectively). The site retains the PSA/PhilAtlas figure with the discrepancy documented rather than treating the measures as reconciled.

### Phase 1
```
/                         Home
/services                 Services hub
/services/{category}      Categories
/services/{cat}/{service} Service detail (target: 80–120)
/government               Government hub
/government/officials     Mayor, Vice Mayor, 12 councilors, ex-officio
/government/offices       40+ departments/offices
/government/barangays     59 barangays + officials
/government/hotlines      Emergency directory
/transparency             Transparency hub
/transparency/budget      LEP 2016–2026, FDP, COA
/transparency/procurement Bids, results, awards
/news                     News/updates
/about                    History, vision, seal, hymn, awards
/contact                  Contact + map
/search, /sitemap, /accessibility, /privacy, /terms, /faq, 404
```

### Phase 2
```
/projects                 City + DPWH + flood-control projects
/projects/map             Map + status
/statistics               Population, demographics, barangay rankings
/legislation              Ordinances, resolutions, EOs
/legislation/ordinances
/legislation/resolutions
/legislation/executive-orders
/barangays/{name}         59 barangay profiles
/tourism                  Attractions + festivals
```

### Phase 3
```
/citizens-charter
/open-data
/cso                      CSO directory
/jobs                     Careers
/report                   Data issue / feedback
/city-monitor             Optional advanced
```

## San Fernando LU data sources

| Priority | Source | Data |
|---|---|---|
| P0 | `sanfernandocity.gov.ph` | Officials, 59 barangays + all officials, departments, news, bids, EOs, ordinances |
| P0 | `cc.sanfernandocity.gov.ph` | Citizens' Charter: service requirements, steps, fees, processing time |
| P0 | LGU seal/logo, vision/mission, history, hotlines | Branding and About |
| P1 | Full Disclosure Policy page | Budgets 2024–2026, LEP 2016–2026, AIP, CLUP/CDP, COA, SEF, DRRM |
| P1 | `sp.sanfernandocity.gov.ph` + `archives...` | Ordinances, resolutions, session records |
| P1 | PhilGEPS | Bids, awards, contracts |
| P1 | DPWH Transparency / Sumbong sa Pangulo | National projects, flood control |
| P2 | BLGF, COA, PSA, DTI CMCI | Finance summaries, audit, census, rankings |
| P2 | LGU Facebook | News, advisories, events |

## Data gaps to expect

- Many portals use placeholder/TBA/sample data.
- Service pages often omit fees and processing times.
- Transparency pages are frequently PDF/Google Drive dumps, not structured data.
- Few sites publish sources, methodology, or last-updated dates.
- Barangay-level data is the most commonly missing layer.
- Most sites are English-only; only a handful support Filipino/Ilocano.

## Verified San Fernando LU facts

- City Government Revenue 2024: ₱1,314,010,175.24.
- City Government Expenditures 2024: ₱1,021,576,106.43.
- Poverty incidence: 8.7% (PSA 2023).
- Income classification: 2nd Class Component City.
- 59 barangays across 12 districts.
- City Hall: F.I. Ortega Highway, Barangay I, City of San Fernando, 2500 La Union.
- Trunkline: (072) 687-8100.
- Email: csflu@sanfernandocity.gov.ph.
- Citizens' Charter: https://cc.sanfernandocity.gov.ph.
- Sangguniang Panlungsod: https://sp.sanfernandocity.gov.ph.
- Ordinance e-archives: https://archives.sanfernandocity.gov.ph.
