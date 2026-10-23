import {
  ArrowRight,
  Building2,
  ClipboardList,
  FileText,
  MapPin,
  Newspaper,
  Search,
  X,
} from 'lucide-react'
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { searchAll, type SearchResult } from '../lib/search'
import { cn, pluralize } from '../lib/utils'

interface SearchBoxProps {
  defaultValue?: string
  placeholder?: string
  large?: boolean
  autoFocus?: boolean
  className?: string
  defaultSuggestions?: string[]
}

const resultIcons = {
  Service: ClipboardList,
  Office: Building2,
  Barangay: MapPin,
  News: Newspaper,
  Page: FileText,
}

export function SearchBox({
  defaultValue = '',
  placeholder = 'Search services, offices, barangays…',
  large = false,
  autoFocus = false,
  className,
  defaultSuggestions = [],
}: SearchBoxProps) {
  const [query, setQuery] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const baseId = useId()
  const inputId = `${baseId}-input`
  const listboxId = `${baseId}-results`

  const results = useMemo(() => {
    const value = query.trim()
    return value ? searchAll(value, 60) : []
  }, [query])
  const suggestions = results.slice(0, 6)
  const hasQuery = query.trim().length > 0
  const showSuggestions = open && hasQuery
  const showDefaults = open && !hasQuery && defaultSuggestions.length > 0
  const showPanel = showSuggestions || showDefaults
  const selectedIndex = Math.min(active, Math.max(suggestions.length - 1, 0))
  const activeResult = suggestions[selectedIndex]
  const selectedDefaultIndex = Math.min(active, Math.max(defaultSuggestions.length - 1, 0))
  const activeDefault = defaultSuggestions[selectedDefaultIndex]
  const optionCount = showSuggestions ? suggestions.length : defaultSuggestions.length
  const activeOptionId =
    showSuggestions && activeResult
      ? `${listboxId}-option-${selectedIndex}`
      : showDefaults && activeDefault
        ? `${listboxId}-option-${selectedDefaultIndex}`
        : undefined

  useEffect(() => {
    if (!showPanel) return

    function handlePointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [showPanel])

  function submitSearch(value: string) {
    const term = value.trim()
    if (!term) {
      setOpen(true)
      inputRef.current?.focus()
      return
    }
    setOpen(false)
    navigate(`/search?q=${encodeURIComponent(term)}`, { viewTransition: true })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submitSearch(query)
  }

  function choose(result: SearchResult) {
    setOpen(false)
    navigate(result.href, { viewTransition: true })
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown' && optionCount) {
      event.preventDefault()
      setOpen(true)
      setActive((index) => Math.min(index + 1, optionCount - 1))
    } else if (event.key === 'ArrowUp' && optionCount) {
      event.preventDefault()
      setOpen(true)
      setActive((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter' && showSuggestions && activeResult) {
      event.preventDefault()
      choose(activeResult)
    } else if (event.key === 'Enter' && showDefaults && activeDefault) {
      event.preventDefault()
      submitSearch(activeDefault)
    } else if (event.key === 'Escape' && showPanel) {
      event.preventDefault()
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className={cn('relative w-full min-w-0', className)}>
      <form
        role="search"
        onSubmit={handleSubmit}
        className={cn(
          'flex w-full min-w-0 items-center gap-2 rounded-2xl bg-white p-1.5 shadow-float ring-1 ring-black/5 focus-within:ring-2 focus-within:ring-brand-500/60',
          large ? 'sm:p-2' : '',
        )}
      >
        <Search aria-hidden="true" className={cn('ml-2 shrink-0 text-ink-400', large ? 'size-5' : 'size-4')} />
        <label htmlFor={inputId} className="sr-only">
          Search this site
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setActive(0)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showPanel}
          aria-controls={showPanel ? listboxId : undefined}
          aria-activedescendant={activeOptionId}
          className={cn(
            'w-0 min-w-0 flex-1 bg-transparent text-ink-900 outline-none placeholder:text-ink-400',
            large ? 'py-2 text-base sm:py-2.5 sm:text-lg' : 'py-1.5 text-sm',
          )}
        />
        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setOpen(false)
              setActive(0)
              inputRef.current?.focus()
            }}
            aria-label="Clear search"
            className={cn(
              'inline-flex shrink-0 items-center justify-center rounded-lg text-ink-600 transition hover:bg-surface hover:text-ink-700',
              large ? 'size-10' : 'size-9',
            )}
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        ) : null}
        <button
          type="submit"
          className={cn(
            'min-h-11 shrink-0 rounded-xl bg-brand-600 font-bold text-white transition hover:bg-brand-700',
            large ? 'px-4 py-2.5 text-sm sm:px-6 sm:py-3 sm:text-base' : 'px-3 py-2 text-xs',
          )}
        >
          Search
        </button>
      </form>

      {showPanel ? (
        <div className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-line bg-white shadow-hero">
          {showSuggestions ? (
            suggestions.length ? (
              <ul
                id={listboxId}
                role="listbox"
                aria-label="Search suggestions"
                className="scrollbar-slim max-h-[min(22rem,55vh)] overflow-y-auto p-2"
              >
                {suggestions.map((result, index) => {
                  const Icon = resultIcons[result.kind]
                  const isActive = index === selectedIndex
                  const description =
                    result.meta === result.kind ? result.description : `${result.meta} · ${result.description}`

                  return (
                    <li key={`${result.kind}-${result.href}`} role="presentation">
                      <button
                        type="button"
                        id={`${listboxId}-option-${index}`}
                        role="option"
                        aria-selected={isActive}
                        onMouseEnter={() => setActive(index)}
                        onClick={() => choose(result)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition',
                          isActive ? 'bg-brand-50' : 'hover:bg-surface',
                        )}
                      >
                        <span
                          className={cn(
                            'inline-flex size-9 shrink-0 items-center justify-center rounded-xl text-brand-700',
                            isActive ? 'bg-white' : 'bg-brand-50',
                          )}
                        >
                          <Icon aria-hidden="true" className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="min-w-0 flex-1 truncate text-sm font-bold text-ink-950">
                              {result.title}
                            </span>
                            <span className="shrink-0 rounded-full bg-surface px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-brand-700">
                              {result.kind}
                            </span>
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-ink-500">{description}</span>
                        </span>
                        <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-ink-400" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="px-4 py-4 text-sm leading-6 text-ink-500" role="status">
                <span className="block text-sm font-bold text-ink-950">No quick matches</span>
                Press Enter to search every page for your query.
              </p>
            )
          ) : (
            <>
              <p className="px-4 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-400">
                Popular searches
              </p>
              <ul
                id={listboxId}
                role="listbox"
                aria-label="Popular searches"
                className="scrollbar-slim max-h-[min(22rem,55vh)] overflow-y-auto p-2 pt-0"
              >
                {defaultSuggestions.map((term, index) => {
                  const isActive = index === selectedDefaultIndex

                  return (
                    <li key={term} role="presentation">
                      <button
                        type="button"
                        id={`${listboxId}-option-${index}`}
                        role="option"
                        aria-selected={isActive}
                        onMouseEnter={() => setActive(index)}
                        onClick={() => submitSearch(term)}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition',
                          isActive ? 'bg-brand-50' : 'hover:bg-surface',
                        )}
                      >
                        <span
                          className={cn(
                            'inline-flex size-9 shrink-0 items-center justify-center rounded-xl text-brand-700',
                            isActive ? 'bg-white' : 'bg-brand-50',
                          )}
                        >
                          <Search aria-hidden="true" className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-bold text-ink-950">{term}</span>
                          <span className="mt-0.5 block truncate text-xs text-ink-500">
                            Search across the city guide
                          </span>
                        </span>
                        <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-ink-400" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </>
          )}

          <div className="flex items-center justify-between gap-3 border-t border-line bg-surface px-3 py-2 text-[11px] text-ink-500">
            {showSuggestions ? (
              <>
                <span aria-live="polite">
                  {results.length ? pluralize(results.length, 'match', 'matches') : 'No matches'}
                </span>
                <button
                  type="button"
                  onClick={() => submitSearch(query)}
                  className="inline-flex shrink-0 items-center gap-1 font-bold text-brand-700 transition hover:text-brand-800"
                >
                  See all results
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </button>
              </>
            ) : (
              <>
                <span aria-live="polite">
                  {pluralize(defaultSuggestions.length, 'popular search', 'popular searches')}
                </span>
                <span className="hidden sm:inline">Type to narrow results</span>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
