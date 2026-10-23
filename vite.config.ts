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
      const configuredOrigin = process.env.VITE_SITE_ORIGIN ?? process.env.CF_PAGES_URL ?? ''
      const siteOrigin = configuredOrigin ? new URL(configuredOrigin).origin : ''
      const pages = buildRouteMetadata()

      for (const page of pages) {
        const target = page.path === '/'
          ? join(outDir, 'index.html')
          : join(outDir, ...page.path.slice(1).split('/'), 'index.html')
        await mkdir(dirname(target), { recursive: true })
        await writeFile(target, renderStaticMetadata(template, page, siteOrigin), 'utf8')
      }

      console.info(`Prerendered route metadata for ${pages.length} routes.`)
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
      includeAssets: ['favicon.png', 'apple-touch-icon.png', 'og.png'],
      manifest: {
        name: 'Better San Fernando, La Union',
        short_name: 'Better SF',
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
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,woff2}'],
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
        ],
      },
    }),
  ],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
