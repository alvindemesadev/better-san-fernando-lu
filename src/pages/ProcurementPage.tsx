import { ArrowRight, Building2, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DocCard } from '../components/DocCard'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { bidBulletins, bidResults } from '../data/bidDocs'
import { budgetDocs } from '../data/budgetDocs'
import { dpwhSanFernando, dpwhSourceUrl, philgepsSanFernando, philgepsSourceUrl } from '../data/contracts'
import { city } from '../data/city'
import { formatDate, formatNumber, formatPeso } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

export function ProcurementPage() {
  usePageMeta(
    'Procurement and bids',
    'San Fernando, La Union procurement documents: 2026 bid invitations, 2025 bid results, procurement plans, and infrastructure project status.',
  )

  const docs = budgetDocs.filter((doc) => doc.category === 'Procurement')
  const maxDpwhYear = Math.max(...dpwhSanFernando.recentYears.map((year) => year.amount))
  const completedShare = dpwhSanFernando.completed / dpwhSanFernando.totalProjects
  const percent = (value: number) => `${(value * 100).toFixed(1)}%`
  const topAwardeeShare =
    philgepsSanFernando.topAwardees.reduce((total, awardee) => total + awardee.amount, 0) /
    philgepsSanFernando.totalAmount

  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Procurement and bids"
        description="What the city plans to buy, who wins the contracts, and how infrastructure projects are progressing. Links open official city documents or the city’s linked files."
        crumbs={[{ label: 'Transparency', href: '/transparency' }, { label: 'Procurement' }]}
      />

      <div className="container-page py-10 sm:py-14">
        <Reveal>
          <SectionHeading
            eyebrow={`${docs.length} documents`}
            title="Bids, contracts, and projects"
            description="The official city index includes 2026 invitations and notices; the latest posted bid-result records found are for 2025."
          />
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {docs.map((doc) => (
            <DocCard key={doc.url} doc={doc} />
          ))}
        </div>

        <section className="mt-14 border-t border-line pt-10">
          <Reveal>
            <SectionHeading
              eyebrow={`${bidResults.length} recent results`}
              title="Latest bid results (2025)"
              description="Award results published by the city. Rows without a project title link to the official result file."
              action={
                <a
                  href="https://www.sanfernandocity.gov.ph/bid-docs-2025/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                >
                  Older results and files
                  <ExternalLink aria-hidden="true" className="size-4" />
                </a>
              }
            />
          </Reveal>

          <p className="mb-2 text-xs text-ink-600 sm:hidden">Swipe the table horizontally to view all columns.</p>
          <div
            role="region"
            aria-label="City bid results"
            tabIndex={0}
            className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            <table className="min-w-[720px] w-full text-left text-sm">
              <caption className="sr-only">Recent 2025 bid results published by the City Government of San Fernando</caption>
              <thead className="bg-surface text-[11px] font-bold uppercase tracking-[0.1em] text-ink-500">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Reference
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Project
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {bidResults.map((result) => (
                  <tr key={result.url} className="transition hover:bg-surface">
                    <td className="whitespace-nowrap px-4 py-3 tabular-nums text-ink-600">
                      {formatDate(result.date)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-bold text-ink-950">{result.reference}</td>
                    <td className="px-4 py-3">
                      <a
                        href={result.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-start gap-2 font-semibold leading-6 text-brand-700 hover:text-brand-800"
                      >
                        {result.title}
                        <ExternalLink aria-hidden="true" className="mt-1 size-3.5 shrink-0" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10">
            <h3 className="text-lg font-extrabold tracking-tight text-ink-950">Bid bulletins and supplements</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {bidBulletins.map((bulletin) => (
                <li key={bulletin.url}>
                  <a
                    href={bulletin.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 text-sm font-semibold text-ink-800 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700 hover:shadow-float"
                  >
                    {bulletin.label}
                    <ExternalLink
                      aria-hidden="true"
                      className="size-3.5 shrink-0 text-ink-400 transition group-hover:text-brand-700"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14 border-t border-line pt-10">
          <Reveal>
            <SectionHeading
              eyebrow="National contract data"
              title="Projects and awards linked to San Fernando"
              description="DPWH infrastructure records and PhilGEPS awards supplement the city’s own procurement documents. These are contract values, not payments."
            />
          </Reveal>

          <div className="mt-6 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">DPWH</p>
                  <h3 className="mt-1 text-xl font-extrabold tracking-tight text-ink-950">Infrastructure contracts</h3>
                  <p className="mt-1 text-xs leading-5 text-ink-500">
                    2016–2025 · contract-level records tagged to San Fernando
                  </p>
                </div>
                <a
                  href={dpwhSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-800"
                >
                  Dataset
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                </a>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-2">
                <div className="rounded-xl bg-surface p-3">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-500">Projects</dt>
                  <dd className="mt-1 text-lg font-extrabold tabular-nums text-ink-950">
                    {formatNumber(dpwhSanFernando.totalProjects)}
                  </dd>
                </div>
                <div className="rounded-xl bg-surface p-3">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-500">Completed</dt>
                  <dd className="mt-1 text-lg font-extrabold tabular-nums text-ink-950">{percent(completedShare)}</dd>
                </div>
                <div className="col-span-2 flex flex-wrap items-baseline justify-between gap-2 rounded-xl bg-surface p-3">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-ink-500">Contract value</dt>
                  <dd className="text-base font-extrabold tabular-nums leading-5 text-ink-950">
                    {formatPeso(dpwhSanFernando.totalBudget)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-500">Recent contract budgets</p>
                  <p className="text-[11px] font-semibold text-ink-500">2021–2025</p>
                </div>
                <div
                  className="mt-3 flex h-28 items-end gap-2 border-b border-line"
                  role="img"
                  aria-label="DPWH contract budgets tagged to San Fernando by year, 2021 to 2025"
                >
                  {dpwhSanFernando.recentYears.map((year) => (
                    <div key={year.year} className="flex h-full flex-1 flex-col justify-end">
                      <div
                        className="rounded-t-md bg-brand-600"
                        style={{ height: `${Math.max((year.amount / maxDpwhYear) * 100, 3)}%` }}
                        title={`${year.year}: ${formatPeso(year.amount)} across ${year.projects} projects`}
                      >
                        <span className="sr-only">
                          {year.year}: {formatPeso(year.amount)} across {year.projects} projects
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-2 grid grid-cols-5 gap-2 text-center text-[10px] font-bold text-ink-500">
                  {dpwhSanFernando.recentYears.map((year) => (
                    <span key={year.year}>{year.year}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t border-line pt-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-500">Largest recent projects</p>
                <ol className="mt-1 divide-y divide-line">
                  {dpwhSanFernando.largestProjects.slice(0, 3).map((project) => (
                    <li key={project.contractId} className="flex items-start justify-between gap-3 py-3">
                      <div className="min-w-0">
                        <p className="text-sm font-bold leading-5 text-ink-900">{project.title}</p>
                        <p className="mt-0.5 text-xs leading-5 text-ink-500">
                          {project.year} · {project.status} · {project.contractor}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs font-extrabold tabular-nums text-ink-950 sm:text-sm">
                        {formatPeso(project.budget)}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex h-full flex-col rounded-2xl bg-ink-950 p-5 text-white shadow-card sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-300">PhilGEPS</p>
                  <h3 className="mt-1 text-xl font-extrabold tracking-tight">Who wins city awards</h3>
                </div>
                <a
                  href={philgepsSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-300 hover:text-brand-200"
                >
                  Dataset
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                </a>
              </div>

              <dl className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/10 p-3">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/60">Awards</dt>
                  <dd className="mt-1 text-lg font-extrabold tabular-nums">{formatNumber(philgepsSanFernando.totalAwards)}</dd>
                </div>
                <div className="rounded-xl bg-white/10 p-3">
                  <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/60">Award value</dt>
                  <dd className="mt-1 text-[11px] font-extrabold leading-4 sm:text-sm sm:leading-5">
                    {formatPeso(philgepsSanFernando.totalAmount)}
                  </dd>
                </div>
              </dl>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.12em] text-white/60">Top awardees, 2016–2025</p>
              <ol className="mt-2 divide-y divide-white/10">
                {philgepsSanFernando.topAwardees.map((awardee, index) => (
                  <li key={awardee.name} className="flex items-start justify-between gap-3 py-3">
                    <div className="flex min-w-0 items-start gap-2.5">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-bold leading-5">{awardee.name}</p>
                        <p className="mt-0.5 text-xs text-white/60">{awardee.awards} awards</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-extrabold tabular-nums text-brand-200">
                      {formatPeso(awardee.amount)}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-2 text-[11px] leading-5 text-white/60">
                These five awardees account for {percent(topAwardeeShare)} of total award value.
              </p>

              <div className="mt-auto rounded-xl border border-white/10 bg-white/5 p-3 pt-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/60">Largest single award</p>
                <p className="mt-1 text-sm font-bold leading-5">{philgepsSanFernando.topAward.title}</p>
                <p className="mt-1 text-xs text-white/60">
                  {philgepsSanFernando.topAward.awardee} · {philgepsSanFernando.topAward.year} ·{' '}
                  {formatPeso(philgepsSanFernando.topAward.amount)}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <SourceNote href={dpwhSourceUrl} linkLabel="DPWH infrastructure data on data.bettergov.ph">
              DPWH projects are matched by the city named in the project description; engineering-district boundaries
              mean some road projects may extend beyond the city. PhilGEPS records are awards, not payments, and use the
              city government’s registered organization name.
            </SourceNote>
          </div>
        </section>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
            <Building2 aria-hidden="true" className="size-5 text-brand-700" />
            <h2 className="mt-3 text-lg font-extrabold tracking-tight text-ink-950">Who handles procurement?</h2>
            <p className="mt-2 text-sm leading-6 text-ink-600">
              The Bids and Awards Committee reviews and evaluates bids for city goods, works, and services.
            </p>
            <Link
              to="/government/offices/bids-and-awards-committee"
              viewTransition
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800"
            >
              Bids and Awards Committee
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="rounded-2xl border border-line bg-ink-950 p-5 text-white shadow-card sm:p-6">
            <h2 className="text-lg font-extrabold tracking-tight">The full disclosure portal</h2>
            <p className="mt-2 text-sm leading-6 text-white/60">
              More budget, procurement, and accountability documents are published on the city’s Full Disclosure
              Policy page.
            </p>
            <a
              href="https://www.sanfernandocity.gov.ph/full-disclosure-policy/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/15"
            >
              Open the disclosure portal
              <ArrowRight aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </div>

        <div className="mt-8">
          <SourceNote href={city.website} linkLabel="Visit the official city website">
              The city currently lists 2026 invitations and notices. The local bid-results table contains the latest
              result records we found, from 2025; the DPWH and PhilGEPS snapshots cover 2016–2025. Source pages and
              dataset dates are linked above.
          </SourceNote>
        </div>
      </div>
    </>
  )
}
