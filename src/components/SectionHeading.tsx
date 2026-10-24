import type { ReactNode } from 'react'
import { useLanguage } from '../i18n/language'

interface SectionHeadingProps {
  title: string
  description?: string
  eyebrow?: string
  action?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeading({ title, description, eyebrow, action, align = 'left' }: SectionHeadingProps) {
  const { language, translate, hasTranslation } = useLanguage()

  return (
    <div
      className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${
        align === 'center' ? 'text-center sm:flex-col sm:items-center' : ''
      }`}
    >
      <div className={align === 'center' ? 'max-w-2xl' : 'max-w-2xl'}>
        {eyebrow ? (
          <p lang={hasTranslation(eyebrow) ? language : 'en'} className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">{translate(eyebrow)}</p>
        ) : null}
        <h2 lang={hasTranslation(title) ? language : 'en'} className="text-balance text-2xl font-extrabold tracking-[-0.025em] text-ink-950 sm:text-3xl">
          {translate(title)}
        </h2>
        {description ? (
          <p lang={hasTranslation(description) ? language : 'en'} className="mt-3 text-pretty text-[15px] leading-7 text-ink-600 sm:text-base">{translate(description)}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
