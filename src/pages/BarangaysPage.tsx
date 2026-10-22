import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarangayMap } from '../components/BarangayMap'
import { EmptyState } from '../components/EmptyState'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { StatCard } from '../components/StatCard'
import { barangays } from '../data/barangays'
import { city } from '../data/city'
import { formatDate, formatNumber, normalize, pluralize } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

export function BarangaysPage() {
  usePageMeta(
    'Barangays',
    'All 59 barangays of San Fernando, La Union, with an interactive boundary map, 2024 population, city share, change since 2020, rank, and elected barangay officials.',
  )

  const [query, setQuery] = useState('')
  const normalizedQuery = normalize(query)
  const filtered = barangays.filter((barangay) => {
    if (!normalizedQuery) return true
    return [barangay.name, barangay.district, barangay.punongBarangay].some((value) =>
      normalize(value).includes(normalizedQuery),
    )
  })
  const districtNumbers = Array.from(new Set(barangays.map((barangay) => barangay.districtNumber))).sort(
    (a, b) => a - b,
  )
  const grouped = districtNumbers
    .map((districtNumber) => ({
      districtNumber,
      items: filtered.filter((barangay) => barangay.districtNumber === districtNumber),
    }))
    .filter((group) => group.items.length > 0)
  const poblacionCount = barangays.filter((barangay) => barangay.poblacion).length

  return (
    <>
      <PageHero
        eyebrow="Barangays"
        title="59 barangays, 12 districts"
        description="Every community in San Fernando, with 2024 population, share of the city, change since 2020, rank, and elected barangay officials."
        crumbs={[{ label: 'Government', href: '/government' }, { label: 'Barangays' }]}
      >
        <div className="max-w-md">
          <label htmlFor="barangay-search" className="sr-only">
            Search barangays
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-line bg-white p-1.5 shadow-float focus-within:ring-2 focus-within:ring-brand-300">
            <Search aria-hidden="true" className="ml-2 size-5 shrink-0 text-ink-400" />
            <input
              id="barangay-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search barangay or punong barangay…"
              className="min-w-0 flex-1 bg-transparent py-2 text-base text-ink-900 outline-none placeholder:text-ink-400"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear barangay search"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-ink-400 transition hover:bg-surface hover:text-ink-700"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            ) : null}
          </div>
        </div>
      </PageHero>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard value={formatNumber(city.barangayCount)} label="Barangays" note="Across the city" />
              <StatCard
                value={formatNumber(city.population2024)}
                label="Residents"
                note="2024 Census of Population"
              />
              <StatCard value={formatNumber(city.districtCount)} label="Districts" note="Administrative districts" />
              <StatCard
                value={formatNumber(poblacionCount)}
                label="Poblacion barangays"
                note="Barangays I to IV"
              />
            </div>
          </Reveal>

          <section className="mt-10">
            <Reveal delay={0.06}>
              <SectionHeading
                eyebrow="City map"
                title="See where every barangay sits"
                description="The map uses PSA and NAMRIA boundary data. Hover or tap a shape to preview a barangay, then open its full profile."
              />
              <div className="mt-6">
                <BarangayMap />
              </div>
              <div className="mt-4">
                <SourceNote
                  href="https://data.bettergov.ph/datasets/23"
                  linkLabel="Barangay boundary data on data.bettergov.ph"
                >
                  Boundaries are simplified from the PSA/NAMRIA barangay boundary release and are approximate. They are
                  suitable for orientation and browsing, not for cadastral or legal boundary determinations.
                </SourceNote>
              </div>
            </Reveal>
          </section>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Directory</p>
              <h2 className="mt-2 text-2xl font-extrabold tracking-[-0.025em] text-ink-950 sm:text-3xl">
                {normalizedQuery ? 'Search results' : 'Browse by district'}
              </h2>
              <p className="mt-2 text-sm text-ink-600">
                {normalizedQuery
                  ? `${pluralize(filtered.length, 'barangay')} match “${query.trim()}”.`
                  : 'Population figures use the 2024 Census of Population. Change compares 2020 with 2024.'}
              </p>
            </div>
            {normalizedQuery ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
              >
                Clear search
              </button>
            ) : null}
          </div>

          {grouped.length ? (
            <div className="mt-8 space-y-10">
              {grouped.map((group) => {
                const districtName = group.items[0]?.district ?? `District ${group.districtNumber}`
                const districtPopulation = group.items.reduce(
                  (total, barangay) => total + barangay.population2024,
                  0,
                )

                return (
                  <div key={group.districtNumber}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-3">
                      <h3 className="text-lg font-extrabold tracking-tight text-ink-950">{districtName}</h3>
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
                        {group.items.length} {group.items.length === 1 ? 'barangay' : 'barangays'} ·{' '}
                        {formatNumber(districtPopulation)} residents
                      </p>
                    </div>

                    <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
                      <table className="min-w-[760px] w-full text-left text-sm">
                        <caption className="sr-only">
                          Barangays in {districtName}, San Fernando, La Union
                        </caption>
                        <thead className="bg-surface text-[11px] font-bold uppercase tracking-[0.1em] text-ink-500">
                          <tr>
                            <th scope="col" className="px-4 py-3">
                              Barangay
                            </th>
                            <th scope="col" className="px-4 py-3 text-right">
                              Population 2024
                            </th>
                            <th scope="col" className="px-4 py-3 text-right">
                              Share
                            </th>
                            <th scope="col" className="px-4 py-3 text-right">
                              Change
                            </th>
                            <th scope="col" className="px-4 py-3 text-right">
                              Rank
                            </th>
                            <th scope="col" className="px-4 py-3">
                              Punong Barangay
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-line">
                          {group.items.map((barangay) => (
                            <tr key={barangay.slug} className="transition hover:bg-surface">
                              <th scope="row" className="px-4 py-3 font-normal">
                                <Link
                                  to={`/government/barangays/${barangay.slug}`}
                                  viewTransition
                                  className="inline-flex flex-wrap items-center gap-2 font-bold text-ink-950 hover:text-brand-700"
                                >
                                  {barangay.name}
                                  {barangay.poblacion ? (
                                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-brand-700">
                                      Poblacion
                                    </span>
                                  ) : null}
                                </Link>
                              </th>
                              <td className="px-4 py-3 text-right font-semibold tabular-nums text-ink-800">
                                {formatNumber(barangay.population2024)}
                              </td>
                              <td className="px-4 py-3 text-right tabular-nums text-ink-600">{barangay.share}</td>
                              <td className="px-4 py-3 text-right tabular-nums text-ink-600">{barangay.change}</td>
                              <td className="px-4 py-3 text-right tabular-nums text-ink-600">#{barangay.rank}</td>
                              <td className="px-4 py-3 text-ink-600">{barangay.punongBarangay}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="No barangays found"
                description="Try a different barangay name, district, or punong barangay."
                action={
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
                  >
                    Show all barangays
                  </button>
                }
              />
            </div>
          )}

          <div className="mt-10">
            <SourceNote href="https://psa.gov.ph" linkLabel="Philippine Statistics Authority">
              Population counts use the 2024 Census of Population. Shares, change from 2020 to 2024, and ranks are
              computed from those counts. Barangay officials come from the city government’s published barangay
              directory. Data last verified on {formatDate(city.lastVerified)}.
            </SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
