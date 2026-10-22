import { AlertTriangle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { city } from '../data/city'
import { formatDate } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

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

      <div className="container-page py-10 sm:py-14">
        <div className="mx-auto max-w-3xl space-y-6">
          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 sm:p-7">
            <h2 className="inline-flex items-center gap-2 text-lg font-extrabold text-amber-950">
              <AlertTriangle aria-hidden="true" className="size-5 text-amber-700" />
              Not an official government website
            </h2>
            <p className="mt-3 text-sm leading-6 text-amber-900/80">
              This project is not affiliated with, endorsed by, or operated by the City Government of San Fernando.
              The official website is{' '}
              <a
                href={city.website}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline decoration-amber-400 underline-offset-2"
              >
                sanfernandocity.gov.ph
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight text-ink-950">Use of the site</h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-600">
              You may read, link to, and share the guide for personal, civic, educational, and journalistic use. Do
              not present it as an official city publication or use it to mislead others about an official
              transaction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight text-ink-950">Accuracy and timeliness</h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-600">
              The guide summarizes public records and links to official sources. Requirements, fees, schedules,
              officials, and documents can change without notice. Information is provided as-is, without a warranty
              of completeness or accuracy. Always confirm details with the issuing office or the official city
              website before relying on them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight text-ink-950">No professional advice</h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-600">
              Nothing on this site is legal, tax, financial, medical, or engineering advice. For decisions with
              legal or financial consequences, consult a qualified professional or the appropriate government
              office.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight text-ink-950">External links</h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-600">
              Links to the city website, the Citizens’ Charter, Google Drive, and other public records are provided
              for reference. This project does not control those destinations and is not responsible for their
              content, availability, or policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-extrabold tracking-tight text-ink-950">Intellectual property</h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-600">
              The city seal, official documents, photographs, and news material belong to their respective owners.
              This guide’s original summaries and layout are provided for public understanding. If you believe
              something is attributed incorrectly, use the contact page to find the appropriate official channel.
            </p>
          </section>

          <section className="rounded-2xl border border-line bg-surface p-5 sm:p-7">
            <h2 className="text-xl font-extrabold tracking-tight text-ink-950">Changes</h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-600">
              These terms may be updated as the guide evolves. Last updated {formatDate(city.lastVerified)}.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link
                to="/about"
                viewTransition
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800"
              >
                About the project
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                to="/contact"
                viewTransition
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800"
              >
                Contact
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
