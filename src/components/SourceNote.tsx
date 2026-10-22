import { Info } from 'lucide-react'
import type { ReactNode } from 'react'

interface SourceNoteProps {
  children: ReactNode
  href?: string
  linkLabel?: string
}

export function SourceNote({ children, href, linkLabel = 'View official source' }: SourceNoteProps) {
  return (
    <div className="flex gap-3 rounded-2xl border border-line bg-surface p-4 text-sm leading-6 text-ink-600">
      <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
      <p>
        {children}
        {href ? (
          <>
            {' '}
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
            >
              {linkLabel}
            </a>
            .
          </>
        ) : null}
      </p>
    </div>
  )
}
