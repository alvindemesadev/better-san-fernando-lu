export type OpenDataSourceGroup = 'integrated' | 'reference'

export interface OpenDataSource {
  id: string
  name: string
  publisher: string
  description: string
  coverage: string
  formats: string
  license: string
  href: string
  resourceHref?: string
  resourceLabel?: string
  localHref?: string
  localLabel?: string
  group: OpenDataSourceGroup
  note?: string
}

export const openDataPortalUrl = 'https://data.bettergov.ph/datasets'

export const openDataSources: OpenDataSource[] = [
  {
    id: 'blgf',
    name: 'LGU fiscal data',
    publisher: 'Bureau of Local Government Finance',
    description:
      'Statements of receipts and expenditures, regular income, disaster funds, and special education fund reports for every LGU.',
    coverage: 'Local annual analysis: FY2024; BLGF also lists FY2025 quarterly reports',
    formats: 'XLSX, PDF',
    license: 'Public domain',
    href: 'https://data.bettergov.ph/datasets/9',
    localHref: '/transparency/budget',
    localLabel: 'See the San Fernando fiscal profile',
    group: 'integrated',
    note: 'The local annual analysis uses the FY2024 SRE and ARI snapshots. BLGF now lists an FY2025 quarterly SRE workbook; because it is partial-year and its city row has not been validated here, it is linked separately rather than substituted for annual figures.',
  },
  {
    id: 'barangay-boundaries',
    name: 'Barangay boundaries',
    publisher: 'PSA and NAMRIA, curated by Manuel Balmeo',
    description:
      'Hierarchical GeoJSON boundaries for regions, provinces, municipalities, cities, and barangays, matched to PSGC codes.',
    coverage: 'All Philippine barangays, 2023 boundary version',
    formats: 'GeoJSON, ZIP',
    license: 'MIT',
    href: 'https://data.bettergov.ph/datasets/23',
    localHref: '/government/barangays',
    localLabel: 'Open the barangay map',
    group: 'integrated',
    note: 'The BetterGov package metadata was refreshed June 16, 2026, but its source geometry remains the PSA PSGC snapshot dated October 24, 2023 and NAMRIA boundary release dated November 6, 2023. Current barangay names and count were checked against the PSA PSGC page (September 30, 2026); this does not update the geometry vintage.',
  },
  {
    id: 'openhalalan',
    name: 'Election winners',
    publisher: 'OpenHalalan',
    description:
      'Winning candidates in Philippine national and local elections, with vote counts for recent cycles.',
    coverage: '2001–2025 winners',
    formats: 'CSV',
    license: 'ODbL 1.0',
    href: 'https://data.bettergov.ph/datasets/25',
    localHref: '/government/officials',
    localLabel: 'See San Fernando election history',
    group: 'integrated',
    note: 'The source dataset page was refreshed July 15, 2026. The local extract lists city mayors and vice mayors in cycles present in the source data; 2025 candidate middle names are incomplete in the upstream dataset.',
  },
  {
    id: 'dpwh',
    name: 'DPWH infrastructure projects',
    publisher: 'Department of Public Works and Highways',
    description:
      'Contract-level records for national roads, bridges, flood control, buildings, and other public works.',
    coverage: 'San Fernando-tagged projects, 2016–2025',
    formats: 'Parquet',
    license: 'CC0 1.0',
    href: 'https://data.bettergov.ph/datasets/19',
    localHref: '/transparency/procurement',
    localLabel: 'See local DPWH projects',
    group: 'integrated',
    note: 'The upstream dataset was last updated December 3, 2025. Project tagging relies on DPWH descriptions that reference San Fernando and La Union engineering districts; no newer snapshot was listed when checked.',
  },
  {
    id: 'philgeps',
    name: 'PhilGEPS awards',
    publisher: 'Philippine Government Electronic Procurement System',
    description:
      'Award notices, suppliers, contract amounts, and award dates from the government procurement portal.',
    coverage: 'City government awards, 2016–2025',
    formats: 'Parquet',
    license: 'CC0 1.0',
    href: 'https://data.bettergov.ph/datasets/5',
    localHref: '/transparency/procurement',
    localLabel: 'See city contract awards',
    group: 'integrated',
    note: 'The upstream dataset was last updated November 29, 2025. The extract covers awards recorded under “CITY OF SAN FERNANDO, LA UNION”; it is not a payment ledger, and no newer snapshot was listed when checked.',
  },
  {
    id: 'noah',
    name: 'Hazard maps',
    publisher: 'Project NOAH, DOST',
    description:
      'Flood, landslide, and storm-surge hazard maps from Project NOAH, packaged as a national PMTiles archive.',
    coverage: 'Philippines, multi-hazard',
    formats: 'PMTiles',
    license: 'ODC-ODbL',
    href: 'https://data.bettergov.ph/datasets/22',
    localHref: '/government/barangays',
    localLabel: 'Open the barangay map',
    group: 'reference',
    note: 'The national tile archive is about 5.2 GB, so the site links to it instead of embedding it.',
  },
  {
    id: 'coa',
    name: 'Audit agency index',
    publisher: 'Commission on Audit',
    description:
      'The Commission on Audit’s index of agencies with annual audit reports, including local government audit agencies.',
    coverage: 'Audit agency list, 2023',
    formats: 'PDF',
    license: 'Public domain',
    href: 'https://data.bettergov.ph/datasets/14',
    resourceHref:
      'https://www.coa.gov.ph/download/10/list-of-audit-agencies-with-annual-audit-reports/296/local-government-audit-agencies.pdf',
    resourceLabel: 'Local government audit agencies',
    group: 'reference',
    note: 'The dataset indexes audit agencies; it does not contain the full audit reports.',
  },
  {
    id: 'coa-san-fernando-2024',
    name: 'San Fernando City Annual Audit Report 2024',
    publisher: 'Commission on Audit',
    description:
      'Annual audit report for the City Government of San Fernando, La Union.',
    coverage: 'City annual audit report, CY2024',
    formats: 'Web page, PDF',
    license: 'Public domain',
    href: 'https://www.coa.gov.ph/wpfd_file/san-fernando-city-annual-audit-report-2024/',
    group: 'reference',
    note: 'COA has published the city’s 2024 report; the local fiscal charts remain FY2024 city and BLGF figures with separate reporting bases.',
  },
  {
    id: 'bir',
    name: 'BIR zonal values',
    publisher: 'Bureau of Internal Revenue',
    description:
      'Zonal values used as the base for taxes on the sale, transfer, or lease of real property, organized by revenue district.',
    coverage: 'San Fernando City, La Union (RDO No. 3)',
    formats: 'ZIP, XLS',
    license: 'Public domain',
    href: 'https://data.bettergov.ph/datasets/17',
    resourceHref:
      'https://bir-cdn.bir.gov.ph/local/pdf/RDO No. 3 - San Fernando City La Union_copy_copy_copy_copy_copy_copy.zip',
    resourceLabel: 'Download RDO No. 3 zonal values',
    group: 'reference',
    note: 'Zonal values are assessment references, not actual market prices or tax bills.',
  },
]
