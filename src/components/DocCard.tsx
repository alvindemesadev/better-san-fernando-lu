import { ArrowUpRight, FileText } from 'lucide-react'
import type { BudgetDoc } from '../data/types'

export function DocCard({ doc }: { doc: BudgetDoc }) {
  return (
    <a
      href={doc.url}
      target="_blank"
      rel="noreferrer"
      className="group flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-float"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
          <FileText aria-hidden="true" className="size-4" />
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 text-ink-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-700"
        />
      </div>
      <h3 className="mt-4 text-[15px] font-bold leading-6 text-ink-950 group-hover:text-brand-700">{doc.title}</h3>
      <p className="mt-1 flex-1 text-sm leading-6 text-ink-600">{doc.description}</p>
      <p className="mt-4 border-t border-line pt-3 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-700">
        {doc.category}
      </p>
    </a>
  )
}
