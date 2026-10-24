import { ArrowUpRight } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import { EmptyState } from '../components/EmptyState'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SearchBox } from '../components/SearchBox'
import { useLanguage } from '../i18n/language'
import { searchAll } from '../lib/search'
import { usePageMeta } from '../lib/usePageMeta'

const exampleSearches = ['business permit', 'birth certificate', 'barangay', 'hotlines', 'city hall']

export function SearchPage() {
  const { language, translate } = useLanguage()
  const [params] = useSearchParams()
  const query = params.get('q')?.trim() ?? ''
  const results = query ? searchAll(query, 60) : []

  usePageMeta(
    query ? `Search: ${query}` : 'Search',
    query
      ? `${results.length} ${results.length === 1 ? 'match' : 'matches'} for “${query}” across services, offices, barangays, and pages.`
      : 'Find a city service, an office, a barangay, or a page across the guide.',
  )

  return (
    <>
      <PageHero
        eyebrow="Search"
        title={query ? `Results for “${query}”` : 'Search the city guide'}
        description={
          query
            ? `${results.length} ${results.length === 1 ? 'match' : 'matches'} across services, offices, barangays, and pages.`
            : 'Find a service, an office, a barangay, or a page across the guide.'
        }
        overflowVisible
      >
        <div className="max-w-2xl">
          <SearchBox key={query} defaultValue={query} large />
        </div>
      </PageHero>

      <section className="container-page py-12 sm:py-16">
        {!query ? (
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <p lang={language} className="text-sm font-bold uppercase tracking-[0.14em] text-brand-700">{translate('Try a search')}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {exampleSearches.map((term) => (
                <Link
                  key={term}
                  to={`/search?q=${encodeURIComponent(term)}`}
                  viewTransition
                  className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
                >
                  {translate(term)}
                </Link>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <EmptyState
            title="No matches found"
            description={`We couldn't find anything for “${query}”. Try a shorter phrase or a different keyword.`}
          />
        ) : (
          <div className="grid gap-3">
            {results.map((result, index) => (
              <Reveal key={`${result.kind}-${result.href}-${result.title}`} delay={Math.min(index * 0.02, 0.24)}>
                <Link
                  to={result.href}
                  viewTransition
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
                >
                  <span className="min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-700">
                      {translate(result.kind)}
                    </span>
                    <span className="mt-1 block text-base font-bold text-ink-950 group-hover:text-brand-700">
                      {result.title}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm leading-6 text-ink-600">
                      {result.description}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-ink-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
