import {
  ArrowRight,
  Camera,
  Car,
  ChevronDown,
  ExternalLink,
  Flower2,
  Landmark,
  Plane,
  Ship,
  Sparkles,
  Utensils,
  Waves,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import type { PlaceImage } from '../data/places'
import { usePageMeta } from '../lib/usePageMeta'

const cityTourismUrl = 'https://www.sanfernandocity.gov.ph/life-in-csf/'
const provincialTourismPhoto = (src: string, alt: string): PlaceImage => ({
  src: `/places/${src}`,
  alt,
  credit: 'Provincial Government of La Union',
  creditUrl: 'https://launion.gov.ph/tourism-5/',
})

const experiencePhotos = {
  beaches: provincialTourismPhoto('carlatan-surfing-area.webp', 'Surfing along the Carlatan coast.'),
  heritage: provincialTourismPhoto('ma-cho-temple.webp', 'Ma-Cho Temple in San Fernando.'),
  food: provincialTourismPhoto('halo-halo-de-iloko.webp', 'Halo-halo served at Halo-Halo de Iloko.'),
  nature: provincialTourismPhoto('la-union-botanical-garden.webp', 'Garden path at the La Union Botanical Garden.'),
  outdoors: provincialTourismPhoto('bacsil-ridge-monument.webp', 'The Bacsil Ridge Monument.'),
}

const experiences = [
  {
    title: 'Beaches and water activities',
    summary: 'Coastal circuits, surfing, marine sanctuaries, and sunset views.',
    icon: Waves,
    photo: experiencePhotos.beaches,
    items: [
      'Five beach circuits across the San Fernando coast: San Francisco–Canaoay (Acapulco); Pagdalagan–Pagudpud–San Vicente; Carlatan–Lingsat–Dalumpinas Oeste; San Agustin–Poro–Catbangen; and Ilocanos Sur–Ilocanos Norte–Pagdaraoan.',
      'Surfing at the Carlatan–Lingsat–Dalumpinas Oeste circuit.',
      'Snorkeling and diving at the Kasay, Lingsat, and Poro marine sanctuaries — Poro includes a man-made underwater museum.',
      'Sunset viewing along the Poro Point Baywalk and the developing Ilocanos Baywalk.',
    ],
  },
  {
    title: 'Heritage and culture',
    summary: 'Historic landmarks, churches, the Ma-Cho Temple, and public art.',
    icon: Landmark,
    photo: experiencePhotos.heritage,
    items: [
      'Historical landmarks: Pindangan Ruins, the Tomb of the Unknown Soldier, the Moro Watchtower, and the Battle of Bacsil Ridge Monument.',
      'Religious and cultural sites, including the Ma-Cho Temple and the city’s 10 Roman Catholic churches — among them the heritage Saint William the Hermit Parish Church.',
      'City murals and monuments around the City Plaza, City Fountain and People’s Park, and Freedom Park.',
    ],
  },
  {
    title: 'Food and pasalubong',
    summary: 'Ilocano dishes, food parks, and local delicacies to bring home.',
    icon: Utensils,
    photo: experiencePhotos.food,
    items: [
      'Local food trips through Ilocano eateries, restaurants, and food parks.',
      'Night food parks and Maykan Mangan experiences with traditional and new dishes.',
      'Pasalubong hunting for roasted peanuts, peanut butter, ube wine, and other local delicacies.',
    ],
  },
  {
    title: 'Wellness and nature',
    summary: 'Garden walks, mangroves, upland views, and wellness stops.',
    icon: Flower2,
    photo: experiencePhotos.nature,
    items: [
      'Nature walks at the Botanical and Zoological Garden in Cadaclan and the Mangrove Walk in Carlatan.',
      'Sunrise and sunset views from the Mountain View Decks Circuit in Bacsil, Apaleng, and Bangbangolan.',
      'Spa and wellness centers around the city.',
    ],
  },
  {
    title: 'Outdoor and photography',
    summary: 'Hill walks, wildlife, rice terraces, and coastal viewpoints.',
    icon: Camera,
    photo: experiencePhotos.outdoors,
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
    label: 'La Union tourism plan',
    url: 'https://launion.gov.ph/knowledge-resources-hub/provincial-tourism-plan',
  },
  {
    label: 'Accredited establishments',
    url: 'https://drive.google.com/open?id=1M99J4Y-eS0uPHIoJXyERrZLkquxlnbv1',
  },
]

const adventureMapUrl = 'https://drive.google.com/file/d/13MAdp7BVYczEM16xBTzd_UQsHQ3YyA58/view?usp=sharing'
const adventureMapPreviewUrl = '/city/city-adventour-map.webp'

const tourismPhotos = [
  {
    src: '/places/people-park-fountain.jpg',
    alt: 'City Fountain and People’s Park illuminated at night.',
    label: 'City Plaza',
  },
  {
    src: '/city/heritage.webp',
    alt: 'Stone arches and greenery at a local heritage site.',
    label: 'Heritage',
  },
  {
    src: '/city/food.webp',
    alt: 'Local dishes and desserts served on banana leaves.',
    label: 'Local flavors',
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
      <section className="relative isolate overflow-hidden border-b border-line bg-[linear-gradient(135deg,#f5f7ff_0%,#ffffff_70%)]">
        <div aria-hidden="true" className="dot-grid absolute inset-y-0 right-0 -z-10 w-2/3 opacity-35" />
        <div className="container-page grid gap-8 py-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-12 lg:py-14">
          <div>
            <Breadcrumbs items={[{ label: 'City', href: '/city' }, { label: 'Life and tourism' }]} className="mb-7" />
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Life in the city · TAYO</p>
            <h1 className="max-w-2xl text-balance text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] text-ink-950 sm:text-4xl lg:text-[3.25rem]">
              Coast, culture, and city life
            </h1>
            <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-ink-600 sm:text-lg">
              Explore San Fernando’s coastal spots, heritage landmarks, Ilocano food, green spaces, and community celebrations.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/city/places"
                viewTransition
                className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-700 px-4 text-sm font-bold text-white transition hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Browse city places <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <a
                href="#visit-map-title"
                className="inline-flex min-h-11 items-center rounded-xl border border-line-dark bg-white px-4 text-sm font-bold text-ink-800 transition hover:border-brand-300 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Plan a visit
              </a>
            </div>
          </div>

          <figure className="group relative min-h-64 overflow-hidden rounded-3xl border border-line bg-ink-950 shadow-float sm:min-h-80 lg:min-h-[360px]">
            <img
              src="/city/coast.webp"
              alt="Rocky coastline and the sea along San Fernando."
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 size-full object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/5 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-3 p-4 sm:p-5">
              <span className="text-lg font-extrabold text-white sm:text-xl">Along the San Fernando coast</span>
              <a
                href={cityTourismUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-ink-950/55 px-3 py-1.5 text-[11px] font-semibold text-white underline decoration-white/50 underline-offset-2 backdrop-blur-sm hover:bg-ink-950/75"
              >
                Photo: City Government
              </a>
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="visit-map-title" className="border-b border-line bg-surface">
        <div className="container-page grid gap-6 py-8 sm:py-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center lg:gap-10">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Plan your visit</p>
            <h2 id="visit-map-title" className="scroll-mt-28 text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">
              Find your way around the city
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-ink-600 sm:text-base sm:leading-7">
              Preview the City AdvenTour map for visitor spots, food, places to stay, and travel routes. It is the
              city’s 2022 edition, so confirm current access and business details before you go.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3" role="group" aria-label="Tourism highlights">
              {tourismPhotos.map((photo) => (
                <figure key={photo.src} className="min-w-0 overflow-hidden rounded-xl border border-line bg-white">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <figcaption className="px-2 py-1.5 text-center text-[11px] font-semibold text-ink-700 sm:px-3 sm:py-2 sm:text-xs">
                    {photo.label}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-ink-500">
              Photos: <a href={cityTourismUrl} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-brand-700">City Government of San Fernando</a>
            </p>
          </div>

          <a
            href={adventureMapUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the full City AdvenTour 2022 map in a new tab"
            className="group block overflow-hidden rounded-2xl border border-line bg-white shadow-card transition hover:border-brand-200 hover:shadow-float focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            <div className="flex min-h-48 items-center justify-center bg-[#168ca3] p-2 sm:min-h-64 sm:p-3">
              <img
                src={adventureMapPreviewUrl}
                alt="Preview of the official City AdvenTour map, showing visitor trails, attractions, food, lodging, services, and travel routes."
                loading="lazy"
                decoding="async"
                className="max-h-[360px] w-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <span>
                <span className="block text-sm font-bold text-ink-950">City AdvenTour map · 2022</span>
                <span className="mt-0.5 block text-xs text-ink-500">Open the full-size map</span>
              </span>
              <ExternalLink aria-hidden="true" className="size-4 shrink-0 text-brand-700 transition group-hover:translate-x-0.5" />
            </div>
          </a>
        </div>
      </section>

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
                    <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-6 text-ink-600">
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
                  <div className="group h-full overflow-hidden rounded-2xl border border-line bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-float">
                    {experience.photo ? (
                      <figure className="relative aspect-[16/8] overflow-hidden bg-surface">
                        <img
                          src={experience.photo.src}
                          alt={experience.photo.alt}
                          loading="lazy"
                          decoding="async"
                          className="size-full object-cover transition duration-500 group-hover:scale-[1.03]"
                        />
                        <figcaption className="absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-ink-950/75 to-transparent px-3 pb-2 pt-6">
                          <a
                            href={experience.photo.creditUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[10px] font-semibold text-white underline decoration-white/50 underline-offset-2 sm:text-[11px]"
                          >
                            Photo: {experience.photo.credit}
                          </a>
                        </figcaption>
                      </figure>
                    ) : null}
                    <div className="p-5">
                      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink-950">{experience.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-ink-600">{experience.summary}</p>
                      <details className="group mt-4 border-t border-line pt-3">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-lg text-sm font-bold text-brand-700 outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2">
                          <span>See places and activities</span>
                          <ChevronDown aria-hidden="true" className="size-4 shrink-0 transition-transform group-open:rotate-180" />
                        </summary>
                        <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-6 text-ink-600">
                          {experience.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </details>
                    </div>
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
              title="Festivals and city celebrations"
              description="A mix of religious, cultural, and city-wide celebrations. Check with the city for current dates and schedules."
            />
          </Reveal>

          <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {festivals.map((festival) => (
              <li
                key={festival}
                className="flex min-h-16 items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-card transition hover:border-brand-200 hover:shadow-float sm:p-3"
              >
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <Sparkles aria-hidden="true" className="size-4" />
                </span>
                <span className="text-sm font-bold leading-5 text-ink-900">{festival}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
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
              tourism plan covers San Fernando and the wider La Union circuits. Confirm current schedules and access
              with the city tourism office; source pages publish their own update dates.
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
