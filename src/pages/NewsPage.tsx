import { NewsCard } from '../components/NewsCard'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SourceNote } from '../components/SourceNote'
import { city } from '../data/city'
import { news, newsLastVerified } from '../data/news'
import { formatDate } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

export function NewsPage() {
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
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {news.map((item, index) => (
              <Reveal key={item.slug} delay={(index % 3) * 0.05} className="h-full">
                <NewsCard item={item} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10">
            <SourceNote href={city.website} linkLabel="Visit the official city website">
              News summaries and images come from the City Government of San Fernando. Read the full story on the
              official website. News last verified on {formatDate(newsLastVerified)}.
            </SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
