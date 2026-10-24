import { LocalizedText } from '../i18n/LocalizedText'
import { ArrowRight, Fingerprint, Globe2, Search, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { InfoPageLayout } from '../components/InfoPageLayout'
import { PageHero } from '../components/PageHero'
import { usePageMeta } from '../lib/usePageMeta'

const sections = [
  { id: 'search-and-forms', label: 'Search and forms' },
  { id: 'hosting-logs', label: 'Hosting and technical logs' },
  { id: 'third-party-services', label: 'Third-party services and links' },
  { id: 'your-choices', label: 'Your choices' },
  { id: 'changes-and-contact', label: 'Changes and contact' },
]

const privacyHighlights = [
  {
    icon: Fingerprint,
    title: 'No account or submitted forms',
    text: 'There are no sign-ups, comments, or forms that send personal data to this project.',
  },
  {
    icon: Search,
    title: 'Search stays in your browser',
    text: 'Search matches against information bundled with the site.',
  },
  {
    icon: ShieldCheck,
    title: 'No ads or analytics',
    text: 'This site does not run advertising, analytics, or tracking pixels.',
  },
  {
    icon: Globe2,
    title: 'External services have their own rules',
    text: 'Official sites and linked records apply their own privacy policies.',
  },
]

export function PrivacyPage() {
  usePageMeta(
    'Privacy',
    'Privacy practices for Better San Fernando: no accounts, no analytics, no advertising, and local-only search.',
  )

  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy, in plain language"
        description="This guide is a static civic reference. It does not require an account, run analytics, show advertising, or set its own cookies."
        crumbs={[{ label: 'Privacy' }]}
      />

      <InfoPageLayout sections={sections}>
        <section className="rounded-2xl border border-brand-100 bg-brand-50/70 p-5 shadow-card sm:p-7">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700"><LocalizedText text={"At a glance"} /></p>
            <h2 className="mt-1 text-xl font-extrabold tracking-tight text-ink-950"><LocalizedText text={"The short version"} /></h2>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {privacyHighlights.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3 rounded-xl border border-white/80 bg-white p-4">
                <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-700" />
                <span>
                  <span className="block text-sm font-bold text-ink-950">{title}</span>
                  <span className="mt-1 block text-xs leading-5 text-ink-600">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section id="search-and-forms" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700"><LocalizedText text={"01 · On this site"} /></p>
          <h2 className="mt-2 text-lg font-extrabold tracking-tight text-ink-950"><LocalizedText text={"Search and forms"} /></h2>
          <p className="mt-2 text-[15px] leading-7 text-ink-600">
            <LocalizedText text={"Search terms are read from the page address and matched against local data in your browser. They are not sent to a server operated by this project. The site does not include a transaction form, payment flow, or user account system."} /></p>
        </section>

        <section id="hosting-logs" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700"><LocalizedText text={"02 · Site delivery"} /></p>
          <h2 className="mt-2 text-lg font-extrabold tracking-tight text-ink-950"><LocalizedText text={"Hosting and technical logs"} /></h2>
          <p className="mt-2 text-[15px] leading-7 text-ink-600">
            <LocalizedText text={"The site may be delivered by a third-party hosting provider, which can keep standard request logs such as IP address, browser type, and time of access for security and operations. Those logs are governed by the hosting provider’s policy, not by this guide."} /></p>
        </section>

        <section id="third-party-services" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700"><LocalizedText text={"03 · Off-site services"} /></p>
          <h2 className="mt-2 text-lg font-extrabold tracking-tight text-ink-950"><LocalizedText text={"Third-party services and links"} /></h2>
          <p className="mt-2 text-[15px] leading-7 text-ink-600">
            <LocalizedText text={"The site loads the Figtree typeface from Google Fonts, which may receive your IP address when the font is requested. Links to the official city website, Google Drive, and other public records take you to services with their own privacy policies. This guide does not control those services."} /></p>
        </section>

        <section id="your-choices" className="scroll-mt-28 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700"><LocalizedText text={"04 · Your control"} /></p>
          <h2 className="mt-2 text-lg font-extrabold tracking-tight text-ink-950"><LocalizedText text={"Your choices"} /></h2>
          <p className="mt-2 text-[15px] leading-7 text-ink-600">
            <LocalizedText text={"You can block third-party fonts, scripts, or cookies through your browser settings. Doing so may change the site’s appearance but should not prevent access to the written content. For city transactions, use the official channels listed on the contact page."} /></p>
        </section>

        <section id="changes-and-contact" className="scroll-mt-28 rounded-2xl border border-line bg-surface p-5 sm:p-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-brand-700"><LocalizedText text={"05 · Policy details"} /></p>
          <h2 className="mt-2 text-lg font-extrabold tracking-tight text-ink-950"><LocalizedText text={"Changes and contact"} /></h2>
          <p className="mt-2 text-[15px] leading-7 text-ink-600">
            <LocalizedText text={"This policy may be updated as the site’s practices change. It describes this independent guide, not the City Government of San Fernando’s official website. The city-data review date shown elsewhere does not indicate a revision to this policy."} /></p>
          <Link
            to="/contact"
            viewTransition
            className="mt-4 inline-flex min-h-10 items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800"
          >
            <LocalizedText text={"Contact and official channels"} /><ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </section>
      </InfoPageLayout>
    </>
  )
}
