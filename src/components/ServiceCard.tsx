import { ArrowRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/language'
import type { Service } from '../data/types'

interface ServiceCardProps {
  service: Service
  categoryName?: string
}

export function ServiceCard({ service, categoryName }: ServiceCardProps) {
  const { language, translate, hasTranslation } = useLanguage()

  return (
    <Link
      to={`/services/${service.category}/${service.slug}`}
      viewTransition
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
          <FileText aria-hidden="true" className="size-4" />
        </span>
        <div>
          {categoryName ? (
            <p lang={hasTranslation(categoryName) ? language : 'en'} className="text-[11px] font-bold uppercase tracking-[0.13em] text-brand-700">{translate(categoryName)}</p>
          ) : null}
          <h3 lang="en" className="mt-0.5 line-clamp-3 text-[15px] font-bold leading-6 text-ink-950 group-hover:text-brand-700">
            {service.title}
          </h3>
        </div>
      </div>
      <p lang="en" className="mb-4 mt-3 line-clamp-2 text-sm leading-6 text-ink-600">{service.summary}</p>
      <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-3">
        <span lang="en" className="min-w-0 truncate text-xs font-medium text-ink-500">{service.office}</span>
        <ArrowRight
          aria-hidden="true"
          className="size-4 shrink-0 text-ink-400 transition group-hover:translate-x-0.5 group-hover:text-brand-700"
        />
      </div>
    </Link>
  )
}
