import { barangays } from './barangays.ts'
import { categories } from './categories.ts'
import { city } from './city.ts'
import { faqs } from './faqs.ts'
import { news } from './news.ts'
import { offices } from './offices.ts'
import { services } from './services.ts'

export interface RouteMetadata {
  path: string
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
  lastmod?: string | undefined
  priority?: number
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
}

const DEFAULT_ORIGIN = 'https://bettersanfernando.pages.dev'

function makeBreadcrumbs(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${DEFAULT_ORIGIN}${item.path}`,
    })),
  }
}

const staticRoutes: RouteMetadata[] = [
  {
    path: '/',
    title: 'Better San Fernando, La Union',
    description:
      'A clearer, independent guide to City of San Fernando, La Union services, officials, barangays, budgets, and public records.',
    priority: 1.0,
    changefreq: 'daily',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Better San Fernando',
        alternateName: 'Better San Fernando, La Union',
        url: DEFAULT_ORIGIN,
        description:
          'A clearer, independent guide to City of San Fernando, La Union services, officials, barangays, budgets, and public records.',
        inLanguage: 'en',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${DEFAULT_ORIGIN}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'City',
        name: city.name,
        officialName: city.officialName,
        url: city.website,
        telephone: city.trunkline,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'F.I. Ortega Highway, Barangay I',
          addressLocality: 'San Fernando',
          addressRegion: 'La Union',
          postalCode: '2500',
          addressCountry: 'PH',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: city.coordinates.lat,
          longitude: city.coordinates.lng,
        },
      },
    ],
  },
  {
    path: '/services',
    title: 'City services',
    description: `Browse all ${services.length} city services from the San Fernando Citizens’ Charter, grouped by category with requirements, fees, and official forms.`,
    priority: 0.9,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
    ]),
  },
  {
    path: '/government',
    title: 'City government',
    description:
      'Meet the mayor and city council, browse city offices and departments, explore all 59 barangays, and find published emergency contacts in San Fernando, La Union.',
    priority: 0.9,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'City Government', path: '/government' },
    ]),
  },
  {
    path: '/government/officials',
    title: 'City officials',
    description:
      'Meet the mayor, vice mayor, 12 city councilors, and the SK Federation representative of San Fernando, La Union, and review the city’s election history.',
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'City Government', path: '/government' },
      { name: 'Officials', path: '/government/officials' },
    ]),
  },
  {
    path: '/government/offices',
    title: 'City offices',
    description:
      'Browse all 38 city offices and departments of San Fernando, La Union, with contacts, service counts, and links to the Citizens’ Charter.',
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'City Government', path: '/government' },
      { name: 'Offices', path: '/government/offices' },
    ]),
  },
  {
    path: '/government/barangays',
    title: 'Barangays',
    description:
      'All 59 barangays of San Fernando, La Union, with an interactive boundary map, 2024 population, city share, change since 2020, rank, and elected barangay officials.',
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'City Government', path: '/government' },
      { name: 'Barangays', path: '/government/barangays' },
    ]),
  },
  {
    path: '/government/hotlines',
    title: 'Emergency hotlines',
    description:
      'Published emergency, disaster, police, fire, health, and social welfare contacts for San Fernando, La Union. Verify agency direct numbers before use.',
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'City Government', path: '/government' },
      { name: 'Emergency Hotlines', path: '/government/hotlines' },
    ]),
  },
  {
    path: '/government/legislation',
    title: 'Ordinances and executive orders',
    description:
      'Recent ordinances, resolutions, and executive orders from the San Fernando City Government and Sangguniang Panlungsod, with links to official copies.',
    priority: 0.8,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'City Government', path: '/government' },
      { name: 'Legislation', path: '/government/legislation' },
    ]),
  },
  {
    path: '/city',
    title: 'City profile',
    description:
      'The City of San Fernando, La Union in numbers: geography, people, economy, agriculture, infrastructure, health, education, and a timeline from 1572 to cityhood.',
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'City Profile', path: '/city' },
    ]),
  },
  {
    path: '/city/life',
    title: 'Life and tourism',
    description:
      'Things to do in San Fernando, La Union: beach circuits, surfing, marine sanctuaries, heritage sites, festivals, local food, and how to get here.',
    priority: 0.8,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'City Profile', path: '/city' },
      { name: 'Life & Tourism', path: '/city/life' },
    ]),
  },
  {
    path: '/city/places',
    title: 'Places directory',
    description:
      'Find government agencies, health facilities, schools, shopping, food, hotels, tourism sites, transport, parks, and everyday services in San Fernando, La Union.',
    priority: 0.9,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'City Profile', path: '/city' },
      { name: 'Places Directory', path: '/city/places' },
    ]),
  },
  {
    path: '/city/business',
    title: 'Business and investment',
    description:
      'Why businesses invest in San Fernando, La Union: competitiveness rankings, priority investment sectors, cost of doing business, and the permits to get started.',
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'City Profile', path: '/city' },
      { name: 'Business & Investment', path: '/city/business' },
    ]),
  },
  {
    path: '/online-services',
    title: 'Online services',
    description:
      'Apply, track, and pay online: San Fernando’s e-business permits, cedula application, work permits, job applications, food handler records, and city portals.',
    priority: 0.9,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Online Services', path: '/online-services' },
    ]),
  },
  {
    path: '/transparency',
    title: 'Transparency',
    description:
      'Follow public money in San Fernando, La Union: 2024 revenue and spending, budget documents, special funds, audit reports, procurement records, and open datasets.',
    priority: 0.9,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Transparency', path: '/transparency' },
    ]),
  },
  {
    path: '/transparency/budget',
    title: 'Budget and spending',
    description:
      'San Fernando, La Union budget documents: Local Expenditure Program, special funds, statements of receipts and expenditures, and audit reports.',
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Transparency', path: '/transparency' },
      { name: 'Budget & Spending', path: '/transparency/budget' },
    ]),
  },
  {
    path: '/transparency/procurement',
    title: 'Procurement and bids',
    description:
      'San Fernando, La Union procurement documents: annual procurement plan, quarterly bid results, bid documents, and infrastructure project status.',
    priority: 0.8,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Transparency', path: '/transparency' },
      { name: 'Procurement', path: '/transparency/procurement' },
    ]),
  },
  {
    path: '/transparency/projects',
    title: 'Infrastructure projects',
    description:
      'DPWH infrastructure projects linked to San Fernando, La Union, with contract values, status, contractors, and published locations.',
    priority: 0.8,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Transparency', path: '/transparency' },
      { name: 'Projects', path: '/transparency/projects' },
    ]),
  },
  {
    path: '/transparency/open-data',
    title: 'Open data',
    description:
      'The open datasets behind San Fernando, La Union’s fiscal profile, barangay map, election history, and procurement records.',
    priority: 0.8,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Transparency', path: '/transparency' },
      { name: 'Open Data', path: '/transparency/open-data' },
    ]),
  },
  {
    path: '/news',
    title: 'News',
    description:
      'Recent announcements from the City Government of San Fernando, La Union, with links to the official source.',
    priority: 0.8,
    changefreq: 'daily',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'News', path: '/news' },
    ]),
  },
  {
    path: '/news/archive',
    title: 'News archive',
    description:
      `Browse all ${news.length} news stories currently tracked by this guide, with links to the official source.`,
    priority: 0.7,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'News', path: '/news' },
      { name: 'Archive', path: '/news/archive' },
    ]),
  },
  {
    path: '/about',
    title: 'About this project',
    description:
      'Better San Fernando is an independent civic guide to city services, officials, barangays, budgets, and public records in San Fernando, La Union.',
    priority: 0.5,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ]),
  },
  {
    path: '/contact',
    title: 'Contact and sources',
    description:
      'Contact City Hall and find official San Fernando, La Union channels for services, legislation, archives, and public records.',
    priority: 0.5,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Contact', path: '/contact' },
    ]),
  },
  {
    path: '/faq',
    title: 'Frequently asked questions',
    description:
      'Quick answers about cedula, business permits, civil records, assistance, building permits, budgets, emergencies, and this independent guide.',
    priority: 0.7,
    changefreq: 'monthly',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
      makeBreadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' },
      ]),
    ],
  },
  {
    path: '/search',
    title: 'Search',
    description: 'Find a city service, an office, a barangay, or a page across the guide.',
    priority: 0.5,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Search', path: '/search' },
    ]),
  },
  {
    path: '/sitemap',
    title: 'Sitemap',
    description:
      'Browse every section of Better San Fernando: services, online services, city government, barangays, offices, city profile, life and tourism, business, transparency, news, and site information.',
    priority: 0.5,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Sitemap', path: '/sitemap' },
    ]),
  },
  {
    path: '/accessibility',
    title: 'Accessibility',
    description:
      'How Better San Fernando approaches keyboard access, screen readers, reduced motion, contrast, and accessible public documents.',
    priority: 0.5,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Accessibility', path: '/accessibility' },
    ]),
  },
  {
    path: '/privacy',
    title: 'Privacy',
    description:
      'Privacy practices for Better San Fernando: no accounts, no analytics, no advertising, and local-only search.',
    priority: 0.5,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Privacy', path: '/privacy' },
    ]),
  },
  {
    path: '/terms',
    title: 'Terms of use',
    description:
      'Terms for using Better San Fernando, an independent civic guide that is not the official city website.',
    priority: 0.5,
    changefreq: 'monthly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Terms of Use', path: '/terms' },
    ]),
  },
]

export function buildRouteMetadata(): RouteMetadata[] {
  const categoryName = new Map(categories.map((c) => [c.slug, c.name]))

  const categoryRoutes: RouteMetadata[] = categories.map((category) => ({
    path: `/services/${category.slug}`,
    title: category.name,
    description: category.description,
    priority: 0.8,
    changefreq: 'weekly',
    jsonLd: makeBreadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Services', path: '/services' },
      { name: category.name, path: `/services/${category.slug}` },
    ]),
  }))

  const serviceRoutes: RouteMetadata[] = services.map((service) => {
    const catName = categoryName.get(service.category) ?? service.category
    return {
      path: `/services/${service.category}/${service.slug}`,
      title: service.title,
      description: service.summary,
      lastmod: service.lastVerified,
      priority: 0.7,
      changefreq: 'monthly',
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'GovernmentService',
          name: service.title,
          description: service.summary,
          serviceType: catName,
          url: `${DEFAULT_ORIGIN}/services/${service.category}/${service.slug}`,
          provider: {
            '@type': 'GovernmentOrganization',
            name: service.office,
            parentOrganization: {
              '@type': 'GovernmentOrganization',
              name: 'City Government of San Fernando, La Union',
              url: city.website,
            },
          },
          areaServed: {
            '@type': 'AdministrativeArea',
            name: 'San Fernando, La Union',
          },
        },
        makeBreadcrumbs([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: catName, path: `/services/${service.category}` },
          { name: service.title, path: `/services/${service.category}/${service.slug}` },
        ]),
      ],
    }
  })

  const officeRoutes: RouteMetadata[] = offices.map((office) => ({
    path: `/government/offices/${office.slug}`,
    title: office.name,
    description: `Contact details, location, and ${services.filter((service) => service.officeCode === office.code).length} city services handled by the ${office.name} in San Fernando, La Union.`,
    priority: 0.7,
    changefreq: 'monthly',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'GovernmentOffice',
        name: office.name,
        url: `${DEFAULT_ORIGIN}/government/offices/${office.slug}`,
        address: office.address,
        telephone: office.contact,
        parentOrganization: {
          '@type': 'GovernmentOrganization',
          name: 'City Government of San Fernando, La Union',
          url: city.website,
        },
      },
      makeBreadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'City Government', path: '/government' },
        { name: 'Offices', path: '/government/offices' },
        { name: office.name, path: `/government/offices/${office.slug}` },
      ]),
    ],
  }))

  const barangayRoutes: RouteMetadata[] = barangays.map((barangay) => ({
    path: `/government/barangays/${barangay.slug}`,
    title: barangay.name,
    description: `${barangay.name}, ${barangay.district}, City of San Fernando, La Union: 2024 population, population history, and barangay officials.`,
    priority: 0.7,
    changefreq: 'monthly',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'AdministrativeArea',
        name: barangay.name,
        url: `${DEFAULT_ORIGIN}/government/barangays/${barangay.slug}`,
        containedInPlace: {
          '@type': 'City',
          name: 'San Fernando, La Union',
        },
        description: `${barangay.name} is a barangay in San Fernando, La Union (2024 Population: ${barangay.population2024.toLocaleString()}).`,
      },
      makeBreadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'City Government', path: '/government' },
        { name: 'Barangays', path: '/government/barangays' },
        { name: barangay.name, path: `/government/barangays/${barangay.slug}` },
      ]),
    ],
  }))

  const newsRoutes: RouteMetadata[] = news.map((item) => ({
    path: `/news/${item.slug}`,
    title: item.title,
    description: item.excerpt,
    image: item.image,
    type: 'article' as const,
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: item.date ? item.date.split('T')[0] : undefined,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: item.title,
        description: item.excerpt,
        image: `${DEFAULT_ORIGIN}${item.image}`,
        datePublished: item.date,
        url: `${DEFAULT_ORIGIN}/news/${item.slug}`,
        author: {
          '@type': 'Organization',
          name: 'City Government of San Fernando, La Union',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Better San Fernando',
          logo: {
            '@type': 'ImageObject',
            url: `${DEFAULT_ORIGIN}/logo.png`,
          },
        },
      },
      makeBreadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'News', path: '/news' },
        { name: item.title, path: `/news/${item.slug}` },
      ]),
    ],
  }))

  return [...staticRoutes, ...categoryRoutes, ...serviceRoutes, ...officeRoutes, ...barangayRoutes, ...newsRoutes]
}
