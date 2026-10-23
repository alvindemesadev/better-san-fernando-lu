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
    source: 'City department directory and Citizens’ Charter',
    recordCount: offices.length,
    lastVerified: null,
    reviewEveryDays: 180,
  },
  {
    dataset: 'Elected officials',
    source: 'Official city profile pages',
    recordCount: officials.length,
    lastVerified: null,
    reviewEveryDays: 90,
  },
  {
    dataset: 'Barangay profiles',
    source: 'Official barangay profile pages',
    recordCount: barangays.length,
    lastVerified: null,
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
