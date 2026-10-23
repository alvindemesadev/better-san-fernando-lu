import { ArrowRight, ExternalLink, Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CustomSelect } from '../components/CustomSelect'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { StatCard } from '../components/StatCard'
import { dpwhProjects, dpwhProjectSourceUrl } from '../data/projects'
import { formatNumber, formatPeso, normalize, pluralize } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

const statuses = ['All statuses', 'Completed', 'Ongoing', 'For procurement']
const categories = ['All categories', ...Array.from(new Set(dpwhProjects.map((project) => project.category))).sort()]
const years = ['All years', ...Array.from(new Set(dpwhProjects.map((project) => String(project.year)))).sort((a, b) => Number(b) - Number(a))]

export function ProjectsPage() {
  usePageMeta(
    'Infrastructure projects',
    'DPWH infrastructure projects linked to San Fernando, La Union: budgets, status, contractors, and published locations.',
  )

  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All statuses')
  const [category, setCategory] = useState('All categories')
  const [year, setYear] = useState('All years')
  const [visible, setVisible] = useState(30)
  const normalizedQuery = normalize(query)
  const filtered = useMemo(
    () =>
      dpwhProjects.filter((project) => {
        if (status !== 'All statuses' && project.status !== status) return false
        if (category !== 'All categories' && project.category !== category) return false
        if (year !== 'All years' && String(project.year) !== year) return false
        if (!normalizedQuery) return true
        return [project.title, project.contractId, project.contractor, project.barangay ?? '', project.category].some(
          (value) => normalize(value).includes(normalizedQuery),
        )
      }),
    [category, normalizedQuery, status, year],
  )
  const completed = dpwhProjects.filter((project) => project.status === 'Completed').length
  const totalBudget = dpwhProjects.reduce((total, project) => total + project.budget, 0)
  const shown = filtered.slice(0, visible)
  const hasFilters = Boolean(query) || status !== 'All statuses' || category !== 'All categories' || year !== 'All years'

  function resetFilters() {
    setQuery('')
    setStatus('All statuses')
    setCategory('All categories')
    setYear('All years')
    setVisible(30)
  }

  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Infrastructure projects"
        description="Every DPWH project linked to San Fernando in the national transparency dataset, with contract value, status, contractor, and project location."
        crumbs={[
          { label: 'Transparency', href: '/transparency' },
          { label: 'Procurement', href: '/transparency/procurement' },
          { label: 'Projects' },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <a
            href={dpwhProjectSourceUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-xs font-bold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
          >
            DPWH dataset
            <ExternalLink aria-hidden="true" className="size-3.5" />
          </a>
          <Link
            to="/transparency/procurement"
            viewTransition
            className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-3.5 py-2 text-xs font-bold text-white transition hover:bg-brand-800"
          >
            Procurement documents
            <ArrowRight aria-hidden="true" className="size-3.5" />
          </Link>
        </div>
      </PageHero>

      <section>
        <div className="container-page py-10 sm:py-14">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard value={formatNumber(dpwhProjects.length)} label="Projects" note="DPWH records linked to the city" />
              <StatCard value={formatPeso(totalBudget)} label="Contract value" note="Not actual payments" />
              <StatCard value={formatNumber(completed)} label="Completed" note="Based on DPWH record status" />
              <StatCard value={`${Math.round((completed / dpwhProjects.length) * 100)}%`} label="Completion rate" note="By project count" />
            </div>
          </Reveal>

          <section className="mt-14 border-t border-line pt-10">
            <Reveal>
              <SectionHeading
                eyebrow={pluralize(filtered.length, 'project')}
                title="Project register"
                description="Search by project, contract ID, contractor, or barangay. Figures are contract values, not payments."
              />
            </Reveal>

            <div className="mt-6 grid gap-3 rounded-2xl border border-line bg-white p-4 shadow-card sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr]">
              <label className="relative block">
                <span className="sr-only">Search projects</span>
                <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => { setQuery(event.target.value); setVisible(30) }}
                  placeholder="Search projects?"
                  className="w-full rounded-xl border border-line bg-surface py-2.5 pl-9 pr-12 text-sm text-ink-900 outline-none transition focus:border-brand-300 focus:ring-2 focus:ring-brand-100"
                />
                {query ? (
                  <button type="button" onClick={() => setQuery('')} aria-label="Clear project search" className="absolute right-1 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-lg text-ink-600 hover:bg-white hover:text-ink-700">
                    <X aria-hidden="true" className="size-4" />
                  </button>
                ) : null}
              </label>
              <CustomSelect
                ariaLabel="Filter by status"
                value={status}
                options={statuses.map((item) => ({ value: item, label: item }))}
                onChange={(value) => { setStatus(value); setVisible(30) }}
              />
              <CustomSelect
                ariaLabel="Filter by category"
                value={category}
                options={categories.map((item) => ({ value: item, label: item }))}
                onChange={(value) => { setCategory(value); setVisible(30) }}
              />
              <CustomSelect
                ariaLabel="Filter by year"
                value={year}
                options={years.map((item) => ({ value: item, label: item }))}
                onChange={(value) => { setYear(value); setVisible(30) }}
              />
            </div>

            {filtered.length ? (
              <>
                <p className="mb-2 text-xs text-ink-600 sm:hidden">Swipe the table horizontally to view all columns.</p>
                <div
                  role="region"
                  aria-label="DPWH infrastructure project register"
                  tabIndex={0}
                  className="mt-5 overflow-x-auto rounded-2xl border border-line bg-white shadow-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  <table className="w-full min-w-[920px] text-left text-sm">
                    <caption className="sr-only">DPWH infrastructure projects linked to San Fernando, La Union</caption>
                    <thead className="bg-surface text-[11px] font-bold uppercase tracking-[0.1em] text-ink-500">
                      <tr>
                        <th scope="col" className="px-4 py-3">Project</th>
                        <th scope="col" className="px-4 py-3">Year</th>
                        <th scope="col" className="px-4 py-3">Status</th>
                        <th scope="col" className="px-4 py-3 text-right">Contract value</th>
                        <th scope="col" className="px-4 py-3">Contractor</th>
                        <th scope="col" className="px-4 py-3">Barangay</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {shown.map((project) => (
                        <tr key={project.contractId} className="align-top transition hover:bg-surface">
                          <th scope="row" className="max-w-md px-4 py-3 font-normal">
                            <span className="block font-bold leading-5 text-ink-950">{project.title}</span>
                            <span className="mt-0.5 block text-xs font-semibold text-ink-500">{project.contractId} · {project.category}</span>
                          </th>
                          <td className="whitespace-nowrap px-4 py-3 tabular-nums text-ink-600">{project.year}</td>
                          <td className="whitespace-nowrap px-4 py-3">
                            <span className={`inline-flex rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${project.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' : project.status === 'Ongoing' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                              {project.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-right font-bold tabular-nums text-ink-950">{project.budget > 0 ? formatPeso(project.budget) : 'Not published'}</td>
                          <td className="px-4 py-3 text-ink-600">{project.contractor || 'Not yet awarded'}</td>
                          <td className="px-4 py-3 text-ink-600">{project.barangay ?? 'Not specified'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-semibold text-ink-500">Showing {formatNumber(shown.length)} of {formatNumber(filtered.length)} projects</p>
                  {visible < filtered.length ? (
                    <button type="button" onClick={() => setVisible((count) => count + 30)} className="rounded-xl border border-line bg-white px-4 py-2 text-xs font-bold text-ink-700 transition hover:border-brand-200 hover:text-brand-700">
                      Show 30 more
                    </button>
                  ) : null}
                </div>
              </>
            ) : (
              <div className="mt-5 rounded-2xl border border-line bg-white p-8 text-center shadow-card">
                <h3 className="text-lg font-extrabold text-ink-950">No projects match these filters</h3>
                <p className="mt-2 text-sm text-ink-600">Try a different search term, status, category, or year.</p>
                {hasFilters ? (
                  <button type="button" onClick={resetFilters} className="mt-4 rounded-xl bg-brand-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-800">
                    Clear filters
                  </button>
                ) : null}
              </div>
            )}
          </section>

          <div className="mt-10">
            <SourceNote href={dpwhProjectSourceUrl} linkLabel="DPWH infrastructure data on data.bettergov.ph">
              Records are matched by the city named in the DPWH project description. Engineering-district boundaries
              mean some road projects may extend beyond the city. Contract values are not payments. Three ongoing procurements do not yet have a published contract amount.
              Data is from the dataset snapshot bundled with this site.
            </SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
