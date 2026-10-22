import { ArrowLeft, ArrowUpRight, CalendarDays, ExternalLink } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { NotFoundPage } from './NotFoundPage'
import { NewsCard } from '../components/NewsCard'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { news, newsLastVerified } from '../data/news'
import { formatDate } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

export function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const item = news.find((entry) => entry.slug === slug)
  const related = news.filter((entry) => entry.slug !== slug).slice(0, 3)

  usePageMeta(
    item?.title ?? 'News not found',
    item?.excerpt,
    item
      ? {
          path: `/news/${item.slug}`,
          type: 'article',
          image: item.image,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            headline: item.title,
            datePublished: item.date,
            description: item.excerpt,
            image: [item.image],
            url: `${window.location.origin}/news/${item.slug}`,
            publisher: { '@type': 'Organization', name: 'Better San Fernando' },
          },
        }
      : undefined,
  )

  if (!item) return <NotFoundPage />

  return (
    <>
      <PageHero
        eyebrow="From City Hall"
        title={item.title}
        description="A summary of a story published by the City Government of San Fernando."
        crumbs={[{ label: 'News', href: '/news' }, { label: 'Story' }]}
      >
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-700">
          <CalendarDays aria-hidden="true" className="size-3.5 text-brand-700" />
          {formatDate(item.date)}
        </p>
      </PageHero>

      <section>
        <div className="container-page py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
            <article className="min-w-0">
              <img
                src={item.image}
                alt=""
                className="aspect-[16/9] w-full rounded-2xl border border-line object-cover shadow-card"
              />
              <p className="mt-6 text-[15px] leading-7 text-ink-700">{item.excerpt}</p>
              <p className="mt-4 text-sm leading-6 text-ink-500">
                This is a summary. Read the complete article, including the full text and photos, on the official city
                website.
              </p>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
              >
                Read on the official city website
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
              <div className="mt-8">
                <Link
                  to="/news"
                  viewTransition
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                >
                  <ArrowLeft aria-hidden="true" className="size-4" />
                  All news
                </Link>
              </div>
            </article>

            <aside className="space-y-4">
              <div className="rounded-2xl border border-line bg-surface p-5">
                <h2 className="text-sm font-bold text-ink-950">About this story</h2>
                <dl className="mt-3 space-y-3 text-sm">
                  <div>
                    <dt className="text-xs font-semibold text-ink-500">Published</dt>
                    <dd className="mt-0.5 font-semibold text-ink-900">{formatDate(item.date)}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-ink-500">Source</dt>
                    <dd className="mt-0.5">
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-start gap-1.5 font-semibold leading-6 text-brand-700 hover:text-brand-800"
                      >
                        City Government of San Fernando
                        <ExternalLink aria-hidden="true" className="mt-1 size-3.5 shrink-0" />
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>

              <SourceNote href={item.sourceUrl} linkLabel="Open the official story">
                Text and images belong to the City Government of San Fernando. This page summarizes the published
                story and links to the original. News last verified on {formatDate(newsLastVerified)}.
              </SourceNote>
            </aside>
          </div>

          {related.length ? (
            <div className="mt-14 border-t border-line pt-10">
              <Reveal>
                <SectionHeading eyebrow="More from City Hall" title="Related updates" />
              </Reveal>
              <div className="mt-6 grid gap-5 md:grid-cols-3">
                {related.map((entry, index) => (
                  <Reveal key={entry.slug} delay={index * 0.05} className="h-full">
                    <NewsCard item={entry} compact />
                  </Reveal>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}
