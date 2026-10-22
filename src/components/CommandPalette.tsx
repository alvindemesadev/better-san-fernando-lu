import { ArrowRight, Search, X } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchAll } from '../lib/search'

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

interface PaletteItem {
  title: string
  href: string
  meta: string
}

const quickLinks: PaletteItem[] = [
  { title: 'All city services', href: '/services', meta: 'Services' },
  { title: 'Online services', href: '/online-services', meta: 'Services' },
  { title: 'Emergency hotlines', href: '/government/hotlines', meta: 'Government' },
  { title: 'City officials', href: '/government/officials', meta: 'Government' },
  { title: 'Barangays', href: '/government/barangays', meta: 'Government' },
  { title: 'Budget and spending', href: '/transparency/budget', meta: 'Transparency' },
]

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  return <AnimatePresence>{open ? <CommandPaletteDialog onClose={onClose} /> : null}</AnimatePresence>
}

function CommandPaletteDialog({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)

  const results = useMemo(() => (query.trim() ? searchAll(query, 8) : []), [query])
  const items: PaletteItem[] = query.trim() ? results : quickLinks
  const hasQuery = query.trim().length > 0

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20)
    return () => {
      window.clearTimeout(timer)
      previous?.focus()
    }
  }, [])

  const lenis = useLenis()

  useEffect(() => {
    lenis?.stop()
    return () => lenis?.start()
  }, [lenis])

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  function choose(index: number) {
    const item = items[index]
    if (!item) return
    onClose()
    navigate(item.href)
  }

  return (
    <motion.div
      data-lenis-prevent
      className="fixed inset-0 z-[80] flex items-start justify-center bg-ink-950/40 p-4 pt-[10vh] backdrop-blur-sm sm:pt-[14vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-white shadow-hero"
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search aria-hidden="true" className="size-5 shrink-0 text-ink-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setActive(0)
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                setActive((index) => Math.min(index + 1, items.length - 1))
              } else if (event.key === 'ArrowUp') {
                event.preventDefault()
                setActive((index) => Math.max(index - 1, 0))
              } else if (event.key === 'Enter') {
                event.preventDefault()
                choose(active)
              }
            }}
            placeholder="Search services, offices, barangays…"
            aria-label="Search query"
            autoComplete="off"
            className="h-14 min-w-0 flex-1 bg-transparent text-[15px] font-medium text-ink-950 outline-none placeholder:text-ink-400"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-ink-400 transition hover:bg-surface hover:text-ink-700"
          >
            <X aria-hidden="true" className="size-4" />
          </button>
        </div>

        <ul className="max-h-[55vh] overflow-y-auto p-2">
          {items.length ? (
            items.map((item, index) => (
              <li key={`${item.href}-${item.title}`}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onClick={() => choose(index)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                    active === index ? 'bg-brand-50 text-brand-700' : 'text-ink-800 hover:bg-surface'
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold">{item.title}</span>
                    <span className="block truncate text-xs text-ink-500">{item.meta}</span>
                  </span>
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0 text-ink-400" />
                </button>
              </li>
            ))
          ) : (
            <li className="px-3 py-6 text-sm leading-6 text-ink-500">
              No results for “{query.trim()}”. Try a shorter word, or{' '}
              <button
                type="button"
                onClick={() => {
                  onClose()
                  navigate(`/search?q=${encodeURIComponent(query.trim())}`)
                }}
                className="font-bold text-brand-700 hover:text-brand-800"
              >
                see all results
              </button>
              .
            </li>
          )}
        </ul>

        <div className="flex items-center justify-between gap-3 border-t border-line bg-surface px-4 py-2.5 text-[11px] text-ink-500">
          <span className="hidden sm:inline">
            {hasQuery ? '↑↓ to navigate · Enter to open · Esc to close' : 'Type to search all 243 services'}
          </span>
          <span className="inline-flex items-center gap-1.5 sm:hidden">
            Search
            <kbd className="rounded border border-line bg-white px-1.5 py-0.5 font-mono text-[10px]">Ctrl K</kbd>
          </span>
          <kbd className="hidden rounded border border-line bg-white px-1.5 py-0.5 font-mono text-[10px] sm:inline">
            Ctrl K
          </kbd>
        </div>
      </motion.div>
    </motion.div>
  )
}
