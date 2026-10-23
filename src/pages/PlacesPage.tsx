import {
  ArrowDown,
  ArrowUpRight,
  BedDouble,
  BriefcaseBusiness,
  Bus,
  Camera,
  Church,
  GraduationCap,
  HeartPulse,
  Landmark,
  MapPin,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trees,
  Utensils,
  Wallet,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHero } from '../components/PageHero'
import { PlaceMark } from '../components/PlaceMark'
import { SourceNote } from '../components/SourceNote'
import { placeCategories, places, type PlaceCategoryId, type PlaceRecord, categoryMapsSearch, googleMapsSearch } from '../data/places'
import { normalize } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

const categoryIcons: Record<PlaceCategoryId, LucideIcon> = {
  government: Landmark,
  safety: ShieldCheck,
  health: HeartPulse,
  education: GraduationCap,
  shopping: ShoppingBag,
  food: Utensils,
  services: Sparkles,
  stay: BedDouble,
  attractions: Camera,
  parks: Trees,
  transport: Bus,
  finance: Wallet,
  faith: Church,
  everyday: BriefcaseBusiness,
}

const pageSize = 24
const logoSources = [
  { href: 'https://www.sanfernandocity.gov.ph/wp-content/uploads/2020/04/San-Fernando-Seal_1-500x500.jpg', label: 'San Fernando City official seal' },
  { href: 'https://launion.gov.ph/la-union-seal/', label: 'La Union provincial seal' },
  { href: 'https://commons.wikimedia.org/wiki/File:Bangko_Sentral_ng_Pilipinas_(BSP).svg', label: 'Bangko Sentral ng Pilipinas official mark' },
  { href: 'https://commons.wikimedia.org/wiki/File:Bureau_of_Fisheries_and_Aquatic_Resources_(BFAR).svg', label: 'Bureau of Fisheries and Aquatic Resources official seal' },
  { href: 'https://commons.wikimedia.org/wiki/File:Civil_Service_Commission.svg', label: 'Civil Service Commission official seal' },
  { href: 'https://www.comelec.gov.ph/images/logo/com_logo_grayed_small.png', label: 'Commission on Elections official logo asset' },
  { href: 'https://commons.wikimedia.org/wiki/File:Commission_on_Higher_Education_(CHEd).svg', label: 'Commission on Higher Education official seal' },
  { href: 'https://commons.wikimedia.org/wiki/File:Department_of_Education_(DepEd).svg', label: 'Department of Education official seal' },
  { href: 'https://commons.wikimedia.org/wiki/File:Department_of_Human_Settlements_and_Urban_Development.svg', label: 'DHSUD official seal' },
  { href: 'https://commons.wikimedia.org/wiki/File:Department_of_Social_Welfare_and_Development_Official_Logo.png', label: 'DSWD official logo' },
  { href: 'https://commons.wikimedia.org/wiki/File:DEPDEV_Logo.png', label: 'Department of Economy, Planning, and Development logo' },
  { href: 'https://nbi.gov.ph/regional-district-offices/nbi-logo-6/', label: 'National Bureau of Investigation logo · official site' },
  { href: 'https://commons.wikimedia.org/wiki/File:Philippine_Information_Agency_Logo.svg', label: 'Philippine Information Agency logo' },
  { href: 'https://www.ppa.com.ph/sites/default/files/inline-images/PPA-logo_mid_0.png', label: 'Philippine Ports Authority official logo asset' },
  { href: 'https://www.ppa.com.ph/content/philippine-ports-authority-unveils-new-logo?page=1', label: 'Philippine Ports Authority 2018 logo · official announcement' },
  { href: 'https://commons.wikimedia.org/wiki/File:Philippine_Statistics_Authority.svg', label: 'Philippine Statistics Authority seal · Commons source file' },
  { href: 'https://psa.gov.ph/about', label: 'Philippine Statistics Authority logo · official current page' },
  { href: 'https://commons.wikimedia.org/wiki/File:Regional_Trial_Court.svg', label: 'Regional Trial Court seal' },
  { href: 'https://calabarzon.dilg.gov.ph/dilg-logo/', label: 'DILG logo · official regional site' },
  { href: 'https://commons.wikimedia.org/wiki/File:DOH_PH_new_logo.svg', label: 'Department of Health current seal' },
  { href: 'https://trclu.doh.gov.ph/', label: 'DOH Treatment and Rehabilitation Center – La Union identity' },
  { href: 'https://www.dpwh.gov.ph/dpwh/about/logo', label: 'DPWH 2026 logo · official site' },
  { href: 'https://commons.wikimedia.org/wiki/File:Department_of_Migrant_Workers_(DMW).svg', label: 'Department of Migrant Workers logo' },
  { href: 'https://commons.wikimedia.org/wiki/File:Department_of_Tourism_(DOT).svg', label: 'Department of Tourism seal' },
  { href: 'https://commons.wikimedia.org/wiki/File:DTI_PH_new_logo.svg', label: 'Department of Trade and Industry seal' },
  { href: 'https://commons.wikimedia.org/wiki/File:Seal_of_the_Department_of_Foreign_Affairs_of_the_Philippines.svg', label: 'Department of Foreign Affairs seal' },
  { href: 'https://commons.wikimedia.org/wiki/File:Logo_of_the_Department_of_Environment_and_Natural_Resources.svg', label: 'DENR logo' },
  { href: 'https://commons.wikimedia.org/wiki/File:Logo_of_the_Department_of_Agriculture_of_the_Philippines.jpg', label: 'Department of Agriculture seal' },
  { href: 'https://commons.wikimedia.org/wiki/File:Logo_of_the_Bureau_of_Internal_Revenue.png', label: 'BIR 2024 logo' },
  { href: 'https://github.com/simple-icons/simple-icons', label: 'Simple Icons brand marks' },
  { href: 'https://github.com/simple-icons/simple-icons/blob/develop/DISCLAIMER.md', label: 'Simple Icons trademark disclaimer' },
  { href: 'https://cicosat.edu.ph/', label: 'CICOSAT Colleges' },
  { href: 'https://www.dmmmsu.edu.ph/dmmmsu-university-seal-2025/', label: 'DMMMSU official 2025 seal' },
  { href: 'https://slc-sflu.edu.ph/', label: 'Saint Louis College' },
  { href: 'https://www.ucc.edu.ph/', label: 'Union Christian College' },
  { href: 'https://www.lormacolleges.com/', label: 'LORMA Colleges' },
  { href: 'https://www.amaes.edu.ph/main.html', label: 'AMA Education System' },
  { href: 'https://www.leadingedge.com.ph/', label: 'Leading Edge Aviation' },
  { href: 'https://www.jollibee.com.ph/', label: 'Jollibee' },
  { href: 'https://www.dunkin.com.ph/', label: 'Dunkin’ Philippines' },
  { href: 'https://www.nationalbookstore.com/', label: 'National Book Store' },
  { href: 'https://classicsavory.com/', label: 'Classic Savory' },
  { href: 'https://shawarmashack.ph/', label: 'Shawarma Shack' },
  { href: 'https://siomai.house/', label: 'Siomai House' },
  { href: 'https://www.picturecity.ph/', label: 'Picture City' },
  { href: 'https://www.davidsalon.com.ph/', label: 'David’s Salon' },
  { href: 'https://www.contis.ph/', label: 'Conti’s Bakeshop and Restaurant' },
  { href: 'https://www.bistro.com.ph/', label: 'The Bistro Group · Italianni’s' },
  { href: 'https://fridays.com.ph/', label: 'TGI Fridays Philippines' },
  { href: 'https://chilisphilippines.com/', label: 'Chili’s Philippines' },
  { href: 'https://csimalls.com/', label: 'CSI City Mall and CSI Supermarket' },
  { href: 'https://bethanyhospitalinc.com/', label: 'Bethany Hospital' },
  { href: 'https://lumed.com.ph/', label: 'LUMED Hospital' },
  { href: 'https://www.bpi.com.ph/', label: 'Bank of the Philippine Islands' },
  { href: 'https://www.lbcexpress.com/', label: 'LBC Express' },
  { href: 'https://digitalwalker.ph/', label: 'Digital Walker' },
  { href: 'https://handyman.com.ph/', label: 'Handyman' },
  { href: 'https://powermaccenter.com/', label: 'Power Mac Center' },
  { href: 'https://www.octagon.com.ph/', label: 'Octagon Computer Superstore' },
  { href: 'https://pcx.com.ph/', label: 'PC Express' },
  { href: 'https://robinsonsdepartmentstore.com.ph/', label: 'Robinsons Department Store' },
  { href: 'https://www.robinsonssupermarket.com.ph/', label: 'Robinsons Supermarket' },
  { href: 'https://www.robinsonseasymart.com.ph/', label: 'Robinsons Easymart' },
  { href: 'https://www.daiso-sangyo.co.jp/', label: 'DAISO corporate brand mark' },
  { href: 'https://smstore.com/', label: 'The SM Store' },
  { href: 'https://gamextreme.ph/', label: 'GameXtreme' },
  { href: 'https://www.watsons.com.ph/', label: 'Watsons Philippines' },
  { href: 'https://aquaflask.com/', label: 'AquaFlask' },
  { href: 'https://mandauefoam.ph/', label: 'Mandaue Foam' },
  { href: 'https://www.infinixmobility.com/', label: 'Infinix' },
  { href: 'https://www.kidzooona.com.ph/', label: 'kidzooona Philippines' },
  { href: 'https://www.anytimefitness.com/en-ph', label: 'Anytime Fitness Philippines' },
  { href: 'https://famousbelgianwaffles.com/', label: 'Famous Belgian Waffles' },
  { href: 'https://www.executiveoptical.com/', label: 'EO Executive Optical' },
  { href: 'https://levi.com.ph/', label: 'Levi’s Philippines' },
  { href: 'https://worldbalance.com.ph/', label: 'World Balance' },
  { href: 'https://surplusshop.com.ph/', label: 'Surplus' },
  { href: 'https://robinsonsappliances.com.ph/', label: 'Robinsons Appliances' },
  { href: 'https://www.toykingdom.com.ph/', label: 'Toy Kingdom' },
  { href: 'https://www.petexpress.com.ph/', label: 'Pet Express' },
  { href: 'https://sportscentral.ph/', label: 'Sports Central' },
  { href: 'https://mesarestaurant.ph/', label: 'MESA Filipino Moderne' },
  { href: 'https://www.turks.ph/', label: 'Turks Philippines' },
  { href: 'https://www.smsupermalls.com/mall-directory/sm-savemore-tacloban/shops/sm-appliance-center', label: 'SM Appliance Center logo · SM Supermalls tenant directory' },
  { href: 'https://www.smsupermalls.com/mall-directory/sm-city-la-union/shops/sm-supermarket', label: 'SM Supermarket logo · SM Supermalls tenant directory' },
  { href: 'https://n-nagi.com/shop_overseas/', label: 'Ramen Nagi official shop directory' },
  { href: 'https://robinsonsmalls.com/node/12', label: 'Robinsons MovieWorld official page' },
  { href: 'https://www.robinsonsmovieworld.com/', label: 'Robinsons MovieWorld official website' },
  { href: 'https://mallstoresdirectory.com/sm-city-urdaneta-central', label: 'Chapo’s Grill & Sizzlers logo · mall tenant directory' },
  { href: 'https://www.pfa.org.ph/product-page/sam-s-everything-on-stick', label: 'Sam’s Everything on Sticks logo · Philippine Franchise Association' },
  { href: 'https://www.smsupermalls.com/mall-directory/sm-city-davao/shops/candy-corner', label: 'Candy Corner logo · SM Supermalls' },
  { href: 'https://www.smsupermalls.com/mall-directory/sm-city-rosales/shops/smile-city-dental-essentials', label: 'Smile City Dental Essentials logo · SM Supermalls' },
  { href: 'https://www.guanzongroup.com.ph/', label: 'Guanzon Group official mark' },
  { href: 'https://www.aap.org.ph/contactus', label: 'Automobile Association Philippines · La Union branch' },
  { href: 'https://www.smsupermalls.com/mall-directory/sm-center-sangandaan/shops/broadway-gems', label: 'Broadway Gems logo · SM Supermalls' },
  { href: 'https://www.smsupermalls.com/mall-directory/smdc-green-mall/shops/savemore-market', label: 'Savemore Market logo · SM Supermalls' },
  { href: 'https://services.tomsworld.com.ph/helpdesk_ticketing/', label: 'Tom’s World official mark' },
  { href: 'https://www.smsupermalls.com/mall-directory/sm-city-north-edsa/shops/nailandia-spa', label: 'Nailandia logo · SM Supermalls' },
  { href: 'https://www.parlon.ph/parlon/nisce-skin-medispa/nisce-skin-medispa-robinsons-la-union', label: 'Nisce Skin Medispa · Robinsons La Union branch photo' },
]

function PlaceCard({ item }: { item: PlaceRecord }) {
  const category = placeCategories.find((entry) => entry.id === item.category)
  const Icon = categoryIcons[item.category]

  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
      {item.image ? (
        <figure className="relative mb-4 aspect-[16/8] overflow-hidden rounded-xl bg-surface">
          <img
            src={item.image.src}
            alt={item.image.alt}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-ink-950/75 to-transparent px-3 pb-2 pt-6">
            <a
              href={item.image.creditUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`Photo of ${item.name}, credited to ${item.image.credit}`}
              className="rounded-md px-1.5 py-1 text-[10px] font-semibold text-white underline decoration-white/70 underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Photo: {item.image.credit}
            </a>
          </figcaption>
        </figure>
      ) : null}
      <div className="flex items-start gap-3">
        {!item.image ? <PlaceMark item={item} fallback={Icon} /> : null}
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-700">{category?.label}</p>
          <h3 className="mt-1 text-base font-extrabold leading-5 text-ink-950">{item.name}</h3>
        </div>
      </div>
      <p className="mt-3 flex gap-2 text-sm leading-5 text-ink-600">
        <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-ink-400" />
        <span>{item.address}</span>
      </p>
      {item.note ? <p className="mt-2 text-xs leading-5 text-ink-500">{item.note}</p> : null}
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4 mt-4">
        {item.sourceUrl.startsWith('/') ? (
          <Link
            to={item.sourceUrl}
            className="text-xs font-semibold leading-5 text-ink-500 underline decoration-line-dark underline-offset-2 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {item.sourceLabel}
          </Link>
        ) : (
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold leading-5 text-ink-500 underline decoration-line-dark underline-offset-2 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {item.sourceLabel}
          </a>
        )}
        <a
          href={googleMapsSearch(item)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Find ${item.name} on Google Maps`}
          className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg bg-brand-50 px-3 text-xs font-bold text-brand-700 transition hover:bg-brand-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          Directions <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </a>
      </div>
    </article>
  )
}

export function PlacesPage() {
  const [activeCategory, setActiveCategory] = useState<PlaceCategoryId | 'all'>('all')
  const [query, setQuery] = useState('')
  const [shownCount, setShownCount] = useState(pageSize)

  usePageMeta(
    'Places and directory',
    'Find government agencies, health facilities, schools, shopping, food, hotels, tourism, transport, parks and everyday services in San Fernando, La Union.',
  )

  const filteredPlaces = useMemo(() => {
    const normalizedQuery = normalize(query)
    return places.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory
      const category = placeCategories.find((entry) => entry.id === item.category)
      const matchesQuery =
        !normalizedQuery ||
        normalize(`${item.name} ${item.address} ${item.note ?? ''} ${category?.label ?? ''}`).includes(normalizedQuery)
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  const activeCategoryRecord = placeCategories.find((category) => category.id === activeCategory)
  const visiblePlaces = filteredPlaces.slice(0, shownCount)
  const mapHref = categoryMapsSearch(activeCategoryRecord)

  function chooseCategory(id: PlaceCategoryId | 'all') {
    setActiveCategory(id)
    setShownCount(pageSize)
  }

  function updateQuery(value: string) {
    setQuery(value)
    setShownCount(pageSize)
  }

  return (
    <>
      <PageHero
        eyebrow="Explore the city"
        title="Find places in San Fernando"
        description="Browse public offices, health and learning, shopping, food, places to stay, local attractions and everyday services—all in one directory."
        crumbs={[{ label: 'City', href: '/city' }, { label: 'Places directory' }]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink-700">59 barangays</span>
          <span className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink-700">14 place categories</span>
          <span className="rounded-full border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink-700">Map search for more listings</span>
        </div>
      </PageHero>

      <div className="container-page py-8 sm:py-12">
        <section aria-label="Search places" className="rounded-3xl border border-line bg-surface p-4 shadow-card sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 flex-1">
              <label htmlFor="places-search" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-ink-600">
                Search this directory
              </label>
              <div className="flex min-h-12 items-center gap-3 rounded-xl border border-line-dark bg-white px-3 shadow-sm focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100">
                <Search aria-hidden="true" className="size-5 shrink-0 text-ink-400" />
                <input
                  id="places-search"
                  type="search"
                  value={query}
                  onChange={(event) => updateQuery(event.target.value)}
                  placeholder="Try an agency, place, barangay or service"
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-ink-950 outline-none placeholder:text-ink-400"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => updateQuery('')}
                    aria-label="Clear place search"
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg text-ink-500 hover:bg-surface hover:text-ink-950 focus-visible:outline-2 focus-visible:outline-brand-600"
                  >
                    <X aria-hidden="true" className="size-4" />
                  </button>
                ) : null}
              </div>
            </div>
            <a
              href={mapHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 text-sm font-bold text-white transition hover:bg-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Search Google Maps <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>

          <div className="mt-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.14em] text-ink-600">Browse by category</p>
            <div className="places-category-scroll relative lg:after:hidden">
              <div className="places-category-list flex gap-2 overflow-x-auto pb-2 pr-8 lg:flex-wrap lg:overflow-visible lg:pb-0 lg:pr-0" role="group" aria-label="Filter places by category">
                <button
                  type="button"
                  aria-pressed={activeCategory === 'all'}
                  onClick={() => chooseCategory('all')}
                  className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                    activeCategory === 'all' ? 'border-brand-700 bg-brand-700 text-white' : 'border-line-dark bg-white text-ink-700 hover:border-brand-300 hover:text-brand-700'
                  }`}
                >
                  All places <span className="ml-1 text-xs font-bold opacity-70">{places.length}</span>
                </button>
                {placeCategories.map((category) => {
                  const Icon = categoryIcons[category.id]
                  const count = places.filter((item) => item.category === category.id).length
                  return (
                    <button
                      key={category.id}
                      type="button"
                      aria-pressed={activeCategory === category.id}
                      onClick={() => chooseCategory(category.id)}
                      className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                        activeCategory === category.id ? 'border-brand-700 bg-brand-700 text-white' : 'border-line-dark bg-white text-ink-700 hover:border-brand-300 hover:text-brand-700'
                      }`}
                    >
                      <Icon aria-hidden="true" className="size-4" /> {category.label} <span className="text-xs font-bold opacity-70">{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-7 flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-brand-700">{activeCategoryRecord?.label ?? 'City directory'}</p>
            <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-ink-950 sm:text-3xl">
              {activeCategoryRecord ? activeCategoryRecord.label : 'Places and services'}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
              {activeCategoryRecord?.description ?? 'Search the directory or choose a category. Use the live map search to discover more businesses and recently added listings.'}
            </p>
          </div>
          <p aria-live="polite" className="shrink-0 text-sm font-semibold tabular-nums text-ink-600">
            {filteredPlaces.length} listed {filteredPlaces.length === 1 ? 'place' : 'places'}
          </p>
        </div>

        {visiblePlaces.length ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {visiblePlaces.map((item) => <PlaceCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-line-dark bg-surface px-5 py-10 text-center">
            <Search aria-hidden="true" className="mx-auto size-8 text-ink-400" />
            <h2 className="mt-3 text-lg font-extrabold text-ink-950">No matching places</h2>
            <p className="mt-1 text-sm text-ink-600">Try another name or search live map results for this category.</p>
            <a href={mapHref} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg bg-brand-700 px-4 text-sm font-bold text-white hover:bg-brand-800">
              Search Google Maps <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
        )}

        {visiblePlaces.length < filteredPlaces.length ? (
          <div className="mt-7 flex justify-center">
            <button
              type="button"
              onClick={() => setShownCount((count) => count + pageSize)}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line-dark bg-white px-5 text-sm font-bold text-ink-800 shadow-sm hover:border-brand-300 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Show more places <ArrowDown aria-hidden="true" className="size-4" />
            </button>
          </div>
        ) : null}

        <div className="mt-8">
          <SourceNote
            links={[
              { href: 'https://launion.gov.ph/wp-content/uploads/2026/02/RLAs-PLAs-GOCCs-and-Private-Sector.pdf', label: 'Provincial agency directory (Feb. 2026)' },
              { href: 'https://www.sanfernandocity.gov.ph/city-departments/', label: 'City departments directory' },
              { href: 'https://launion.gov.ph/wp-content/uploads/2026/02/Tertiary-Schools-in-La-Union-Updated-2026.pdf', label: 'Tertiary schools list (2026)' },
              { href: 'https://launion.gov.ph/wp-content/uploads/2024/02/2023_TAs.pdf', label: 'Tourism attraction inventory (2023)' },
              { href: 'https://vmd.robinsonsmalls.com/list-of-malls/north-luzon/robinsons-la-union', label: 'Robinsons La Union tenant directory' },
            ]}
          >
            Government results include city offices and all 59 barangay hall profiles, alongside offices in the province’s February 2026 regional and provincial directory. Verified agency and business logos are shown where available; other government listings use clearly styled initials, and other places use a category symbol. Google Maps searches surface additional local listings, but Google listings can be user-submitted, duplicated or out of date. Confirm current operating status, access and hours before traveling. Nearby towns are not included.
          </SourceNote>
          <details className="mt-3 rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink-600">
            <summary className="cursor-pointer font-semibold text-ink-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
              Logo sources and attributions <span className="ml-1 text-xs font-medium text-ink-500">({logoSources.length})</span>
            </summary>
            <ul className="mt-3 grid gap-x-5 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {logoSources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noreferrer" className="font-medium text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </div>
    </>
  )
}
