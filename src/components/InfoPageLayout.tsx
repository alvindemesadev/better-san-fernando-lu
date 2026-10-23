import { ArrowDownRight } from 'lucide-react'
import type { ReactNode } from 'react'

export interface InfoPageSectionLink {
  id: string
  label: string
}

export function InfoPageLayout({
  sections,
  children,
}: {
  sections: InfoPageSectionLink[]
  children: ReactNode
}) {
  return (
    <div className="container-page py-8 sm:py-12">
      <div className="grid min-w-0 gap-5 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:gap-8">
        <aside className="lg:sticky lg:top-28">
          <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-500">On this page</p>
            <nav aria-label="Page sections" className="mt-3">
              <ul className="flex flex-wrap gap-2 lg:grid lg:gap-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="group inline-flex min-h-10 items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-xs font-semibold text-ink-700 transition hover:border-brand-200 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 lg:w-full lg:justify-between lg:border-transparent lg:bg-transparent lg:px-2"
                    >
                      <span>{section.label}</span>
                      <ArrowDownRight
                        aria-hidden="true"
                        className="hidden size-3.5 shrink-0 text-ink-400 transition group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-brand-700 lg:block"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <div className="min-w-0 space-y-4">{children}</div>
      </div>
    </div>
  )
}
