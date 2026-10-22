import { ArrowRight, ExternalLink, MapPin } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { barangayMap } from '../data/barangayMap'
import { barangays } from '../data/barangays'
import { city } from '../data/city'
import { formatNumber } from '../lib/utils'

const colors = {
  base: '#d5dbe8',
  hover: '#a5b2ff',
  selected: '#2f3fc4',
}

export function BarangayMap() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const selected = barangays.find((barangay) => barangay.slug === selectedSlug)
  const selectedMapFeature = barangayMap.features.find((feature) => feature.slug === selectedSlug)

  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <figure className="rounded-2xl border border-line bg-surface p-3 shadow-card sm:p-5">
        <svg
          viewBox={barangayMap.viewBox}
          role="group"
          aria-label="Interactive map of the 59 barangays of San Fernando, La Union"
          className="h-auto w-full"
        >
          {barangayMap.features.map((feature) => {
            const isSelected = feature.slug === selectedSlug
            const isHovered = feature.slug === hoveredSlug
            return (
              <path
                key={feature.slug}
                d={feature.path}
                fill={isSelected ? colors.selected : isHovered ? colors.hover : colors.base}
                fillRule="evenodd"
                stroke="#ffffff"
                strokeWidth="0.9"
                vectorEffect="non-scaling-stroke"
                role="button"
                tabIndex={0}
                aria-label={`${feature.name}, ${feature.areaSqKm.toFixed(1)} square kilometers`}
                aria-pressed={isSelected}
                onMouseEnter={() => setHoveredSlug(feature.slug)}
                onMouseLeave={() => setHoveredSlug(null)}
                onFocus={() => setHoveredSlug(feature.slug)}
                onBlur={() => setHoveredSlug(null)}
                onClick={() => setSelectedSlug(feature.slug)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    setSelectedSlug(feature.slug)
                  }
                }}
                className="cursor-pointer outline-offset-2 transition-[fill] duration-150 focus-visible:outline-2 focus-visible:outline-brand-700"
              >
                <title>{feature.name}</title>
              </path>
            )
          })}
        </svg>
        <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] font-semibold text-ink-500">
          <span>Approximate boundaries, PSA and NAMRIA</span>
          <span>{barangayMap.features.length} barangays</span>
        </figcaption>
      </figure>

      <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6" aria-live="polite">
        {selected ? (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-700">{selected.district}</p>
            <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-ink-950">{selected.name}</h3>
            <dl className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-surface p-3">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">Population 2024</dt>
                <dd className="mt-1 text-base font-extrabold tabular-nums text-ink-950">
                  {formatNumber(selected.population2024)}
                </dd>
              </div>
              <div className="rounded-xl bg-surface p-3">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">City rank</dt>
                <dd className="mt-1 text-base font-extrabold tabular-nums text-ink-950">#{selected.rank}</dd>
              </div>
              <div className="rounded-xl bg-surface p-3">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">Land area</dt>
                <dd className="mt-1 text-base font-extrabold tabular-nums text-ink-950">
                  {selectedMapFeature ? `${selectedMapFeature.areaSqKm.toFixed(1)} km²` : '—'}
                </dd>
              </div>
              <div className="rounded-xl bg-surface p-3">
                <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">Punong Barangay</dt>
                <dd className="mt-1 line-clamp-2 text-xs font-bold leading-5 text-ink-900">
                  {selected.punongBarangay}
                </dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                to={`/government/barangays/${selected.slug}`}
                viewTransition
                className="inline-flex items-center gap-2 rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
              >
                View barangay
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <button
                type="button"
                onClick={() => setSelectedSlug(null)}
                className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
              >
                Reset map
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <MapPin aria-hidden="true" className="size-5" />
            </span>
            <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-ink-950">Explore the city map</h3>
            <p className="mt-2 text-sm leading-6 text-ink-600">
              Hover or tap any shape to preview a barangay. Click a barangay to see its 2024 population, city rank, land
              area, and elected leader.
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

        <div className="mt-auto pt-5">
          <a
            href="https://data.bettergov.ph/datasets/22"
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-2 rounded-xl border border-line bg-surface p-3 text-xs font-semibold leading-5 text-ink-700 transition hover:border-brand-200 hover:text-brand-700"
          >
            <ExternalLink aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
            <span>
              Flood, landslide, and storm-surge maps from Project NOAH
              <span className="mt-0.5 block font-normal text-ink-500">
                National hazard tiles are linked, not embedded.
              </span>
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}
