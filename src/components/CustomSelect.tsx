import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { cn } from '../lib/utils'

export interface CustomSelectOption {
  value: string
  label: string
}

interface CustomSelectProps {
  id?: string
  ariaLabel?: string
  label?: string
  options: CustomSelectOption[]
  value: string
  onChange: (value: string) => void
}

export function CustomSelect({ id, ariaLabel, label, options, value, onChange }: CustomSelectProps) {
  const generatedId = useId()
  const selectId = id ?? generatedId
  const listboxId = `${selectId}-listbox`
  const selectedIndex = options.findIndex((option) => option.value === value)
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(Math.max(selectedIndex, 0))
  const rootRef = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<Array<HTMLDivElement | null>>([])
  const typeahead = useRef('')
  const typeaheadTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!open) return

    function closeOnOutsidePointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    return () => document.removeEventListener('pointerdown', closeOnOutsidePointer)
  }, [open])

  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, open])

  useEffect(
    () => () => {
      if (typeaheadTimeout.current) clearTimeout(typeaheadTimeout.current)
    },
    [],
  )

  function choose(index: number) {
    const option = options[index]
    if (!option) return
    onChange(option.value)
    setActiveIndex(index)
    setOpen(false)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!options.length) return

    const lastIndex = options.length - 1
    const currentIndex = activeIndex >= 0 && activeIndex <= lastIndex ? activeIndex : Math.max(selectedIndex, 0)

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex(open ? (currentIndex + 1) % options.length : Math.max(selectedIndex, 0))
      setOpen(true)
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex(open ? (currentIndex - 1 + options.length) % options.length : selectedIndex >= 0 ? selectedIndex : lastIndex)
      setOpen(true)
      return
    }

    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      setActiveIndex(event.key === 'Home' ? 0 : lastIndex)
      setOpen(true)
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (open) choose(currentIndex)
      else {
        setActiveIndex(Math.max(selectedIndex, 0))
        setOpen(true)
      }
      return
    }

    if (event.key === 'Escape') {
      if (open) {
        event.preventDefault()
        setOpen(false)
      }
      return
    }

    if (event.key === 'Tab') {
      setOpen(false)
      return
    }
    if (event.ctrlKey || event.metaKey || event.altKey || event.key.length !== 1) return

    event.preventDefault()
    const character = event.key.toLocaleLowerCase()
    const previous = typeahead.current
    const repeatedCharacter = previous && [...previous].every((item) => item === character)
    const search = repeatedCharacter ? character : `${previous}${character}`
    typeahead.current = search
    if (typeaheadTimeout.current) clearTimeout(typeaheadTimeout.current)
    typeaheadTimeout.current = setTimeout(() => {
      typeahead.current = ''
    }, 700)

    const startIndex = open ? (currentIndex + 1) % options.length : Math.max(selectedIndex, 0)
    for (let offset = 0; offset < options.length; offset += 1) {
      const index = (startIndex + offset) % options.length
      const option = options[index]
      if (option?.label.toLocaleLowerCase().startsWith(search)) {
        setActiveIndex(index)
        setOpen(true)
        break
      }
    }
  }

  return (
    <div ref={rootRef} className="relative min-w-0">
      <button
        id={selectId}
        type="button"
        role="combobox"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={open ? `${listboxId}-option-${activeIndex}` : undefined}
        onClick={() => {
          if (open) setOpen(false)
          else {
            setActiveIndex(Math.max(selectedIndex, 0))
            setOpen(true)
          }
        }}
        onKeyDown={handleKeyDown}
        className={cn(
          'flex h-11 w-full items-center justify-between gap-3 rounded-xl border bg-white px-3.5 text-left text-sm font-semibold text-ink-800 shadow-sm outline-none transition focus-visible:border-brand-400 focus-visible:ring-4 focus-visible:ring-brand-100',
          open ? 'border-brand-300 ring-4 ring-brand-100' : 'border-line hover:border-line-dark',
        )}
      >
        <span className="min-w-0 flex-1 truncate">
          {options[selectedIndex]?.label ?? options[0]?.label ?? ''}
        </span>
        <ChevronDown aria-hidden="true" className={cn('size-4 shrink-0 text-ink-500 transition', open && 'rotate-180')} />
      </button>

      <div
        id={listboxId}
        role="listbox"
        aria-label={ariaLabel ?? label ?? 'Options'}
        data-lenis-prevent
        hidden={!open}
        className="scrollbar-slim absolute left-0 right-0 top-full z-50 mt-2 max-h-[min(20rem,50vh)] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-white p-1.5 shadow-hero"
      >
        {options.map((option, index) => {
          const active = index === activeIndex
          const selected = option.value === value

          return (
            <div
              key={`${option.value}-${index}`}
              ref={(element) => { optionRefs.current[index] = element }}
              id={`${listboxId}-option-${index}`}
              role="option"
              aria-selected={selected}
              onMouseDown={(event) => event.preventDefault()}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => choose(index)}
              className={cn(
                'flex min-h-10 cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition',
                active ? 'bg-brand-50 text-brand-800' : 'text-ink-700 hover:bg-surface',
              )}
            >
              <span className="min-w-0 flex-1">{option.label}</span>
              {selected ? <Check aria-hidden="true" className="size-4 shrink-0 text-brand-700" /> : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
