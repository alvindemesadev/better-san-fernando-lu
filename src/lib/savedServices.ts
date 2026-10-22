import { useSyncExternalStore } from 'react'

export interface SavedServiceRef {
  category: string
  slug: string
  title: string
  office: string
}

const STORAGE_KEY = 'bsf:saved-services'
const MAX_SAVED = 50
const EMPTY: SavedServiceRef[] = []

let cache: SavedServiceRef[] | null = null
const listeners = new Set<() => void>()

function isSavedRef(value: unknown): value is SavedServiceRef {
  if (!value || typeof value !== 'object') return false
  const ref = value as Record<string, unknown>
  return (
    typeof ref.category === 'string' &&
    typeof ref.slug === 'string' &&
    typeof ref.title === 'string' &&
    typeof ref.office === 'string'
  )
}

function readFromStorage(): SavedServiceRef[] {
  if (typeof window === 'undefined') return EMPTY
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isSavedRef).slice(0, MAX_SAVED) : EMPTY
  } catch {
    return EMPTY
  }
}

function getSnapshot(): SavedServiceRef[] {
  if (cache === null) cache = readFromStorage()
  return cache
}

function emit() {
  for (const listener of listeners) listener()
}

function commit(next: SavedServiceRef[]) {
  cache = next
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Storage can be full or blocked; the in-memory list still works for this session.
    }
  }
  emit()
}

function isSame(ref: SavedServiceRef, other: SavedServiceRef) {
  return ref.slug === other.slug && ref.category === other.category
}

function onStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) return
  cache = readFromStorage()
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (listeners.size === 1 && typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage)
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0 && typeof window !== 'undefined') {
      window.removeEventListener('storage', onStorage)
    }
  }
}

export function useSavedServices() {
  return useSyncExternalStore(subscribe, getSnapshot, () => EMPTY)
}

export function isServiceSaved(ref: SavedServiceRef) {
  return getSnapshot().some((saved) => isSame(saved, ref))
}

export function toggleSavedService(ref: SavedServiceRef) {
  const current = getSnapshot()
  const exists = current.some((saved) => isSame(saved, ref))
  commit(exists ? current.filter((saved) => !isSame(saved, ref)) : [ref, ...current].slice(0, MAX_SAVED))
}

export function removeSavedService(ref: SavedServiceRef) {
  commit(getSnapshot().filter((saved) => !isSame(saved, ref)))
}
