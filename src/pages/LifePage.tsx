import { ArrowRight, Camera, Car, ExternalLink, Flower2, Landmark, Plane, Ship, Utensils, Waves } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { city } from '../data/city'
import { formatDate } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

const experiences = [
  {
    title: 'Beaches and water activities',
    icon: Waves,
    items: [
      'Five beach circuits across the San Fernando coast: San Francisco–Canaoay (Acapulco); Pagdalagan–Pagudpud–San Vicente; Carlatan–Lingsat–Dalumpinas Oeste; San Agustin–Poro–Catbangen; and Ilocanos Sur–Ilocanos Norte–Pagdaraoan.',
      'Surfing at the Carlatan–Lingsat–Dalumpinas Oeste circuit.',
      'Snorkeling and diving at the Kasay, Lingsat, and Poro marine sanctuaries — Poro includes a man-made underwater museum.',
      'Sunset viewing along the Poro Point Baywalk and the developing Ilocanos Baywalk.',
    ],
  },
  {
    title: 'Heritage and culture',
    icon: Landmark,
    items: [
      'Historical landmarks: Pindangan Ruins, the Tomb of the Unknown Soldier, the Moro Watchtower, and the Battle of Bacsil Ridge Monument.',
      'Religious and cultural sites, including the Ma-Cho Temple and the city’s 10 Roman Catholic churches — among them the heritage Saint William the Hermit Parish Church.',
      'City murals and monuments around the City Plaza, City Fountain and People’s Park, and Freedom Park.',
    ],
  },
  {
    title: 'Food and pasalubong',
    icon: Utensils,
    items: [
      'Local food trips through Ilocano eateries, restaurants, and food parks.',
      'Night food parks and Maykan Mangan experiences with traditional and new dishes.',
      'Pasalubong hunting for roasted peanuts, peanut butter, ube wine, and other local delicacies.',
    ],
  },
  {
    title: 'Wellness and nature',
    icon: Flower2,
    items: [
      'Nature walks at the Botanical and Zoological Garden in Cadaclan and the Mangrove Walk in Carlatan.',
      'Sunrise and sunset views from the Mountain View Decks Circuit in Bacsil, Apaleng, and Bangbangolan.',
      'Spa and wellness centers around the city.',
    ],
  },
  {
    title: 'Outdoor and photography',
    icon: Camera,
    items: [
      'Trekking up Pagoda Hill or Reservoir Hill.',
      'Birdwatching and wildlife viewing at the La Union Botanical and Zoological Garden.',
      'The sea of clouds in Cadaclan and the upland barangays, and the rice terraces of Pacpaco and Baraoas.',
      'Sunrise over the hills and sunset into the West Philippine Sea from the coastal barangays.',
    ],
  },
]

const festivals = [
  'Feast of St. William the Hermit',
  'Cityhood Foundation Anniversary',
  'Pindangan Festival',
  'Global Agri-Turismo Festival',
  'Sundown Music and Arts Festival',
  'Matzu Festival',
  'CREATE Festival',
  'Parakad Festival',
  'Maykan Mangan Festival',
]

const visitorLinks = [
  {
    label: 'Adventure map',
    url: 'https://drive.google.com/file/d/13MAdp7BVYczEM16xBTzd_UQsHQ3YyA58/view?usp=sharing',
  },
  {
    label: 'La Union tourism plan',
    url: 'https://launion.gov.ph/knowledge-resources-hub/provincial-tourism-plan',
  },
  {
    label: 'Accredited establishments',
    url: 'https://drive.google.com/open?id=1M99J4Y-eS0uPHIoJXyERrZLkquxlnbv1',
  },
]

const gettingHere = [
  {
    title: 'By land',
    icon: Car,
    lines: [
      'About 270 km from Manila, or 4.5 to 6 hours via NLEX–SCTEX–TPLEX.',
      'Daily direct bus trips with Partas, Dominion, Viron, and Fariñas.',
      'Vans and car rentals are widely available.',
    ],
  },
  {
    title: 'By air',
    icon: Plane,
    lines: [
      'San Fernando Airport, between Barangay Canaoay and Barangay San Francisco, serves private and chartered flights.',
      'Clark International Airport is about 170 km away, or 3.5 to 4 hours by land.',
      'Laoag International Airport is about 200 km away, or 4.5 to 5 hours by land.',
    ],
  },
  {
    title: 'By sea',
    icon: Ship,
    lines: [
      'The San Fernando International Seaport is primarily a cargo port.',
      'It accommodates private vessels and yachts as an entry point for sea travelers.',
    ],
  },
]

export function LifePage() {
  usePageMeta(
    'Life and tourism',
    'Things to do in San Fernando, La Union: beach circuits, surfing, marine sanctuaries, heritage sites, festivals, local food, and how to get here.',
  )

  return (
    <>
      <PageHero
        eyebrow="Life in the city"
        title="This is San Fernando TAYO"
        description="Travel, adventure, yearning, and odyssey. Experience a city where culture, nature, and community thrive together — from calm coastal circuits to upland rice terraces."
        crumbs={[{ label: 'City', href: '/city' }, { label: 'Life and tourism' }]}
      >
        <div className="flex flex-wrap gap-2">
          {['Travel', 'Adventure', 'Yearning', 'Odyssey'].map((word) => (
            <span
              key={word}
              className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink-700"
            >
              {word}
            </span>
          ))}
        </div>
      </PageHero>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Getting here"
              title="Three ways into the city"
              description="San Fernando sits at the center of La Union, linked by highway, air, and sea."
            />
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {gettingHere.map((option, index) => {
              const Icon = option.icon
              return (
                <Reveal key={option.title} delay={index * 0.05} className="h-full">
                  <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-card">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink-950">{option.title}</h3>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-600">
                      {option.lines.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
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
              eyebrow="Things to do"
              title="Coast, culture, and cuisine"
              description="The city’s attractions are grouped the way the tourism office presents them."
            />
          </Reveal>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {experiences.map((experience, index) => {
              const Icon = experience.icon
              return (
                <Reveal key={experience.title} delay={(index % 3) * 0.05} className="h-full">
                  <div className="h-full rounded-2xl border border-line bg-white p-5 shadow-card">
                    <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink-950">{experience.title}</h3>
                    <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-6 text-ink-600">
                      {experience.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Festivals and events"
              title="The city celebrates year-round"
              description="City fiestas, religious festivals, and city-wide events fill the calendar."
            />
          </Reveal>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {festivals.map((festival) => (
              <li
                key={festival}
                className="rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-ink-700 shadow-card"
              >
                {festival}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {visitorLinks.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-white p-4 text-sm font-semibold text-ink-800 shadow-card transition hover:-translate-y-0.5 hover:border-brand-200 hover:text-brand-700 hover:shadow-float"
              >
                {link.label}
                <ExternalLink
                  aria-hidden="true"
                  className="size-3.5 shrink-0 text-ink-400 transition group-hover:text-brand-700"
                />
              </a>
            ))}
          </div>

          <div className="mt-10">
            <SourceNote
              href="https://www.sanfernandocity.gov.ph/life-in-csf/"
              linkLabel="Life in CSF on the city website"
            >
              Tourism information and maps are published by the City Government of San Fernando. The provincial
              tourism plan covers San Fernando and the wider La Union circuits. Confirm schedules and access with the
              city tourism office. Data last verified on {formatDate(city.lastVerified)}.
            </SourceNote>
          </div>

          <div className="mt-8">
            <Link
              to="/city/business"
              viewTransition
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 transition hover:text-brand-800"
            >
              See the business and investment profile
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
