import { ExternalLink } from 'lucide-react'
import type { Official } from '../data/types'

interface OfficialCardProps {
  official: Official
  featured?: boolean
}

export function OfficialCard({ official, featured = false }: OfficialCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-line bg-white shadow-card">
      <div className={`relative overflow-hidden bg-brand-50 ${featured ? 'aspect-[4/3]' : 'aspect-[4/4.4]'}`}>
        {official.photo ? (
          <img
            src={official.photo}
            alt={`Portrait of ${official.name}`}
            loading="lazy"
            className="size-full object-cover object-top transition duration-500 group-hover:scale-[1.025]"
          />
        ) : (
          <div className="size-full bg-surface" aria-hidden="true" />
        )}
        <span className="absolute left-3 top-3 rounded-full bg-ink-950/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
          {official.role}
        </span>
      </div>
      <div className="p-4">
        <h3 className={`text-balance font-extrabold leading-tight tracking-tight text-ink-950 ${featured ? 'text-xl' : 'text-base'}`}>
          {official.name}
        </h3>
        {official.note ? <p className="mt-2 text-xs leading-5 text-ink-500">{official.note}</p> : null}
        {official.bioUrl ? (
          <a
            href={official.bioUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800"
          >
            Official profile
            <ExternalLink aria-hidden="true" className="size-3" />
          </a>
        ) : (
          <p className="mt-3 text-xs font-medium text-ink-400">Official profile not published yet</p>
        )}
      </div>
    </article>
  )
}
