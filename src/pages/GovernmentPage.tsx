import { ArrowRight, ArrowUpRight, Building2, MapPin, Phone, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { OfficeCard } from '../components/OfficeCard'
import { OfficialCard } from '../components/OfficialCard'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { barangays } from '../data/barangays'
import { city } from '../data/city'
import { hotlines } from '../data/hotlines'
import { offices } from '../data/offices'
import { officials } from '../data/officials'
import { formatNumber, telHref } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

const quickLinks = [
  { label: 'City officials', note: `${officials.length} profiles`, href: '/government/officials', icon: Users },
  { label: 'Offices', note: `${offices.length} departments`, href: '/government/offices', icon: Building2 },
  { label: 'Barangays', note: `${barangays.length} communities`, href: '/government/barangays', icon: MapPin },
  { label: 'Hotlines', note: 'Emergency contacts', href: '/government/hotlines', icon: Phone },
]

const featuredOfficeSlugs = [
  'office-of-the-city-treasurer',
  'local-economic-and-business-development-office',
  'civil-registrar-s-office',
  'city-health-office',
  'city-social-welfare-and-development-office',
  'office-of-the-city-engineer',
]

export function GovernmentPage() {
  usePageMeta(
    'City government',
    'Meet the mayor and city council, browse city offices and departments, explore all 59 barangays, and find published emergency contacts in San Fernando, La Union.',
  )

  const mayor = officials.find((official) => official.role === 'City Mayor')
  const viceMayor = officials.find((official) => official.role === 'City Vice Mayor')
  const councilors = officials.filter((official) => official.role === 'City Councilor').slice(0, 4)
  const featuredOffices = featuredOfficeSlugs
    .map((slug) => offices.find((office) => office.slug === slug))
    .filter((office) => office !== undefined)
  const topBarangays = [...barangays].sort((a, b) => b.population2024 - a.population2024).slice(0, 5)
  const keyHotlines = hotlines.filter((hotline) =>
    [
      'National emergency',
      'City Disaster Risk Reduction and Management Office',
      'San Fernando City Police Station',
      'San Fernando City Fire Station',
    ].includes(hotline.label),
  )

  return (
    <>
      <PageHero
        eyebrow="City government"
        title="Who runs the city, and how to reach them"
        description="San Fernando is led by an elected mayor, vice mayor, and 12 city councilors, supported by city offices and 59 barangays."
        crumbs={[{ label: 'Government' }]}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                to={item.href}
                viewTransition
                className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink-950 group-hover:text-brand-700">
                      {item.label}
                    </span>
                    <span className="block text-xs text-ink-500">{item.note}</span>
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 text-ink-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700"
                />
              </Link>
            )
          })}
        </div>
      </PageHero>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="City leadership"
              title="Your elected officials"
              description="The mayor and vice mayor lead the executive branch; the Sangguniang Panlungsod handles legislation."
              action={
                <Link
                  to="/government/officials"
                  viewTransition
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                >
                  All officials
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
            />
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {mayor ? (
              <Reveal>
                <OfficialCard official={mayor} featured />
              </Reveal>
            ) : null}
            {viceMayor ? (
              <Reveal delay={0.06}>
                <OfficialCard official={viceMayor} featured />
              </Reveal>
            ) : null}
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {councilors.map((official) => (
              <OfficialCard key={official.slug} official={official} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Departments and offices"
              title="Where city work happens"
              description="From business permits to health services, these are the offices residents visit most."
              action={
                <Link
                  to="/government/offices"
                  viewTransition
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                >
                  All {offices.length} offices
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
            />
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredOffices.map((office) => (
              <OfficeCard key={office.slug} office={office} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Barangays"
                  title="The city, community by community"
                  description="San Fernando has 59 barangays across 12 districts. These are the five largest by 2024 population."
                  action={
                    <Link
                      to="/government/barangays"
                      viewTransition
                      className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                    >
                      All barangays
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                  }
                />
              </Reveal>

              <ol className="mt-6 divide-y divide-line rounded-2xl border border-line bg-white shadow-card">
                {topBarangays.map((barangay, index) => (
                  <li key={barangay.slug}>
                    <Link
                      to={`/government/barangays/${barangay.slug}`}
                      viewTransition
                      className="group flex items-center gap-4 px-5 py-4 transition hover:bg-surface"
                    >
                      <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-surface text-xs font-extrabold text-ink-500">
                        {index + 1}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-bold text-ink-950 group-hover:text-brand-700">
                          {barangay.name}
                        </span>
                        <span className="block text-xs text-ink-500">
                          {barangay.district} · Rank {barangay.rank} of 59
                        </span>
                      </span>
                      <span className="shrink-0 text-sm font-bold text-ink-700">
                        {formatNumber(barangay.population2024)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>

            <Reveal delay={0.08}>
              <div className="h-full rounded-2xl border border-line bg-ink-950 p-6 text-white shadow-card sm:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60">Emergency contacts</p>
                <h2 className="mt-2 text-2xl font-extrabold tracking-tight">Help, without the guesswork</h2>
                <p className="mt-2 text-sm leading-6 text-white/60">
                  Published contacts for emergencies, disasters, police, and fire response.
                </p>

                <div className="mt-6 space-y-3">
                  {keyHotlines.map((hotline) => (
                    <div key={hotline.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.1em] text-brand-300">{hotline.label}</p>
                      <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                        {hotline.numbers.map((number) => (
                          <a
                            key={number}
                            href={telHref(number)}
                            className="text-lg font-extrabold tracking-tight text-white transition hover:text-brand-200"
                          >
                            {number}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-5 text-white/55">
                  Police and fire direct lines come from the city’s 2023 stakeholder directory; confirm they are still
                  active. Call 911 for immediate emergencies.
                </p>

                <Link
                  to="/government/hotlines"
                  viewTransition
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-300 transition hover:text-white"
                >
                  All hotlines
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="mt-8">
            <SourceNote href={city.website} linkLabel="Visit the official city website">
              Official profiles, office contacts, and barangay records are published by the City Government of San
              Fernando. Office and hotline details can change; use the linked government directories for the latest
              official information.
            </SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
