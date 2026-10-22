interface StatCardProps {
  value: string
  label: string
  note?: string
  tone?: 'light' | 'dark'
}

export function StatCard({ value, label, note, tone = 'light' }: StatCardProps) {
  if (tone === 'dark') {
    return (
      <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm sm:p-5">
        <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{value}</p>
        <p className="mt-1 text-sm font-semibold text-white/85">{label}</p>
        {note ? <p className="mt-0.5 text-xs text-white/60">{note}</p> : null}
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
      <p className="text-2xl font-extrabold tracking-tight text-brand-700 sm:text-3xl">{value}</p>
      <p className="mt-1 text-sm font-semibold text-ink-900">{label}</p>
      {note ? <p className="mt-0.5 text-xs text-ink-500">{note}</p> : null}
    </div>
  )
}
