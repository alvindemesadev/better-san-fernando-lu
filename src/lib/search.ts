import { barangays } from '../data/barangays'
import { categories } from '../data/categories'
import { news } from '../data/news'
import { offices } from '../data/offices'
import { services } from '../data/services'
import { normalize } from './utils'

export type SearchKind = 'Service' | 'Office' | 'Barangay' | 'News' | 'Page'

export interface SearchResult {
  kind: SearchKind
  title: string
  description: string
  href: string
  meta: string
  keywords: string
}

const categoryName = new Map(categories.map((category) => [category.slug, category.name]))

const staticPages: SearchResult[] = [
  {
    kind: 'Page',
    title: 'All city services',
    description: 'Browse the 243 services in the official Citizens’ Charter by category.',
    href: '/services',
    meta: 'Services',
    keywords: 'citizens charter requirements fees offices',
  },
  {
    kind: 'Page',
    title: 'Online services',
    description: 'Official city portals for e-business permits, cedula, work permits, jobs, and records.',
    href: '/online-services',
    meta: 'Services',
    keywords: 'online ebpls eps permit application portal digital',
  },
  {
    kind: 'Page',
    title: 'City government',
    description: 'Officials, departments, barangays, and emergency hotlines.',
    href: '/government',
    meta: 'Government',
    keywords: 'city hall departments local government',
  },
  {
    kind: 'Page',
    title: 'City officials',
    description: 'The mayor, vice mayor, city councilors, and youth representative.',
    href: '/government/officials',
    meta: 'Government',
    keywords: 'mayor vice mayor council sangguniang panlungsod',
  },
  {
    kind: 'Page',
    title: 'Departments and offices',
    description: 'Contact details, office heads, and services for every city department.',
    href: '/government/offices',
    meta: 'Government',
    keywords: 'departments offices contact directory',
  },
  {
    kind: 'Page',
    title: 'Barangays',
    description: 'Population, district, and elected officials for all 59 barangays.',
    href: '/government/barangays',
    meta: 'Government',
    keywords: 'barangay punong kagawad district population',
  },
  {
    kind: 'Page',
    title: 'Emergency hotlines',
    description: 'Verified city and national emergency contact numbers.',
    href: '/government/hotlines',
    meta: 'Government',
    keywords: 'emergency 911 police fire rescue cdrrmo',
  },
  {
    kind: 'Page',
    title: 'City profile',
    description: 'Facts, history, maps, and figures about San Fernando, La Union.',
    href: '/city',
    meta: 'City',
    keywords: 'profile history population map geography facts about',
  },
  {
    kind: 'Page',
    title: 'Life and tourism',
    description: 'Beaches, surf breaks, festivals, and getting to San Fernando.',
    href: '/city/life',
    meta: 'City',
    keywords: 'tourism travel beaches festivals surf visitors',
  },
  {
    kind: 'Page',
    title: 'Business and investment',
    description: 'Competitiveness, costs, permits, and investment opportunities.',
    href: '/city/business',
    meta: 'City',
    keywords: 'business investment permits cmci incentives economy',
  },
  {
    kind: 'Page',
    title: 'Transparency',
    description: 'Budget, procurement, audit, and full disclosure documents.',
    href: '/transparency',
    meta: 'Transparency',
    keywords: 'budget procurement bids audit full disclosure',
  },
  {
    kind: 'Page',
    title: 'Budget and spending',
    description: 'Revenue, expenditure, and special fund documents.',
    href: '/transparency/budget',
    meta: 'Transparency',
    keywords: 'budget revenue expenditure special education fund',
  },
  {
    kind: 'Page',
    title: 'Procurement and bids',
    description: 'Annual procurement plan, bid results, and infrastructure reports.',
    href: '/transparency/procurement',
    meta: 'Transparency',
    keywords: 'procurement bids bac annual procurement plan',
  },
  {
    kind: 'Page',
    title: 'Open data',
    description: 'Datasets behind the fiscal profile, barangay map, election history, and procurement records.',
    href: '/transparency/open-data',
    meta: 'Transparency',
    keywords: 'open data datasets sources license blgf philgeps dpwh noah boundaries',
  },
  {
    kind: 'Page',
    title: 'News',
    description: 'Recent updates from the City Government of San Fernando.',
    href: '/news',
    meta: 'News',
    keywords: 'updates announcements city government',
  },
  {
    kind: 'Page',
    title: 'About this project',
    description: 'Why this independent civic portal exists and how it works.',
    href: '/about',
    meta: 'About',
    keywords: 'independent civic project bettergov sources methodology',
  },
  {
    kind: 'Page',
    title: 'Contact and sources',
    description: 'Official city contact channels and the sources behind this site.',
    href: '/contact',
    meta: 'Contact',
    keywords: 'contact email phone city hall sources',
  },
  {
    kind: 'Page',
    title: 'Frequently asked questions',
    description: 'Quick answers about permits, records, assistance, and this site.',
    href: '/faq',
    meta: 'Help',
    keywords: 'faq help questions permits records',
  },
  {
    kind: 'Page',
    title: 'Sitemap',
    description: 'Every page on Better San Fernando.',
    href: '/sitemap',
    meta: 'Site',
    keywords: 'sitemap index all pages',
  },
  {
    kind: 'Page',
    title: 'Accessibility',
    description: 'Our accessibility commitments and how to report a barrier.',
    href: '/accessibility',
    meta: 'Site',
    keywords: 'accessibility a11y screen reader keyboard',
  },
  {
    kind: 'Page',
    title: 'Privacy',
    description: 'What this site does and does not collect.',
    href: '/privacy',
    meta: 'Site',
    keywords: 'privacy data tracking cookies',
  },
  {
    kind: 'Page',
    title: 'Terms of use',
    description: 'The limits of this independent civic project.',
    href: '/terms',
    meta: 'Site',
    keywords: 'terms disclaimer accuracy official',
  },
]

export const searchIndex: SearchResult[] = [
  ...services.map((service) => ({
    kind: 'Service' as const,
    title: service.title,
    description: service.summary,
    href: `/services/${service.category}/${service.slug}`,
    meta: categoryName.get(service.category) ?? 'Service',
    keywords: `${service.office} ${service.officeCode} ${service.classification} ${service.transactionType}`,
  })),
  ...offices.map((office) => ({
    kind: 'Office' as const,
    title: office.name,
    description: office.head
      ? `${office.head}${office.position ? `, ${office.position}` : ''}`
      : office.sector,
    href: `/government/offices/${office.slug}`,
    meta: office.sector,
    keywords: `${office.code ?? ''} ${office.sector} ${office.email} ${office.address}`,
  })),
  ...barangays.map((barangay) => ({
    kind: 'Barangay' as const,
    title: barangay.name,
    description: `${barangay.district} · ${barangay.population2024.toLocaleString('en-PH')} people (2024)`,
    href: `/government/barangays/${barangay.slug}`,
    meta: 'Barangay',
    keywords: `${barangay.punongBarangay} ${barangay.kagawads.join(' ')}`,
  })),
  ...news.map((item) => ({
    kind: 'News' as const,
    title: item.title,
    description: item.excerpt,
    href: `/news/${item.slug}`,
    meta: 'News',
    keywords: 'news update announcement',
  })),
  ...staticPages,
]

function scoreResult(result: SearchResult, terms: string[]) {
  const title = normalize(result.title)
  const meta = normalize(result.meta)
  const description = normalize(result.description)
  const keywords = normalize(result.keywords)
  const haystack = `${title} ${meta} ${description} ${keywords}`

  if (!terms.every((term) => haystack.includes(term))) return 0

  let score = 0
  for (const term of terms) {
    if (title === term) score += 120
    else if (title.startsWith(term)) score += 80
    else if (title.includes(term)) score += 50
    if (meta.includes(term)) score += 18
    if (keywords.includes(term)) score += 12
    if (description.includes(term)) score += 8
  }
  return score
}

export function searchAll(query: string, limit = 40) {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []

  return searchIndex
    .map((result) => ({ result, score: scoreResult(result, terms) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title))
    .slice(0, limit)
    .map((entry) => entry.result)
}
