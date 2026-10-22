import { ArrowRight, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SourceNote } from '../components/SourceNote'
import { city } from '../data/city'
import { faqs } from '../data/faqs'
import { formatDate } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

export function FaqPage() {
  usePageMeta(
    'Frequently asked questions',
    'Quick answers about cedula, business permits, civil records, assistance, building permits, budgets, emergencies, and this independent guide.',
    {
      path: '/faq',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    },
  )

  return (
    <>
      <PageHero
        eyebrow="Help"
        title="Frequently asked questions"
        description="Short answers to the questions residents ask most, with links to the full service pages and official sources."
        crumbs={[{ label: 'FAQ' }]}
      />

      <div className="container-page py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <Reveal key={faq.q} delay={Math.min(index * 0.03, 0.18)}>
                <details className="group rounded-2xl border border-line bg-white shadow-card">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                    <h2 className="text-[15px] font-bold leading-6 text-ink-950">{faq.q}</h2>
                    <ChevronDown
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-ink-400 transition duration-200 group-open:rotate-180 group-open:text-brand-700"
                    />
                  </summary>
                  <div className="border-t border-line px-5 pb-5 pt-4">
                    <p className="text-sm leading-6 text-ink-600">{faq.a}</p>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-400">
                        Source: {faq.source}
                      </span>
                      <Link
                        to={faq.link}
                        viewTransition
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-800"
                      >
                        Read more
                        <ArrowRight aria-hidden="true" className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-line bg-ink-950 p-5 text-white shadow-card">
              <h2 className="text-lg font-extrabold tracking-tight">Still looking?</h2>
              <p className="mt-2 text-sm leading-6 text-white/60">
                Search the full guide, browse services by category, or contact the right city office directly.
              </p>
              <div className="mt-4 grid gap-2">
                <Link
                  to="/search"
                  viewTransition
                  className="inline-flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/15"
                >
                  Search the site
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>
                <Link
                  to="/services"
                  viewTransition
                  className="inline-flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/15"
                >
                  All services
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>
                <Link
                  to="/government/offices"
                  viewTransition
                  className="inline-flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/15"
                >
                  City offices
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-5">
              <h2 className="text-sm font-bold text-ink-950">Emergency?</h2>
              <p className="mt-2 text-sm leading-6 text-ink-600">
                Call{' '}
                <a href="tel:911" className="font-extrabold text-brand-700 hover:text-brand-800">
                  911
                </a>{' '}
                for police, fire, or medical help.
              </p>
              <Link
                to="/government/hotlines"
                viewTransition
                className="mt-2 inline-flex text-xs font-bold text-brand-700 hover:text-brand-800"
              >
                All hotlines
              </Link>
            </div>
          </aside>
        </div>

        <div className="mt-10">
          <SourceNote href={city.website} linkLabel="Visit the official city website">
            Answers are summaries, not official rulings. Requirements and fees can change. Confirm with the issuing
            office before your visit. Data last verified on {formatDate(city.lastVerified)}.
          </SourceNote>
        </div>
      </div>
    </>
  )
}
