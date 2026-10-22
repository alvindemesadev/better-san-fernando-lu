import {
  ArrowRight,
  Building2,
  Cpu,
  Download,
  ExternalLink,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Recycle,
  ShieldCheck,
  Sprout,
  Trophy,
  TrendingUp,
  Wallet,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { StatCard } from '../components/StatCard'
import { city } from '../data/city'
import { formatDate } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

const highlights = [
  {
    title: 'Administrative seat of the Ilocos Region',
    icon: Landmark,
    text: 'San Fernando hosts regional and field offices of national agencies, financial institutions, and government corporations — the center of governance and economic activity in Northern Luzon.',
  },
  {
    title: 'Among the most competitive component cities',
    icon: Trophy,
    text: 'Ranked 9th among 112 component cities nationwide in the 2024 Cities and Municipalities Competitiveness Index, and No. 1 in Region I.',
  },
  {
    title: 'No. 1 in government efficiency',
    icon: TrendingUp,
    text: 'Ranked first nationwide in the CMCI Government Efficiency pillar in 2024, reflecting institutional capacity and responsive governance.',
  },
  {
    title: 'Center of health care and higher education',
    icon: GraduationCap,
    text: 'Home to Centers of Excellence and Development in education and IT, and to ITRMC, the heart of public health and medical care in Northern Luzon.',
  },
  {
    title: 'Livable, peaceful, and resilient',
    icon: ShieldCheck,
    text: 'A consistent Seal of Good Local Governance recipient, recognized for disaster preparedness through the Gawad Kalasag Seal for Excellence in DRRM.',
  },
]

const sectors = [
  { title: 'Agriculture, agribusiness, and fishery', icon: Sprout },
  { title: 'Support facilities: irrigation, post-harvest, cold storage, blast freezing, fertilizers, and pesticides', icon: Factory },
  { title: 'Tourism and transportation', icon: Building2 },
  { title: 'Information and communication technology', icon: Cpu },
  { title: 'Manufacturing and processing', icon: Factory },
  { title: 'Infrastructure, water and sanitation, and property development', icon: Building2 },
  { title: 'Ecological solid waste management', icon: Recycle },
]

const businessProcess = [
  {
    label: 'Granting of Building Permits',
    url: 'https://drive.google.com/file/d/1DloBykQcchM_UEEnc2lz6LyAoir6QOjx/view?usp=drive_link',
  },
  {
    label: 'Granting of Certificate of Occupancy',
    url: 'https://drive.google.com/file/d/1ZE53YIu8rp3oV7-OodebVfu2xn2o8ClY/view?usp=drive_link',
  },
  {
    label: 'Issuance of Business Permits',
    url: 'https://drive.google.com/file/d/1Qz_wQBGbFNXBS4AOtjrAZhETPMOPFOXQ/view?usp=drive_link',
  },
  {
    label: 'Issuance of Business Permits (Online Application)',
    url: 'https://drive.google.com/file/d/16xVoUMdnBWc9YcmWHV_hl6FooQKf9sSs/view?usp=drive_link',
  },
  {
    label: 'Issuance of Individual Work Permit',
    url: 'https://drive.google.com/file/d/1JANXE1aKykLYTFXV-4-ziP1QoNNFz880/view?usp=drive_link',
  },
]

const powerRates = [
  ['Residential', '₱12.7878/kWh'],
  ['GenSer, X1', '₱14.1601/kWh'],
  ['GenSer, X2', '₱11.9481/kWh'],
  ['Hospital', '₱10.9535/kWh'],
  ['Industrial', '₱13.0848/kWh'],
  ['Streetlight', '₱12.9612/kWh'],
]

const powerRateRows = powerRates.map(([label, value]) => ({ label, value }))

export function BusinessPage() {
  usePageMeta(
    'Business and investment',
    'Why businesses invest in San Fernando, La Union: competitiveness rankings, priority investment sectors, cost of doing business, and the permits to get started.',
  )

  return (
    <>
      <PageHero
        eyebrow="Business and investment"
        title="Why San Fernando"
        description="A reliable, dependable, and caring partner for investors — with a balance of progress, sustainability, and genuine hospitality in the heart of Northern Luzon."
        crumbs={[{ label: 'City', href: '/city' }, { label: 'Business and investment' }]}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard value="9th of 112" label="CMCI 2024 rank" note="Component cities nationwide" />
          <StatCard value="No. 1" label="In Region I" note="2024 competitiveness index" />
          <StatCard value="1st nationwide" label="Government efficiency" note="CMCI 2024 pillar" />
          <StatCard value="₱468.00" label="Minimum daily wage" note="Non-agriculture, 10+ employees (RB1-23)" />
        </div>
      </PageHero>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Why invest"
              title="A competitive, well-governed city"
              description="Recognitions published by the city government and the Cities and Municipalities Competitiveness Index."
            />
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon
              return (
                <Reveal key={highlight.title} delay={(index % 3) * 0.05} className="h-full">
                  <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-card">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="mt-4 text-base font-extrabold tracking-tight text-ink-950">{highlight.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-600">{highlight.text}</p>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Priority sectors"
              title="Where the city wants investment"
              description="The investment priorities published by the city government."
            />
          </Reveal>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sectors.map((sector, index) => {
              const Icon = sector.icon
              return (
                <li
                  key={sector.title}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-white p-4 text-sm font-semibold leading-6 text-ink-800 shadow-card"
                >
                  <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  {sector.title}
                  <span className="sr-only">Priority sector {index + 1}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Cost of doing business"
              title="What it costs to operate here"
              description="Published rates from the city’s business profile. Confirm current figures with the service providers and the city before committing."
            />
          </Reveal>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <Reveal className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-card">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Wallet aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-extrabold tracking-tight text-ink-950">Wage rates</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">
                  Wage Order No. RB1-23
                </p>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-600">
                  <li>₱468.00 — non-agriculture, 10 or more employees</li>
                  <li>₱435.00 — agriculture and establishments with fewer than 10 employees</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.05} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-card">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Building2 aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-extrabold tracking-tight text-ink-950">Rental and lease rates</h3>
                <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-600">
                  <li>Commercial space: ₱200 to ₱550 per square meter</li>
                  <li>1-bedroom condo or apartment: ₱5,000 to ₱8,000</li>
                  <li>2–3 bedroom condo or apartment: ₱7,000 to ₱10,000</li>
                  <li>4-bedroom house: ₱8,000 to ₱15,000</li>
                  <li>Land: ₱4,000 to ₱60,000 per square meter</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-card">
                <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <Zap aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-extrabold tracking-tight text-ink-950">Power rates</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-ink-400">LUECO, August 2025</p>
                <dl className="mt-3 space-y-2 text-sm">
                  {powerRateRows.map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-3 border-b border-line pb-2 last:border-b-0 last:pb-0">
                      <dt className="text-ink-600">{row.label}</dt>
                      <dd className="font-semibold tabular-nums text-ink-900">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

          <p className="mt-4 text-xs leading-5 text-ink-500">
            Water and telecommunications rates are not published in the city’s business profile summary. Contact the
            service providers directly for current commercial rates.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Setting up"
              title="Permits and requirements"
              description="Official process guides and forms published by the City Government of San Fernando."
              action={
                <a
                  href="https://www.sanfernandocity.gov.ph/business-in-the-city/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
                >
                  All forms on the official page
                  <ExternalLink aria-hidden="true" className="size-4" />
                </a>
              }
            />
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {businessProcess.map((process) => (
              <a
                key={process.url}
                href={process.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 text-sm font-semibold text-ink-800 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700 hover:shadow-float"
              >
                {process.label}
                <ExternalLink
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-ink-400 transition group-hover:text-brand-700"
                />
              </a>
            ))}
            <a
              href="https://drive.google.com/file/d/1fJzaahmyEG_YKI5Y-p04NrF1m1PvekiC/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 text-sm font-semibold text-ink-800 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700 hover:shadow-float"
            >
              Business Permit: Unified Application Form
              <ExternalLink
                aria-hidden="true"
                className="size-3.5 shrink-0 text-ink-400 transition group-hover:text-brand-700"
              />
            </a>
          </div>

          <div className="mt-4">
            <Link
              to="/online-services"
              viewTransition
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
            >
              Apply online through the e-Business Permits and Licensing System
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Opportunities"
              title="Investment destinations"
              description="Flagship areas highlighted in the city’s investment profile."
            />
          </Reveal>

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <Reveal className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-card">
                <h3 className="text-base font-extrabold tracking-tight text-ink-950">Poro Point Freeport Zone</h3>
                <p className="mt-2 text-sm leading-6 text-ink-600">
                  An economic zone in Poro with infrastructure, incentives, an airport, a seaport, mixed-use
                  development, and a 65.5-hectare tourism complex anchored by Thunderbird Resorts.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.05} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-card">
                <h3 className="text-base font-extrabold tracking-tight text-ink-950">Central Business District — Biday</h3>
                <p className="mt-2 text-sm leading-6 text-ink-600">
                  Barangay Biday is anchored by CSI Mall and Manna Mall, with SM City La Union set to open — a growing
                  commercial hub supported by the city’s Digital Cities recognition.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-card">
                <h3 className="text-base font-extrabold tracking-tight text-ink-950">Digital Cities PH</h3>
                <p className="mt-2 text-sm leading-6 text-ink-600">
                  Recognized by DICT, IBPAP, and Leechiu as a prime countryside hub for IT-BPM, digital services, and
                  innovation-driven enterprises.
                </p>
                <a
                  href="https://drive.google.com/file/d/19eNjHV_bP7iRi9c5mBSSCtcxmjwUyTo2/view?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800"
                >
                  View the roadmap
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-line bg-ink-950 p-6 text-white shadow-card sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Incentives</p>
                <h3 className="mt-1.5 text-lg font-extrabold tracking-tight">
                  Investments and Incentives Code — Ordinance No. 2024-41
                </h3>
                <p className="mt-1.5 text-sm text-white/60">
                  The city’s incentive framework for qualified investments.
                </p>
              </div>
              <a
                href="https://drive.google.com/file/d/1S5q2HOklGy4O692uYMgHrZNNXOpYqZ69/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/15"
              >
                <Download aria-hidden="true" className="size-3.5" />
                Download the code
              </a>
            </div>
          </Reveal>

          <div className="mt-10">
            <SourceNote
              href="https://www.sanfernandocity.gov.ph/business-in-the-city/"
              linkLabel="Business in the City on the city website"
            >
              Investment profile, rankings, costs, and forms are published by the City Government of San Fernando.
              Rates and incentives can change; confirm current terms with the city and the relevant agencies. Data
              last verified on {formatDate(city.lastVerified)}.
            </SourceNote>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="container-page py-8">
          <div className="flex items-center gap-3 text-sm text-ink-600">
            <HeartPulse aria-hidden="true" className="size-4 shrink-0 text-brand-700" />
            <p>
              Doing business in the city also means being part of its community. Explore{' '}
              <Link to="/city/life" viewTransition className="font-bold text-brand-700 hover:text-brand-800">
                life and tourism in San Fernando
              </Link>{' '}
              to see what makes the city livable.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
