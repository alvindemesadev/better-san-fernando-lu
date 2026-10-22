export interface RevenueSource {
  key: 'tax' | 'nonTax' | 'nta' | 'otherNational' | 'grants'
  label: string
  amount: number
}

export interface CityFiscalPeer {
  name: string
  province: string
  annualRegularIncome: number
  localSources: number
  ownSourceShare: number
  ntaShare: number
}

export const fiscalSourceUrl = 'https://data.bettergov.ph/datasets/9'

export const fiscal2024 = {
  totalIncome: 1322581188.37,
  totalLocalSources: 420697613.15,
  totalTaxRevenue: 321117523.83,
  totalNonTaxRevenue: 99580089.32,
  nta: 750845226,
  otherNationalShares: 143075588.17,
  grants: 7962761.05,
  totalOperatingExpenditures: 739674850.68,
  netOperatingIncome: 582906337.69,
  capitalOutlay: 172625654.12,
  specialEducationFund: 61256558.58,
  disasterFund: {
    appropriation: 53841484.56,
    spent: 34944896.41,
    quickResponseAppropriation: 16152445.37,
    quickResponseSpent: 9336584,
  },
}

export const revenueSources2024: RevenueSource[] = [
  { key: 'tax', label: 'Local taxes', amount: fiscal2024.totalTaxRevenue },
  { key: 'nonTax', label: 'Fees and other local revenue', amount: fiscal2024.totalNonTaxRevenue },
  { key: 'nta', label: 'National Tax Allotment', amount: fiscal2024.nta },
  { key: 'otherNational', label: 'Other national shares', amount: fiscal2024.otherNationalShares },
  { key: 'grants', label: 'Grants and extraordinary receipts', amount: fiscal2024.grants },
]

export const ilocosCities2024: CityFiscalPeer[] = [
  {
    name: 'Batac',
    province: 'Ilocos Norte',
    annualRegularIncome: 1260679856.98,
    localSources: 145877594.17,
    ownSourceShare: 0.1157,
    ntaShare: 0.53,
  },
  {
    name: 'Laoag',
    province: 'Ilocos Norte',
    annualRegularIncome: 1171366231.53,
    localSources: 405054296.92,
    ownSourceShare: 0.3458,
    ntaShare: 0.6133,
  },
  {
    name: 'Candon',
    province: 'Ilocos Sur',
    annualRegularIncome: 2358772726,
    localSources: 157782884.06,
    ownSourceShare: 0.0669,
    ntaShare: 0.2576,
  },
  {
    name: 'Vigan',
    province: 'Ilocos Sur',
    annualRegularIncome: 708081741.69,
    localSources: 217097587.65,
    ownSourceShare: 0.3066,
    ntaShare: 0.6934,
  },
  {
    name: 'San Fernando',
    province: 'La Union',
    annualRegularIncome: 1251356877.47,
    localSources: 356522700.83,
    ownSourceShare: 0.2849,
    ntaShare: 0.6,
  },
  {
    name: 'Alaminos',
    province: 'Pangasinan',
    annualRegularIncome: 987620234.34,
    localSources: 214236444.4,
    ownSourceShare: 0.2169,
    ntaShare: 0.7803,
  },
  {
    name: 'Dagupan',
    province: 'Pangasinan',
    annualRegularIncome: 1369208283.8,
    localSources: 580516944.72,
    ownSourceShare: 0.424,
    ntaShare: 0.5669,
  },
  {
    name: 'San Carlos',
    province: 'Pangasinan',
    annualRegularIncome: 1254777451.35,
    localSources: 240059865.56,
    ownSourceShare: 0.1913,
    ntaShare: 0.8084,
  },
  {
    name: 'Urdaneta',
    province: 'Pangasinan',
    annualRegularIncome: 1421140128.11,
    localSources: 630091571.82,
    ownSourceShare: 0.4434,
    ntaShare: 0.556,
  },
]
