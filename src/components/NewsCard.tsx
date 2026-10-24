import { ArrowRight, CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/language'
import type { NewsItem } from '../data/types'
import { formatShortDate } from '../lib/utils'

interface NewsCardProps {
  item: NewsItem
  compact?: boolean
}

export function NewsCard({ item, compact = false }: NewsCardProps) {
  const { translate } = useLanguage()
  const href = `/news/${item.slug}`

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <Link to={href} viewTransition aria-label={`${translate('Read the story')}: ${item.title}`} className="relative block overflow-hidden">
        <img
          src={item.image}
          alt=""
          loading="lazy"
          className={`w-full object-cover transition duration-500 group-hover:scale-[1.025] ${compact ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}
        />
        <span className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-white/95 text-ink-800 shadow-sm">
          <ArrowRight aria-hidden="true" className="size-4 transition group-hover:translate-x-0.5" />
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-400">
          <CalendarDays aria-hidden="true" className="size-3" />
          {formatShortDate(item.date)}
        </p>
        <h3 lang="en" className="mt-2 line-clamp-3 text-[15px] font-bold leading-6 text-ink-950 group-hover:text-brand-700">
          <Link to={href} viewTransition>
            {item.title}
          </Link>
        </h3>
        <p lang="en" className="mb-4 mt-2 line-clamp-3 text-sm leading-6 text-ink-600">{item.excerpt}</p>
        <Link
          to={href}
          viewTransition
          className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-800"
        >
          {translate('Read the story')}
          <ArrowRight aria-hidden="true" className="size-3" />
        </Link>
      </div>
    </article>
  )
}
