import { LocalizedText } from '../i18n/LocalizedText'
import { ArrowRight, ArrowUpRight, Database, ExternalLink, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { StatCard } from '../components/StatCard'
import { city } from '../data/city'
import { sources } from '../data/sources'
import { stats } from '../data/stats'
import { timeline } from '../data/timeline'
import { formatNumber } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

export function AboutPage() {
  usePageMeta(
    'About this project',
    'Better San Fernando is an independent civic guide to city services, officials, barangays, budgets, and public records in San Fernando, La Union.',
  )

  return (
    <>
      <PageHero
        eyebrow="About"
        title="A clearer civic guide to San Fernando"
        description="Better San Fernando turns public records into a readable guide for residents, businesses, and anyone who wants to understand how the city works."
        crumbs={[{ label: 'About' }]}
      />

      <section>
        <div className="container-page py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Reveal>
              <div>
                <SectionHeading
                  eyebrow="What this is"
                  title="Independent, source-linked, and built for clarity"
                  description="This is not the official city website. It is an independent civic project that organizes public information and links back to the government sources behind every dataset."
                />
                <p className="mt-5 text-[15px] leading-7 text-ink-600">
                  <LocalizedText text={"The guide covers city services from the Citizens’ Charter, the elected mayor and city council, all 59 barangays, and the budget and procurement records published under the Full Disclosure Policy. It does not process transactions, issue permits, or speak for the city government."} /></p>
                <p className="mt-4 text-[15px] leading-7 text-ink-600">
                  <LocalizedText text={"Where records conflict or change, the official source takes precedence. Each dataset is dated so you can see when it was last checked."} /></p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/services"
                    viewTransition
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
                  >
                    <LocalizedText text={"Browse services"} /><ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                  <Link
                    to="/contact"
                    viewTransition
                    className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
                  >
                    <LocalizedText text={"Contact and sources"} /></Link>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => (
                  <StatCard key={stat.label} {...stat} />
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
              <Database aria-hidden="true" className="size-5 text-brand-700" />
              <h2 className="mt-3 text-base font-extrabold text-ink-950"><LocalizedText text={"Structured public data"} /></h2>
              <p className="mt-2 text-sm leading-6 text-ink-600">
                <LocalizedText text={"242 services, 38 offices, 59 barangays, 15 officials, and the city’s budget and procurement documents."} /></p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
              <ExternalLink aria-hidden="true" className="size-5 text-brand-700" />
              <h2 className="mt-3 text-base font-extrabold text-ink-950"><LocalizedText text={"Links to the source"} /></h2>
              <p className="mt-2 text-sm leading-6 text-ink-600">
                <LocalizedText text={"Every service, office, barangay, news item, and financial document points back to an official city or national source."} /></p>
            </div>
            <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
              <MapPin aria-hidden="true" className="size-5 text-brand-700" />
              <h2 className="mt-3 text-base font-extrabold text-ink-950"><LocalizedText text={"Local by design"} /></h2>
              <p className="mt-2 text-sm leading-6 text-ink-600">
                <LocalizedText text={"Written around the way people actually use City Hall: by transaction, office, barangay, and public record."} /></p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="City profile"
              title="San Fernando at a glance"
              description="The capital city of La Union and the regional center of the Ilocos Region."
            />
          </Reveal>
          <dl className="mt-8 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Official name', city.officialName],
              ['Cityhood', 'March 20, 1998 (RA 8509)'],
              ['City type', city.type],
              ['Province', city.province],
              ['Region', city.region],
              ['Congressional district', city.district],
              ['Barangays', `${city.barangayCount} barangays (12 districts)`],
              ['Land area', `${city.landAreaKm2} km² (PSA/PhilAtlas)`],
              ['Population (2024)', formatNumber(city.population2024)],
              ['Households (2024)', formatNumber(city.households2024)],
              ['Average household size', String(city.averageHouseholdSize)],
              ['Elevation', `${city.elevationM} m`],
              ['Major languages (city profile)', 'Ilokano, Bisaya, Bicol, Ilonggo, Cebuano, Chinese, Bago'],
              ['ZIP code', city.zip],
              ['Coordinates', `${city.coordinates.lat}° N, ${city.coordinates.lng}° E`],
            ].map(([label, value]) => (
              <div key={label} className="border-b border-line pb-4">
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400">{label}</dt>
                <dd className="mt-1 text-[15px] font-semibold leading-6 text-ink-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="History"
              title="From Pindangan to a component city"
              description="A short timeline of the city’s founding, capital status, and cityhood."
            />
          </Reveal>
          <ol className="mt-8 space-y-0">
            {timeline.map((item) => (
              <li
                key={item.year}
                className="relative grid gap-2 border-l border-line pb-8 pl-6 last:pb-0 sm:grid-cols-[8rem_1fr] sm:gap-6"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-1.5 size-3 rounded-full border-2 border-white bg-brand-600 ring-1 ring-brand-200"
                />
                <p className="text-sm font-extrabold text-brand-700">{item.year}</p>
                <div>
                  <h3 className="text-base font-bold text-ink-950"><LocalizedText text={item.title} /></h3>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-ink-600"><LocalizedText text={item.text} /></p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Sources"
              title="Where the data comes from"
              description="These are the official and reference sources used across the guide."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sources.map((source) => (
              <a
                key={source.url}
                href={source.url}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold leading-6 text-ink-950 group-hover:text-brand-700">
                    <LocalizedText text={source.name} />
                  </h3>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-ink-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700"
                  />
                </div>
                <p className="mt-1 flex-1 text-xs leading-5 text-ink-500"><LocalizedText text={source.note} /></p>
              </a>
            ))}
          </div>

          <div className="mt-8">
            <SourceNote
              href={city.website}
              linkLabel="Visit the official city website"
              links={[
                { href: 'https://psa.gov.ph/system/files/psy/2025%20PSY%20Final_signed.pdf', label: 'PSA Statistical Yearbook: population and land area' },
                { href: 'https://rsso01.psa.gov.ph/content/highlights-population-la-union-2024-census-population', label: 'PSA 2024 Census: La Union population' },
                { href: 'https://data.bettergov.ph', label: 'BetterGov.ph open data catalog' },
                { href: 'https://www.philatlas.com/luzon/r01/la-union/san-fernando.html', label: 'PhilAtlas city profile' },
                { href: 'https://launion.gov.ph/city-of-san-fernando/', label: 'La Union provincial profile' },
              ]}
            >
              <LocalizedText text={"Better San Fernando is an independent project, not affiliated with the City Government of San Fernando. The displayed land area is the PSA/PhilAtlas figure; published area figures differ between the PSA/PhilAtlas (102.72 km²), City (105.26 km²), and Province (106.88 km²) profiles. Core city profile facts were checked against cited public records on October 24, 2026; each dataset has its own source date. For official transactions, always use the city’s own channels."} /></SourceNote>
          </div>
        </div>
      </section>
    </>
  )
}
