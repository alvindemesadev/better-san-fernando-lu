import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { barangayMap } from '../data/barangayMap'
import { dpwhMapBounds, dpwhProjects, type DpwhProjectRecord } from '../data/projects'
import { formatPeso } from '../lib/utils'

const colors: Record<string, string> = {
  Completed: '#2f3fc4',
  Ongoing: '#d97706',
  'For procurement': '#64748b',
}

function projectPoint(project: DpwhProjectRecord) {
  if (project.latitude === null || project.longitude === null) return null
  const padding = 12
  const width = 1000 - padding * 2
  const height = 644 - padding * 2
  const x = ((project.longitude - dpwhMapBounds.minLng) / (dpwhMapBounds.maxLng - dpwhMapBounds.minLng)) * width + padding
  const y = ((dpwhMapBounds.maxLat - project.latitude) / (dpwhMapBounds.maxLat - dpwhMapBounds.minLat)) * height + padding
  if (x < 0 || x > 1000 || y < 0 || y > 644) return null
  return { x, y }
}

export function ProjectMap() {
  const mapped = dpwhProjects
    .map((project) => ({ project, point: projectPoint(project) }))
    .filter((entry): entry is { project: DpwhProjectRecord; point: { x: number; y: number } } => entry.point !== null)
  const [selected, setSelected] = useState<DpwhProjectRecord>(mapped[0]?.project ?? dpwhProjects[0])

  return (
    <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
      <figure className="rounded-2xl border border-line bg-surface p-3 shadow-card sm:p-5">
        <svg viewBox={barangayMap.viewBox} role="img" aria-label="Map of DPWH infrastructure projects in San Fernando, La Union" className="h-auto w-full">
          {barangayMap.features.map((feature) => (
            <path key={feature.slug} d={feature.path} fill="#d5dbe8" fillRule="evenodd" stroke="#ffffff" strokeWidth="0.9" vectorEffect="non-scaling-stroke" />
          ))}
          {mapped.map(({ project, point }) => (
            <circle
              key={project.contractId}
              cx={point.x}
              cy={point.y}
              r={3.2}
              fill={colors[project.status] ?? '#64748b'}
              fillOpacity={selected.contractId === project.contractId ? 1 : 0.72}
              stroke={selected.contractId === project.contractId ? '#111827' : '#ffffff'}
              strokeWidth={selected.contractId === project.contractId ? 1.6 : 0.7}
              className="cursor-pointer outline-none focus-visible:stroke-ink-950"
              role="button"
              tabIndex={0}
              aria-label={`${project.title}, ${project.budget > 0 ? formatPeso(project.budget) : 'budget not published'}, ${project.status}`}
              onClick={() => setSelected(project)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setSelected(project)
                }
              }}
            >
              <title>{`${project.title} ? ${project.budget > 0 ? formatPeso(project.budget) : 'Budget not published'} (${project.status})`}</title>
            </circle>
          ))}
        </svg>
        <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] font-semibold text-ink-500">
          <span>{mapped.length} mapped project points</span>
          <span className="flex flex-wrap items-center gap-3">
            {Object.entries(colors).map(([status, color]) => (
              <span key={status} className="inline-flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{ backgroundColor: color }} />
                {status}
              </span>
            ))}
          </span>
        </figcaption>
      </figure>

      <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6" aria-live="polite">
        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
          <MapPin aria-hidden="true" className="size-5" />
        </span>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-brand-700">{selected.contractId}</p>
        <h3 className="mt-1 text-xl font-extrabold leading-tight tracking-tight text-ink-950">{selected.title}</h3>
        <dl className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-surface p-3">
            <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">Contract value</dt>
            <dd className="mt-1 text-sm font-extrabold leading-5 text-ink-950">{selected.budget > 0 ? formatPeso(selected.budget) : 'Not published'}</dd>
          </div>
          <div className="rounded-xl bg-surface p-3">
            <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">Progress</dt>
            <dd className="mt-1 text-sm font-extrabold text-ink-950">{selected.progress.toFixed(1)}%</dd>
          </div>
          <div className="rounded-xl bg-surface p-3">
            <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">Year</dt>
            <dd className="mt-1 text-sm font-extrabold text-ink-950">{selected.year}</dd>
          </div>
          <div className="rounded-xl bg-surface p-3">
            <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">Status</dt>
            <dd className="mt-1 text-sm font-extrabold text-ink-950">{selected.status}</dd>
          </div>
        </dl>
        <div className="mt-4 space-y-2 text-sm leading-6 text-ink-600">
          <p><strong className="text-ink-900">Contractor:</strong> {selected.contractor || 'Not yet awarded'}</p>
          <p><strong className="text-ink-900">Barangay:</strong> {selected.barangay ?? 'Not named in the record'}</p>
          <p><strong className="text-ink-900">Category:</strong> {selected.category}</p>
        </div>
        <p className="mt-auto pt-5 text-xs leading-5 text-ink-500">
          Coordinates place the project near this point; they are not a cadastral boundary. Select another dot on the map to inspect it.
        </p>
      </div>
    </div>
  )
}
