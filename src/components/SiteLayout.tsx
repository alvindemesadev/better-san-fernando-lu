import { ExternalLink, ShieldCheck } from 'lucide-react'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { city } from '../data/city'
import { ErrorBoundary } from './ErrorBoundary'
import { PageFallback } from './PageFallback'
import { ScrollProgress } from './ScrollProgress'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <a
        href="#main-content"
        className="sr-only z-[70] rounded-lg bg-white px-4 py-2 font-semibold text-brand-700 shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <div className="bg-ink-950 text-white">
        <div className="container-page flex min-h-9 flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1.5 text-[11px] sm:text-xs">
          <p className="inline-flex items-center gap-1.5 text-white/65">
            <ShieldCheck aria-hidden="true" className="size-3.5 text-accent" />
            An independent civic project, not the official city website
          </p>
          <div className="flex items-center gap-4">
            <a
              href={city.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-white/70 transition hover:text-white"
            >
              Official city website
              <ExternalLink aria-hidden="true" className="size-3" />
            </a>
            <a href="tel:911" className="font-bold text-accent transition hover:text-white">
              Emergency: 911
            </a>
          </div>
        </div>
      </div>

      <SiteHeader />

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
