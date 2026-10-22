import { ChevronRight, House } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '../lib/utils'

export interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: Crumb[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex flex-wrap items-center gap-x-2 gap-y-1 text-sm', className)}>
      <Link
        to="/"
        viewTransition
        className="inline-flex items-center gap-1.5 font-medium text-ink-500 transition hover:text-brand-700"
      >
        <House aria-hidden="true" className="size-3.5" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            <ChevronRight aria-hidden="true" className="size-3.5 text-ink-400" />
            {item.href && !isLast ? (
              <Link to={item.href} viewTransition className="font-medium text-ink-500 transition hover:text-brand-700">
                {item.label}
              </Link>
            ) : (
              <span aria-current={isLast ? 'page' : undefined} className="font-semibold text-ink-700">
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
