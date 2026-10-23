import { ArrowRight, ExternalLink, MapPin } from 'lucide-react'
import { Suspense, lazy, useState } from 'react'
import { Link } from 'react-router-dom'
import { barangayMap } from '../data/barangayMap'
import { barangays } from '../data/barangays'
import { city } from '../data/city'
import { formatNumber } from '../lib/utils'

const barangayBySlug = new Map(barangays.map((barangay) => [barangay.slug, barangay]))
const BarangayMapCanvas = lazy(() =>
  import('./BarangayMapCanvas').then((module) => ({ default: module.BarangayMapCanvas })),
)

const colors = {
  population: ['#d7e9f7', '#a9cdea', '#72add4', '#4388b7', '#205b82'],
  selected: '#dd8c2d',
}

const populationBands = [
  { label: '≤ 1,000', color: colors.population[0] },
  { label: '1,001–2,500', color: colors.population[1] },
  { label: '2,501–5,000', color: colors.population[2] },
  { label: '5,001–8,000', color: colors.population[3] },
  { label: '> 8,000', color: colors.population[4] },
]

export function BarangayMap() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const [resetToken, setResetToken] = useState(0)
  const previewSlug = hoveredSlug ?? selectedSlug
  const preview = previewSlug ? barangayBySlug.get(previewSlug) : undefined
  const previewMapFeature = barangayMap.features.find((feature) => feature.slug === previewSlug)
  const isPinned = previewSlug !== null && previewSlug === selectedSlug
  const resetMap = () => {
    setSelectedSlug(null)
    setHoveredSlug(null)
    setResetToken((current) => current + 1)
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.75fr)] lg:items-stretch">
      <figure
        className="overflow-hidden rounded-3xl border border-[#d7e2ea] bg-[#e9eff1] p-2.5 shadow-[0_12px_35px_-24px_rgba(28,55,76,0.45)] sm:p-4"
      >
        <Suspense
          fallback={<div className="h-[27rem] animate-pulse rounded-2xl bg-surface sm:h-[32rem]" aria-label="Loading map" />}
        >
          <BarangayMapCanvas resetToken={resetToken} onSelect={setSelectedSlug} onHover={setHoveredSlug} />
        </Suspense>
        <div className="mt-3 rounded-xl border border-line bg-white px-3 py-3">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-600">Population · 2024 census</span>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-ink-500">
              <span className="size-3 rounded-sm ring-1 ring-black/5" style={{ backgroundColor: colors.selected }} aria-hidden="true" />
              Selected
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-[10px] font-medium text-ink-500">
            {populationBands.map((band) => (
              <span key={band.label} className="inline-flex items-center gap-1.5">
                <span className="size-3 rounded-sm ring-1 ring-black/5" style={{ backgroundColor: band.color }} aria-hidden="true" />
                {band.label}
              </span>
            ))}
          </div>
        </div>
        <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 px-1 text-[10px] font-medium text-ink-500">
          <a
            href="https://github.com/altcoder/philippines-psgc-shapefiles"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-ink-300 underline-offset-2 transition hover:text-brand-700"
          >
            Boundary shapes · PSA / NAMRIA 2023
          </a>
          <span>{barangayMap.features.length} barangays · {city.districtCount} districts</span>
        </figcaption>
      </figure>

      <div className="flex min-h-[22rem] flex-col rounded-3xl border border-line bg-white p-5 shadow-card sm:p-6" aria-live="polite">
        {preview ? (
          <>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">{preview.district}</p>
              <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-ink-500">
                {isPinned ? 'Selected' : 'Preview'}
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-ink-950">{preview.name}</h3>
            <p className="mt-2 text-sm leading-6 text-ink-600">
              Barangay profile and 2024 census details for this part of San Fernando.
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-surface p-3">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">Population 2024</dt>
                <dd className="mt-1 text-base font-extrabold tabular-nums text-ink-950">
                  {formatNumber(preview.population2024)}
                </dd>
              </div>
              <div className="rounded-xl bg-surface p-3">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">City rank</dt>
                <dd className="mt-1 text-base font-extrabold tabular-nums text-ink-950">#{preview.rank}</dd>
              </div>
              <div className="rounded-xl bg-surface p-3">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">Land area</dt>
                <dd className="mt-1 text-base font-extrabold tabular-nums text-ink-950">
                  {previewMapFeature ? `${previewMapFeature.areaSqKm.toFixed(1)} km²` : '—'}
                </dd>
              </div>
              <div className="rounded-xl bg-surface p-3">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">Punong Barangay</dt>
                <dd className="mt-1 line-clamp-2 text-xs font-bold leading-5 text-ink-900">{preview.punongBarangay}</dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-3">
              {isPinned ? (
                <Link
                  to={`/government/barangays/${preview.slug}`}
                  viewTransition
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
                >
                  View barangay profile
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              ) : (
                <p className="self-center text-xs font-medium text-ink-500">Click a barangay to zoom to and select it.</p>
              )}
              {selectedSlug ? (
                <button
                  type="button"
                  onClick={resetMap}
                  className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
                >
                  Reset map
                </button>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <MapPin aria-hidden="true" className="size-5" />
            </span>
            <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink-950">Explore San Fernando</h3>
            <p className="mt-2 text-sm leading-6 text-ink-600">
              Click a barangay to zoom in and lift it above the map. Drag to explore nearby boundaries; hover to preview
              another community.
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-surface p-3">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">Barangays</dt>
                <dd className="mt-1 text-base font-extrabold tabular-nums text-ink-950">{city.barangayCount}</dd>
              </div>
              <div className="rounded-xl bg-surface p-3">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">Districts</dt>
                <dd className="mt-1 text-base font-extrabold tabular-nums text-ink-950">{city.districtCount}</dd>
              </div>
            </dl>
          </>
        )}

        <a
          href="https://data.bettergov.ph/datasets/22"
          target="_blank"
          rel="noreferrer"
          className="mt-auto flex items-start gap-2 border-t border-line pt-4 text-xs font-semibold leading-5 text-ink-600 transition hover:text-brand-700"
        >
          <ExternalLink aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
          <span>
            Explore Project NOAH hazard maps
            <span className="mt-0.5 block font-normal text-ink-500">National hazard layers are linked, not embedded.</span>
          </span>
        </a>
      </div>
    </div>
  )
}
