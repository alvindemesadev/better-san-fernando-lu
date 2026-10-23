import { ArrowRight, ArrowUpRight, Building2, Layers3, MapPinned } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { barangays } from '../data/barangays'
import { categories } from '../data/categories'
import { offices } from '../data/offices'
import { usePageMeta } from '../lib/usePageMeta'

const mainLinks = [
  { label: 'Home', href: '/' },
  { label: 'All services', href: '/services' },
  { label: 'City government', href: '/government' },
  { label: 'Places directory', href: '/city/places' },
  { label: 'Transparency', href: '/transparency' },
  { label: 'News', href: '/news' },
  { label: 'News archive', href: '/news/archive' },
  { label: 'About this project', href: '/about' },
  { label: 'Contact and sources', href: '/contact' },
  { label: 'Frequently asked questions', href: '/faq' },
  { label: 'Search', href: '/search' },
]

const governmentLinks = [
  { label: 'City officials', href: '/government/officials' },
  { label: 'Offices and departments', href: '/government/offices' },
  { label: 'Barangays', href: '/government/barangays' },
  { label: 'Emergency hotlines', href: '/government/hotlines' },
  { label: 'Ordinances and executive orders', href: '/government/legislation' },
]

const transparencyLinks = [
  { label: 'Transparency overview', href: '/transparency' },
  { label: 'Budget and spending', href: '/transparency/budget' },
  { label: 'Procurement and bids', href: '/transparency/procurement' },
  { label: 'Infrastructure projects', href: '/transparency/projects' },
  { label: 'Open data', href: '/transparency/open-data' },
]

const cityLinks = [
  { label: 'City profile', href: '/city' },
  { label: 'Life and tourism', href: '/city/life' },
  { label: 'Places directory', href: '/city/places' },
  { label: 'Business and investment', href: '/city/business' },
  { label: 'Online services', href: '/online-services' },
]

const siteLinks = [
  { label: 'Sitemap', href: '/sitemap' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms of use', href: '/terms' },
]

function LinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <section className="flex flex-col rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
      <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
        <h2 className="text-sm font-extrabold uppercase tracking-[0.12em] text-ink-950">{title}</h2>
        <span className="rounded-full bg-brand-50 px-2 py-1 text-[10px] font-bold tabular-nums text-brand-700">
          {links.length}
        </span>
      </div>
      <ul className="mt-2 space-y-0.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              viewTransition
              className="group flex min-h-10 items-center justify-between gap-2 rounded-lg border border-transparent px-2.5 py-2 text-sm text-ink-600 transition hover:border-line hover:bg-surface hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-600"
            >
              <span>{link.label}</span>
              <ArrowUpRight aria-hidden="true" className="size-3.5 shrink-0 text-ink-400 transition group-hover:text-brand-700" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function SitemapPage() {
  usePageMeta(
    'Sitemap',
    'Browse every section of Better San Fernando: services, online services, city government, barangays, offices, city profile, life and tourism, business, transparency, news, and site information.',
  )

  return (
    <>
      <PageHero
        eyebrow="Sitemap"
        title="Everything in the guide"
        description="A complete index of the main sections, all service categories, every barangay page, and every office page."
        crumbs={[{ label: 'Sitemap' }]}
      />

      <div className="container-page py-10 sm:py-14">
        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {[
            { icon: Layers3, count: categories.length, label: 'service categories' },
            { icon: MapPinned, count: barangays.length, label: 'barangay profiles' },
            { icon: Building2, count: offices.length, label: 'office profiles' },
          ].map(({ icon: Icon, count, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand-700 shadow-sm">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <p className="text-sm leading-5 text-ink-600">
                <span className="block text-lg font-extrabold tabular-nums text-ink-950">{count}</span>
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <LinkList title="Main pages" links={mainLinks} />
          <LinkList
            title={`Service categories (${categories.length})`}
            links={categories.map((category) => ({
              label: category.name,
              href: `/services/${category.slug}`,
            }))}
          />
          <div className="flex flex-col gap-6">
            <LinkList title="Government" links={governmentLinks} />
            <LinkList title="Transparency" links={transparencyLinks} />
          </div>
          <div className="flex flex-col gap-6">
            <LinkList title="City and life" links={cityLinks} />
            <LinkList title="Site information" links={siteLinks} />
          </div>
        </div>

        <section className="mt-12 rounded-3xl border border-line bg-surface p-5 sm:p-7">
          <SectionHeading
            eyebrow={`${barangays.length} pages`}
            title="All barangays"
            description="Every barangay profile, grouped alphabetically."
          />
          <ul className="mt-6 grid gap-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...barangays]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((barangay) => (
                <li key={barangay.slug}>
                  <Link
                    to={`/government/barangays/${barangay.slug}`}
                    viewTransition
                    className="group flex min-h-10 items-center justify-between gap-2 rounded-lg border border-transparent bg-white/60 px-3 py-2 text-sm text-ink-700 transition hover:border-line hover:bg-white hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-600"
                  >
                    {barangay.name}
                    <ArrowRight aria-hidden="true" className="size-3.5 shrink-0 text-ink-400 transition group-hover:text-brand-700" />
                  </Link>
                </li>
              ))}
          </ul>
        </section>

        <section className="mt-8 rounded-3xl border border-line bg-surface p-5 sm:p-7">
          <SectionHeading
            eyebrow={`${offices.length} pages`}
            title="All offices and departments"
            description="Every office profile with contacts and services."
          />
          <ul className="mt-6 grid gap-1 sm:grid-cols-2 lg:grid-cols-3">
            {[...offices]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((office) => (
                <li key={office.slug}>
                  <Link
                    to={`/government/offices/${office.slug}`}
                    viewTransition
                    className="group flex min-h-10 items-center justify-between gap-2 rounded-lg border border-transparent bg-white/60 px-3 py-2 text-sm text-ink-700 transition hover:border-line hover:bg-white hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-600"
                  >
                    {office.name}
                    <ArrowRight aria-hidden="true" className="size-3.5 shrink-0 text-ink-400 transition group-hover:text-brand-700" />
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </>
  )
}
