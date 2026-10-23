export type LegislationKind = 'Ordinance' | 'Executive Order' | 'Proposed Ordinance'
export type LegislationStatus = 'Enacted' | 'Issued' | 'Proposed'

export interface LegislationItem {
  id: string
  number: string
  title: string
  kind: LegislationKind
  status: LegislationStatus
  year: number
  summary: string
  sourceUrl: string
}

export interface LegislationSource {
  label: string
  href: string
  coverage: string
}

export const legislationSourceUrl = 'https://sp.sanfernandocity.gov.ph/ordinances/'

export const legislationSources: LegislationSource[] = [
  {
    label: 'Ordinances',
    href: 'https://sp.sanfernandocity.gov.ph/ordinances/',
    coverage: 'Enacted city ordinances and the official ordinance archive.',
  },
  {
    label: 'Proposed ordinances',
    href: 'https://sp.sanfernandocity.gov.ph/sp-proposed-ordinances/',
    coverage: 'Draft ordinances filed with the Sangguniang Panlungsod.',
  },
  {
    label: 'Resolutions',
    href: 'https://sp.sanfernandocity.gov.ph/resolutions/',
    coverage: 'City resolutions and regular session records.',
  },
  {
    label: 'Executive orders',
    href: 'https://www.sanfernandocity.gov.ph/executive-order/',
    coverage: 'Executive orders issued by the City Mayor, grouped by year.',
  },
  {
    label: 'Ordinance archive',
    href: 'https://archives.sanfernandocity.gov.ph',
    coverage: 'Historical ordinances maintained by the Sangguniang Panlungsod.',
  },
]

export const legislation: LegislationItem[] = [
  {
    id: 'ordinance-2026-08',
    number: 'City Ordinance No. 2026-08',
    title: 'Persons with Disability Code',
    kind: 'Ordinance',
    status: 'Enacted',
    year: 2026,
    summary:
      'Institutionalizes the city\u2019s Persons with Disability Code, setting out rights, programs, accessibility requirements, and the responsibilities of city offices.',
    sourceUrl: 'https://drive.google.com/file/d/1YEW_RuRI1kQ7QLrghtvPZjkm5XHU0K3a/view?usp=drive_link',
  },
  {
    id: 'ordinance-2026-07',
    number: 'City Ordinance No. 2026-07',
    title: 'Anti-Dengue Task Force amendment',
    kind: 'Ordinance',
    status: 'Enacted',
    year: 2026,
    summary:
      'Amends the city\u2019s anti-dengue ordinance and updates the composition and responsibilities of the Anti-Dengue Task Force.',
    sourceUrl: 'https://drive.google.com/file/d/1GcNflcxDTwWYYFWuOSf0Vmlz-uskNaaU/view?usp=drive_link',
  },
  {
    id: 'ordinance-2026-06',
    number: 'City Ordinance No. 2026-06',
    title: 'Pakikiramay or Burial Assistance',
    kind: 'Ordinance',
    status: 'Enacted',
    year: 2026,
    summary:
      'Amends the city\u2019s Pakikiramay or burial assistance ordinance, which provides support to families in need after a death.',
    sourceUrl: 'https://drive.google.com/file/d/1y3zjMJpWzfSJ94CGzTuakOne_ZbiBicf/view?usp=drive_link',
  },
  {
    id: 'proposed-2026-01',
    number: 'Draft Ordinance No. 2026-01',
    title: 'Real property tax amnesty',
    kind: 'Proposed Ordinance',
    status: 'Proposed',
    year: 2026,
    summary:
      'Proposes amnesty on penalties, surcharges, and interests on delinquent real property taxes, including the Special Education Fund, idle land tax, and other special levy taxes.',
    sourceUrl: 'https://sp.sanfernandocity.gov.ph/sp-proposed-ordinances/',
  },
  {
    id: 'ordinance-2025-22',
    number: 'City Ordinance No. 2025-22',
    title: 'Fire Auxiliary Brigades amendment',
    kind: 'Ordinance',
    status: 'Enacted',
    year: 2025,
    summary:
      'Enhances the Fire Auxiliary Brigades ordinance by adding provisions and amending sections 5 and 8 on brigades in barangays and vital institutions.',
    sourceUrl: 'https://sp.sanfernandocity.gov.ph/ordinances/',
  },
  {
    id: 'ordinance-2025-21',
    number: 'City Ordinance No. 2025-21',
    title: 'Reintegration of persons deprived of liberty',
    kind: 'Ordinance',
    status: 'Enacted',
    year: 2025,
    summary:
      'Amends sections 3.B and 6.B of the city ordinance reintegrating persons deprived of liberty into society.',
    sourceUrl: 'https://sp.sanfernandocity.gov.ph/ordinances/',
  },
  {
    id: 'executive-order-61-2026',
    number: 'Executive Order No. 61-2026',
    title: 'CDRRMC reconstitution',
    kind: 'Executive Order',
    status: 'Issued',
    year: 2026,
    summary:
      'Amends Executive Order No. 40-2025, reconstituting the City Disaster Risk Reduction and Management Council and defining its composition, functions, and four thematic areas.',
    sourceUrl: 'https://drive.google.com/file/d/1uzQIvRZC-iVWdgfFazmQHzH6_pU2_tWE/view?usp=drive_link',
  },
  {
    id: 'executive-order-60-2026',
    number: 'Executive Order No. 60-2026',
    title: 'CAFMP technical working group',
    kind: 'Executive Order',
    status: 'Issued',
    year: 2026,
    summary:
      'Creates a technical working group to support the preparation of the city\u2019s agriculture and fisheries modernization plan.',
    sourceUrl: 'https://drive.google.com/file/d/160H_Ui3PdIzpVyGlPZTwDBIb4EGHgrqU/view?usp=drive_link',
  },
  {
    id: 'executive-order-59-2026',
    number: 'Executive Order No. 59-2026',
    title: 'Local Poverty Reduction Action Committee',
    kind: 'Executive Order',
    status: 'Issued',
    year: 2026,
    summary:
      'Constitutes the City Local Poverty Reduction Action Committee and sets its membership and coordinating role.',
    sourceUrl: 'https://drive.google.com/file/d/1EMsqswpjGwk6xheg_ZjsQwLoBlY-ii0E/view?usp=drive_link',
  },
  {
    id: 'executive-order-58-2026',
    number: 'Executive Order No. 58-2026',
    title: 'Local Infrastructure Audit Team',
    kind: 'Executive Order',
    status: 'Issued',
    year: 2026,
    summary:
      'Creates the Local Infrastructure Audit Team to review city infrastructure projects.',
    sourceUrl: 'https://drive.google.com/file/d/1yu_WJJaHIJahe_JgqoWrFZvUQt8_uKaG/view?usp=drive_link',
  },
  {
    id: 'executive-order-57-2026',
    number: 'Executive Order No. 57-2026',
    title: 'City Incident Management Team',
    kind: 'Executive Order',
    status: 'Issued',
    year: 2026,
    summary:
      'Reconstitutes the City Incident Management Team and defines its incident response responsibilities.',
    sourceUrl: 'https://drive.google.com/file/d/1zM2W5PNiT82Ex0yTUh58Ly3OkeezzfyB/view?usp=drive_link',
  },
  {
    id: 'executive-order-56-2026',
    number: 'Executive Order No. 56-2026',
    title: 'Amendment to Executive Order No. 11-2025',
    kind: 'Executive Order',
    status: 'Issued',
    year: 2026,
    summary:
      'Amends Executive Order No. 11-2025 to reconstitute the Technical Working Group and Joint Inspection and Compliance Monitoring Unit.',
    sourceUrl: 'https://drive.google.com/file/d/15AARDg5EgAUt6kFbasyFnEzYPP4l1x5p/view?usp=drive_link',
  },
]
