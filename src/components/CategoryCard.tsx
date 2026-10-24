import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/language'
import type { ServiceCategory } from '../data/types'
import { CategoryIcon } from './CategoryIcon'

interface CategoryCardProps {
  category: ServiceCategory
  count: number
}

export function CategoryCard({ category, count }: CategoryCardProps) {
  const { language, translate, hasTranslation } = useLanguage()

  return (
    <Link
      to={`/services/${category.slug}`}
      viewTransition
      className="group relative flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
          <CategoryIcon name={category.icon} className="size-5" />
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 text-ink-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700"
        />
      </div>
      <h3 lang={hasTranslation(category.name) ? language : 'en'} className="mt-5 text-lg font-bold tracking-tight text-ink-950">{translate(category.name)}</h3>
      <p lang={hasTranslation(category.description) ? language : 'en'} className="mt-1.5 flex-1 text-sm leading-6 text-ink-600">{translate(category.description)}</p>
      <p lang={language} className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
        {count} {translate('services')}
      </p>
    </Link>
  )
}
