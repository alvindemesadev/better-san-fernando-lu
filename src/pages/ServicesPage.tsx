import { ArrowRight, ArrowUpRight, ChevronDown, MonitorSmartphone, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CategoryCard } from '../components/CategoryCard'
import { CustomSelect } from '../components/CustomSelect'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SearchBox } from '../components/SearchBox'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { categories } from '../data/categories'
import { city } from '../data/city'
import { offices } from '../data/offices'
import { onlineServiceSlugs } from '../data/onlineServices'
import { services } from '../data/services'
import { usePageMeta } from '../lib/usePageMeta'

const scenarios = [
  { label: 'Opening a business', href: '/search?q=business%20permit' },
  { label: 'Getting a birth certificate', href: '/search?q=birth%20certificate' },
  { label: 'Getting married', href: '/search?q=marriage' },
  { label: 'Building or renovating', href: '/search?q=building%20permit' },
  { label: 'Asking for financial help', href: '/search?q=financial%20assistance' },
  { label: 'Paying property tax', href: '/search?q=real%20property%20tax' },
]

const officeOptions = offices
  .filter((office) => office.code)
  .sort((a, b) => a.name.localeCompare(b.name))

const channelOptions = [
  { value: 'G2C', label: 'Government to citizen (G2C)' },
  { value: 'G2B', label: 'Government to business (G2B)' },
  { value: 'G2G', label: 'Government to government (G2G)' },
]

export function ServicesPage() {
  const [officeCode, setOfficeCode] = useState('')
  const [channel, setChannel] = useState('')
  const [onlineOnly, setOnlineOnly] = useState(false)

  const hasFilters = Boolean(officeCode || channel || onlineOnly)
  const filteredServices = useMemo(
    () =>
      services.filter((service) => {
        if (officeCode && service.officeCode !== officeCode) return false
        if (channel && !service.transactionType.includes(channel)) return false
        if (onlineOnly && !onlineServiceSlugs.includes(service.slug)) return false
        return true
      }),
    [officeCode, channel, onlineOnly],
  )

  function clearFilters() {
    setOfficeCode('')
    setChannel('')
    setOnlineOnly(false)
  }

  usePageMeta(
    'City services',
    `Browse all ${services.length} city services from the San Fernando Citizens’ Charter, grouped by category with requirements, fees, and official forms.`,
    { path: '/services' },
  )

  return (
    <>
      <PageHero
        eyebrow="City services"
        title="Every city service, in one place"
        description="242 services from the official Citizens’ Charter, grouped into 12 practical categories. Open a service for requirements, fees, forms, and the office that handles it."
        crumbs={[{ label: 'Services' }]}
        overflowVisible
      >
        <div className="max-w-2xl">
          <SearchBox large placeholder="Search services, offices, barangays…" />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-400">Common situations</span>
            {scenarios.map((scenario) => (
              <Link
                key={scenario.href}
                to={scenario.href}
                viewTransition
                className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
              >
                {scenario.label}
              </Link>
            ))}
          </div>
        </div>
      </PageHero>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Browse by category"
              title="What do you need help with?"
              description="Start with the category that matches your transaction, then choose the exact service."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Reveal key={category.slug} delay={(index % 3) * 0.05} className="h-full">
                <CategoryCard category={category} count={category.serviceCount} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink-950 text-white">
        <div className="container-page flex flex-col gap-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-300">
              <MonitorSmartphone aria-hidden="true" className="size-5" />
            </span>
            <div>
              <h2 className="text-base font-extrabold tracking-tight">Some services can be done online</h2>
              <p className="mt-1 text-sm text-white/60">
                Business permits, cedula, work permits, jobs, and records have official city portals.
              </p>
            </div>
          </div>
          <Link
            to="/online-services"
            viewTransition
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/15"
          >
            Open online services
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <section className="border-b border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Full directory"
              title="All 242 services"
              description="Filter the directory by office, transaction type, or online availability, then expand a category."
            />
          </Reveal>

          <div className="mt-8 rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex min-w-[15rem] flex-1 flex-col gap-1.5">
                <label
                  htmlFor="office-filter"
                  className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500"
                >
                  Office
                </label>
                <CustomSelect
                  id="office-filter"
                  label="Office"
                  value={officeCode}
                  options={[
                    { value: '', label: 'All offices' },
                    ...officeOptions.map((office) => ({ value: office.code ?? '', label: office.name })),
                  ]}
                  onChange={setOfficeCode}
                />
              </div>

              <div className="flex min-w-[13rem] flex-1 flex-col gap-1.5">
                <label
                  htmlFor="channel-filter"
                  className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500"
                >
                  Transaction type
                </label>
                <CustomSelect
                  id="channel-filter"
                  label="Transaction type"
                  value={channel}
                  options={[
                    { value: '', label: 'All transaction types' },
                    ...channelOptions,
                  ]}
                  onChange={setChannel}
                />
              </div>

              <label className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-white px-3.5 text-sm font-semibold text-ink-700">
                <input
                  type="checkbox"
                  checked={onlineOnly}
                  onChange={(event) => setOnlineOnly(event.target.checked)}
                  className="size-4 accent-brand-700"
                />
                Online available
              </label>

              {hasFilters ? (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-line bg-white px-3.5 text-sm font-bold text-ink-600 transition hover:border-brand-200 hover:text-brand-700"
                >
                  Clear
                </button>
              ) : null}
            </div>
            <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500" role="status">
              <SlidersHorizontal aria-hidden="true" className="size-3.5" />
              {filteredServices.length} of {services.length} services shown
            </p>
          </div>

          {filteredServices.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-line bg-white p-8 text-center">
              <p className="text-sm font-bold text-ink-800">No services match these filters.</p>
              <p className="mt-1 text-sm text-ink-500">Try a different office or transaction type.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {categories.map((category) => {
                const items = filteredServices
                  .filter((service) => service.category === category.slug)
                  .sort((a, b) => a.title.localeCompare(b.title))

                if (!items.length) return null

                return (
                  <details key={category.slug} className="group rounded-2xl border border-line bg-white shadow-card">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-ink-950">{category.name}</h3>
                        <p className="mt-0.5 text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
                          {items.length} {items.length === 1 ? 'service' : 'services'}
                        </p>
                      </div>
                      <span className="flex shrink-0 items-center gap-2 text-xs font-bold text-brand-700">
                        Open
                        <ChevronDown
                          aria-hidden="true"
                          className="size-4 transition duration-200 group-open:rotate-180"
                        />
                      </span>
                    </summary>
                    <div className="border-t border-line p-3 sm:p-4">
                      <div className="grid gap-1 sm:grid-cols-2">
                        {items.map((service) => (
                          <Link
                            key={service.slug}
                            to={`/services/${category.slug}/${service.slug}`}
                            viewTransition
                            className="group/link flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm text-ink-700 transition hover:bg-surface hover:text-brand-700"
                          >
                            <span className="line-clamp-2">{service.title}</span>
                            <ArrowUpRight
                              aria-hidden="true"
                              className="size-3.5 shrink-0 text-ink-400 transition group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-brand-700"
                            />
                          </Link>
                        ))}
                      </div>
                      <div className="mt-2 px-3 pb-2">
                        <Link
                          to={`/services/${category.slug}`}
                          viewTransition
                          className="text-xs font-bold text-brand-700 hover:text-brand-800"
                        >
                          View {category.shortName} category
                        </Link>
                      </div>
                    </div>
                  </details>
                )
              })}
            </div>
          )}

          <div className="mt-8">
            <SourceNote href={city.citizensCharter} linkLabel="Open the official Citizens’ Charter">
              Service details are summarized from the City Government’s Citizens’ Charter. Requirements, fees, and
              processing times can change. Confirm with the issuing office before your visit; each service record has
              its own verification date.
            </SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
