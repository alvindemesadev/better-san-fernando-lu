import { ArrowRight, Lock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { city } from '../data/city'
import { formatDate } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

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

      <div className="container-page py-10 sm:py-14">
        <div className="mx-auto max-w-3xl space-y-6">
          <section className="rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
            <h2 className="inline-flex items-center gap-2 text-xl font-extrabold tracking-tight text-ink-950">
              <Lock aria-hidden="true" className="size-5 text-brand-700" />
              The short version
            </h2>
            <ul className="mt-3 space-y-2 text-[15px] leading-7 text-ink-600">
              <li>No accounts, sign-ups, comments, or contact forms that submit personal data to this site.</li>
              <li>No analytics, advertising, or tracking pixels run on this site.</li>
              <li>Search is performed in your browser against a bundled static index.</li>
              <li>This guide does not set its own cookies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight text-ink-950">Search and forms</h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-600">
              Search terms are read from the page address and matched against local data in your browser. They are
              not sent to a server operated by this project. The site does not include a transaction form, payment
              flow, or user account system.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight text-ink-950">Hosting and technical logs</h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-600">
              The site may be delivered by a third-party hosting provider, which can keep standard request logs such
              as IP address, browser type, and time of access for security and operations. Those logs are governed
              by the hosting provider’s policy, not by this guide.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight text-ink-950">Third-party services and links</h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-600">
              The site loads the Figtree typeface from Google Fonts, which may receive your IP address when the font
              is requested. Links to the official city website, Google Drive, and other public records take you to
              services with their own privacy policies. This guide does not control those services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight text-ink-950">Your choices</h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-600">
              You can block third-party fonts, scripts, or cookies through your browser settings. Doing so may
              change the site’s appearance but should not prevent access to the written content. For city
              transactions, use the official channels listed on the contact page.
            </p>
          </section>

          <section className="rounded-2xl border border-line bg-surface p-5 sm:p-7">
            <h2 className="text-xl font-extrabold tracking-tight text-ink-950">Changes and contact</h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-600">
              This policy may be updated as the site changes. It describes this independent guide, not the City
              Government of San Fernando’s official website. Last updated {formatDate(city.lastVerified)}.
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
        </div>
      </div>
    </>
  )
}
