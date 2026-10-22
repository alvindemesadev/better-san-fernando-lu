export interface ElectionWinner {
  name: string
  party: string
}

export interface CityElection {
  year: number
  mayor: ElectionWinner | null
  viceMayor: ElectionWinner | null
}

export const electionSourceUrl = 'https://data.bettergov.ph/datasets/25'
export const electionSupplementSourceUrl =
  'https://www.comelec.gov.ph/php-tpls-attachments/ListElectedCandidates/2007_list_of_elected_city_municipal_candidates.pdf'

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
