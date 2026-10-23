import { AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { InfoPageLayout } from '../components/InfoPageLayout'
import { PageHero } from '../components/PageHero'
import { usePageMeta } from '../lib/usePageMeta'

const sections = [
  { id: 'our-approach', label: 'Our approach' },
  { id: 'what-the-site-does', label: 'What the site does' },
  { id: 'known-limitations', label: 'Known limitations' },
  { id: 'reporting-a-barrier', label: 'Reporting a barrier' },
]

const features = [
  'Semantic landmarks, headings, lists, tables, and a skip-to-content link on every page.',
  'Keyboard-accessible navigation, search, filters, and expandable sections, with visible focus styles.',
  'Text alternatives for meaningful images; decorative images are hidden from assistive technology.',
  'Reduced-motion support: animations respect the operating system preference and no media autoplays.',
  'Responsive layouts that reflow on small screens and remain usable when text is enlarged.',
  'Color combinations chosen for readable contrast, with information never conveyed by color alone.',
]

export function AccessibilityPage() {
  usePageMeta(
    'Accessibility',
    'How Better San Fernando approaches keyboard access, screen readers, reduced motion, contrast, and accessible public documents.',
  )

  return (
    <>
      <PageHero
        eyebrow="Accessibility"
        title="A guide built to be usable"
        description="This site is designed so residents can find services and public records regardless of device, input method, or motion preference."
        crumbs={[{ label: 'Accessibility' }]}
      />

      <InfoPageLayout sections={sections}>
          <section id="our-approach" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
            <h2 className="text-xl font-extrabold tracking-tight text-ink-950">Our approach</h2>
            <p className="mt-3 text-[15px] leading-7 text-ink-600">
              Better San Fernando is an independent civic project. We aim to follow the Web Content Accessibility
              Guidelines (WCAG) 2.2 at the AA level, but the site has not been formally audited or certified. This
              page describes the practices in place and the known gaps.
            </p>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-surface p-4">
                <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-ink-500">Target</dt>
                <dd className="mt-1 text-sm font-extrabold text-ink-950">WCAG 2.2 · Level AA</dd>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-amber-800">Review status</dt>
                <dd className="mt-1 text-sm font-extrabold text-amber-950">Not formally audited</dd>
              </div>
            </dl>
          </section>

          <section id="what-the-site-does" className="scroll-mt-28 rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <h2 className="text-xl font-extrabold tracking-tight text-ink-950">What the site does</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {features.map((feature) => (
                <li
                  key={feature}
                  className="flex gap-3 rounded-2xl border border-line bg-white p-4 text-sm leading-6 text-ink-600"
                >
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="known-limitations" className="scroll-mt-28 rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
            <h2 className="inline-flex items-center gap-2 text-lg font-extrabold text-amber-950">
              <AlertTriangle aria-hidden="true" className="size-5 text-amber-700" />
              Known limitations
            </h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-900/80">
              <li>
                Official PDFs, Google Drive files, and pages on the city website are outside this project’s control
                and may not be fully accessible. If a document is a barrier, contact the issuing office for an
                alternative format.
              </li>
              <li>
                Some public records are published as scanned images or inconsistently formatted tables. We summarize
                them, but the original document remains the authoritative version.
              </li>
              <li>
                External profile and news pages may have their own accessibility practices, which this guide cannot
                change.
              </li>
            </ul>
          </section>

          <section id="reporting-a-barrier" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
            <h2 className="text-xl font-extrabold tracking-tight text-ink-950">Reporting a barrier</h2>
            <p className="mt-3 text-[15px] leading-7 text-ink-600">
              This independent project does not yet publish a dedicated support inbox. For barriers in city data or
              official documents, use the contact page to find the right city channel. For a problem with this
              site’s layout or navigation, note the page address and the assistive technology you use so it can be
              reviewed.
            </p>
            <Link
              to="/contact"
              viewTransition
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800"
            >
              Contact and official channels
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </section>
      </InfoPageLayout>
    </>
  )
}
