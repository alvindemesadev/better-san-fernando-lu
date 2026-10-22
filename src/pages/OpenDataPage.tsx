import { ArrowRight, Database, ExternalLink, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { openDataPortalUrl, openDataSources } from '../data/openData'
import { usePageMeta } from '../lib/usePageMeta'

const integrated = openDataSources.filter((source) => source.group === 'integrated')
const reference = openDataSources.filter((source) => source.group === 'reference')

export function OpenDataPage() {
  usePageMeta(
    'Open data',
    'The open datasets behind San Fernando, La Union’s fiscal profile, barangay map, election history, and procurement records.',
  )

  return (
    <>
      <PageHero
        eyebrow="Transparency"
        title="Open data, clearly sourced"
        description="National datasets that power this site, plus reference collections for anyone who wants to go deeper. Each source keeps its own publisher, license, and caveats."
        crumbs={[{ label: 'Transparency', href: '/transparency' }, { label: 'Open data' }]}
      >
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full border border-line bg-white/80 px-3 py-1.5 text-ink-600 shadow-card">
            {openDataSources.length} datasets tracked
          </span>
          <span className="rounded-full border border-line bg-white/80 px-3 py-1.5 text-ink-600 shadow-card">
            {integrated.length} built into the site
          </span>
          <span className="rounded-full border border-line bg-white/80 px-3 py-1.5 text-ink-600 shadow-card">
            {reference.length} reference sources
          </span>
        </div>
      </PageHero>

      <div className="container-page py-10 sm:py-14">
        <Reveal>
          <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5 sm:items-center">
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-700 sm:mt-0" />
            <p className="text-sm leading-6 text-ink-600">
              This is a civic guide, not an official statistical publication. Figures are copied from the linked
              national datasets, rounded only for display, and paired with the limitations described by their
              publishers.
            </p>
          </div>
        </Reveal>

        <section className="mt-12">
          <Reveal>
            <SectionHeading
              eyebrow="Integrated"
              title="Data built into this site"
              description="These datasets inform pages across the portal. Follow the local link to see how the data is used, or open the original source for the full release."
            />
          </Reveal>

          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {integrated.map((source, index) => (
              <Reveal key={source.id} delay={(index % 3) * 0.04} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Database aria-hidden="true" className="size-4.5" />
                    </span>
                    <span className="rounded-full border border-line bg-surface px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-ink-500">
                      {source.license}
                    </span>
                  </div>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.1em] text-ink-500">{source.publisher}</p>
                  <h2 className="mt-1 text-lg font-extrabold tracking-tight text-ink-950">{source.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">{source.description}</p>

                  <dl className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-4 text-xs">
                    <div>
                      <dt className="font-bold uppercase tracking-[0.08em] text-ink-400">Coverage</dt>
                      <dd className="mt-1 leading-5 text-ink-700">{source.coverage}</dd>
                    </div>
                    <div>
                      <dt className="font-bold uppercase tracking-[0.08em] text-ink-400">Formats</dt>
                      <dd className="mt-1 leading-5 text-ink-700">{source.formats}</dd>
                    </div>
                  </dl>

                  {source.note ? (
                    <p className="mt-4 rounded-xl bg-surface p-3 text-xs leading-5 text-ink-600">{source.note}</p>
                  ) : null}

                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4">
                    {source.localHref ? (
                      <Link
                        to={source.localHref}
                        viewTransition
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-800"
                      >
                        {source.localLabel}
                        <ArrowRight aria-hidden="true" className="size-4" />
                      </Link>
                    ) : null}
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500 transition hover:text-brand-700"
                    >
                      Dataset
                      <ExternalLink aria-hidden="true" className="size-3.5" />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-line pt-10">
          <Reveal>
            <SectionHeading
              eyebrow="Reference"
              title="Go deeper into the source data"
              description="Useful collections that are linked directly rather than copied. They cover hazards, audit institutions, and property valuations."
            />
          </Reveal>

          <div className="mt-7 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            {reference.map((source, index) => (
              <Reveal key={source.id} delay={index * 0.04}>
                <article className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center sm:p-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h2 className="text-lg font-extrabold tracking-tight text-ink-950">{source.name}</h2>
                      <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-ink-400">
                        {source.license}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-semibold text-ink-500">{source.publisher}</p>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">{source.description}</p>
                    <p className="mt-2 text-xs leading-5 text-ink-500">
                      {source.coverage} · {source.formats}
                    </p>
                    {source.note ? <p className="mt-2 text-xs leading-5 text-ink-500">{source.note}</p> : null}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 sm:flex-col sm:items-end">
                    {source.resourceHref ? (
                      <a
                        href={source.resourceHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-brand-800"
                      >
                        {source.resourceLabel ?? 'Open resource'}
                        <ExternalLink aria-hidden="true" className="size-3.5" />
                      </a>
                    ) : null}
                    <a
                      href={source.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500 transition hover:text-brand-700"
                    >
                      Dataset details
                      <ExternalLink aria-hidden="true" className="size-3.5" />
                    </a>
                  </div>
                </article>
                {index < reference.length - 1 ? <div className="border-t border-line" /> : null}
              </Reveal>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <SourceNote href={openDataPortalUrl} linkLabel="Browse the full BetterGov.ph data catalog">
            Datasets are published by Philippine national agencies and curated by BetterGov.ph. Licenses and update
            schedules vary by source; consult each dataset page before redistributing or reusing its contents.
          </SourceNote>
        </div>
      </div>
    </>
  )
}
