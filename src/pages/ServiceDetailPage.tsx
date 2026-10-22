import { ArrowLeft, ArrowUpRight, Bookmark, BookmarkCheck, Download, ExternalLink, MonitorSmartphone } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { NotFoundPage } from './NotFoundPage'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SourceNote } from '../components/SourceNote'
import { categories } from '../data/categories'
import { city } from '../data/city'
import { offices } from '../data/offices'
import { onlineServiceSlugs } from '../data/onlineServices'
import { services } from '../data/services'
import { useSavedServices, toggleSavedService } from '../lib/savedServices'
import { formatDate } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

function pdfLabel(url: string) {
  const file = decodeURIComponent(url.split('/').pop() ?? 'Form')
  return file.replace(/\.pdf$/i, '').replace(/[-_]+/g, ' ')
}

export function ServiceDetailPage() {
  const { category: categorySlug, slug } = useParams<{ category: string; slug: string }>()
  const category = categories.find((item) => item.slug === categorySlug)
  const service = services.find((item) => item.slug === slug && item.category === categorySlug)
  const office = offices.find((item) => item.code === service?.officeCode)
  const savedServices = useSavedServices()

  usePageMeta(
    service?.title ?? 'Service not found',
    service?.summary,
    service && category
      ? {
          path: `/services/${service.category}/${service.slug}`,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: service.title,
            description: service.summary,
            serviceType: category.name,
            url: `${window.location.origin}/services/${service.category}/${service.slug}`,
            provider: {
              '@type': 'GovernmentOrganization',
              name: 'City Government of San Fernando, La Union',
              url: city.website,
            },
            areaServed: { '@type': 'City', name: 'San Fernando, La Union' },
          },
        }
      : undefined,
  )

  if (!category || !service) return <NotFoundPage />

  const saved = savedServices.some((ref) => ref.slug === service.slug && ref.category === service.category)
  const canDoOnline = onlineServiceSlugs.includes(service.slug)
  const eligibilityLeadsIntoDescription = service.whoMayAvail.trim().endsWith(':')
  const aboutDescription = eligibilityLeadsIntoDescription
    ? `${service.whoMayAvail}\n${service.description}`.trim()
    : service.description

  return (
    <>
      <PageHero
        eyebrow={category.name}
        title={service.title}
        description={service.summary}
        crumbs={[
          { label: 'Services', href: '/services' },
          { label: category.shortName, href: `/services/${category.slug}` },
          { label: service.title },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-brand-700 px-3 py-1.5 text-xs font-bold text-white">
            {service.classification}
          </span>
          <span className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-700">
            {service.transactionType}
          </span>
          <span className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-700">
            {service.office}
          </span>
          {canDoOnline ? (
            <Link
              to="/online-services"
              viewTransition
              className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 transition hover:bg-brand-100"
            >
              <MonitorSmartphone aria-hidden="true" className="size-3.5" />
              Available online
            </Link>
          ) : null}
          <button
            type="button"
            aria-pressed={saved}
            onClick={() =>
              toggleSavedService({
                category: service.category,
                slug: service.slug,
                title: service.title,
                office: service.office,
              })
            }
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition ${
              saved
                ? 'border-brand-200 bg-brand-700 text-white hover:bg-brand-800'
                : 'border-line bg-white text-ink-700 hover:border-brand-200 hover:text-brand-700'
            }`}
          >
            {saved ? (
              <BookmarkCheck aria-hidden="true" className="size-3.5" />
            ) : (
              <Bookmark aria-hidden="true" className="size-3.5" />
            )}
            {saved ? 'Saved' : 'Save service'}
          </button>
        </div>
      </PageHero>

      <div className="container-page py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-5">
            {eligibilityLeadsIntoDescription ? null : (
              <Reveal>
                <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
                  <h2 className="text-xl font-extrabold tracking-tight text-ink-950">Who may avail</h2>
                  <p className="mt-3 whitespace-pre-line text-[15px] leading-7 text-ink-700">
                    {service.whoMayAvail || 'Eligibility is not listed in the charter. Confirm with the issuing office.'}
                  </p>
                </section>
              </Reveal>
            )}

            <Reveal>
              <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
                <h2 className="text-xl font-extrabold tracking-tight text-ink-950">
                  {eligibilityLeadsIntoDescription ? 'Who may avail and service details' : 'About this service'}
                </h2>
                <p className="mt-3 whitespace-pre-line break-words text-[15px] leading-7 text-ink-700">
                  {aboutDescription || 'A full description is not listed in the charter.'}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
                <h2 className="text-xl font-extrabold tracking-tight text-ink-950">Fees</h2>
                <p className="mt-3 whitespace-pre-line break-words text-[15px] leading-7 text-ink-700">
                  {service.fees || 'No fees are listed for this service.'}
                </p>
              </section>
            </Reveal>

            <Reveal>
              <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
                <h2 className="text-xl font-extrabold tracking-tight text-ink-950">Downloadable forms</h2>
                {service.pdfs.length ? (
                  <ul className="mt-4 space-y-2">
                    {service.pdfs.map((file) => (
                      <li key={file}>
                        <a
                          href={file}
                          target="_blank"
                          rel="noreferrer"
                          className="group flex items-start gap-3 rounded-xl border border-line bg-surface p-3 text-sm transition hover:border-brand-200 hover:bg-white"
                        >
                          <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-brand-700 shadow-sm">
                            <Download aria-hidden="true" className="size-4" />
                          </span>
                          <span className="min-w-0">
                            <span className="block break-words font-semibold leading-6 text-ink-800 group-hover:text-brand-700">
                              {pdfLabel(file)}
                            </span>
                            <span className="mt-0.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-ink-400">
                              PDF · Official charter form
                            </span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-ink-500">
                    No downloadable forms are listed for this service.
                  </p>
                )}
              </section>
            </Reveal>

            <div>
              <Link
                to={`/services/${category.slug}`}
                viewTransition
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to {category.shortName}
              </Link>
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400">At a glance</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="border-b border-line pb-3">
                  <dt className="text-xs font-semibold text-ink-500">Issuing office</dt>
                  <dd className="mt-1 font-semibold leading-6 text-ink-900">
                    {office ? (
                      <Link
                        to={`/government/offices/${office.slug}`}
                        viewTransition
                        className="text-brand-700 hover:text-brand-800"
                      >
                        {office.name}
                      </Link>
                    ) : (
                      service.office
                    )}
                  </dd>
                </div>
                <div className="border-b border-line pb-3">
                  <dt className="text-xs font-semibold text-ink-500">Classification</dt>
                  <dd className="mt-1 font-semibold leading-6 text-ink-900">{service.classification}</dd>
                </div>
                <div className="border-b border-line pb-3">
                  <dt className="text-xs font-semibold text-ink-500">Transaction type</dt>
                  <dd className="mt-1 font-semibold leading-6 text-ink-900">{service.transactionType}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-ink-500">Last verified</dt>
                  <dd className="mt-1 font-semibold leading-6 text-ink-900">{formatDate(service.lastVerified)}</dd>
                </div>
              </dl>
            </div>

            <a
              href={service.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-3 rounded-2xl bg-brand-700 p-5 text-sm font-bold text-white shadow-card transition hover:bg-brand-800"
            >
              <span className="inline-flex items-center gap-2">
                <ExternalLink aria-hidden="true" className="size-4" />
                Official charter entry
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>

            <SourceNote href={service.sourceUrl} linkLabel="Open the official entry">
              This page summarizes the published service record. Requirements and fees can change without notice.
              Confirm details with the {office?.name ?? service.office} before your visit. City data last verified on{' '}
              {formatDate(city.lastVerified)}.
            </SourceNote>
          </aside>
        </div>
      </div>
    </>
  )
}
