import { useLanguage } from '../i18n/language'

export function PageFallback() {
  const { translate } = useLanguage()
  return (
    <div className="container-page py-16 sm:py-20" role="status" aria-live="polite">
      <span className="sr-only">{translate('Loading page')}</span>
      <div className="h-3 w-28 animate-pulse rounded-full bg-line" />
      <div className="mt-5 h-10 w-2/3 max-w-xl animate-pulse rounded-xl bg-line" />
      <div className="mt-4 h-4 w-full max-w-2xl animate-pulse rounded-full bg-line" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-44 animate-pulse rounded-2xl border border-line bg-surface" />
        ))}
      </div>
    </div>
  )
}
