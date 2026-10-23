import { ExternalLink, FileText, Landmark, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { CustomSelect } from '../components/CustomSelect'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { StatCard } from '../components/StatCard'
import {
  legislation,
  legislationSourceUrl,
  legislationSources,
  type LegislationItem,
} from '../data/legislation'
import { formatNumber, normalize, pluralize } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

const kinds = ['All records', 'Ordinance', 'Executive Order', 'Proposed Ordinance']

const statusStyles: Record<string, string> = {
  Enacted: 'bg-emerald-50 text-emerald-700',
  Issued: 'bg-brand-50 text-brand-700',
  Proposed: 'bg-amber-50 text-amber-700',
}

const kindLabels: Record<string, string> = {
  Ordinance: 'Ordinance',
  'Executive Order': 'Executive order',
  'Proposed Ordinance': 'Proposed ordinance',
}

function LegislationCard({ item }: { item: LegislationItem }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] ${statusStyles[item.status]}`}>
          {item.status}
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-400">{kindLabels[item.kind]}</span>
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-brand-700">{item.number}</p>
      <h3 className="mt-1 text-lg font-extrabold leading-snug tracking-tight text-ink-950">{item.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">{item.summary}</p>
      <a
        href={item.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-5 inline-flex items-center gap-2 border-t border-line pt-4 text-sm font-bold text-brand-700 transition hover:text-brand-800"
      >
        {item.status === 'Proposed' ? 'Read the proposal' : 'Open the official copy'}
        <ExternalLink aria-hidden="true" className="size-4" />
      </a>
    </article>
  )
}

export function LegislationPage() {
  usePageMeta(
    'Ordinances and executive orders',
    'Recent ordinances, resolutions, and executive orders from the San Fernando City Government and Sangguniang Panlungsod, with links to official copies.',
  )

  const [query, setQuery] = useState('')
  const [kind, setKind] = useState('All records')
  const normalizedQuery = normalize(query)
  const filtered = useMemo(
    () =>
      legislation.filter((item) => {
        if (kind !== 'All records' && item.kind !== kind) return false
        if (!normalizedQuery) return true
        return [item.number, item.title, item.summary, item.kind, String(item.year)].some((value) =>
          normalize(value).includes(normalizedQuery),
        )
      }),
    [kind, normalizedQuery],
  )
  const years = Array.from(new Set(filtered.map((item) => item.year))).sort((a, b) => b - a)
  const enacted = legislation.filter((item) => item.status === 'Enacted').length
  const issued = legislation.filter((item) => item.status === 'Issued').length
  const proposed = legislation.filter((item) => item.status === 'Proposed').length
  const hasFilters = Boolean(query) || kind !== 'All records'

  function resetFilters() {
    setQuery('')
    setKind('All records')
  }

  return (
    <>
      <PageHero
        eyebrow="Government"
        title="Ordinances and executive orders"
        description="The most recent city laws, proposals, and mayoral orders we could verify, linked to the Sangguniang Panlungsod and the city government."
        crumbs={[
          { label: 'Government', href: '/government' },
          { label: 'Legislation' },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <a
            href={legislationSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-brand-800"
          >
            SP ordinance index
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
          <Link
            to="/government/officials"
            viewTransition
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-xs font-bold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
          >
            City officials
          </Link>
        </div>
      </PageHero>

      <section>
        <div className="container-page py-10 sm:py-14">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard value={formatNumber(legislation.length)} label="Recent records" note="2025–2026 sample · executive orders checked Oct 23, 2026" />
              <StatCard value={formatNumber(enacted)} label="Enacted ordinances" note="Official copies linked" />
              <StatCard value={formatNumber(issued)} label="Executive orders" note="Issued by the City Mayor" />
              <StatCard value={formatNumber(proposed)} label="Proposed ordinance" note="Still before the SP" />
            </div>
          </Reveal>

          <div className="mt-12">
            <Reveal>
              <SectionHeading
                eyebrow="Legislative record"
                title="Recent laws and orders"
                description="This is a verified recent sample, not the complete ordinance archive. The Sangguniang Panlungsod index and the city archives hold the full record."
              />
            </Reveal>

            <div className="mt-6 grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-card sm:grid-cols-[1.6fr_1fr]">
              <label className="relative block">
                <span className="sr-only">Search legislation</span>
                <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search by number, title, or year?"
                  className="w-full rounded-xl border border-line bg-surface py-2.5 pl-9 pr-9 text-sm text-ink-900 outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
                />
                {query ? (
                  <button type="button" onClick={() => setQuery('')} aria-label="Clear legislation search" className="absolute right-1 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-lg text-ink-600 hover:bg-white hover:text-ink-700">
                    <X aria-hidden="true" className="size-4" />
                  </button>
                ) : null}
              </label>
              <CustomSelect
                ariaLabel="Filter by record type"
                value={kind}
                options={kinds.map((item) => ({ value: item, label: item }))}
                onChange={setKind}
              />
            </div>

            {filtered.length ? (
              <div className="mt-8 space-y-10">
                {years.map((year) => {
                  const items = filtered.filter((item) => item.year === year)
                  return (
                    <section key={year}>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-extrabold tracking-tight text-ink-950">{year}</h3>
                        <span className="h-px flex-1 bg-line" />
                        <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink-400">{pluralize(items.length, 'record')}</span>
                      </div>
                      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {items.map((item) => <LegislationCard key={item.id} item={item} />)}
                      </div>
                    </section>
                  )
                })}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-line bg-white p-8 text-center shadow-card">
                <h3 className="text-lg font-extrabold text-ink-950">No records match this search</h3>
                <p className="mt-2 text-sm text-ink-600">Try a different number, title, year, or record type.</p>
                {hasFilters ? (
                  <button type="button" onClick={resetFilters} className="mt-4 rounded-xl bg-brand-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-800">
                    Clear filters
                  </button>
                ) : null}
              </div>
            )}
          </div>

          <section className="mt-14 border-t border-line pt-10">
            <Reveal>
              <SectionHeading
                eyebrow="Where to look"
                title="Legislative sources"
                description="Use these official pages for the complete record, including older ordinances and regular session resolutions."
              />
            </Reveal>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {legislationSources.map((source) => (
                <a
                  key={source.href}
                  href={source.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    {source.label === 'Executive orders' ? <Landmark aria-hidden="true" className="size-5" /> : <FileText aria-hidden="true" className="size-5" />}
                  </span>
                  <h3 className="mt-4 inline-flex items-center gap-2 text-base font-extrabold text-ink-950 group-hover:text-brand-700">
                    {source.label}
                    <ExternalLink aria-hidden="true" className="size-3.5 text-ink-400 group-hover:text-brand-700" />
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-ink-600">{source.coverage}</p>
                </a>
              ))}
            </div>
          </section>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <SourceNote href={legislationSourceUrl} linkLabel="Sangguniang Panlungsod ordinances">
              This page lists recent records with official copies where available. It is not a substitute for the
              official ordinance archive or the published minutes of the Sangguniang Panlungsod.
            </SourceNote>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <h2 className="text-sm font-bold text-ink-950">How laws move through the city</h2>
              <p className="mt-2 text-sm leading-6 text-ink-600">
                City ordinances are enacted by the Sangguniang Panlungsod, reviewed under national law, and published
                by the city. Executive orders are issued by the City Mayor. Proposed ordinances remain drafts until
                the council acts.
              </p>
              <Link to="/contact" viewTransition className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800">
                Ask for a public record
                <ExternalLink aria-hidden="true" className="size-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
