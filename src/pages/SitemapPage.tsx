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
  { label: 'Transparency', href: '/transparency' },
  { label: 'News', href: '/news' },
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
]

const transparencyLinks = [
  { label: 'Transparency overview', href: '/transparency' },
  { label: 'Budget and spending', href: '/transparency/budget' },
  { label: 'Procurement and bids', href: '/transparency/procurement' },
  { label: 'Open data', href: '/transparency/open-data' },
]

const cityLinks = [
  { label: 'City profile', href: '/city' },
  { label: 'Life and tourism', href: '/city/life' },
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
    <section>
      <h2 className="border-b border-line pb-3 text-sm font-extrabold uppercase tracking-[0.12em] text-ink-950">
        {title}
      </h2>
      <ul className="mt-3 space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link to={link.href} viewTransition className="text-sm text-ink-600 transition hover:text-brand-700">
              {link.label}
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
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <LinkList title="Main pages" links={mainLinks} />
          <LinkList
            title={`Service categories (${categories.length})`}
            links={categories.map((category) => ({
              label: category.name,
              href: `/services/${category.slug}`,
            }))}
          />
          <LinkList title="Government" links={governmentLinks} />
          <div className="space-y-10">
            <LinkList title="Transparency" links={transparencyLinks} />
            <LinkList title="City and life" links={cityLinks} />
            <LinkList title="Site information" links={siteLinks} />
          </div>
        </div>

        <section className="mt-14">
          <SectionHeading
            eyebrow={`${barangays.length} pages`}
            title="All barangays"
            description="Every barangay profile, grouped alphabetically."
          />
          <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...barangays]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((barangay) => (
                <li key={barangay.slug}>
                  <Link
                    to={`/government/barangays/${barangay.slug}`}
                    viewTransition
                    className="inline-flex text-sm text-ink-600 transition hover:text-brand-700"
                  >
                    {barangay.name}
                  </Link>
                </li>
              ))}
          </ul>
        </section>

        <section className="mt-14 border-t border-line pt-10">
          <SectionHeading
            eyebrow={`${offices.length} pages`}
            title="All offices and departments"
            description="Every office profile with contacts and services."
          />
          <ul className="mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {[...offices]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((office) => (
                <li key={office.slug}>
                  <Link
                    to={`/government/offices/${office.slug}`}
                    viewTransition
                    className="inline-flex text-sm text-ink-600 transition hover:text-brand-700"
                  >
                    {office.name}
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </>
  )
}
