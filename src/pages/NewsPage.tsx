import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { NewsCard } from '../components/NewsCard'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { city } from '../data/city'
import { news, newsLastVerified } from '../data/news'
import { useLanguage } from '../i18n/language'
import { formatDate, formatNumber } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

export function NewsPage() {
  const { translate } = useLanguage()
  usePageMeta(
    'News',
    'Recent announcements from the City Government of San Fernando, La Union, with links to the official source.',
  )

  return (
    <>
      <PageHero
        eyebrow="From City Hall"
        title="News and updates"
        description="Recent announcements from the City Government of San Fernando. Every story links to the official city website."
        crumbs={[{ label: 'News' }]}
      />

      <section>
        <div className="container-page py-12 sm:py-16">
          <div className="mb-7">
            <SectionHeading eyebrow="Latest updates" title="Recent city stories" />
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, 6).map((item, index) => (
              <Reveal key={item.slug} delay={(index % 3) * 0.05} className="h-full">
                <NewsCard item={item} />
              </Reveal>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-white p-5 shadow-card">
            <div>
              <p className="text-sm font-extrabold text-ink-950">{translate('Looking for an older update?')}</p>
              <p className="mt-0.5 text-sm text-ink-600">{formatNumber(news.length)} {translate('recent city stories in the archive.')}</p>
            </div>
            <Link
              to="/news/archive"
              viewTransition
              className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
            >
              {translate('Open the news archive')}
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="mt-10">
          <SourceNote href={city.website} linkLabel={translate('Visit the official city website')}>
            {translate('News summaries and images are from the city. Open its official site for full stories. Last checked')} {formatDate(newsLastVerified)}.
            </SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
