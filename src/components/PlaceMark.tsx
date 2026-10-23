import {
  siAdidas,
  siKfc,
  siPuma,
  siSamsung,
  siStarbucks,
  siSmart,
  siUniqlo,
  siXiaomi,
  type SimpleIcon,
} from 'simple-icons'
import type { LucideIcon } from 'lucide-react'
import type { PlaceRecord } from '../data/places'

const brandMarks: Array<{ name: string; icon: SimpleIcon }> = [
  { name: 'adidas', icon: siAdidas },
  { name: 'kfc', icon: siKfc },
  { name: 'puma', icon: siPuma },
  { name: 'samsung', icon: siSamsung },
  { name: 'smart', icon: siSmart },
  { name: 'starbucks', icon: siStarbucks },
  { name: 'uniqlo', icon: siUniqlo },
  { name: 'xiaomi', icon: siXiaomi },
]

const imageMarks: Array<{ match: string; src: string; wide?: boolean }> = [
  // Local and national public-service identities. Branches share their parent agency's mark.
  // Official assets are bundled locally to avoid third-party image requests in the directory.
  { match: 'bureau of customs', src: '/logos/gov-boc.png' },
  { match: 'bureau of immigration', src: '/logos/gov-bi.png' },
  { match: 'bureau of jail management', src: '/logos/gov-bjmp.png' },
  { match: 'bjmp ', src: '/logos/gov-bjmp.png' },
  { match: 'bureau of local government finance', src: '/logos/gov-blgf.png' },
  { match: 'bureau of the treasury', src: '/logos/gov-btr.png' },
  { match: 'commission on audit', src: '/logos/gov-coa.svg' },
  { match: 'commission on human rights', src: '/logos/gov-chr.jpg' },
  { match: 'commission on population', src: '/logos/gov-cpd.jpg' },
  { match: 'department of agrarian reform', src: '/logos/gov-dar.svg' },
  { match: 'department of budget and management', src: '/logos/gov-dbm.jpg' },
  { match: 'department of information and communications technology', src: '/logos/gov-dict.svg' },
  { match: 'department of justice', src: '/logos/gov-doj.jpg' },
  { match: 'provincial prosecutor', src: '/logos/gov-doj.jpg' },
  { match: 'public attorney', src: '/logos/gov-pao.jpg' },
  { match: 'department of labor and employment', src: '/logos/gov-dole.svg' },
  { match: 'dole ', src: '/logos/gov-dole.svg' },
  { match: 'regional tripartite wages and productivity board', src: '/logos/gov-dole.svg' },
  { match: 'bangko sentral ng pilipinas', src: '/logos/gov-bsp.svg' },
  { match: 'bureau of fisheries and aquatic resources', src: '/logos/gov-bfar.svg' },
  { match: 'civil service commission', src: '/logos/gov-csc.svg' },
  { match: 'commission on elections', src: '/logos/gov-comelec.png' },
  { match: 'commission on higher education', src: '/logos/gov-ched.svg' },
  { match: 'department of education', src: '/logos/gov-deped.svg' },
  { match: 'deped ', src: '/logos/gov-deped.svg' },
  { match: 'department of human settlements and urban development', src: '/logos/gov-dhsud.svg' },
  { match: 'department of social welfare and development', src: '/logos/gov-dswd.png' },
  { match: 'department of economy, planning', src: '/logos/gov-depdev.png' },
  { match: 'depdev', src: '/logos/gov-depdev.png' },
  { match: 'national bureau of investigation', src: '/logos/gov-nbi.jpg' },
  { match: 'philippine ports authority', src: '/logos/gov-ppa.png' },
  { match: 'philippine statistics authority', src: '/logos/gov-psa.png' },
  { match: 'philippine information agency', src: '/logos/gov-pia.svg' },
  { match: 'regional trial court', src: '/logos/gov-rtc.svg' },
  { match: 'department of the interior and local government', src: '/logos/gov-dilg.png' },
  { match: 'dilg ', src: '/logos/gov-dilg.png' },
  { match: 'treatment and rehabilitation center', src: '/logos/trc-la-union.png' },
  { match: 'ilocos training and regional medical center', src: '/logos/itrmc-official-logo.png' },
  { match: 'department of health', src: '/logos/gov-doh.svg' },
  { match: 'doh regional', src: '/logos/gov-doh.svg' },
  { match: 'department of public works and highways', src: '/logos/gov-dpwh.svg' },
  { match: 'dpwh ', src: '/logos/gov-dpwh.svg' },
  { match: 'department of science and technology', src: '/logos/gov-dost.jpg' },
  { match: 'dost ', src: '/logos/gov-dost.jpg' },
  { match: 'department of migrant workers', src: '/logos/gov-dmw.svg' },
  { match: 'department of tourism', src: '/logos/gov-dot.svg' },
  { match: 'department of trade and industry', src: '/logos/gov-dti.svg' },
  { match: 'dti ', src: '/logos/gov-dti.svg' },
  { match: 'department of foreign affairs', src: '/logos/gov-dfa.svg' },
  { match: 'department of environment and natural resources', src: '/logos/gov-denr.svg' },
  { match: 'mines and geosciences bureau', src: '/logos/gov-denr.svg' },
  { match: 'environmental management bureau', src: '/logos/gov-denr.svg' },
  { match: 'provincial environment and natural resources office', src: '/logos/gov-denr.svg' },
  { match: 'department of agriculture', src: '/logos/gov-da.jpg' },
  { match: 'bureau of internal revenue', src: '/logos/gov-bir.png' },
  { match: 'philippine coast guard', src: '/logos/gov-pcg.svg' },
  { match: 'coast guard', src: '/logos/gov-pcg.svg' },
  { match: 'national commission on indigenous peoples', src: '/logos/gov-ncip.jpg' },
  { match: 'national nutrition council', src: '/logos/gov-nnc.svg' },
  { match: 'national police commission', src: '/logos/gov-napolcom.svg' },
  { match: 'national telecommunications commission', src: '/logos/gov-ntc.svg' },
  { match: 'office of civil defense', src: '/logos/gov-ocd.svg' },
  { match: 'overseas workers welfare administration', src: '/logos/gov-owwa.svg' },
  { match: 'pag-ibig fund', src: '/logos/gov-pagibig.svg' },
  { match: 'philippine drug enforcement agency', src: '/logos/gov-pdea.svg' },
  { match: 'philippine national police', src: '/logos/gov-pnp.svg' },
  { match: 'la union police provincial office', src: '/logos/gov-pnp.svg' },
  { match: 'parole and probation administration', src: '/logos/gov-doj.jpg' },
  { match: 'san fernando city parole and probation office', src: '/logos/gov-doj.jpg' },
  { match: 'social security system', src: '/logos/gov-sss.svg' },
  { match: 'government service insurance system', src: '/logos/gov-gsis.svg' },
  { match: 'development bank of the philippines', src: '/logos/gov-dbp.webp' },
  { match: 'philippine postal corporation', src: '/logos/gov-phlpost.jpg', wide: true },
  { match: 'technical education and skills development authority', src: '/logos/gov-tesda.svg' },
  { match: 'tesda ', src: '/logos/gov-tesda.svg' },
  { match: 'land transportation franchising and regulatory board', src: '/logos/gov-ltfrb.svg' },
  { match: 'land transportation office', src: '/logos/gov-lto.svg' },
  { match: 'maritime industry authority', src: '/logos/gov-marina.jpg' },
  { match: 'poro point management corporation', src: '/logos/ppmc-2026.jpg' },
  { match: 'philippine air force', src: '/logos/gov-paf.png' },
  { match: 'philippine navy', src: '/logos/gov-navy.png' },
  { match: 'la union provincial capitol', src: '/logos/provincial-government-la-union.png' },
  { match: 'bethany hospital', src: '/logos/bethany-hospital.png' },
  { match: 'lumed', src: '/logos/lumed-hospital.png' },
  { match: 'bpi', src: '/logos/bpi.svg' },
  { match: 'ace hardware', src: '/logos/ace-hardware.png' },
  { match: 'travelite express hotel', src: '/logos/travelite-express-hotel.png', wide: true },
  { match: 'aureo', src: '/logos/aureo-la-union.png' },
  { match: 'lbc', src: '/logos/lbc-express.png' },
  { match: 'jollibee', src: '/logos/jollibee-favicon.ico' },
  { match: 'national book store', src: '/logos/national-book-store-wordmark.png' },
  { match: 'dunkin', src: '/logos/dunkin.svg' },
  { match: 'cicosat colleges', src: '/logos/cicosat-colleges.png' },
  { match: 'central ilocandia college of science and technology', src: '/logos/cicosat-colleges.png' },
  { match: 'don mariano marcos memorial state university', src: '/logos/dmmmsu-seal-2025.png' },
  { match: 'saint louis college of san fernando', src: '/logos/saint-louis-college.png' },
  { match: 'union christian college', src: '/logos/union-christian-college.png' },
  { match: 'lorma colleges', src: '/logos/lorma-colleges.png' },
  { match: 'ama computer college', src: '/logos/ama-education-system.webp' },
  { match: 'leading edge international aviation academy', src: '/logos/leading-edge-aviation.png' },
]

// These are agency initials, not official seals. They give offices without a verified,
// locally available logo a consistent identifier rather than a misleading agency emblem.
const officeMonograms = [
  { match: 'bureau of customs', label: 'BOC' },
  { match: 'bureau of immigration', label: 'BI' },
  { match: 'bureau of local government finance', label: 'BLGF' },
  { match: 'bureau of the treasury', label: 'BTr' },
  { match: 'department of budget and management', label: 'DBM' },
  { match: 'commission on audit', label: 'COA' },
  { match: 'commission on human rights', label: 'CHR' },
  { match: 'commission on population', label: 'CPD' },
  { match: 'department of agrarian reform', label: 'DAR' },
  { match: 'department of justice', label: 'DOJ' },
  { match: 'provincial prosecutor', label: 'PROS' },
  { match: 'parole and probation', label: 'PPA' },
  { match: 'department of labor and employment', label: 'DOLE' },
  { match: 'dole ', label: 'DOLE' },
  { match: 'department of science and technology', label: 'DOST' },
  { match: 'dost ', label: 'DOST' },
  { match: 'land transportation franchising and regulatory board', label: 'LTFRB' },
  { match: 'land transportation office', label: 'LTO' },
  { match: 'maritime industry authority', label: 'MARINA' },
  { match: 'national commission on indigenous peoples', label: 'NCIP' },
  { match: 'national nutrition council', label: 'NNC' },
  { match: 'national police commission', label: 'NAPOLCOM' },
  { match: 'national telecommunications commission', label: 'NTC' },
  { match: 'office of civil defense', label: 'OCD' },
  { match: 'overseas workers welfare administration', label: 'OWWA' },
  { match: 'pag-ibig fund', label: 'HDMF' },
  { match: 'philippine drug enforcement agency', label: 'PDEA' },
  { match: 'philippine national police', label: 'PNP' },
  { match: 'la union police provincial office', label: 'LUPPO' },
  { match: 'philippine postal corporation', label: 'PHLPost' },
  { match: 'poro point industrial corporation', label: 'PPIC' },
  { match: 'poro point management corporation', label: 'PPMC' },
  { match: 'provincial environment and natural resources office', label: 'PENRO' },
  { match: 'public attorney', label: 'PAO' },
  { match: 'regional tripartite wages and productivity board', label: 'RTWPB' },
  { match: 'social security system', label: 'SSS' },
  { match: 'ilocos training and regional medical center', label: 'ITRMC' },
  { match: 'bdo', label: 'BDO' },
  { match: 'development bank of the philippines', label: 'DBP' },
  { match: 'government service insurance system', label: 'GSIS' },
  { match: 'land bank of the philippines', label: 'LBP' },
  { match: 'bureau of jail management', label: 'BJMP' },
  { match: 'coast guard', label: 'PCG' },
  { match: 'philippine navy', label: 'PN' },
  { match: 'aircraft control and warning wing', label: 'PAF' },
  { match: 'barangay hall', label: 'BH' },
  { match: 'northern philippines college', label: 'NPC' },
  { match: 'saint john bosco college', label: 'SJBC' },
  { match: 'sea and sky college', label: 'SSC' },
  { match: 'tesda', label: 'TESDA' },
]

const categoryListingIds = new Set([
  'banking-map',
  'city-bus-terminals',
  'city-everyday-map',
  'ev-charging',
])

function isCityOffice(item: PlaceRecord) {
  return item.id === 'city-hall' || item.id === 'city-offices-link' || item.id === 'barangay-halls-link' || item.id.startsWith('city-office-') || item.id.startsWith('barangay-hall-') || item.name === 'San Fernando City Hall'
}

function matchesBrand(name: string, brand: string) {
  const normalizedName = name.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return new RegExp(`(?:^|[^a-z0-9])${brand}(?:$|[^a-z0-9])`, 'i').test(normalizedName)
}

function placeMonogram(name: string) {
  const ignoredWords = new Set([
    'a', 'an', 'and', 'at', 'barangay', 'branch', 'city', 'company', 'corporation', 'department', 'district',
    'for', 'hall', 'inc', 'la', 'limited', 'of', 'office', 'regional', 'region', 'san', 'services', 'the', 'union',
  ])
  const words = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-zA-Z0-9]+/)
    .filter((word) => word && !ignoredWords.has(word.toLowerCase()))
  const initials = (words.length ? words : [name.replace(/[^a-zA-Z0-9]/g, '')])
    .slice(0, 3)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
  return initials || 'PL'
}

export function PlaceMark({ item, fallback: Fallback }: { item: PlaceRecord; fallback: LucideIcon }) {
  const brand = brandMarks.find(({ name }) => matchesBrand(item.name, name))?.icon
  const normalizedName = item.name.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const imageMark = imageMarks.find(({ match }) => normalizedName.includes(match))
  const officeMonogram = officeMonograms.find(({ match }) => normalizedName.includes(match))?.label
  const usesOfficeIdentity = Boolean(officeMonogram) || ['government', 'safety', 'finance', 'education'].includes(item.category)

  if (isCityOffice(item)) {
    return (
      <span className="inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-1" aria-hidden="true">
        <img src="/logos/san-fernando-city-seal.jpg" alt="" className="size-full object-contain" loading="lazy" />
      </span>
    )
  }

  if (imageMark) {
    return (
      <span className={`inline-flex ${imageMark.wide ? 'h-10 w-14' : 'size-10'} shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-1.5`} aria-hidden="true">
        <img src={imageMark.src} alt="" className="size-full object-contain" loading="lazy" />
      </span>
    )
  }

  if (usesOfficeIdentity) {
    const label = officeMonogram ?? item.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .split(/[^a-zA-Z0-9]+/)
      .filter((word) => word && !['and', 'of', 'the', 'for', 'la', 'union', 'region', 'office', 'inc'].includes(word.toLowerCase()))
      .map((word) => word[0])
      .join('')
      .slice(0, 4)
    const labelSize = label.length > 6 ? 'text-[7px]' : label.length > 4 ? 'text-[8px]' : 'text-[10px]'

    return (
      <span className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 px-1 ${labelSize} font-extrabold leading-none tracking-tight text-brand-800`} aria-hidden="true">
        {label}
      </span>
    )
  }

  if (brand) {
    return (
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white p-2" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="size-full" role="presentation">
          <path d={brand.path} fill={`#${brand.hex}`} />
        </svg>
      </span>
    )
  }

  if (item.id.endsWith('-map') || categoryListingIds.has(item.id)) {
    return (
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700" aria-hidden="true">
        <Fallback className="size-5" />
      </span>
    )
  }

  const label = placeMonogram(item.name)
  const labelSize = label.length > 5 ? 'text-[7px]' : label.length > 3 ? 'text-[9px]' : 'text-[11px]'

  return (
    <span className={`inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-brand-100 bg-brand-50 px-1 ${labelSize} font-extrabold leading-none tracking-tight text-brand-800`} aria-hidden="true">
      {label}
    </span>
  )
}
