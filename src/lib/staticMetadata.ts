import type { RouteMetadata } from '../data/routeMetadata.ts'

function escapeHtml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function absoluteUrl(path: string, siteOrigin: string) {
  return siteOrigin ? new URL(path, siteOrigin).toString() : path
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
  const fullTitle = page.path === '/' ? page.title : `${page.title} | Better San Fernando`
  const pageUrl = absoluteUrl(page.path, siteOrigin)
  const imageUrl = absoluteUrl(page.image ?? '/og.png', siteOrigin)
  let output = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(fullTitle)}</title>`)

  output = setMeta(output, 'name', 'description', page.description)
  output = setMeta(output, 'property', 'og:title', fullTitle)
  output = setMeta(output, 'property', 'og:type', page.type ?? 'website')
  output = setMeta(output, 'property', 'og:url', pageUrl)
  output = setMeta(output, 'property', 'og:image', imageUrl)
  output = setMeta(output, 'property', 'og:description', page.description)
  output = setMeta(output, 'name', 'twitter:title', fullTitle)
  output = setMeta(output, 'name', 'twitter:description', page.description)
  output = setMeta(output, 'name', 'twitter:image', imageUrl)

  const canonicalPattern = /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i
  return setHeadTag(output, canonicalPattern, `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`)
}
