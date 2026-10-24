import { LocalizedText } from '../i18n/LocalizedText'
import { AlertTriangle, ArrowRight, ExternalLink, ShieldCheck, TimerReset, Verified } from 'lucide-react'
import { Link } from 'react-router-dom'
import { InfoPageLayout } from '../components/InfoPageLayout'
import { PageHero } from '../components/PageHero'
import { city } from '../data/city'
import { usePageMeta } from '../lib/usePageMeta'

const sections = [
  { id: 'use-of-site', label: 'Use of the site' },
  { id: 'accuracy', label: 'Accuracy and timeliness' },
  { id: 'professional-advice', label: 'No professional advice' },
  { id: 'external-links', label: 'External links' },
  { id: 'intellectual-property', label: 'Intellectual property' },
  { id: 'changes', label: 'Changes' },
]

const termsHighlights = [
  { icon: ShieldCheck, title: 'Independent civic reference', text: 'This guide is not operated or endorsed by City Hall.' },
  { icon: TimerReset, title: 'Details can change', text: 'Confirm requirements, fees, and schedules with the issuing office.' },
  { icon: Verified, title: 'Official sources take priority', text: 'Use the original city or agency source before relying on a summary.' },
]

export function TermsPage() {
  usePageMeta(
    'Terms of use',
    'Terms for using Better San Fernando, an independent civic guide that is not the official city website.',
  )

  return (
    <>
      <PageHero
        eyebrow="Terms of use"
        title="What this guide is — and is not"
        description="Better San Fernando is an independent civic reference. It is not the official city website and does not provide legal, financial, or professional advice."
        crumbs={[{ label: 'Terms' }]}
      />

      <InfoPageLayout sections={sections}>
        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-card sm:p-6">
          <p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-800">
            <AlertTriangle aria-hidden="true" className="size-4" />
            <LocalizedText text={"Important"} /></p>
          <h2 className="mt-2 text-lg font-extrabold text-amber-950"><LocalizedText text={"Not an official government website"} /></h2>
          <p className="mt-2 text-sm leading-6 text-amber-900/80">
            <LocalizedText text={"This project is not affiliated with, endorsed by, or operated by the City Government of San Fernando. The official website is"} />{' '}
            <a
              href={city.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold underline decoration-amber-400 underline-offset-2"
            >
              <LocalizedText text={"sanfernandocity.gov.ph"} /><ExternalLink aria-hidden="true" className="size-3.5" />
            </a>
            .
          </p>
        </section>

        <ul className="grid gap-3 sm:grid-cols-3">
          {termsHighlights.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-line bg-white p-4 shadow-card">
              <Icon aria-hidden="true" className="size-4 text-brand-700" />
              <span className="mt-3 block text-sm font-bold text-ink-950">{title}</span>
              <span className="mt-1 block text-xs leading-5 text-ink-600">{text}</span>
            </li>
          ))}
        </ul>

        <section id="use-of-site" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700"><LocalizedText text={"01 · Using this guide"} /></p>
          <h2 className="mt-2 text-lg font-extrabold tracking-tight text-ink-950"><LocalizedText text={"Use of the site"} /></h2>
          <p className="mt-2 text-[15px] leading-7 text-ink-600">
            <LocalizedText text={"You may read, link to, and share the guide for personal, civic, educational, and journalistic use. Do not present it as an official city publication or use it to mislead others about an official transaction."} /></p>
        </section>

        <section id="accuracy" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700"><LocalizedText text={"02 · Public information"} /></p>
          <h2 className="mt-2 text-lg font-extrabold tracking-tight text-ink-950"><LocalizedText text={"Accuracy and timeliness"} /></h2>
          <p className="mt-2 text-[15px] leading-7 text-ink-600">
            <LocalizedText text={"The guide summarizes public records and links to official sources. Requirements, fees, schedules, officials, and documents can change without notice. Information is provided as-is, without a warranty of completeness or accuracy. Always confirm details with the issuing office or the official city website before relying on them."} /></p>
        </section>

        <section id="professional-advice" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700"><LocalizedText text={"03 · Decisions"} /></p>
          <h2 className="mt-2 text-lg font-extrabold tracking-tight text-ink-950"><LocalizedText text={"No professional advice"} /></h2>
          <p className="mt-2 text-[15px] leading-7 text-ink-600">
            <LocalizedText text={"Nothing on this site is legal, tax, financial, medical, or engineering advice. For decisions with legal or financial consequences, consult a qualified professional or the appropriate government office."} /></p>
        </section>

        <section id="external-links" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700"><LocalizedText text={"04 · Other websites"} /></p>
          <h2 className="mt-2 text-lg font-extrabold tracking-tight text-ink-950"><LocalizedText text={"External links"} /></h2>
          <p className="mt-2 text-[15px] leading-7 text-ink-600">
            <LocalizedText text={"Links to the city website, the Citizens’ Charter, Google Drive, and other public records are provided for reference. This project does not control those destinations and is not responsible for their content, availability, or policies."} /></p>
        </section>

        <section id="intellectual-property" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700"><LocalizedText text={"05 · Attribution"} /></p>
          <h2 className="mt-2 text-lg font-extrabold tracking-tight text-ink-950"><LocalizedText text={"Intellectual property"} /></h2>
          <p className="mt-2 text-[15px] leading-7 text-ink-600">
            <LocalizedText text={"The city seal, official documents, photographs, and news material belong to their respective owners. This guide’s original summaries and layout are provided for public understanding. If you believe something is attributed incorrectly, use the contact page to find the appropriate official channel."} /></p>
        </section>

        <section id="changes" className="scroll-mt-28 rounded-2xl border border-line bg-surface p-5 sm:p-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700"><LocalizedText text={"06 · Terms details"} /></p>
          <h2 className="mt-2 text-lg font-extrabold tracking-tight text-ink-950"><LocalizedText text={"Changes"} /></h2>
          <p className="mt-2 text-[15px] leading-7 text-ink-600">
            <LocalizedText text={"These terms may be updated as the guide evolves. The data review date shown elsewhere on the site does not indicate a revision to these terms."} /></p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
            <Link to="/about" viewTransition className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800">
              <LocalizedText text={"About the project"} trailingSpace /><ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link to="/contact" viewTransition className="inline-flex min-h-10 items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800">
              <LocalizedText text={"Contact"} trailingSpace /><ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </section>
      </InfoPageLayout>
    </>
  )
}
