import { LocalizedText } from '../i18n/LocalizedText'
import { ArrowLeft, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'

export function NotFoundPage() {
  usePageMeta('Page not found', 'The page you requested could not be found on Better San Fernando.')

  return (
    <section className="container-page py-16 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">404</p>
        <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-[-0.035em] text-ink-950 sm:text-4xl">
          <LocalizedText text={"Page not found"} /></h1>
        <p className="mt-3 text-pretty text-[15px] leading-7 text-ink-600">
          <LocalizedText text={"The link may be old, or the page may have moved. Head back home or search for a service, office, or barangay."} /></p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            viewTransition
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-700"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            <LocalizedText text={"Back to home"} /></Link>
          <Link
            to="/search"
            viewTransition
            className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-bold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
          >
            <Search aria-hidden="true" className="size-4" />
            <LocalizedText text={"Search the guide"} /></Link>
        </div>
      </div>
    </section>
  )
}
