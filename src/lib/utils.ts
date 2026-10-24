export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(value))
}

export function formatShortDate(value: string) {
  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat('en-PH').format(value)
}

export function formatPeso(value: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value)
}

export function telHref(value: string) {
  return `tel:${value.replace(/[^\d+]/g, '')}`
}

const nameSuffixes = new Set(['JR', 'SR', 'II', 'III', 'IV', 'V'])

export function initials(name: string) {
  const parts = name
    .replace(/^(Hon\.|Atty\.|Dr\.|Ms\.|Mr\.|Engr\.)\s*/i, '')
    .split(/\s+/)
    .filter((part) => /^[A-Za-zÑñ]/.test(part))

  if (parts.length === 0) return ''

  const lastName = [...parts]
    .reverse()
    .find((part) => !nameSuffixes.has(part.replace(/[^a-z]/gi, '').toUpperCase()))

  return [parts[0], parts.length > 1 ? lastName : undefined]
    .filter((part): part is string => Boolean(part))
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function pluralize(count: number, singular: string, plural = `${singular}s`) {
  return `${formatNumber(count)} ${count === 1 ? singular : plural}`
}

export function stripLeadingZero(value: string) {
  return value.replace(/^0+/, '')
}
