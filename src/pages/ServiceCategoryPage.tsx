import { ArrowRight } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { NotFoundPage } from './NotFoundPage'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SearchBox } from '../components/SearchBox'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceCard } from '../components/ServiceCard'
import { SourceNote } from '../components/SourceNote'
import { categories } from '../data/categories'
import { city } from '../data/city'
import { services } from '../data/services'
import { usePageMeta } from '../lib/usePageMeta'

export function ServiceCategoryPage() {
  const { category: categorySlug } = useParams<{ category: string }>()
  const category = categories.find((item) => item.slug === categorySlug)
  const items = services
    .filter((service) => service.category === categorySlug)
    .sort((a, b) => a.title.localeCompare(b.title))

  usePageMeta(category?.name ?? 'Service category not found', category?.description)

  if (!category) return <NotFoundPage />

  const otherCategories = categories.filter((item) => item.slug !== category.slug)

  return (
    <>
      <PageHero
        eyebrow="Service category"
        title={category.name}
        description={category.description}
        crumbs={[{ label: 'Services', href: '/services' }, { label: category.shortName }]}
        overflowVisible
      >
        <div className="max-w-2xl">
          <SearchBox large placeholder={`Search within ${category.shortName.toLowerCase()} or all services…`} />
        </div>
      </PageHero>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow={`${items.length} services`}
              title={`${category.shortName} services`}
              description={`Every ${category.shortName.toLowerCase()} service currently listed from the Citizens’ Charter. Open a service for requirements, fees, and official forms.`}
              action={
                <Link
                  to="/services"
                  viewTransition
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                >
                  All categories
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              }
            />
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>

          <div className="mt-8">
            <SourceNote href={city.citizensCharter} linkLabel="Open the official Citizens’ Charter">
              Service details are summarized from the City Government’s Citizens’ Charter. Requirements, fees, and
              processing times can change. Confirm with the issuing office before your visit; each service record has
              its own verification date.
            </SourceNote>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <SectionHeading
            eyebrow="Keep exploring"
            title="Other service categories"
            description="Browse the rest of the charter by category."
          />
          <div className="mt-6 flex flex-wrap gap-2">
            {otherCategories.map((item) => (
              <Link
                key={item.slug}
                to={`/services/${item.slug}`}
                viewTransition
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3.5 py-2 text-sm font-semibold text-ink-700 shadow-sm transition hover:border-brand-200 hover:text-brand-700"
              >
                {item.shortName}
                <span className="rounded-full bg-surface px-2 py-0.5 text-[11px] font-bold text-ink-500">
                  {item.serviceCount}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
