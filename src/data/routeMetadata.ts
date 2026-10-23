import { barangays } from './barangays.ts'
import { categories } from './categories.ts'
import { news } from './news.ts'
import { offices } from './offices.ts'
import { services } from './services.ts'

export interface RouteMetadata {
  path: string
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
}

const staticRoutes: RouteMetadata[] = [
  {
    path: '/',
    title: 'Better San Fernando, La Union',
    description:
      'A clearer, independent guide to City of San Fernando, La Union services, officials, barangays, budgets, and public records.',
  },
  {
    path: '/services',
    title: 'City services',
    description: `Browse all ${services.length} city services from the San Fernando Citizens’ Charter, grouped by category with requirements, fees, and official forms.`,
  },
  {
    path: '/government',
    title: 'City government',
    description:
      'Meet the mayor and city council, browse city offices and departments, explore all 59 barangays, and find published emergency contacts in San Fernando, La Union.',
  },
  {
    path: '/government/officials',
    title: 'City officials',
    description:
      'Meet the mayor, vice mayor, 12 city councilors, and the SK Federation representative of San Fernando, La Union, and review the city’s election history.',
  },
  {
    path: '/government/offices',
    title: 'City offices',
    description:
      'Browse all 38 city offices and departments of San Fernando, La Union, with contacts, service counts, and links to the Citizens’ Charter.',
  },
  {
    path: '/government/barangays',
    title: 'Barangays',
    description:
      'All 59 barangays of San Fernando, La Union, with an interactive boundary map, 2024 population, city share, change since 2020, rank, and elected barangay officials.',
  },
  {
    path: '/government/hotlines',
    title: 'Emergency hotlines',
    description:
      'Published emergency, disaster, police, fire, health, and social welfare contacts for San Fernando, La Union. Verify agency direct numbers before use.',
  },
  {
    path: '/government/legislation',
    title: 'Ordinances and executive orders',
    description:
      'Recent ordinances, resolutions, and executive orders from the San Fernando City Government and Sangguniang Panlungsod, with links to official copies.',
  },
  {
    path: '/city',
    title: 'City profile',
    description:
      'The City of San Fernando, La Union in numbers: geography, people, economy, agriculture, infrastructure, health, education, and a timeline from 1572 to cityhood.',
  },
  {
    path: '/city/life',
    title: 'Life and tourism',
    description:
      'Things to do in San Fernando, La Union: beach circuits, surfing, marine sanctuaries, heritage sites, festivals, local food, and how to get here.',
  },
  {
    path: '/city/places',
    title: 'Places directory',
    description:
      'Find government agencies, health facilities, schools, shopping, food, hotels, tourism sites, transport, parks, and everyday services in San Fernando, La Union.',
  },
  {
    path: '/city/business',
    title: 'Business and investment',
    description:
      'Why businesses invest in San Fernando, La Union: competitiveness rankings, priority investment sectors, cost of doing business, and the permits to get started.',
  },
  {
    path: '/online-services',
    title: 'Online services',
    description:
      'Apply, track, and pay online: San Fernando’s e-business permits, cedula application, work permits, job applications, food handler records, and city portals.',
  },
  {
    path: '/transparency',
    title: 'Transparency',
    description:
      'Follow public money in San Fernando, La Union: 2024 revenue and spending, budget documents, special funds, audit reports, procurement records, and open datasets.',
  },
  {
    path: '/transparency/budget',
    title: 'Budget and spending',
    description:
      'San Fernando, La Union budget documents: Local Expenditure Program, special funds, statements of receipts and expenditures, and audit reports.',
  },
  {
    path: '/transparency/procurement',
    title: 'Procurement and bids',
    description:
      'San Fernando, La Union procurement documents: annual procurement plan, quarterly bid results, bid documents, and infrastructure project status.',
  },
  {
    path: '/transparency/projects',
    title: 'Infrastructure projects',
    description:
      'DPWH infrastructure projects linked to San Fernando, La Union, with contract values, status, contractors, locations, and a project map.',
  },
  {
    path: '/transparency/open-data',
    title: 'Open data',
    description:
      'The open datasets behind San Fernando, La Union’s fiscal profile, barangay map, election history, and procurement records.',
  },
  {
    path: '/news',
    title: 'News',
    description:
      'Recent announcements from the City Government of San Fernando, La Union, with links to the official source.',
  },
  {
    path: '/news/archive',
    title: 'News archive',
    description:
      `Browse all ${news.length} news stories currently tracked by this guide, with links to the official source.`,
  },
  {
    path: '/about',
    title: 'About this project',
    description:
      'Better San Fernando is an independent civic guide to city services, officials, barangays, budgets, and public records in San Fernando, La Union.',
  },
  {
    path: '/contact',
    title: 'Contact and sources',
    description:
      'Contact City Hall and find official San Fernando, La Union channels for services, legislation, archives, and public records.',
  },
  {
    path: '/faq',
    title: 'Frequently asked questions',
    description:
      'Quick answers about cedula, business permits, civil records, assistance, building permits, budgets, emergencies, and this independent guide.',
  },
  {
    path: '/search',
    title: 'Search',
    description: 'Find a city service, an office, a barangay, or a page across the guide.',
  },
  {
    path: '/sitemap',
    title: 'Sitemap',
    description:
      'Browse every section of Better San Fernando: services, online services, city government, barangays, offices, city profile, life and tourism, business, transparency, news, and site information.',
  },
  {
    path: '/accessibility',
    title: 'Accessibility',
    description:
      'How Better San Fernando approaches keyboard access, screen readers, reduced motion, contrast, and accessible public documents.',
  },
  {
    path: '/privacy',
    title: 'Privacy',
    description:
      'Privacy practices for Better San Fernando: no accounts, no analytics, no advertising, and local-only search.',
  },
  {
    path: '/terms',
    title: 'Terms of use',
    description:
      'Terms for using Better San Fernando, an independent civic guide that is not the official city website.',
  },
]

export function buildRouteMetadata(): RouteMetadata[] {
  const categoryRoutes = categories.map((category) => ({
    path: `/services/${category.slug}`,
    title: category.name,
    description: category.description,
  }))
  const serviceRoutes = services.map((service) => ({
    path: `/services/${service.category}/${service.slug}`,
    title: service.title,
    description: service.summary,
  }))
  const officeRoutes = offices.map((office) => ({
    path: `/government/offices/${office.slug}`,
    title: office.name,
    description: `Contact details, location, and ${services.filter((service) => service.officeCode === office.code).length} city services handled by the ${office.name} in San Fernando, La Union.`,
  }))
  const barangayRoutes = barangays.map((barangay) => ({
    path: `/government/barangays/${barangay.slug}`,
    title: barangay.name,
    description: `${barangay.name}, ${barangay.district}, City of San Fernando, La Union: 2024 population, population history, and barangay officials.`,
  }))
  const newsRoutes = news.map((item) => ({
    path: `/news/${item.slug}`,
    title: item.title,
    description: item.excerpt,
    image: item.image,
    type: 'article' as const,
  }))

  return [...staticRoutes, ...categoryRoutes, ...serviceRoutes, ...officeRoutes, ...barangayRoutes, ...newsRoutes]
}
