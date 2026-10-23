export interface ElectionWinner {
  name: string
  party: string
}

export interface CityElection {
  year: number
  mayor: ElectionWinner | null
  viceMayor: ElectionWinner | null
}

export interface ElectionSupplementSource {
  year: number
  url: string
}

export const electionSourceUrl = 'https://data.bettergov.ph/datasets/25'
export const electionSupplementSources: ElectionSupplementSource[] = [
  {
    year: 2007,
    url: 'https://www.comelec.gov.ph/php-tpls-attachments/ListElectedCandidates/2007_list_of_elected_city_municipal_candidates.pdf',
  },
  {
    year: 2010,
    url: 'https://www.comelec.gov.ph/php-tpls-attachments/ListElectedCandidates/2010_list_of_elected_citymunicipal_candidates.pdf',
  },
  {
    year: 2013,
    url: 'https://www.comelec.gov.ph/php-tpls-attachments/ListElectedCandidates/2013_list_of_elected_citymunicipal_candidates.pdf',
  },
]

export const cityElections: CityElection[] = [
  {
    year: 2001,
    mayor: { name: 'Mary Jane C. Ortega', party: 'Lakas-NUCD-UMDP' },
    viceMayor: { name: 'Bernardo L. Valero', party: 'Lakas-NUCD-UMDP' },
  },
  {
    year: 2004,
    mayor: { name: 'Mary Jane C. Ortega', party: 'Lakas-CMD' },
    viceMayor: { name: 'Bernardo L. Valero', party: 'Lakas-CMD' },
  },
  {
    year: 2007,
    mayor: { name: 'Pablo C. Ortega', party: 'Lakas-CMD' },
    viceMayor: { name: 'Pancracio Q. Nisce', party: 'NPC' },
  },
  {
    year: 2010,
    mayor: { name: 'Pablo C. Ortega', party: 'Lakas-Kampi-CMD (LKS-KAM)' },
    viceMayor: { name: 'Hermenegildo A. Gualberto', party: 'Independent' },
  },
  {
    year: 2013,
    mayor: { name: 'Pablo C. Ortega', party: 'Independent' },
    viceMayor: { name: 'Hermenegildo A. Gualberto', party: 'Independent' },
  },
  {
    year: 2016,
    mayor: { name: "Hermenegildo 'Dong' A. Gualberto", party: 'Independent' },
    viceMayor: { name: 'Alf Ortega', party: 'Independent' },
  },
  {
    year: 2019,
    mayor: { name: "Hermenegildo 'Dong' A. Gualberto", party: 'Independent' },
    viceMayor: { name: 'Alf Ortega', party: 'PDP-Laban' },
  },
  {
    year: 2022,
    mayor: { name: "Hermenegildo 'Dong' A. Gualberto", party: 'Independent' },
    viceMayor: { name: 'Alf Ortega', party: 'NPC' },
  },
  {
    year: 2025,
    mayor: { name: "Hermenegildo 'Dong' A. Gualberto", party: 'Independent' },
    viceMayor: { name: 'Pablo C. Ortega', party: 'Lakas' },
  },
]
