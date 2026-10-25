import { ExternalLink, ShieldCheck } from 'lucide-react'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { CustomSelect } from './CustomSelect'
import { city } from '../data/city'
import { languageOptions, useLanguage } from '../i18n/language'
import { ErrorBoundary } from './ErrorBoundary'
import { PageFallback } from './PageFallback'
import { ScrollProgress } from './ScrollProgress'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function SiteLayout() {
  const { language, setLanguage, translate } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <a
        href="#main-content"
        lang={language}
        className="sr-only z-[70] rounded-lg bg-white px-4 py-2 font-semibold text-brand-700 shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {translate('Skip to content')}
      </a>
      <div className="relative z-[60] bg-ink-950 text-white">
        <div className="container-page flex flex-col gap-y-1 py-1.5 text-[11px] sm:text-xs lg:flex-row lg:items-center lg:justify-between lg:gap-x-6">
          <p className="inline-flex items-center gap-1.5 text-white/65">
            <ShieldCheck aria-hidden="true" className="size-3.5 text-accent" />
            {translate('An independent civic project, not the official city website')}
          </p>
          <div className="flex items-center justify-between gap-x-3 lg:justify-end lg:gap-x-4">
            <a
              href={city.website}
              target="_blank"
              rel="noreferrer"
              aria-label={translate('Official city website')}
              className="inline-flex items-center gap-1 text-white/70 transition hover:text-white"
            >
              <span className="lg:hidden">{translate('City website')}</span>
              <span className="hidden lg:inline">{translate('Official city website')}</span>
              <ExternalLink aria-hidden="true" className="size-3" />
            </a>
            <a href="tel:911" aria-label={translate('Emergency: 911')} className="font-bold text-accent transition hover:text-white">
              <span aria-hidden="true" className="lg:hidden">911</span>
              <span className="hidden lg:inline">{translate('Emergency: 911')}</span>
            </a>
            <label className="sr-only" htmlFor="site-language">
              {translate('Choose language')}
            </label>
            <CustomSelect
              id="site-language"
              ariaLabel={translate('Choose language')}
              value={language}
              onChange={(value) => setLanguage(value as typeof language)}
              options={languageOptions.map((option) => ({ value: option.code, label: option.label }))}
              className="w-[7.5rem] shrink-0"
              buttonClassName="!h-8 !rounded-md !border-white/20 !bg-ink-900 !px-2 !text-[11px] !font-semibold !text-white !shadow-none hover:!border-white/40 focus-visible:!border-accent focus-visible:!ring-2 focus-visible:!ring-accent sm:!text-xs"
              menuClassName="left-auto right-0 w-36"
            />
          </div>
        </div>
      </div>

      <SiteHeader />

      {language !== 'en' ? (
        <p role="status" lang={language} className="border-b border-line bg-brand-50 px-4 py-2 text-center text-xs text-ink-600">
          {translate('Some detailed content and official records remain in the source language.')}
        </p>
      ) : null}

      <main id="main-content" tabIndex={-1} className="flex-1 scroll-mt-24">
        <ErrorBoundary>
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>

      <SiteFooter />
    </div>
  )
}
