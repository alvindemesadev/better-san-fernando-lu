import { barangays } from './barangays.ts'
import { city } from './city.ts'
import { offices } from './offices.ts'
import { officials } from './officials.ts'
import { services } from './services.ts'
import { bidResults } from './bidDocs.ts'
import { budgetDocs } from './budgetDocs.ts'
import { cityElections } from './elections.ts'
import { hotlines } from './hotlines.ts'
import { legislation } from './legislation.ts'
import { news, newsLastVerified } from './news.ts'
import { onlineServices } from './onlineServices.ts'
import { openDataSources } from './openData.ts'
import { places } from './places.ts'
import { dpwhSanFernando, philgepsSanFernando } from './contracts.ts'

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
  {
    dataset: 'City election history',
    source: 'BetterGov OpenHalalan dataset and COMELEC election results; 2025 middle names are incomplete upstream',
    recordCount: cityElections.length,
    lastVerified: '2026-10-23',
    reviewEveryDays: 365,
  },
  {
    dataset: 'News snapshot',
    source: 'Latest 30 posts from the City Government news feed',
    recordCount: news.length,
    lastVerified: newsLastVerified,
    reviewEveryDays: 14,
  },
  {
    dataset: 'Online city services',
    source: 'Official city online-services directory; destination links checked October 23, 2026',
    recordCount: onlineServices.length,
    lastVerified: '2026-10-23',
    reviewEveryDays: 90,
  },
  {
    dataset: 'Legislation sample',
    source: 'City executive-order index and Sangguniang Panlungsod sources; sample, not a complete archive',
    recordCount: legislation.length,
    lastVerified: '2026-10-24',
    reviewEveryDays: 30,
  },
  {
    dataset: 'Emergency hotline directory',
    source: 'Current city department directory for City Hall and CDRRMO; police/fire use 911 because direct numbers were not recently verified',
    recordCount: hotlines.length,
    lastVerified: '2026-10-24',
    reviewEveryDays: 90,
  },
  {
    dataset: 'Bid result sample',
    source: 'City bid-results index and linked official files; project titles omitted where the index gives reference numbers only',
    recordCount: bidResults.length,
    lastVerified: '2026-10-23',
    reviewEveryDays: 90,
  },
  {
    dataset: 'Budget document links',
    source: 'City Full Disclosure Policy and linked official budget and audit documents',
    recordCount: budgetDocs.length,
    lastVerified: null,
    reviewEveryDays: 180,
  },
  {
    dataset: 'DPWH project snapshot',
    source: 'BetterGov extract from DPWH; upstream last updated December 3, 2025, with no newer snapshot listed when checked',
    recordCount: dpwhSanFernando.totalProjects,
    lastVerified: '2026-10-23',
    reviewEveryDays: 180,
  },
  {
    dataset: 'PhilGEPS award snapshot',
    source: 'BetterGov extract of city-tagged PhilGEPS awards; upstream last updated November 29, 2025, with no newer snapshot listed when checked',
    recordCount: philgepsSanFernando.totalAwards,
    lastVerified: '2026-10-23',
    reviewEveryDays: 180,
  },
  {
    dataset: 'Place directory',
    source: 'Government and institutional directories, 2024 La Union accommodation inventory, bank and payment branch directories, and live Google Maps category searches; commercial branch status can change',
    recordCount: places.length,
    lastVerified: null,
    reviewEveryDays: 90,
  },
  {
    dataset: 'Open-data source registry',
    source: 'Source pages retain their own upstream dates and coverage notes',
    recordCount: openDataSources.length,
    lastVerified: '2026-10-23',
    reviewEveryDays: 180,
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
      const count = `${row.recordCount} ${row.recordCount === 1 ? 'record' : 'records'}`
      return `- ${row.status.toUpperCase()}: ${row.dataset} — ${count}; verified ${verified}; source: ${row.source}`
    }),
  ]
  return lines.join('\n')
}
