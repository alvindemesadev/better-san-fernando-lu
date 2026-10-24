import type { PlaceRecord } from '../data/places'

const imageMarks: Array<{ match: string; src: string; wide?: boolean; large?: boolean; dark?: boolean }> = [
  // Public-agency marks plus selected health and education institution logos.
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
  { match: 'lorma medical center', src: '/logos/lorma-medical-center.png', wide: true },
  { match: 'lumed', src: '/logos/lumed-hospital.png' },
  { match: 'healthpro multi-specialty center', src: '/logos/healthpro-la-union.jpg' },
  { match: 'smile city dental essentials', src: '/logos/smile-city-dental.jpg', wide: true },
  { match: 'medisense laboratory center', src: '/logos/medisense-lab-center.jpg' },
  { match: 'cicosat colleges', src: '/logos/cicosat-colleges.png' },
  { match: 'central ilocandia college of science and technology', src: '/logos/cicosat-colleges.png' },
  { match: 'don mariano marcos memorial state university', src: '/logos/dmmmsu-seal-2025.png' },
  { match: 'saint louis college of san fernando', src: '/logos/saint-louis-college.png' },
  { match: 'union christian college', src: '/logos/union-christian-college.png' },
  { match: 'lorma colleges', src: '/logos/lorma-colleges.png' },
  { match: 'ama computer college', src: '/logos/ama-education-system.webp' },
  { match: 'leading edge international aviation academy', src: '/logos/leading-edge-aviation.png' },
  { match: 'partas bus terminal', src: '/logos/partas.png', wide: true },
]

function isCityOffice(item: PlaceRecord) {
  return item.id === 'city-hall' || item.id === 'city-offices-link' || item.id.startsWith('city-office-') || item.name === 'San Fernando City Hall'
}

export function PlaceMark({ item }: { item: PlaceRecord }) {
  const normalizedName = item.name.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  const imageMark = imageMarks.find(({ match }) => normalizedName.includes(match))

  if (isCityOffice(item)) {
    return (
      <span className="inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-1" aria-hidden="true">
        <img src="/logos/san-fernando-city-seal.jpg" alt="" className="size-full object-contain" loading="lazy" />
      </span>
    )
  }

  if (imageMark) {
    return (
      <span className={`inline-flex ${imageMark.large ? 'h-10 w-20 p-1' : imageMark.wide ? 'h-10 w-14 p-1.5' : 'size-10 p-1.5'} shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line ${imageMark.dark ? 'bg-ink-950' : 'bg-white'}`} aria-hidden="true">
        <img src={imageMark.src} alt="" className="size-full object-contain" loading="lazy" />
      </span>
    )
  }

  return null
}
