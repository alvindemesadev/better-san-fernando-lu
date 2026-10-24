import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { defineConfig } from 'vitest/config'
import type { Plugin } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { formatDataFreshnessReport, getDataFreshness } from './src/data/dataFreshness.ts'
import { buildRouteMetadata } from './src/data/routeMetadata.ts'
import { renderStaticMetadata } from './src/lib/staticMetadata.ts'

function routeMetadataPlugin(): Plugin {
  return {
    name: 'route-metadata',
    apply: 'build',
    async writeBundle(outputOptions) {
      const outDir = resolve(outputOptions.dir ?? 'dist')
      const template = await readFile(join(outDir, 'index.html'), 'utf8')
      const configuredOrigin = process.env.VITE_SITE_ORIGIN ?? process.env.CF_PAGES_URL ?? 'https://bettersanfernando.pages.dev'
      const siteOrigin = configuredOrigin ? new URL(configuredOrigin).origin : 'https://bettersanfernando.pages.dev'
      const pages = buildRouteMetadata()

      for (const page of pages) {
        const target = page.path === '/'
          ? join(outDir, 'index.html')
          : join(outDir, ...page.path.slice(1).split('/'), 'index.html')
        await mkdir(dirname(target), { recursive: true })
        await writeFile(target, renderStaticMetadata(template, page, siteOrigin), 'utf8')
      }

      console.info(`Prerendered route metadata for ${pages.length} routes.`)

      const sitemapEntries = pages
        .map((page) => {
          const loc = new URL(page.path, siteOrigin).toString()
          const lastmod = page.lastmod ?? new Date().toISOString().split('T')[0]
          const changefreq = page.changefreq ?? (page.path === '/' ? 'daily' : page.path.startsWith('/news') ? 'weekly' : 'monthly')
          const priority = page.priority !== undefined ? page.priority.toFixed(1) : page.path === '/' ? '1.0' : page.path.split('/').length === 2 ? '0.8' : '0.6'
          return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`
        })
        .join('\n')

      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`
      await writeFile(join(outDir, 'sitemap.xml'), sitemapXml, 'utf8')
      console.info(`Generated sitemap.xml for ${pages.length} routes.`)

      const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${siteOrigin}/sitemap.xml\n`
      await writeFile(join(outDir, 'robots.txt'), robotsTxt, 'utf8')
      const freshnessReport = formatDataFreshnessReport()
      console.info(`\n${freshnessReport}`)

      const staleRows = getDataFreshness().filter((row) => row.status !== 'current')
      if (process.env.GITHUB_ACTIONS === 'true') {
        for (const row of staleRows) {
          const reason = row.status === 'unknown' ? 'verification date is missing' : `${row.ageDays} days since verification`
          console.warn(`::warning title=Data review needed::${row.dataset}: ${reason}. Source: ${row.source}`)
        }
      }
      if (process.env.GITHUB_STEP_SUMMARY) {
        await appendFile(process.env.GITHUB_STEP_SUMMARY, `### Data freshness\n\n${freshnessReport}\n`, 'utf8')
      }
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    routeMetadataPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: null,
      includeAssets: ['favicon.png', 'apple-touch-icon.png', 'og.png', 'pwa-192.png', 'pwa-512.png'],
      manifest: {
        name: 'Better San Fernando, La Union',
        short_name: 'Better SFC',
        description:
          'A clearer, independent guide to City of San Fernando, La Union services, officials, barangays, budgets, and public records.',
        lang: 'en',
        theme_color: '#3c4fe0',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        categories: ['government', 'reference'],
        icons: [
          { src: '/pwa-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,woff2}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/tiles\.openfreemap\.org\/fonts\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'openfreemap-glyphs',
              cacheableResponse: { statuses: [0, 200] },
              expiration: { maxEntries: 300, maxAgeSeconds: 60 * 60 * 24 * 90 },
            },
          },
          {
            urlPattern: /\/assets\/[^/]+\.geojson$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'barangay-boundaries',
              expiration: { maxEntries: 2, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /\/(?:assets|city|logos|news|officials|places)\/.*\.(?:avif|gif|jpe?g|png|svg|webp|ico)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'local-images',
              expiration: { maxEntries: 250, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
        ],
      },
    }),
  ],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
})
