import type { ReactNode } from 'react'
import { Breadcrumbs, type Crumb } from './Breadcrumbs'
import { useLanguage } from '../i18n/language'

interface PageHeroProps {
  title: string
  description?: string
  eyebrow?: string
  crumbs?: Crumb[]
  children?: ReactNode
  overflowVisible?: boolean
}

export function PageHero({ title, description, eyebrow, crumbs, children, overflowVisible = false }: PageHeroProps) {
  const { language, translate, hasTranslation } = useLanguage()

  return (
    <section
      className={`relative isolate border-b border-line bg-[linear-gradient(135deg,#f5f7ff_0%,#ffffff_70%)] ${
        overflowVisible ? 'z-20 overflow-visible' : 'overflow-hidden'
      }`}
    >
      <div aria-hidden="true" className="dot-grid absolute inset-y-0 right-0 -z-10 w-2/3 opacity-35" />
      <div className="container-page py-10 sm:py-12 lg:py-16">
        {crumbs ? <Breadcrumbs items={crumbs} className="mb-7" /> : null}
        {eyebrow ? (
          <p lang={hasTranslation(eyebrow) ? language : 'en'} className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">{translate(eyebrow)}</p>
        ) : null}
        <h1 lang={hasTranslation(title) ? language : 'en'} className="max-w-4xl text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] text-ink-950 sm:text-4xl lg:text-[3.25rem]">
          {translate(title)}
        </h1>
        {description ? (
          <p lang={hasTranslation(description) ? language : 'en'} className="mt-4 max-w-3xl text-pretty text-base leading-7 text-ink-600 sm:text-lg">{translate(description)}</p>
        ) : null}
        {children ? <div className="mt-7">{children}</div> : null}
      </div>
    </section>
  )
}
