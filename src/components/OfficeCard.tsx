import { ArrowRight, Building2, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Office } from '../data/types'

interface OfficeCardProps {
  office: Office
}

export function OfficeCard({ office }: OfficeCardProps) {
  return (
    <Link
      to={`/government/offices/${office.slug}`}
      viewTransition
      className="group flex h-full min-w-0 flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <Building2 aria-hidden="true" className="size-4" />
        </span>
        <ArrowRight
          aria-hidden="true"
          className="mt-1 size-4 text-ink-400 transition group-hover:translate-x-0.5 group-hover:text-brand-700"
        />
      </div>
      <h3 className="mt-4 line-clamp-2 text-[15px] font-bold leading-6 text-ink-950 group-hover:text-brand-700">
        {office.name}
      </h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">{office.sector}</p>
      <div className="mt-4 flex-1 space-y-1.5 text-sm leading-6 text-ink-600">
        {office.head ? (
          <p className="line-clamp-2">
            <span className="font-medium text-ink-700">{office.head}</span>
            {office.position ? <span className="text-ink-500"> · {office.position}</span> : null}
          </p>
        ) : (
          <p className="text-ink-400">Head not listed</p>
        )}
        {office.contact ? (
          <p className="flex min-w-0 items-center gap-1.5 text-xs text-ink-500">
            <Phone aria-hidden="true" className="size-3 shrink-0" />
            <span className="min-w-0 truncate">{office.contact}</span>
          </p>
        ) : null}
      </div>
      <p className="mt-4 border-t border-line pt-3 text-xs font-semibold text-brand-700">
        {office.serviceCount} {office.serviceCount === 1 ? 'service' : 'services'}
      </p>
    </Link>
  )
}
