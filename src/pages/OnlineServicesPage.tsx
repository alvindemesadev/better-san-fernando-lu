import { ArrowUpRight, CheckCircle2, ExternalLink, MonitorSmartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { city } from '../data/city'
import { onlineServices } from '../data/onlineServices'
import { formatDate } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

export function OnlineServicesPage() {
  usePageMeta(
    'Online services',
    'Apply, track, and pay online: San Fernando’s e-business permits, cedula application, work permits, job applications, food handler records, and city portals.',
  )

  return (
    <>
      <PageHero
        eyebrow="Online services"
        title="Do it online"
        description="Official city systems for permits, taxes, jobs, records, and feedback. Every link opens the city’s own portal in a new tab."
        crumbs={[{ label: 'Services', href: '/services' }, { label: 'Online services' }]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-700">
            {onlineServices.length} official systems
          </span>
          <span className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-700">
            Accounts and fees are handled by the city
          </span>
        </div>
      </PageHero>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Systems directory"
              title="City portals and applications"
              description="Use these systems for city transactions that can be started or completed online. Some services still require a visit to City Hall."
            />
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {onlineServices.map((service, index) => (
              <Reveal key={service.slug} delay={(index % 3) * 0.05} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card">
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <MonitorSmartphone aria-hidden="true" className="size-5" />
                    </span>
                    <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-ink-500">
                      {service.category}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-extrabold tracking-tight text-ink-950">{service.name}</h3>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.1em] text-brand-700">
                    {service.shortName}
                  </p>
                  <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">{service.description}</p>
                  {service.note ? (
                    <p className="mt-2 inline-flex items-start gap-1.5 text-xs leading-5 text-ink-500">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-ink-400" />
                      {service.note}
                    </p>
                  ) : null}
                  <a
                    href={service.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                  >
                    Open {service.shortName}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <h2 className="text-base font-extrabold tracking-tight text-ink-950">Prefer to transact in person?</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-600">
              The Citizens’ Charter lists the requirements, fees, and steps for all 242 city services, including the
              office that handles each one.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/services"
                viewTransition
                className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
              >
                Browse city services
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                to="/government/hotlines"
                viewTransition
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
              >
                Call an office
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <SourceNote
              href="https://www.sanfernandocity.gov.ph/online-services/"
              linkLabel="Online Services on the city website"
            >
              The city publishes and operates these systems. Accounts, payments, and data are handled by the City
              Government of San Fernando, not by this guide. Data last verified on {formatDate(city.lastVerified)}.
            </SourceNote>
          </div>

          <p className="mt-6 inline-flex items-start gap-2 text-xs leading-5 text-ink-500">
            <ExternalLink aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
            Links open the official portals of the City Government of San Fernando in a new tab.
          </p>
        </div>
      </section>
    </>
  )
}
