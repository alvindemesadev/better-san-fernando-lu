import type { RouteMetadata } from '../data/routeMetadata.ts'

const DEFAULT_ORIGIN = 'https://bettersanfernando.pages.dev'

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function absoluteUrl(path: string, siteOrigin: string) {
  const origin = siteOrigin || DEFAULT_ORIGIN
  return origin ? new URL(path, origin).toString() : path
}

function setHeadTag(html: string, pattern: RegExp, tag: string) {
  if (pattern.test(html)) return html.replace(pattern, tag)
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`)
}

function setMeta(html: string, attribute: 'name' | 'property', key: string, content: string) {
  const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}=["']${key}["'])[^>]*>`, 'i')
  return setHeadTag(html, pattern, `<meta ${attribute}="${key}" content="${escapeHtml(content)}" />`)
}

export function renderStaticMetadata(html: string, page: RouteMetadata, siteOrigin = '') {
  const origin = siteOrigin || DEFAULT_ORIGIN
  const fullTitle = page.path === '/' ? page.title : `${page.title} | Better San Fernando`
  const pageUrl = absoluteUrl(page.path, origin)
  const imageUrl = absoluteUrl(page.image ?? '/og.png', origin)
  let output = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`)

  output = setMeta(output, 'name', 'description', page.description)
  output = setMeta(output, 'name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
  output = setMeta(output, 'property', 'og:site_name', 'Better San Fernando, La Union')
  output = setMeta(output, 'property', 'og:locale', 'en_PH')
  output = setMeta(output, 'property', 'og:title', fullTitle)
  output = setMeta(output, 'property', 'og:type', page.type ?? 'website')
  output = setMeta(output, 'property', 'og:url', pageUrl)
  output = setMeta(output, 'property', 'og:image', imageUrl)
  output = setMeta(output, 'property', 'og:image:alt', fullTitle)
  output = setMeta(output, 'property', 'og:description', page.description)
  output = setMeta(output, 'name', 'twitter:card', 'summary_large_image')
  output = setMeta(output, 'name', 'twitter:title', fullTitle)
  output = setMeta(output, 'name', 'twitter:description', page.description)
  output = setMeta(output, 'name', 'twitter:image', imageUrl)
  output = setMeta(output, 'name', 'twitter:image:alt', fullTitle)

  const canonicalPattern = /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i
  output = setHeadTag(output, canonicalPattern, `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`)

  if (page.jsonLd) {
    const jsonLdString = JSON.stringify(page.jsonLd)
    const jsonLdTag = `<script type="application/ld+json" id="route-jsonld">${jsonLdString}</script>`
    const jsonLdPattern = /<script\b(?=[^>]*\btype=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/i
    output = setHeadTag(output, jsonLdPattern, jsonLdTag)
  }

  return output
}
