import { useEffect } from 'react'
import { useLanguage } from '../i18n/language'

const SITE_NAME = 'Better San Fernando'

export interface PageMetaOptions {
  path?: string
  image?: string
  type?: string
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>
}

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.appendChild(tag)
  }
  tag.content = content
}

function setCanonical(href: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = href
}

function absoluteUrl(value: string) {
  if (/^https?:\/\//i.test(value)) return value
  const origin = typeof window === 'undefined' ? '' : window.location.origin
  return `${origin}${value.startsWith('/') ? '' : '/'}${value}`
}

export function usePageMeta(title: string, description?: string, options: PageMetaOptions = {}) {
  const { translate, language } = useLanguage()
  const { path, image = '/og.png', type = 'website', jsonLd } = options
  const json = jsonLd ? JSON.stringify(jsonLd) : ''
  const localizedTitle = translate(title)
  const localizedDescription = description ? translate(description) : undefined

  useEffect(() => {
    const fullTitle = localizedTitle === SITE_NAME ? localizedTitle : `${localizedTitle} | ${SITE_NAME}`
    document.title = fullTitle

    const url = absoluteUrl(path ?? window.location.pathname)
    const imageUrl = absoluteUrl(image)

    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:type', type)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', imageUrl)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', fullTitle)
    setMeta('name', 'twitter:image', imageUrl)
    setCanonical(url)

    if (localizedDescription) {
      setMeta('name', 'description', localizedDescription)
      setMeta('property', 'og:description', localizedDescription)
      setMeta('name', 'twitter:description', localizedDescription)
    }

    let script = document.getElementById('page-jsonld') as HTMLScriptElement | null
    if (json) {
      if (!script) {
        script = document.createElement('script')
        script.id = 'page-jsonld'
        script.type = 'application/ld+json'
        document.head.appendChild(script)
      }
      script.textContent = json
    } else if (script) {
      script.remove()
    }
  }, [localizedTitle, localizedDescription, language, path, image, type, json])
}
