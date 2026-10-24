import { Search, X } from 'lucide-react'
import { useState } from 'react'
import { LocalizedText } from '../i18n/LocalizedText'
import { EmptyState } from '../components/EmptyState'
import { OfficeCard } from '../components/OfficeCard'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { city } from '../data/city'
import { offices } from '../data/offices'
import { useLanguage } from '../i18n/language'
import { normalize } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

export function OfficesPage() {
  const { translate } = useLanguage()
  usePageMeta(
    'City offices',
    'Browse all 38 city offices and departments of San Fernando, La Union, with contacts, service counts, and links to the Citizens’ Charter.',
  )

  const [query, setQuery] = useState('')
  const normalizedQuery = normalize(query)
  const filtered = offices.filter((office) => {
    if (!normalizedQuery) return true
    return [office.name, office.sector, office.head, office.code ?? ''].some((value) =>
      normalize(value).includes(normalizedQuery),
    )
  })
  const sectors = Array.from(new Set(offices.map((office) => office.sector)))
  const grouped = sectors
    .map((sector) => ({
      sector,
      items: filtered.filter((office) => office.sector === sector),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <>
      <PageHero
        eyebrow="City offices"
        title="Departments and offices"
        description="38 offices and departments organized into 12 sectors. Find the office that handles your transaction, then open its contact details and services."
        crumbs={[{ label: 'Government', href: '/government' }, { label: 'Offices' }]}
      >
        <div className="max-w-md">
          <label htmlFor="office-search" className="sr-only">
            {translate('Search offices')}
          </label>
          <div className="flex items-center gap-2 rounded-2xl border border-line bg-white p-1.5 shadow-float focus-within:ring-2 focus-within:ring-brand-300">
            <Search aria-hidden="true" className="ml-2 size-5 shrink-0 text-ink-400" />
            <input
              id="office-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={translate('Search by office, sector, or head…')}
              className="min-w-0 flex-1 bg-transparent py-2 text-base text-ink-900 outline-none placeholder:text-ink-400"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={translate('Clear office search')}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-ink-600 transition hover:bg-surface hover:text-ink-700"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            ) : null}
          </div>
        </div>
      </PageHero>

      <section>
        <div className="container-page py-12 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow={translate('Directory')}
              title={translate(normalizedQuery ? 'Search results' : 'Browse by sector')}
              description={
                normalizedQuery
                  ? translate('Showing filtered office results')
                  : translate('Offices are grouped the way the city government organizes its work.')
              }
            />
            {normalizedQuery ? (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
              >
                {translate('Clear search')}
              </button>
            ) : null}
          </div>

          {grouped.length ? (
            <div className="mt-9 space-y-12">
              {grouped.map((group) => (
                <div key={group.sector}>
                  <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                    <h2 className="text-lg font-extrabold tracking-tight text-ink-950"><LocalizedText text={group.sector} /></h2>
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400">
                      {group.items.length} {translate(group.items.length === 1 ? 'office' : 'offices')}
                    </span>
                  </div>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {group.items.map((office) => (
                      <OfficeCard key={office.slug} office={office} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8">
              <EmptyState
                title="No offices found"
                description={translate('Try a different office name, sector, or department head.')}
                action={
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
                  >
                    {translate('Show all offices')}
                  </button>
                }
              />
            </div>
          )}

          <div className="mt-10">
            <SourceNote href={city.website} linkLabel={translate('View the official department directory')}>
              {translate('Official city directories list these offices and contacts. Service counts follow the Citizens’ Charter; check the source for updates before visiting.')}
            </SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
