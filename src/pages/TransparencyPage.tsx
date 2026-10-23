import { ArrowRight, Database, FileSearch, Landmark, MapPin, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { StatCard } from '../components/StatCard'
import { budgetDocs } from '../data/budgetDocs'
import { city } from '../data/city'
import { openDataSources } from '../data/openData'
import { dpwhProjects } from '../data/projects'
import { formatDate, formatPeso } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

const fundCategories = ['Budget & expenditure', 'Special funds', 'Audit & accountability']

export function TransparencyPage() {
  usePageMeta(
    'Transparency',
    'Follow public money in San Fernando, La Union: 2024 revenue and spending, budget documents, special funds, audit reports, procurement records, and open datasets.',
  )

  const procurementCount = budgetDocs.filter((doc) => doc.category === 'Procurement').length
  const budgetCount = budgetDocs.filter((doc) => fundCategories.includes(doc.category)).length

  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Follow public money"
        description="City revenue, spending, special funds, audit reports, and procurement documents — linked directly to the city’s Full Disclosure Policy portal."
        crumbs={[{ label: 'Transparency' }]}
      />

      <section>
        <div className="container-page py-12 sm:py-16">
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
              <StatCard
                value={city.povertyIncidence}
                label="Poverty incidence"
                note={`${city.povertyYear} estimate`}
              />
              <StatCard value={city.incomeClass} label="Income class" note="City classification" />
            </div>
          </Reveal>

          <div className="mt-12">
            <Reveal>
              <SectionHeading
                eyebrow="Document library"
                title="Where the money goes"
                description="Budget and procurement records are grouped into two plain-language collections. Every local link opens the official city document; national datasets are documented separately below."
              />
            </Reveal>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <Reveal>
                <Link
                  to="/transparency/budget"
                  viewTransition
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Wallet aria-hidden="true" className="size-5" />
                  </span>
                  <h2 className="mt-5 text-xl font-extrabold tracking-tight text-ink-950 group-hover:text-brand-700">
                    Budget and spending
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">
                    The Local Expenditure Program, statements of receipts and expenditures, special funds, and audit
                    reports.
                  </p>
                  <span className="mt-5 inline-flex items-center justify-between gap-3 border-t border-line pt-4 text-sm font-bold text-brand-700">
                    {budgetCount} documents
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>

              <Reveal delay={0.06}>
                <Link
                  to="/transparency/procurement"
                  viewTransition
                  className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <FileSearch aria-hidden="true" className="size-5" />
                  </span>
                  <h2 className="mt-5 text-xl font-extrabold tracking-tight text-ink-950 group-hover:text-brand-700">
                    Procurement and bids
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">
                    Annual procurement plans, quarterly bid results, bid documents, and infrastructure project
                    status.
                  </p>
                  <span className="mt-5 inline-flex items-center justify-between gap-3 border-t border-line pt-4 text-sm font-bold text-brand-700">
                    {procurementCount} documents
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition group-hover:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <Link
                to="/transparency/projects"
                viewTransition
                className="group mt-5 flex flex-col gap-4 rounded-2xl border border-line bg-white p-6 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float sm:flex-row sm:items-center"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <MapPin aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">Project tracker</p>
                  <h2 className="mt-1 text-xl font-extrabold tracking-tight text-ink-950 group-hover:text-brand-700">
                    Every DPWH project linked to the city
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-ink-600">
                    Contract values, status, contractors, barangays, and an interactive project map.
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-brand-700">
                  {dpwhProjects.length} projects
                  <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>

            <Reveal delay={0.1}>
              <Link
                to="/transparency/open-data"
                viewTransition
                className="group mt-5 flex flex-col gap-4 rounded-2xl border border-line bg-ink-950 p-6 text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-float sm:flex-row sm:items-center"
              >
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-300">
                  <Database aria-hidden="true" className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-300">Open data</p>
                  <h2 className="mt-1 text-xl font-extrabold tracking-tight">See the sources behind the numbers</h2>
                  <p className="mt-1 text-sm leading-6 text-white/60">
                    The national datasets behind the fiscal profile, barangay map, election history, and contract
                    totals, with their licenses and caveats.
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-brand-300">
                  {openDataSources.length} datasets
                  <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <Reveal>
                <SectionHeading eyebrow="What is published" title="Documents by category" />
              </Reveal>
              <div className="mt-5 divide-y divide-line rounded-2xl border border-line bg-white shadow-card">
                {fundCategories.map((category) => {
                  const count = budgetDocs.filter((doc) => doc.category === category).length
                  return (
                    <div key={category} className="flex items-center justify-between gap-4 px-5 py-4">
                      <span className="text-sm font-semibold text-ink-800">{category}</span>
                      <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink-400">
                        {count} {count === 1 ? 'document' : 'documents'}
                      </span>
                    </div>
                  )
                })}
                <div className="flex items-center justify-between gap-4 px-5 py-4">
                  <span className="text-sm font-semibold text-ink-800">Procurement</span>
                  <span className="text-xs font-bold uppercase tracking-[0.1em] text-ink-400">
                    {procurementCount} documents
                  </span>
                </div>
              </div>
            </div>

            <Reveal delay={0.06}>
              <div className="h-full rounded-2xl border border-line bg-ink-950 p-6 text-white shadow-card">
                <Landmark aria-hidden="true" className="size-6 text-brand-300" />
                <h2 className="mt-4 text-xl font-extrabold tracking-tight">The Full Disclosure Policy</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  The city publishes budget, procurement, and accountability documents under the national Full
                  Disclosure Policy.
                </p>
                <a
                  href="https://www.sanfernandocity.gov.ph/full-disclosure-policy/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/15"
                >
                  Open the disclosure portal
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            </Reveal>
          </div>

          <div className="mt-8">
            <SourceNote href={city.website} linkLabel="Visit the official city website">
              Figures are for 2024 unless otherwise noted. Budget and procurement links point to documents published
              by the City Government of San Fernando. Data last verified on {formatDate(city.lastVerified)}.
            </SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
