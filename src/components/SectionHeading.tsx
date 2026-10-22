import type { ReactNode } from 'react'

interface SectionHeadingProps {
  title: string
  description?: string
  eyebrow?: string
  action?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeading({ title, description, eyebrow, action, align = 'left' }: SectionHeadingProps) {
  return (
    <div
      className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${
        align === 'center' ? 'text-center sm:flex-col sm:items-center' : ''
      }`}
    >
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow ? (
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">{eyebrow}</p>
        ) : null}
        <h2 className="text-balance text-2xl font-extrabold tracking-[-0.025em] text-ink-950 sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-pretty text-[15px] leading-7 text-ink-600 sm:text-base">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
