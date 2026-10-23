import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DocCard } from '../components/DocCard'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { StatCard } from '../components/StatCard'
import { budgetDocs } from '../data/budgetDocs'
import { city } from '../data/city'
import {
  fiscal2024,
  fiscalSourceUrl,
  ilocosCities2024,
  revenueSources2024,
} from '../data/fiscal'
import { formatDate, formatNumber, formatPeso } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

const categories = ['Budget & expenditure', 'Special funds', 'Audit & accountability']

export function BudgetPage() {
  usePageMeta(
    'Budget and spending',
    'San Fernando, La Union budget documents: Local Expenditure Program, special funds, statements of receipts and expenditures, and audit reports.',
  )

  const budgetDocsOnly = budgetDocs.filter((doc) => doc.category !== 'Procurement')
  const maxFigure = Math.max(city.revenue2024, city.expenditures2024)
  const surplus = city.revenue2024 - city.expenditures2024
  const bars = [
    { label: 'Revenue', value: city.revenue2024, tone: 'bg-brand-600' },
    { label: 'Expenditures', value: city.expenditures2024, tone: 'bg-ink-900' },
  ]
  const operatingLocalShare = fiscal2024.totalLocalSources / fiscal2024.totalIncome
  const nationalShare = 1 - operatingLocalShare
  const disasterUse = fiscal2024.disasterFund.spent / fiscal2024.disasterFund.appropriation
  const cityPeers = [...ilocosCities2024].sort((a, b) => b.ownSourceShare - a.ownSourceShare)
  const sfPeer = ilocosCities2024.find((peer) => peer.name === 'San Fernando' && peer.province === 'La Union')
  const sfOwnSourceShare = sfPeer?.ownSourceShare ?? 0
  const sfNtaShare = sfPeer?.ntaShare ?? 0
  const sfLocalSources = sfPeer?.localSources ?? 0
  const ownSourceShares = cityPeers.map((peer) => peer.ownSourceShare).sort((a, b) => a - b)
  const medianOwnSourceShare = ownSourceShares[Math.floor(ownSourceShares.length / 2)] ?? 0
  const percent = (value: number) => `${(value * 100).toFixed(1)}%`

  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Budget and spending"
        description="How the city plans, spends, and reports public money — from the annual Local Expenditure Program to special funds and audit reports."
        crumbs={[{ label: 'Transparency', href: '/transparency' }, { label: 'Budget' }]}
      />

      <div className="container-page py-10 sm:py-14">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard
              value={formatPeso(city.revenue2024)}
              label="Revenue in 2024"
              note="City government receipts"
            />
            <StatCard
              value={formatPeso(city.expenditures2024)}
              label="Expenditures in 2024"
              note="City government spending"
            />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <section className="mt-4 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h2 className="text-base font-extrabold tracking-tight text-ink-950">Revenue vs. spending, 2024</h2>
              <p className="text-xs font-semibold text-ink-500">
                {formatPeso(city.revenue2024 / city.population2024)} revenue and{' '}
                {formatPeso(city.expenditures2024 / city.population2024)} spending per resident
              </p>
            </div>

            <dl className="mt-5 space-y-4">
              {bars.map((bar) => (
                <div key={bar.label} className="grid grid-cols-2 gap-x-3 text-sm">
                  <dt className="font-semibold text-ink-700">{bar.label}</dt>
                  <dd className="text-right font-extrabold tabular-nums text-ink-950">{formatPeso(bar.value)}</dd>
                  <dd
                    className="col-span-2 mt-1.5 h-3 overflow-hidden rounded-full bg-surface"
                    aria-hidden="true"
                  >
                    <span
                      className={`block h-full rounded-full ${bar.tone}`}
                      style={{ width: `${(bar.value / maxFigure) * 100}%` }}
                    />
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-4 text-xs leading-5 text-ink-500">
              Revenue exceeded expenditures by {formatPeso(surplus)} in 2024. Totals cover the whole city government;
              per-resident figures divide by the 2024 population of {formatNumber(city.population2024)}. Detailed
              breakdowns are in the statements below.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.08}>
          <section className="mt-4 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
                  National LGU ledger · FY2024
                </p>
                <h2 className="mt-2 text-xl font-extrabold tracking-tight text-ink-950">Where the money came from</h2>
              </div>
              <p className="text-xs font-semibold text-ink-500">BLGF preliminary figures</p>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-surface p-4">
                <p className="text-lg font-extrabold tracking-tight text-ink-950">
                  {formatPeso(fiscal2024.totalIncome)}
                </p>
                <p className="mt-1 text-xs font-semibold text-ink-700">Current operating income</p>
                <p className="mt-0.5 text-[11px] text-ink-500">Regular operations, FY2024</p>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <p className="text-lg font-extrabold tracking-tight text-ink-950">{percent(operatingLocalShare)}</p>
                <p className="mt-1 text-xs font-semibold text-ink-700">From local sources</p>
                <p className="mt-0.5 text-[11px] text-ink-500">{formatPeso(fiscal2024.totalLocalSources)}</p>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <p className="text-lg font-extrabold tracking-tight text-ink-950">{formatPeso(fiscal2024.nta)}</p>
                <p className="mt-1 text-xs font-semibold text-ink-700">National Tax Allotment</p>
                <p className="mt-0.5 text-[11px] text-ink-500">{percent(fiscal2024.nta / fiscal2024.totalIncome)} of income</p>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <p className="text-lg font-extrabold tracking-tight text-ink-950">
                  {formatPeso(fiscal2024.netOperatingIncome)}
                </p>
                <p className="mt-1 text-xs font-semibold text-ink-700">Net operating income</p>
                <p className="mt-0.5 text-[11px] text-ink-500">
                  After {formatPeso(fiscal2024.totalOperatingExpenditures)} in operating spending
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs font-semibold text-ink-600">
                <span>Local sources {percent(operatingLocalShare)}</span>
                <span>National transfers {percent(nationalShare)}</span>
              </div>
              <div className="mt-2 flex h-3 overflow-hidden rounded-full bg-surface" aria-hidden="true">
                <div className="h-full bg-brand-600" style={{ width: `${operatingLocalShare * 100}%` }} />
                <div className="h-full bg-ink-800" style={{ width: `${nationalShare * 100}%` }} />
              </div>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {revenueSources2024.map((source) => {
                const share = source.amount / fiscal2024.totalIncome
                const isLocal = source.key === 'tax' || source.key === 'nonTax'
                return (
                  <div key={source.key} className="grid grid-cols-2 gap-x-3 text-sm">
                    <dt className="font-semibold text-ink-700">{source.label}</dt>
                    <dd className="text-right font-extrabold tabular-nums text-ink-950">
                      {formatPeso(source.amount)}{' '}
                      <span className="text-xs font-semibold text-ink-500">{percent(share)}</span>
                    </dd>
                    <dd
                      className="col-span-2 mt-1.5 h-1.5 overflow-hidden rounded-full bg-surface"
                      aria-hidden="true"
                    >
                      <span
                        className={`block h-full rounded-full ${isLocal ? 'bg-brand-600' : 'bg-ink-700'}`}
                        style={{ width: `${share * 100}%` }}
                      />
                    </dd>
                  </div>
                )
              })}
            </dl>

            <div className="mt-6 grid gap-3 border-t border-line pt-5 sm:grid-cols-2">
              <div className="rounded-xl bg-surface p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-500">Special Education Fund</p>
                <p className="mt-1 text-lg font-extrabold tracking-tight text-ink-950">
                  {formatPeso(fiscal2024.specialEducationFund)}
                </p>
                <p className="mt-0.5 text-xs leading-5 text-ink-600">
                  Real property tax collections for schools, FY2024.
                </p>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-500">
                  Local Disaster Risk Reduction and Management Fund
                </p>
                <p className="mt-1 text-lg font-extrabold tracking-tight text-ink-950">
                  {formatPeso(fiscal2024.disasterFund.appropriation)}
                </p>
                <p className="mt-0.5 text-xs leading-5 text-ink-600">
                  {formatPeso(fiscal2024.disasterFund.spent)} spent, or {percent(disasterUse)} of the appropriation.
                </p>
              </div>
            </div>

            <p className="mt-5 text-xs leading-5 text-ink-500">
              BLGF reports on an operating basis. The city&apos;s own figures above use the Statement of Receipts and
              Expenditures, so definitions can differ slightly.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.1}>
          <section className="mt-4 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Regional context</p>
                <h2 className="mt-2 text-xl font-extrabold tracking-tight text-ink-950">
                  How San Fernando compares
                </h2>
              </div>
              <p className="text-xs font-semibold text-ink-500">Nine cities in Ilocos Region</p>
            </div>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-ink-600">
              Own-source share is the portion of regular income that comes from local taxes, fees, and charges rather
              than national transfers. This table uses Annual Regular Income, a narrower base than the operating-income
              total above.
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl bg-surface p-4">
                <p className="text-lg font-extrabold tracking-tight text-ink-950">
                  {percent(sfOwnSourceShare)}
                </p>
                <p className="mt-1 text-xs font-semibold text-ink-700">San Fernando own-source share</p>
                <p className="mt-0.5 text-[11px] text-ink-500">Regional median {percent(medianOwnSourceShare)}</p>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <p className="text-lg font-extrabold tracking-tight text-ink-950">
                  {percent(sfNtaShare)}
                </p>
                <p className="mt-1 text-xs font-semibold text-ink-700">National Tax Allotment reliance</p>
                <p className="mt-0.5 text-[11px] text-ink-500">Share of regular income</p>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <p className="text-lg font-extrabold tracking-tight text-ink-950">
                  {formatPeso(sfLocalSources)}
                </p>
                <p className="mt-1 text-xs font-semibold text-ink-700">Local-source revenue</p>
                <p className="mt-0.5 text-[11px] text-ink-500">Fourth among the nine cities</p>
              </div>
            </div>

            <p className="mb-2 text-xs text-ink-600 sm:hidden">Swipe the table horizontally to view all columns.</p>
            <div
              role="region"
              aria-label="Annual budget summary"
              tabIndex={0}
              className="mt-5 overflow-x-auto rounded-xl border border-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              <table className="w-full min-w-[680px] text-left text-sm">
                <caption className="sr-only">
                  FY2024 own-source revenue shares for cities in the Ilocos Region
                </caption>
                <thead className="bg-surface text-[11px] font-bold uppercase tracking-[0.1em] text-ink-500">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      City
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Province
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      Local-source revenue
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      Own-source share
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      NTA share
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {cityPeers.map((peer) => {
                    const isSanFernando = peer.name === 'San Fernando' && peer.province === 'La Union'
                    return (
                      <tr key={`${peer.province}-${peer.name}`} className={isSanFernando ? 'bg-brand-50' : undefined}>
                        <th scope="row" className="px-4 py-3 font-semibold text-ink-950">
                          {peer.name}
                          {isSanFernando ? (
                            <span className="ml-2 rounded-full bg-brand-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                              This city
                            </span>
                          ) : null}
                        </th>
                        <td className="px-4 py-3 text-ink-600">{peer.province}</td>
                        <td className="px-4 py-3 text-right font-semibold tabular-nums text-ink-800">
                          {formatPeso(peer.localSources)}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-ink-700">
                          {percent(peer.ownSourceShare)}
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums text-ink-700">{percent(peer.ntaShare)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs leading-5 text-ink-500">
              Shares follow BLGF&apos;s regular-income categories. Large one-off national shares can make a city&apos;s
              percentage look unusual.
            </p>
          </section>
        </Reveal>

        <div className="mt-4">
          <SourceNote
            href={fiscalSourceUrl}
            linkLabel="BLGF local fiscal data on data.bettergov.ph"
          >
            FY2024 figures from the Bureau of Local Government Finance (BLGF) are preliminary and cover the city
            government on its operating basis. The regional table compares the nine cities of Ilocos Region.
          </SourceNote>
        </div>

        <div className="mt-12 space-y-12">
          {categories.map((category) => {
            const docs = budgetDocsOnly.filter((doc) => doc.category === category)
            if (!docs.length) return null

            return (
              <section key={category}>
                <Reveal>
                  <SectionHeading
                    eyebrow={`${docs.length} ${docs.length === 1 ? 'document' : 'documents'}`}
                    title={category}
                  />
                </Reveal>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {docs.map((doc) => (
                    <DocCard key={doc.url} doc={doc} />
                  ))}
                </div>
              </section>
            )
          })}
        </div>

        <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-line bg-surface p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-base font-extrabold text-ink-950">Looking for bids and contracts?</h2>
            <p className="mt-1 text-sm leading-6 text-ink-600">
              Procurement plans, bid results, and project status are in the procurement collection.
            </p>
          </div>
          <Link
            to="/transparency/procurement"
            viewTransition
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
          >
            Procurement
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="mt-8">
          <SourceNote href="https://www.sanfernandocity.gov.ph/full-disclosure-policy/" linkLabel="Full Disclosure Policy">
            Documents open on the official city website or its linked file storage. Figures are for 2024 unless
            otherwise noted. Data last verified on {formatDate(city.lastVerified)}.
          </SourceNote>
        </div>
      </div>
    </>
  )
}
