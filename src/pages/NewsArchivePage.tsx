import { LocalizedText } from '../i18n/LocalizedText'
import { Link } from 'react-router-dom'
import { NewsCard } from '../components/NewsCard'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { city } from '../data/city'
import { news, newsLastVerified } from '../data/news'
import { formatDate } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

const description = `Browse all ${news.length} news stories currently tracked by this guide, with links to the official source.`

export function NewsArchivePage() {
  usePageMeta('News archive', description)

  return (
    <>
      <PageHero
        eyebrow="From City Hall"
        title="News archive"
        description="Browse every City Hall story currently indexed by this guide. Each summary links to the original announcement."
        crumbs={[{ label: 'News', href: '/news' }, { label: 'News archive' }]}
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-line bg-white/80 px-3 py-1.5 text-xs font-semibold text-ink-600 shadow-card">
            {news.length} {news.length === 1 ? 'story' : 'stories'} <LocalizedText text={"tracked"} /></span>
          <Link
            to="/news"
            viewTransition
            className="rounded-full border border-line bg-white/80 px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-card transition hover:border-brand-200"
          >
            <LocalizedText text={"Recent updates"} /></Link>
        </div>
      </PageHero>

      <section>
        <div className="container-page py-10 sm:py-14">
          <div className="mb-7">
            <SectionHeading eyebrow="News archive" title="All indexed stories" />
          </div>
          {news.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item, index) => (
                <Reveal key={item.slug} delay={(index % 3) * 0.05} className="h-full">
                  <NewsCard item={item} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-line bg-white p-6 text-sm leading-6 text-ink-600">
              <LocalizedText text={"No stories are currently indexed. Visit the official city website for recent announcements."} /></p>
          )}

          <div className="mt-10">
            <SourceNote href={city.website} linkLabel="Visit the official city website">
              <LocalizedText text={"This archive contains the stories currently tracked by the guide; it may not include every city announcement. Stories last verified on"} trailingSpace />{formatDate(newsLastVerified)}.
            </SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
