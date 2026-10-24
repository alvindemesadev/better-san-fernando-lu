import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'
import { useLanguage } from '../i18n/language'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  override state: State = {
    hasError: false,
    error: null,
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled error caught by ErrorBoundary:', error, errorInfo)
  }

  resetError = () => {
    this.setState({ hasError: false, error: null })
  }

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[50vh] items-center justify-center px-4 py-16">
          <div className="mx-auto w-full max-w-md rounded-2xl border border-line bg-white p-6 text-center shadow-card sm:p-8">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
              <AlertCircle className="size-6" aria-hidden="true" />
            </div>
            <ErrorFallback onRetry={this.resetError} />
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

function ErrorFallback({ onRetry }: { onRetry: () => void }) {
  const { translate } = useLanguage()

  return (
    <>
      <h2 className="mt-4 text-lg font-bold text-ink-950">{translate('Something went wrong loading this content')}</h2>
      <p className="mt-2 text-sm leading-6 text-ink-600">
        {translate('A temporary network interruption or updated site asset may have prevented this section from opening.')}
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <RefreshCw className="size-4" aria-hidden="true" />
          {translate('Try again')}
        </button>
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 transition hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <Home className="size-4" aria-hidden="true" />
          {translate('Back to home')}
        </a>
      </div>
    </>
  )
}
