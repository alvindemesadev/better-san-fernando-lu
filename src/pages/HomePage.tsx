import {
  ArrowRight,
  Bookmark,
  Briefcase,
  Clock,
  Landmark,
  MapPin,
  MonitorSmartphone,
  Phone,
  TreePalm,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { CategoryCard } from '../components/CategoryCard'
import { NewsCard } from '../components/NewsCard'
import { Reveal } from '../components/Reveal'
import { SearchBox } from '../components/SearchBox'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { StatCard } from '../components/StatCard'
import logoMark from '../assets/logo-1x1.png'
import { categories } from '../data/categories'
import { city } from '../data/city'
import { news } from '../data/news'
import { stats } from '../data/stats'
import { removeSavedService, useSavedServices } from '../lib/savedServices'
import { formatDate, telHref } from '../lib/utils'

const featuredCategories = categories.slice(0, 6)
const latestNews = news.slice(0, 3)

const exploreLinks = [
  {
    title: 'City profile',
    href: '/city',
    description: 'Facts, history, maps, and figures about San Fernando.',
    icon: Landmark,
  },
  {
    title: 'Life and tourism',
    href: '/city/life',
    description: 'Beaches, surf breaks, festivals, and getting here.',
    icon: TreePalm,
  },
  {
    title: 'Business and investment',
    href: '/city/business',
    description: 'Rankings, costs, permits, and opportunities.',
    icon: Briefcase,
  },
  {
    title: 'Online services',
    href: '/online-services',
    description: 'Official portals for permits, jobs, and records.',
    icon: MonitorSmartphone,
  },
]

export function HomePage() {
  const savedServices = useSavedServices()

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink-950 text-white">
        <div className="container-page relative grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-24">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white/65">
                <span className="size-1.5 rounded-full bg-accent" />
                Independent civic guide
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="mt-6 max-w-3xl text-balance text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                San Fernando, <span className="text-brand-300">made clearer.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-white/65 sm:text-lg">
                Find city services, meet your officials, explore all 59 barangays, and follow public money — with
                links back to the official sources.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 max-w-xl">
                <SearchBox large placeholder="Search services, offices, barangays…" />
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Business permit', 'Birth certificate', 'Real property tax', 'Senior citizen ID'].map((term) => (
                  <Link
                    key={term}
                    to={`/search?q=${encodeURIComponent(term)}`}
                    viewTransition
                    className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/65 transition hover:border-white/30 hover:text-white"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-bold text-ink-950 transition hover:bg-white"
                >
                  Browse services
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
                <a
                  href="#news"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white"
                >
                  Latest updates
                  <ArrowRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <aside className="rounded-3xl border border-white/15 bg-white/[0.06] p-5 shadow-hero backdrop-blur-sm sm:p-7">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
                    San Fernando, La Union
                  </p>
                  <p className="mt-1 text-xl font-extrabold tracking-tight">City at a glance</p>
                </div>
                <img
                  src={logoMark}
                  alt=""
                  width="512"
                  height="512"
                  className="size-12 shrink-0 rounded-xl object-contain"
                />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <StatCard key={stat.label} {...stat} tone="dark" />
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm text-white/60">
                <p className="flex gap-2.5">
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                  <span>{city.address}</span>
                </p>
                <p className="flex gap-2.5">
                  <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                  <a href={telHref(city.trunkline)} className="transition hover:text-white">
                    {city.trunkline}
                  </a>
                </p>
                <p className="flex gap-2.5">
                  <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                  <span>{city.hours}</span>
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {savedServices.length ? (
        <section id="saved" className="scroll-mt-24 border-b border-line bg-surface">
          <div className="container-page py-10 sm:py-12">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="inline-flex items-center gap-2 text-lg font-extrabold tracking-tight text-ink-950">
                <Bookmark aria-hidden="true" className="size-4 text-brand-700" />
                Your saved services
              </h2>
              <Link
                to="/services"
                viewTransition
                className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 transition hover:text-brand-800"
              >
                All services
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {savedServices.map((service) => (
                <li key={`${service.category}-${service.slug}`} className="flex items-stretch gap-2">
                  <Link
                    to={`/services/${service.category}/${service.slug}`}
                    viewTransition
                    className="group flex min-w-0 flex-1 items-center justify-between gap-3 rounded-xl border border-line bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-ink-950 group-hover:text-brand-700">
                        {service.title}
                      </span>
                      <span className="mt-0.5 block truncate text-xs text-ink-500">{service.office}</span>
                    </span>
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 shrink-0 text-ink-400 transition group-hover:translate-x-0.5 group-hover:text-brand-700"
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeSavedService(service)}
                    aria-label={`Remove ${service.title} from saved services`}
                    className="inline-flex w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-ink-400 transition hover:border-red-200 hover:text-red-600"
                  >
                    <X aria-hidden="true" className="size-4" />
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-3 text-xs text-ink-500">Saved in this browser only — no account needed.</p>
          </div>
        </section>
      ) : null}

      <section id="services" className="scroll-mt-24">
        <div className="container-page py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="City services"
              title="What do you need today?"
              description="Start with the services residents and businesses use most, grouped the way City Hall organizes them."
              action={
                <Link
                  to="/services"
                  viewTransition
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                >
                  All services
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
            />
          </Reveal>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.map((category, index) => (
              <Reveal key={category.slug} delay={index * 0.05} className="h-full">
                <CategoryCard category={category} count={category.serviceCount} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="news" className="scroll-mt-24 border-y border-line bg-surface">
        <div className="container-page py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="From City Hall"
              title="Latest updates"
              description="Recent announcements from the City Government of San Fernando, linked to the official source."
            />
          </Reveal>

          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {latestNews.map((item, index) => (
              <Reveal key={item.slug} delay={index * 0.06} className="h-full">
                <NewsCard item={item} compact />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="scroll-mt-24">
        <div className="container-page py-16 sm:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Get to know the city"
              title="Explore San Fernando"
              description="Beyond transactions: the city’s profile, its life and tourism, doing business here, and the portals that save you a trip."
            />
          </Reveal>

          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {exploreLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <Reveal key={link.href} delay={index * 0.05} className="h-full">
                  <Link
                    to={link.href}
                    viewTransition
                    className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
                  >
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="mt-4 text-base font-extrabold tracking-tight text-ink-950">{link.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-ink-600">{link.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-700">
                      Explore
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition group-hover:translate-x-0.5"
                      />
                    </span>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <div className="container-page py-10 sm:py-12">
        <Reveal>
          <SourceNote href={city.website} linkLabel="Visit the official city website">
            Better San Fernando is an independent civic project, not the official city website. Population figures
            use the 2024 Census of Population. Data and links were last verified on {formatDate(city.lastVerified)}.
          </SourceNote>
        </Reveal>
      </div>
    </>
  )
}
