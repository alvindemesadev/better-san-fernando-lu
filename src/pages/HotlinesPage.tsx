import { AlertTriangle, Mail, Phone, PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SourceNote } from '../components/SourceNote'
import { city } from '../data/city'
import { hotlines } from '../data/hotlines'
import { telHref } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

function dialHref(number: string) {
  return telHref(number.replace(/\s+local\s+.*$/i, ''))
}

export function HotlinesPage() {
  usePageMeta(
    'Emergency hotlines',
    'Published emergency, disaster, police, fire, health, and social welfare contact numbers for San Fernando, La Union.',
  )

  const primary = hotlines.find((hotline) => hotline.primary)
  const primaryNumber = primary?.numbers[0]
  const others = hotlines.filter((hotline) => !hotline.primary)

  return (
    <>
      <PageHero
        eyebrow="Emergency contacts"
        title="Hotlines and emergency numbers"
        description="Call 911 for immediate emergencies. The city and partner agencies publish the contacts below; some police and fire numbers are from the city’s 2023 stakeholder directory."
        crumbs={[{ label: 'Government', href: '/government' }, { label: 'Hotlines' }]}
      />

      <div className="container-page py-10 sm:py-14">
        {primary && primaryNumber ? (
          <div className="relative isolate overflow-hidden rounded-3xl bg-ink-950 p-6 text-white shadow-hero sm:p-9">
            <div aria-hidden="true" className="hero-grid absolute inset-0 opacity-60" />
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 size-56 rounded-full bg-brand-600/30 blur-3xl"
            />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-300">
                  <AlertTriangle aria-hidden="true" className="size-4" />
                  {primary.label}
                </p>
                <a
                  href={dialHref(primaryNumber)}
                  className="mt-3 block text-6xl font-extrabold tracking-[-0.05em] transition hover:text-brand-200 sm:text-7xl"
                >
                  {primaryNumber}
                </a>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/60">{primary.note}</p>
              </div>
              <a
                href={dialHref(primaryNumber)}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-sm font-extrabold text-ink-950 transition hover:bg-white"
              >
                <PhoneCall aria-hidden="true" className="size-4" />
                Call 911
              </a>
            </div>
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((hotline) => (
            <article
              key={hotline.label}
              className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card"
            >
              <div className="flex items-start gap-3">
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <Phone aria-hidden="true" className="size-4" />
                </span>
                <h2 className="text-[15px] font-bold leading-6 text-ink-950">{hotline.label}</h2>
              </div>
              <p className="mt-3 flex-1 text-sm leading-6 text-ink-600">{hotline.note}</p>
              <div className="mt-4 space-y-1.5 border-t border-line pt-4">
                {hotline.numbers.map((number) => (
                  <a
                    key={number}
                    href={dialHref(number)}
                    className="block text-base font-extrabold tracking-tight text-brand-700 transition hover:text-brand-800"
                  >
                    {number}
                  </a>
                ))}
                {hotline.email ? (
                  <a
                    href={`mailto:${hotline.email}`}
                    className="mt-2 inline-flex items-center gap-1.5 break-all text-xs font-semibold text-ink-500 transition hover:text-brand-700"
                  >
                    <Mail aria-hidden="true" className="size-3.5 shrink-0" />
                    {hotline.email}
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <h2 className="text-sm font-bold text-ink-950">When calling an emergency line</h2>
            <p className="mt-2 text-sm leading-6 text-ink-600">
              State your location, the nature of the emergency, and whether anyone is injured. Stay on the line and
              follow the dispatcher’s instructions.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-5">
            <h2 className="text-sm font-bold text-ink-950">Need a city office instead?</h2>
            <p className="mt-2 text-sm leading-6 text-ink-600">
              Browse the office directory for department contacts, or call the City Hall trunkline at{' '}
              <a href={telHref(city.trunkline)} className="font-semibold text-brand-700 hover:text-brand-800">
                {city.trunkline}
              </a>
              .
            </p>
            <Link
              to="/government/offices"
              viewTransition
              className="mt-3 inline-flex text-sm font-bold text-brand-700 hover:text-brand-800"
            >
              City offices
            </Link>
          </div>
        </div>

        <div className="mt-8">
          <SourceNote
            href="https://www.sanfernandocity.gov.ph/city-departments/"
            linkLabel="Current City Department directory"
            links={[
              { href: 'https://launion.gov.ph/contact-us/', label: 'Provincial Government contacts' },
              {
                href: 'https://www.sanfernandocity.gov.ph/wp-content/uploads/2023/06/City-of-San-Fernando-LU-Final-1.pdf',
                label: 'City stakeholder directory (2023)',
              },
            ]}
          >
            Health, social welfare, public safety, and CDRRMO contacts match the current city directory where listed.
            Police and fire direct numbers come from the city’s 2023 stakeholder directory; we found no newer official
            direct-number listing. Confirm them before non-emergency use. Call 911 for immediate emergencies.
          </SourceNote>
        </div>
      </div>
    </>
  )
}
