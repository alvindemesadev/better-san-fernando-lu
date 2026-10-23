import { ArrowLeft, ArrowUpRight, MapPin, UserRound, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { Link, useParams } from 'react-router-dom'
import { NotFoundPage } from './NotFoundPage'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { StatCard } from '../components/StatCard'
import { barangayDilgSourceUrl, barangays } from '../data/barangays'
import { city } from '../data/city'
import { formatDate, formatNumber, initials } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

export function BarangayDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const barangay = barangays.find((item) => item.slug === slug)

  usePageMeta(
    barangay?.name ?? 'Barangay not found',
    barangay
      ? `${barangay.name}, ${barangay.district}, City of San Fernando, La Union: 2024 population, population history, and barangay officials.`
      : undefined,
  )

  if (!barangay) return <NotFoundPage />

  const history = [
    { year: '2015', value: barangay.population2015 },
    { year: '2020', value: barangay.population2020 },
    { year: '2024', value: barangay.population2024 },
  ]
  const maxPopulation = Math.max(...history.map((item) => item.value))
  const neighbors = barangays.filter(
    (item) => item.districtNumber === barangay.districtNumber && item.slug !== barangay.slug,
  )

  return (
    <>
      <PageHero
        eyebrow={barangay.district}
        title={barangay.name}
        description={`A barangay in ${barangay.district}, City of San Fernando, La Union. Population, growth, and elected barangay officials from public records.`}
        crumbs={[
          { label: 'Government', href: '/government' },
          { label: 'Barangays', href: '/government/barangays' },
          { label: barangay.name },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-700">
            <MapPin aria-hidden="true" className="size-3.5 text-brand-700" />
            {barangay.district}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-700 px-3 py-1.5 text-xs font-bold text-white">
            Rank {barangay.rank} of 59
          </span>
          {barangay.poblacion ? (
            <span className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-700">
              Poblacion
            </span>
          ) : null}
        </div>
      </PageHero>

      <div className="container-page py-10 sm:py-14">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard value={formatNumber(barangay.population2024)} label="Population 2024" note="2024 Census" />
            <StatCard value={formatNumber(barangay.population2020)} label="Population 2020" note="2020 Census" />
            <StatCard value={formatNumber(barangay.population2015)} label="Population 2015" note="2015 Census" />
            <StatCard value={barangay.share} label="Share of city" note="Of 124,809 residents" />
            <StatCard value={barangay.change} label="Change" note="2020 to 2024" />
            <StatCard value={barangay.apgr} label="Annual growth rate" note="2020 to 2024" />
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <section className="h-full rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
              <SectionHeading eyebrow="Census" title="Population history" />
              <div className="mt-6 space-y-5">
                {history.map((item) => (
                  <div key={item.year}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="font-semibold text-ink-700">{item.year}</span>
                      <span className="font-extrabold tabular-nums text-ink-950">{formatNumber(item.value)}</span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(item.value / maxPopulation) * 100}%` }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full rounded-full bg-brand-600"
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-xs leading-5 text-ink-500">
                City-wide population was {formatNumber(city.population2024)} in 2024, compared with{' '}
                {formatNumber(city.population2020)} in 2020.
              </p>
            </section>
          </Reveal>

          <Reveal delay={0.06}>
            <section className="h-full rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
              <SectionHeading eyebrow="Barangay officials" title="Your barangay council" />
              <div className="mt-6 flex items-center gap-4 rounded-2xl bg-brand-700 p-4 text-white">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-white/15 text-sm font-extrabold">
                  {initials(barangay.punongBarangay)}
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-200">Punong Barangay</p>
                  <p className="mt-0.5 text-lg font-extrabold leading-tight">{barangay.punongBarangay}</p>
                </div>
              </div>

              <div className="mt-5">
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink-400">
                  <Users aria-hidden="true" className="size-3.5" />
                  Sangguniang Barangay members
                </p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {barangay.kagawads.map((kagawad, index) => (
                    <li
                      key={`${kagawad}-${index}`}
                      className="flex items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-2 text-sm text-ink-700"
                    >
                      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-extrabold text-brand-700 shadow-sm">
                        {initials(kagawad)}
                      </span>
                      <span className="leading-5">{kagawad}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {barangay.skChairperson ? (
                <div className="mt-5 border-t border-line pt-5">
                  <div className="rounded-xl border border-line bg-surface p-3">
                    <p className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-ink-500">
                      <UserRound aria-hidden="true" className="size-3.5" />
                      SK chairperson
                    </p>
                    <p className="mt-1 text-sm font-bold leading-5 text-ink-900">{barangay.skChairperson}</p>
                  </div>
                </div>
              ) : null}
            </section>
          </Reveal>
        </div>

        <section className="mt-10 border-t border-line pt-8">
          <SectionHeading
            eyebrow="Same district"
            title={`Other barangays in ${barangay.district}`}
            action={
              <Link
                to="/government/barangays"
                viewTransition
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
              >
                All barangays
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            }
          />
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {neighbors.map((item) => (
              <Link
                key={item.slug}
                to={`/government/barangays/${item.slug}`}
                viewTransition
                className="group rounded-xl border border-line bg-white p-4 shadow-sm transition hover:border-brand-200 hover:shadow-card"
              >
                <span className="block text-sm font-bold text-ink-950 group-hover:text-brand-700">{item.name}</span>
                <span className="mt-1 block text-xs text-ink-500">
                  {formatNumber(item.population2024)} residents · Rank {item.rank}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <SourceNote
            href={barangay.sourceUrl}
            linkLabel="city barangay directory"
            links={[{ href: barangayDilgSourceUrl, label: 'DILG barangay officials directory' }]}
          >
            Population figures use the 2024 Census of Population. The punong barangay and council come from the city
            government’s published directory; the SK chairperson comes from the DILG Barangay Information System.
            Facilities are not yet published in a citywide dataset. Data last verified on{' '}
            {formatDate(city.lastVerified)}.
          </SourceNote>
        </div>

        <div className="mt-6">
          <Link
            to="/government/barangays"
            viewTransition
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to all barangays
          </Link>
        </div>
      </div>
    </>
  )
}
