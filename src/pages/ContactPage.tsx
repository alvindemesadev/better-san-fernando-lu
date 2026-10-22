import { AlertTriangle, ArrowRight, ArrowUpRight, Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SourceNote } from '../components/SourceNote'
import { city } from '../data/city'
import { formatDate } from '../lib/utils'
import { telHref } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

const officialLinks = [
  { label: 'Official city website', href: city.website, note: 'News, announcements, and city departments' },
  { label: 'Citizens’ Charter', href: city.citizensCharter, note: 'Service requirements, fees, and steps' },
  { label: 'Sangguniang Panlungsod', href: city.sanggunian, note: 'Ordinances, resolutions, and legislative records' },
  { label: 'Ordinance e-Archives', href: city.archives, note: 'Archived city ordinances' },
]

export function ContactPage() {
  usePageMeta(
    'Contact and sources',
    'Contact City Hall and find official San Fernando, La Union channels for services, legislation, archives, and public records.',
  )

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach City Hall, or find the right source"
        description="This independent guide does not process city transactions. For permits, records, assistance, and official answers, contact the city directly."
        crumbs={[{ label: 'Contact' }]}
      />

      <div className="container-page py-10 sm:py-14">
        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">City Hall</p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink-950">City Government of San Fernando</h2>
            <dl className="mt-6 space-y-5 text-sm">
              <div className="flex gap-3">
                <MapPin aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-600" />
                <div>
                  <dt className="font-semibold text-ink-900">Address</dt>
                  <dd className="mt-0.5 leading-6 text-ink-600">{city.address}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-600" />
                <div>
                  <dt className="font-semibold text-ink-900">Trunkline</dt>
                  <dd className="mt-0.5">
                    <a href={telHref(city.trunkline)} className="font-semibold text-brand-700 hover:text-brand-800">
                      {city.trunkline}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-600" />
                <div>
                  <dt className="font-semibold text-ink-900">Email</dt>
                  <dd className="mt-0.5">
                    <a href={`mailto:${city.email}`} className="break-all font-semibold text-brand-700 hover:text-brand-800">
                      {city.email}
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-600" />
                <div>
                  <dt className="font-semibold text-ink-900">Office hours</dt>
                  <dd className="mt-0.5 leading-6 text-ink-600">{city.hours}</dd>
                </div>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-3 border-t border-line pt-5">
              <a
                href={city.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
              >
                Official website
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
              <a
                href={city.facebook}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
              >
                Facebook page
                <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-amber-800">
                <AlertTriangle aria-hidden="true" className="size-4" />
                Emergency
              </p>
              <p className="mt-2 text-sm leading-6 text-amber-900/80">
                For police, fire, or medical emergencies, call{' '}
                <a href="tel:911" className="font-extrabold text-amber-950 underline decoration-amber-400 underline-offset-2">
                  911
                </a>{' '}
                immediately.
              </p>
              <Link
                to="/government/hotlines"
                viewTransition
                className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-amber-900 hover:text-amber-950"
              >
                All emergency hotlines
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
              <h2 className="text-base font-extrabold text-ink-950">About this guide</h2>
              <p className="mt-2 text-sm leading-6 text-ink-600">
                Better San Fernando is independent and does not accept service requests, process permits, or act for
                the city government. For a correction or a source question, use the official channels above.
              </p>
              <Link
                to="/about"
                viewTransition
                className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800"
              >
                About the project
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Official channels</h2>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-ink-950">Go straight to the source</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {officialLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start justify-between gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
              >
                <span>
                  <span className="block text-sm font-bold text-ink-950 group-hover:text-brand-700">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-ink-500">{item.note}</span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-ink-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700"
                />
              </a>
            ))}
          </div>
        </section>

        <div className="mt-10">
          <SourceNote href={city.website} linkLabel="Visit the official city website">
            Contact details come from the City Government of San Fernando. Data last verified on{' '}
            {formatDate(city.lastVerified)}.
          </SourceNote>
        </div>
      </div>
    </>
  )
}
