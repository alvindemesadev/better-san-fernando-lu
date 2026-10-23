import { barangays } from './barangays.ts'
import { city } from './city.ts'
import { offices } from './offices.ts'
import { officials } from './officials.ts'
import { services } from './services.ts'

export interface DataFreshnessRow {
  dataset: string
  source: string
  recordCount: number
  lastVerified: string | null
  reviewEveryDays: number
}

export interface DataFreshnessResult extends DataFreshnessRow {
  ageDays: number | null
  status: 'current' | 'stale' | 'unknown'
}

function oldestVerificationDate(records: Array<{ lastVerified: string }>) {
  return records.map((record) => record.lastVerified).sort()[0] ?? null
}

export const manuallyMaintainedData: DataFreshnessRow[] = [
  {
    dataset: 'Service charter records',
    source: 'City Citizens’ Charter',
    recordCount: services.length,
    lastVerified: oldestVerificationDate(services),
    reviewEveryDays: 365,
  },
  {
    dataset: 'City office directory',
    source: 'City department directory and Citizens’ Charter pages; reviewed October 23, 2026',
    recordCount: offices.length,
    lastVerified: '2026-10-23',
    reviewEveryDays: 180,
  },
  {
    dataset: 'Elected officials',
    source: 'Official city officials page and Sangguniang Panlungsod session records',
    recordCount: officials.length,
    lastVerified: '2026-10-23',
    reviewEveryDays: 90,
  },
  {
    dataset: 'Barangay names and population',
    source: 'PSA PSGC and 2024 POPCEN barangay table',
    recordCount: barangays.length,
    lastVerified: '2026-10-23',
    reviewEveryDays: 180,
  },
  {
    dataset: 'Barangay captains and kagawads',
    source: 'City Government published barangay and district roster',
    recordCount: barangays.length,
    lastVerified: '2026-10-23',
    reviewEveryDays: 180,
  },
  {
    dataset: 'SK chairpersons',
    source: 'DILG directory page reachable October 23, 2026, but its BIS records request failed (502); 58 names on file and Puspus is missing',
    recordCount: barangays.filter((barangay) => barangay.skChairperson).length,
    lastVerified: null,
    reviewEveryDays: 180,
  },
  {
    dataset: 'Barangay boundary geometry',
    source: 'PSA/NAMRIA 2023 release; no newer official city boundary release identified',
    recordCount: barangays.length,
    lastVerified: '2026-10-23',
    reviewEveryDays: 365,
  },
  {
    dataset: 'City profile',
    source: 'City profile and public records',
    recordCount: 1,
    lastVerified: city.lastVerified,
    reviewEveryDays: 365,
  },
]

export function getDataFreshness(asOf = new Date()): DataFreshnessResult[] {
  const today = Date.UTC(asOf.getUTCFullYear(), asOf.getUTCMonth(), asOf.getUTCDate())

  return manuallyMaintainedData.map((row) => {
    if (!row.lastVerified) return { ...row, ageDays: null, status: 'unknown' }

    const verifiedDate = new Date(`${row.lastVerified}T00:00:00Z`)
    if (Number.isNaN(verifiedDate.getTime())) return { ...row, ageDays: null, status: 'unknown' }

    const ageDays = Math.max(0, Math.floor((today - verifiedDate.getTime()) / 86_400_000))
    return {
      ...row,
      ageDays,
      status: ageDays > row.reviewEveryDays ? 'stale' : 'current',
    }
  })
}

export function formatDataFreshnessReport(asOf = new Date()) {
  const report = getDataFreshness(asOf)
  const lines = [
    'Manual data freshness',
    ...report.map((row) => {
      const verified = row.lastVerified ? `${row.lastVerified} (${row.ageDays} days ago)` : 'not recorded'
      return `- ${row.status.toUpperCase()}: ${row.dataset} — ${row.recordCount} records; verified ${verified}; source: ${row.source}`
    }),
  ]
  return lines.join('\n')
}
