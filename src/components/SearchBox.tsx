import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'

interface SearchBoxProps {
  defaultValue?: string
  placeholder?: string
  large?: boolean
  autoFocus?: boolean
  className?: string
}

export function SearchBox({
  defaultValue = '',
  placeholder = 'Search services, offices, barangays…',
  large = false,
  autoFocus = false,
  className,
}: SearchBoxProps) {
  const [query, setQuery] = useState(defaultValue)
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = query.trim()
    if (value) navigate(`/search?q=${encodeURIComponent(value)}`, { viewTransition: true })
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={cn(
        'flex items-center gap-2 rounded-2xl bg-white p-1.5 shadow-float ring-1 ring-black/5',
        large ? 'sm:p-2' : '',
        className,
      )}
    >
      <Search aria-hidden="true" className={cn('ml-2 shrink-0 text-ink-400', large ? 'size-5' : 'size-4')} />
      <label htmlFor="site-search" className="sr-only">
        Search this site
      </label>
      <input
        id="site-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn(
          'min-w-0 flex-1 bg-transparent text-ink-900 outline-none placeholder:text-ink-400',
          large ? 'py-2 text-base sm:py-2.5 sm:text-lg' : 'py-1.5 text-sm',
        )}
      />
      <button
        type="submit"
        className={cn(
          'shrink-0 rounded-xl bg-brand-600 font-bold text-white transition hover:bg-brand-700',
          large ? 'px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base' : 'px-3 py-2 text-xs',
        )}
      >
        Search
      </button>
    </form>
  )
}
