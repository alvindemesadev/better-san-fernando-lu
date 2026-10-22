import { SearchX } from 'lucide-react'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-line-dark bg-surface px-6 py-14 text-center">
      <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-ink-400 shadow-sm">
        <SearchX aria-hidden="true" className="size-5" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-ink-950">{title}</h3>
      <p className="mt-1 max-w-md text-sm leading-6 text-ink-600">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}
