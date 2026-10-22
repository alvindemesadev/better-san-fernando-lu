export interface DpwhProject {
  contractId: string
  title: string
  year: number
  budget: number
  status: string
  progress: number
  contractor: string
}

export interface YearTotal {
  year: number
  projects: number
  amount: number
}

export interface AwardeeTotal {
  name: string
  awards: number
  amount: number
}

export const dpwhSourceUrl = 'https://data.bettergov.ph/datasets/19'
export const philgepsSourceUrl = 'https://data.bettergov.ph/datasets/5'

export const dpwhSanFernando = {
  totalProjects: 249,
  totalBudget: 3528638331.06,
  completed: 230,
  ongoing: 16,
  forProcurement: 3,
  recentYears: [
    { year: 2021, projects: 26, amount: 334689727.06 },
    { year: 2022, projects: 26, amount: 254666281.51 },
    { year: 2023, projects: 22, amount: 306079397.24 },
    { year: 2024, projects: 30, amount: 889430274.07 },
    { year: 2025, projects: 14, amount: 330741164.11 },
  ] satisfies YearTotal[],
  largestProjects: [
    {
      contractId: '24AE0103',
      title: 'Slope protection structure',
      year: 2024,
      budget: 144597478.87,
      status: 'Ongoing',
      progress: 92.64,
      contractor: 'Anore Construction',
    },
    {
      contractId: '25AE0070',
      title: 'Multi-purpose facilities and site development',
      year: 2025,
      budget: 144044907.29,
      status: 'Ongoing',
      progress: 0.14,
      contractor: 'Octagon Concrete Solutions',
    },
    {
      contractId: '24AE0088',
      title: 'Seawall, Barangay Pagdaraoan',
      year: 2024,
      budget: 96499014.82,
      status: 'Completed',
      progress: 100,
      contractor: 'Anore Construction',
    },
    {
      contractId: '24AE0090',
      title: 'Seawall, Barangay Ilocanos Sur',
      year: 2024,
      budget: 96499003,
      status: 'Completed',
      progress: 100,
      contractor: 'Anore Construction',
    },
    {
      contractId: '24AE0089',
      title: 'Seawall, Barangay Ilocanos Norte',
      year: 2024,
      budget: 96498830.56,
      status: 'Completed',
      progress: 100,
      contractor: 'Anore Construction',
    },
  ] satisfies DpwhProject[],
}

export const philgepsSanFernando = {
  totalAwards: 619,
  totalAmount: 1538452845.25,
  topAwardees: [
    { name: 'J. D. Madrid Construction', awards: 53, amount: 224214981.56 },
    { name: 'Fabro Construction', awards: 39, amount: 98964330.98 },
    { name: 'E. E. Madayag Construction', awards: 36, amount: 93362374.61 },
    { name: 'LAV Construction & Supply', awards: 41, amount: 77948743.05 },
    { name: 'H. G. Lopez Construction', awards: 16, amount: 75493655.99 },
  ] satisfies AwardeeTotal[],
  topAward: {
    title: 'Rehabilitation of City Plaza',
    awardee: 'J. D. Madrid Construction',
    amount: 38895056.93,
    year: 2018,
  },
}
