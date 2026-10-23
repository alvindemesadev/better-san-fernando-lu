import { describe, expect, it } from 'vitest'
import { barangayMap } from './barangayMap'
import { barangays } from './barangays'
import { formatDataFreshnessReport, getDataFreshness } from './dataFreshness'
import { bidBulletins, bidResults } from './bidDocs'
import { budgetDocs } from './budgetDocs'
import { categories } from './categories'
import { city } from './city'
import { factGroups, history, mapLinks, pillars } from './cityProfile'
import { dpwhSanFernando, philgepsSanFernando } from './contracts'
import { cityElections, electionSupplementSources } from './elections'
import { faqs } from './faqs'
import { fiscal2024, ilocosCities2024, revenueSources2024 } from './fiscal'
import { news, newsLastVerified } from './news'
import { offices } from './offices'
import { officials } from './officials'
import { onlineServiceSlugs, onlineServices } from './onlineServices'
import { openDataSources } from './openData'
import { legislation, legislationSources } from './legislation'
import { dpwhMapBounds, dpwhProjects } from './projects'
import { services } from './services'
import { sources } from './sources'
import { buildRouteMetadata } from './routeMetadata'
import { searchIndex } from '../lib/search'
import { renderStaticMetadata } from '../lib/staticMetadata'

const http = /^https?:\/\//
const slugPattern = /^[a-z0-9-]+$/

function unique(values: string[]) {
  return new Set(values).size === values.length
}

function isDate(value: string) {
  return !Number.isNaN(Date.parse(value))
}

describe('cities and categories', () => {
  it('has unique category slugs and accurate service counts', () => {
    expect(categories).toHaveLength(12)
    expect(unique(categories.map((category) => category.slug))).toBe(true)
    for (const category of categories) {
      const count = services.filter((service) => service.category === category.slug).length
      expect(category.serviceCount).toBe(count)
      expect(count).toBeGreaterThan(0)
    }
  })

  it('has plausible city figures', () => {
    expect(city.population2024).toBeGreaterThan(0)
    expect(city.revenue2024).toBeGreaterThan(0)
    expect(city.expenditures2024).toBeGreaterThan(0)
    expect(http.test(city.website)).toBe(true)
    expect(http.test(city.citizensCharter)).toBe(true)
  })
})

describe('services', () => {
  it('has 242 services with unique category and slug pairs', () => {
    expect(services).toHaveLength(242)
    expect(unique(services.map((service) => `${service.category}/${service.slug}`))).toBe(true)
  })

  it('has complete, well-formed service records', () => {
    for (const service of services) {
      expect(service.title.trim()).not.toBe('')
      expect(service.slug).toMatch(slugPattern)
      expect(service.office.trim()).not.toBe('')
      expect(service.officeCode.trim()).not.toBe('')
      expect(service.summary.trim()).not.toBe('')
      expect(isDate(service.lastVerified)).toBe(true)
      expect(http.test(service.sourceUrl)).toBe(true)
      for (const pdf of service.pdfs) expect(http.test(pdf)).toBe(true)
    }
  })

  it('resolves every service to a known office', () => {
    const officeCodes = new Set(offices.map((office) => office.code).filter(Boolean))
    const unresolved = services.filter((service) => !officeCodes.has(service.officeCode))
    expect(unresolved).toEqual([])
  })

  it('has no gaps in service classification', () => {
    const missing = services
      .filter((service) => !service.classification.trim())
      .map((service) => service.slug)
    expect(missing).toEqual([])
  })

  it('lists only real services in the online slug allowlist', () => {
    const serviceSlugs = new Set(services.map((service) => service.slug))
    for (const slug of onlineServiceSlugs) expect(serviceSlugs.has(slug)).toBe(true)
  })
})

describe('offices and officials', () => {
  it('has unique office slugs and codes', () => {
    expect(unique(offices.map((office) => office.slug))).toBe(true)
    const codes = offices.flatMap((office) => (office.code ? [office.code] : []))
    expect(unique(codes)).toBe(true)
    for (const office of offices) {
      expect(office.ccUrl === '' || http.test(office.ccUrl)).toBe(true)
      expect(http.test(office.sourceUrl)).toBe(true)
    }
  })

  it('has 15 officials with valid profile links', () => {
    expect(officials).toHaveLength(15)
    expect(unique(officials.map((official) => official.slug))).toBe(true)
    const roles = new Set(['City Mayor', 'City Vice Mayor', 'City Councilor', 'Ex-Officio Member, SK Federation'])
    for (const official of officials) {
      expect(roles.has(official.role)).toBe(true)
      expect(official.bioUrl === '' || http.test(official.bioUrl)).toBe(true)
    }
    expect(officials.find((official) => official.slug === 'kirk-andrew-agulan')?.photo).toBe(
      '/officials/kirk-andrew-agulan.jpg',
    )
  })
})

describe('barangays', () => {
  it('has 59 barangays with complete council records', () => {
    expect(barangays).toHaveLength(59)
    expect(unique(barangays.map((barangay) => barangay.slug))).toBe(true)
    for (const barangay of barangays) {
      expect(barangay.population2024).toBeGreaterThan(0)
      expect(barangay.districtNumber).toBeGreaterThanOrEqual(1)
      expect(barangay.districtNumber).toBeLessThanOrEqual(12)
      expect(barangay.punongBarangay.trim()).not.toBe('')
      expect(barangay.kagawads.length).toBeGreaterThanOrEqual(7)
      expect(barangay.kagawads.length).toBeLessThanOrEqual(8)
      expect(http.test(barangay.sourceUrl)).toBe(true)
      expect(http.test(barangay.dilgSourceUrl)).toBe(true)
      if (barangay.skChairperson) expect(barangay.skChairperson.trim()).not.toBe('')
    }
    expect(barangays.filter((barangay) => barangay.skChairperson)).toHaveLength(58)
  })
})

describe('news', () => {
  it('has well-formed stories with local images and official links', () => {
    expect(isDate(newsLastVerified)).toBe(true)
    expect(unique(news.map((item) => item.slug))).toBe(true)
    expect([...news].sort((a, b) => b.date.localeCompare(a.date))).toEqual(news)
    for (const item of news) {
      expect(item.slug).toMatch(slugPattern)
      expect(isDate(item.date)).toBe(true)
      expect(item.excerpt.trim()).not.toBe('')
      expect(item.excerpt).toMatch(/[.!?]$/)
      expect(item.excerpt.startsWith(item.title)).toBe(false)
      expect(item.excerpt).not.toContain('\uFFFD')
      expect(item.image.startsWith('/news/')).toBe(true)
      expect(http.test(item.sourceUrl)).toBe(true)
    }
  })
})

describe('documents and links', () => {
  it('has valid budget and procurement document links', () => {
    for (const doc of budgetDocs) {
      expect(doc.title.trim()).not.toBe('')
      expect(http.test(doc.url)).toBe(true)
    }
    for (const result of bidResults) {
      expect(result.reference.trim()).not.toBe('')
      expect(isDate(result.date)).toBe(true)
      expect(http.test(result.url)).toBe(true)
    }
    for (const bulletin of bidBulletins) {
      expect(bulletin.label.trim()).not.toBe('')
      expect(http.test(bulletin.url)).toBe(true)
    }
  })

  it('has valid online services and city profile links', () => {
    for (const service of onlineServices) {
      expect(service.name.trim()).not.toBe('')
      expect(http.test(service.url)).toBe(true)
    }
    for (const map of mapLinks) {
      expect(map.label.trim()).not.toBe('')
      expect(http.test(map.url)).toBe(true)
    }
    for (const source of sources) {
      expect(source.name.trim()).not.toBe('')
      expect(http.test(source.url)).toBe(true)
    }
  })

  it('has complete FAQ entries and profile content', () => {
    expect(faqs.length).toBeGreaterThanOrEqual(8)
    for (const faq of faqs) {
      expect(faq.q.trim()).not.toBe('')
      expect(faq.a.trim()).not.toBe('')
      expect(faq.link.startsWith('/')).toBe(true)
      expect(faq.source.trim()).not.toBe('')
    }
    expect(pillars.length).toBeGreaterThan(0)
    expect(factGroups.length).toBeGreaterThan(0)
    expect(history.length).toBeGreaterThan(0)
  })
})

describe('open data extracts', () => {
  it('reconciles the city fiscal figures', () => {
    expect(fiscal2024.totalLocalSources).toBeCloseTo(
      fiscal2024.totalTaxRevenue + fiscal2024.totalNonTaxRevenue,
      2,
    )
    expect(revenueSources2024.reduce((total, source) => total + source.amount, 0)).toBeCloseTo(
      fiscal2024.totalIncome,
      2,
    )
    expect(fiscal2024.netOperatingIncome).toBeCloseTo(
      fiscal2024.totalIncome - fiscal2024.totalOperatingExpenditures,
      2,
    )
    expect(fiscal2024.disasterFund.spent).toBeGreaterThan(0)
    expect(fiscal2024.disasterFund.spent).toBeLessThanOrEqual(fiscal2024.disasterFund.appropriation)
    expect(fiscal2024.specialEducationFund).toBeGreaterThan(0)
  })

  it('has nine comparable Ilocos cities with valid shares', () => {
    expect(ilocosCities2024).toHaveLength(9)
    expect(unique(ilocosCities2024.map((city) => `${city.province}/${city.name}`))).toBe(true)
    expect(ilocosCities2024.some((city) => city.name === 'San Fernando' && city.province === 'La Union')).toBe(true)
    for (const city of ilocosCities2024) {
      expect(city.annualRegularIncome).toBeGreaterThan(0)
      expect(city.localSources).toBeGreaterThan(0)
      expect(city.localSources).toBeLessThanOrEqual(city.annualRegularIncome)
      expect(city.ownSourceShare).toBeGreaterThan(0)
      expect(city.ownSourceShare).toBeLessThan(1)
      expect(city.ownSourceShare).toBeCloseTo(city.localSources / city.annualRegularIncome, 3)
      expect(city.ntaShare).toBeGreaterThan(0)
      expect(city.ntaShare).toBeLessThan(1)
    }
  })

  it('has a complete election history extract', () => {
    expect(cityElections).toHaveLength(9)
    expect(unique(cityElections.map((election) => String(election.year)))).toBe(true)
    expect(
      cityElections.some((election) => election.year === 2025 && election.mayor?.name.includes('Gualberto')),
    ).toBe(true)
    expect(cityElections.find((election) => election.year === 2007)?.mayor).toEqual({
      name: 'Pablo C. Ortega',
      party: 'Lakas-CMD',
    })
    expect(cityElections.find((election) => election.year === 2010)?.mayor?.name).toBe('Pablo C. Ortega')
    expect(cityElections.find((election) => election.year === 2013)?.viceMayor?.name).toBe(
      'Hermenegildo A. Gualberto',
    )
    expect(electionSupplementSources.map((source) => source.year)).toEqual([2007, 2010, 2013])
    for (const election of cityElections) {
      expect(election.year).toBeGreaterThanOrEqual(2000)
      for (const winner of [election.mayor, election.viceMayor]) {
        if (winner) {
          expect(winner.name.trim()).not.toBe('')
          expect(winner.party.trim()).not.toBe('')
        }
      }
    }
  })

  it('has a complete DPWH project extract', () => {
    expect(dpwhProjects).toHaveLength(249)
    expect(unique(dpwhProjects.map((project) => project.contractId))).toBe(true)
    expect(dpwhProjects.filter((project) => project.latitude !== null && project.longitude !== null)).toHaveLength(246)
    expect(dpwhProjects.filter((project) => project.barangay !== null).length).toBeGreaterThan(100)
    expect(dpwhProjects.reduce((total, project) => total + project.budget, 0)).toBeCloseTo(3528638331.06, 2)
    expect(dpwhProjects.filter((project) => project.budget > 0).length).toBeGreaterThan(240)
    expect(dpwhProjects.filter((project) => project.status === 'Completed')).toHaveLength(230)
    expect(dpwhProjects.filter((project) => project.status === 'Ongoing')).toHaveLength(16)
    expect(dpwhProjects.filter((project) => project.status === 'For procurement')).toHaveLength(3)
    expect(dpwhMapBounds.minLat).toBeLessThan(dpwhMapBounds.maxLat)
    expect(dpwhMapBounds.minLng).toBeLessThan(dpwhMapBounds.maxLng)
    for (const project of dpwhProjects) {
      expect(project.contractId.trim()).not.toBe('')
      expect(project.title.trim()).not.toBe('')
      expect(project.year).toBeGreaterThanOrEqual(2016)
      expect(project.year).toBeLessThanOrEqual(2025)
      expect(project.budget).toBeGreaterThanOrEqual(0)
      if (project.budget === 0) expect(project.status).toBe('For procurement')
      expect(project.progress).toBeGreaterThanOrEqual(0)
      expect(project.progress).toBeLessThanOrEqual(100)
      if (project.contractor.trim() === '') expect(project.status).toBe('For procurement')
      expect(project.category.trim()).not.toBe('')
    }
  })

  it('has a verified legislation extract', () => {
    expect(legislation).toHaveLength(12)
    expect(legislationSources).toHaveLength(5)
    expect(unique(legislation.map((item) => item.id))).toBe(true)
    expect(unique(legislation.map((item) => item.number))).toBe(true)
    expect(legislation.filter((item) => item.status === 'Enacted')).toHaveLength(5)
    expect(legislation.filter((item) => item.status === 'Issued')).toHaveLength(6)
    expect(legislation.filter((item) => item.status === 'Proposed')).toHaveLength(1)
    for (const item of legislation) {
      expect(item.number.trim()).not.toBe('')
      expect(item.title.trim()).not.toBe('')
      expect(item.summary.trim()).not.toBe('')
      expect(item.year).toBeGreaterThanOrEqual(2025)
      expect(item.year).toBeLessThanOrEqual(2026)
      expect(http.test(item.sourceUrl)).toBe(true)
    }
    for (const source of legislationSources) {
      expect(source.label.trim()).not.toBe('')
      expect(source.coverage.trim()).not.toBe('')
      expect(http.test(source.href)).toBe(true)
    }
  })

  it('has contract aggregates that reconcile', () => {
    expect(dpwhSanFernando.completed + dpwhSanFernando.ongoing + dpwhSanFernando.forProcurement).toBe(
      dpwhSanFernando.totalProjects,
    )
    expect(unique(dpwhSanFernando.recentYears.map((year) => String(year.year)))).toBe(true)
    expect(dpwhSanFernando.largestProjects.length).toBeGreaterThan(0)
    for (const year of dpwhSanFernando.recentYears) {
      expect(year.projects).toBeGreaterThan(0)
      expect(year.amount).toBeGreaterThan(0)
    }
    for (const project of dpwhSanFernando.largestProjects) {
      expect(project.budget).toBeGreaterThanOrEqual(0)
      if (project.budget === 0) expect(project.status).toBe('For procurement')
      expect(project.contractId.trim()).not.toBe('')
      expect(project.title.trim()).not.toBe('')
    }
    expect(philgepsSanFernando.totalAwards).toBeGreaterThan(0)
    expect(philgepsSanFernando.totalAmount).toBeGreaterThan(0)
    expect(philgepsSanFernando.topAwardees.length).toBeGreaterThan(0)
    expect(philgepsSanFernando.topAward.amount).toBeLessThanOrEqual(philgepsSanFernando.totalAmount)
  })

  it('maps every site barangay exactly once', () => {
    expect(barangayMap.features).toHaveLength(barangays.length)
    expect(unique(barangayMap.features.map((feature) => feature.slug))).toBe(true)
    expect(barangayMap.viewBox.trim()).not.toBe('')
    const siteSlugs = new Set(barangays.map((barangay) => barangay.slug))
    for (const feature of barangayMap.features) {
      expect(siteSlugs.has(feature.slug)).toBe(true)
      expect(feature.name.trim()).not.toBe('')
      expect(feature.areaSqKm).toBeGreaterThan(0)
      expect(feature.path.startsWith('M')).toBe(true)
      expect(feature.path.endsWith('Z')).toBe(true)
    }
  })

  it('has a well-formed open data catalog', () => {
    expect(openDataSources).toHaveLength(9)
    expect(unique(openDataSources.map((source) => source.id))).toBe(true)
    expect(openDataSources.some((source) => source.group === 'integrated')).toBe(true)
    expect(openDataSources.some((source) => source.group === 'reference')).toBe(true)
    for (const source of openDataSources) {
      expect(source.name.trim()).not.toBe('')
      expect(source.publisher.trim()).not.toBe('')
      expect(source.license.trim()).not.toBe('')
      expect(source.coverage.trim()).not.toBe('')
      expect(source.formats.trim()).not.toBe('')
      expect(http.test(source.href)).toBe(true)
      if (source.resourceHref) expect(http.test(source.resourceHref)).toBe(true)
      if (source.group === 'integrated') expect(source.localHref?.startsWith('/')).toBe(true)
    }
  })
})

describe('search index', () => {
  it('indexes services, offices, barangays, and news with valid hrefs', () => {
    const kinds = new Set(searchIndex.map((result) => result.kind))
    for (const kind of ['Service', 'Office', 'Barangay', 'News', 'Page'] as const) expect(kinds.has(kind)).toBe(true)
    expect(searchIndex.filter((result) => result.kind === 'Service')).toHaveLength(services.length)
    expect(searchIndex.filter((result) => result.kind === 'Office')).toHaveLength(offices.length)
    expect(searchIndex.filter((result) => result.kind === 'Barangay')).toHaveLength(barangays.length)
    for (const result of searchIndex) {
      expect(result.href.startsWith('/')).toBe(true)
      expect(result.title.trim()).not.toBe('')
      expect(result.meta.trim()).not.toBe('')
      expect(result.keywords.trim()).not.toBe('')
    }
    expect(searchIndex.some((result) => result.href === '/transparency/open-data')).toBe(true)
    expect(searchIndex.some((result) => result.href === '/transparency/projects')).toBe(true)
  })
})

describe('prerender metadata', () => {
  it('covers every static and data-driven route exactly once', () => {
    const pages = buildRouteMetadata()
    const firstService = services[0]
    expect(unique(pages.map((page) => page.path))).toBe(true)
    expect(pages).toHaveLength(28 + categories.length + services.length + offices.length + barangays.length + news.length)
    expect(pages.find((page) => page.path === '/services')?.description).toContain(`${services.length} city services`)
    expect(firstService).toBeDefined()
    if (!firstService) throw new Error('Service catalog must contain at least one service.')
    expect(pages.find((page) => page.path === `/services/${firstService.category}/${firstService.slug}`)?.title).toBe(
      firstService.title,
    )
  })

  it('writes route-specific, escaped title and social metadata into the HTML shell', () => {
    const html = '<html><head><title>Default</title><meta name="description" content="Default"><meta property="og:title" content="Default"><meta property="og:type" content="website"><meta property="og:image" content="/og.png"><meta property="og:description" content="Default"><meta name="twitter:title" content="Default"><meta name="twitter:description" content="Default"><meta name="twitter:image" content="/og.png"></head></html>'
    const rendered = renderStaticMetadata(
      html,
      { path: '/news/civic-update', title: 'Council & community', description: 'Residents’ update <today>', image: '/news/news-1.jpg', type: 'article' },
      'https://example.test',
    )

    expect(rendered).toContain('<title>Council &amp; community | Better San Fernando</title>')
    expect(rendered).toContain('content="Residents’ update &lt;today&gt;"')
    expect(rendered).toContain('content="article"')
    expect(rendered).toContain('content="https://example.test/news/civic-update"')
    expect(rendered).toContain('content="https://example.test/news/news-1.jpg"')
    expect(rendered).toContain('rel="canonical" href="https://example.test/news/civic-update"')
  })
})

describe('manual data freshness', () => {
  it('reports current verification dates for manually maintained data', () => {
    const report = getDataFreshness(new Date('2026-10-23T00:00:00Z'))
    expect(report.find((row) => row.dataset === 'Service charter records')?.status).toBe('current')
    expect(report.find((row) => row.dataset === 'City office directory')?.status).toBe('current')
    expect(report.find((row) => row.dataset === 'Elected officials')?.status).toBe('current')
    expect(formatDataFreshnessReport(new Date('2026-10-23T00:00:00Z'))).toContain('Barangay names and population')
  })
})
