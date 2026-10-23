import { barangays } from './barangays'
import { offices } from './offices'

export type PlaceCategoryId =
  | 'government'
  | 'safety'
  | 'health'
  | 'education'
  | 'shopping'
  | 'food'
  | 'services'
  | 'stay'
  | 'attractions'
  | 'parks'
  | 'transport'
  | 'finance'
  | 'faith'
  | 'everyday'

export interface PlaceCategory {
  id: PlaceCategoryId
  label: string
  mapQuery: string
  description: string
}

export interface PlaceRecord {
  id: string
  name: string
  category: PlaceCategoryId
  address: string
  sourceLabel: string
  sourceUrl: string
  note?: string
  image?: PlaceImage
}

export interface PlaceImage {
  src: string
  alt: string
  credit: string
  creditUrl: string
}

export const placeCategories: PlaceCategory[] = [
  { id: 'government', label: 'Government offices', mapQuery: 'government offices', description: 'City, provincial, regional and national public offices.' },
  { id: 'safety', label: 'Safety and justice', mapQuery: 'police fire emergency court', description: 'Police, fire, corrections, courts and emergency-response offices.' },
  { id: 'health', label: 'Health and recovery', mapQuery: 'hospitals clinics laboratories pharmacies treatment rehabilitation centers', description: 'Hospitals, clinics, laboratories, pharmacies and recovery services.' },
  { id: 'education', label: 'Schools and learning', mapQuery: 'schools colleges universities', description: 'Colleges, universities, schools, libraries and learning centers.' },
  { id: 'shopping', label: 'Shopping and groceries', mapQuery: 'malls supermarkets grocery stores public market', description: 'Malls, markets, supermarkets, groceries and everyday retail.' },
  { id: 'food', label: 'Food and coffee', mapQuery: 'restaurants fast food cafes coffee shops', description: 'Restaurants, fast-food chains, cafés, bakeries and food parks.' },
  { id: 'services', label: 'Personal and family services', mapQuery: 'salons barbers gyms cinemas family entertainment', description: 'Salons, wellness, fitness, cinemas and family activities.' },
  { id: 'stay', label: 'Places to stay', mapQuery: 'hotels resorts inns accommodation', description: 'Hotels, resorts, inns and visitor accommodation.' },
  { id: 'attractions', label: 'Tourism and heritage', mapQuery: 'tourist attractions historical sites museums', description: 'Officially listed destinations, heritage sites, museums and visitor spots.' },
  { id: 'parks', label: 'Parks and outdoors', mapQuery: 'parks playgrounds beaches outdoor recreation', description: 'Public parks, beaches, gardens, baywalks and outdoor recreation.' },
  { id: 'transport', label: 'Transport and mobility', mapQuery: 'bus terminals airport seaport transport', description: 'Bus terminals, airport, seaport, parking and mobility services.' },
  { id: 'finance', label: 'Banks and payments', mapQuery: 'banks ATMs remittance pawnshops', description: 'Banks, ATMs, remittance, money services and payment centers.' },
  { id: 'faith', label: 'Churches and faith', mapQuery: 'churches chapels temples mosques', description: 'Churches, chapels, temples and other places of worship.' },
  { id: 'everyday', label: 'Utilities and essentials', mapQuery: 'post office utilities internet service centers gas stations', description: 'Utilities, postal, telecom, fuel, auto and other day-to-day services.' },
]

const agencyDirectory = 'https://launion.gov.ph/wp-content/uploads/2026/02/RLAs-PLAs-GOCCs-and-Private-Sector.pdf'
const agencySource = 'La Union provincial agency directory · Feb. 27, 2026'
const cityDepartments = 'https://www.sanfernandocity.gov.ph/city-departments/'
const tourismSource = 'https://launion.gov.ph/wp-content/uploads/2024/02/2023_TAs.pdf'
const robinsonsDirectory = 'https://vmd.robinsonsmalls.com/list-of-malls/north-luzon/robinsons-la-union'
const maps = 'https://www.google.com/maps/search/?api=1&query='

const provincialTourismPage = 'https://launion.gov.ph/tourism-5/'
const provincialPhoto = (src: string, alt: string): PlaceImage => ({
  src: `/places/${src}`,
  alt,
  credit: 'Provincial Government of La Union',
  creditUrl: provincialTourismPage,
})

const tourismPhotos: Record<string, PlaceImage> = {
  'Abut Bamboo Craft-making (Basket Making Industry)': provincialPhoto('abut-bamboo-craftmaking.webp', 'Bamboo craft-making in Abut'),
  'Bacsil Ridge Monument': provincialPhoto('bacsil-ridge-monument.webp', 'Bacsil Ridge Monument'),
  'Carlatan Surfing Area': provincialPhoto('carlatan-surfing-area.webp', 'Surfing along the Carlatan coast'),
  'Car-rile Tower (Moro Watchtower)': provincialPhoto('carrile-tower.webp', 'Car-rile Moro Watchtower'),
  'Christ the Redeemer': provincialPhoto('christ-the-redeemer.webp', 'Christ the Redeemer statue'),
  'Halo-Halo de Iloko': provincialPhoto('halo-halo-de-iloko.webp', 'Halo-Halo de Iloko specialty halo-halo'),
  'Heroes Hill': provincialPhoto('heroes-hill.webp', 'Heroes Hill'),
  'Ibit’s Farm': provincialPhoto('ibits-farm.webp', 'Ibit’s Farm'),
  'Kasay Marine Sanctuary': provincialPhoto('kasay-marine-sanctuary.webp', 'Kasay Marine Sanctuary'),
  'La Union Botanical Garden': provincialPhoto('la-union-botanical-garden.webp', 'La Union Botanical Garden'),
  'La Union Provincial Capitol': provincialPhoto('la-union-provincial-capitol.webp', 'La Union Provincial Capitol'),
  'La Union Science Centrum and Museum': provincialPhoto('science-centrum-museum.webp', 'La Union Science Centrum and Museum'),
  'Lingsat Marine Sanctuary': provincialPhoto('lingsat-marine-sanctuary.webp', 'Lingsat Marine Sanctuary'),
  'Ma-Cho Temple': provincialPhoto('ma-cho-temple.webp', 'Ma-Cho Temple'),
  'Filipino-Chinese Friendship Pagoda': provincialPhoto('friendship-pagoda.webp', 'Filipino-Chinese Friendship Pagoda'),
  'Pindangan Ruins': provincialPhoto('pindangan-ruins.webp', 'Pindangan Ruins'),
  'Poro Marine Protected Area': provincialPhoto('poro-marine-protected-area.webp', 'Poro Marine Protected Area'),
  'Poro Point Lighthouse': provincialPhoto('poro-point-lighthouse.webp', 'Poro Point Lighthouse'),
  'San Fernando City Hall': provincialPhoto('san-fernando-city-hall.webp', 'San Fernando City Hall'),
  'San Fernando Beach Coast': provincialPhoto('san-fernando-beach-coast.webp', 'San Fernando beach coast'),
  'Tomb of the Unknown Soldier': provincialPhoto('tomb-unknown-soldier.webp', 'Tomb of the Unknown Soldier'),
}

const airportPhoto: PlaceImage = {
  src: '/places/san-fernando-airport.webp',
  alt: 'Small aircraft at San Fernando Airport',
  credit: 'City Government of San Fernando',
  creditUrl: 'https://www.sanfernandocity.gov.ph/life-in-csf/',
}

const cityTourismPage = 'https://www.sanfernandocity.gov.ph/life-in-csf/'
const townPlazaPhoto: PlaceImage = {
  src: '/places/san-fernando-city-plaza.webp',
  alt: 'San Fernando City Town Plaza pavilion',
  credit: 'City Government of San Fernando',
  creditUrl: cityTourismPage,
}
const peopleParkPhoto: PlaceImage = {
  src: '/places/people-park-fountain.jpg',
  alt: 'People’s Park fountain area in San Fernando City',
  credit: 'City Government of San Fernando',
  creditUrl: 'https://www.sanfernandocity.gov.ph/frontliners-kinilala-at-binigyang-pugay-sa-pagpapailaw-sa-city-plaza/',
}
const cathedralPhoto: PlaceImage = {
  src: '/places/saint-william-cathedral.webp',
  alt: 'Cathedral of Saint William the Hermit in San Fernando City',
  credit: 'Patrickroque01 · CC BY-SA 4.0',
  creditUrl: 'https://commons.wikimedia.org/wiki/File:Cathedral_of_Saint_William_the_Hermit_LU_(Gomez_Street,_San_Fernando,_La_Union;_02-24-2023).jpg',
}
const sillagParkPhoto: PlaceImage = {
  src: '/places/sillag-park.webp',
  alt: 'SILLAG Park at Poro Point Baywalk during its June 2026 opening',
  credit: 'Poro Point Management Corporation',
  creditUrl: 'https://poropointfreeport.gov.ph/new/its-official-the-sillag-park-is-now-open/',
}
const poroBaywalkPhoto: PlaceImage = {
  src: '/places/poro-point-baywalk.webp',
  alt: 'Walkway and palms at Poro Point Baywalk',
  credit: 'Poro Point Management Corporation',
  creditUrl: 'https://poropointfreeport.gov.ph/new/poro-point-baywalk/',
}
const thunderbirdPhoto: PlaceImage = {
  src: '/places/thunderbird-poro-point.webp',
  alt: 'Guest room at Thunderbird Resorts and Casinos Poro Point',
  credit: 'Thunderbird Resorts',
  creditUrl: 'https://www.thunderbird-asia.com/poro-point-la-union-hotel/',
}
const seaportPhoto: PlaceImage = {
  src: '/places/san-fernando-seaport.jpg',
  alt: 'Cargo vessel docked at the San Fernando International Seaport',
  credit: 'Poro Point Management Corporation · Annual Report 2024',
  creditUrl: 'https://poropointfreeport.gov.ph/wp-content/uploads/2023/02/PPMC-Annual-Report-CY-2024.pdf',
}
const smCityPhoto: PlaceImage = {
  src: '/places/sm-city-la-union-exterior.webp',
  alt: 'SM City La Union mall exterior along Diversion Road',
  credit: 'SM Supermalls',
  creditUrl: 'https://www.smsupermalls.com/whats-new/lifestyle/sm-city-la-union-opens-as-the-new-gen-z-destination-up-north',
}
const smSandboxPhoto: PlaceImage = {
  src: '/places/sm-city-la-union-sandbox.jpg',
  alt: 'Sandbox outdoor volleyball space at SM City La Union',
  credit: 'SM Supermalls',
  creditUrl: 'https://www.smsupermalls.com/whats-new/lifestyle/sm-city-la-union-opens-as-the-new-gen-z-destination-up-north',
}
const nisceBranchPhoto: PlaceImage = {
  src: '/places/nisce-robinsons-la-union.jpg',
  alt: 'Nisce Skin Medispa sign at the Robinsons La Union branch',
  credit: 'Parlon',
  creditUrl: 'https://www.parlon.ph/parlon/nisce-skin-medispa/nisce-skin-medispa-robinsons-la-union',
}
const plazaHotelPhoto: PlaceImage = {
  src: '/places/plaza-hotel-2018.jpg',
  alt: 'Plaza Hotel sign on Manila North Road in San Fernando, photographed in 2018',
  credit: 'Patrickroque01 · Wikimedia Commons · CC BY-SA 4.0',
  creditUrl: 'https://commons.wikimedia.org/wiki/File:CSFLU_city_center_-_Manila_North_Road_southbound_(San_Fernando,_La_Union)(2018-11-25).jpg',
}
const mannaMallPhoto: PlaceImage = {
  src: '/places/manna-mall.jpg',
  alt: 'Manna Mall storefront in Pagdaraogan, San Fernando',
  credit: 'Judgefloro · Wikimedia Commons · CC0 1.0',
  creditUrl: 'https://commons.wikimedia.org/wiki/File:2117Pagdaraoan,_San_Fernando,_La_Union_03.jpg',
}
const blueMarlinPhoto: PlaceImage = {
  src: '/places/blue-marlin-resort.jpg',
  alt: 'La Union Blue Marlin Resort facade and sign',
  credit: 'Tripadvisor listing photo',
  creditUrl: 'https://www.tripadvisor.com/Hotel_Review-g298454-d8684316-Reviews-La_Union_Blue_Marlin_Resort-San_Fernando_La_Union_La_Union_Province_Ilocos_Region_Luzo.html',
}
const jvResortPhoto: PlaceImage = {
  src: '/places/jv-resort.jpg',
  alt: 'Interior photo from the J&V Hotel and Resort listing',
  credit: 'Expedia listing photo',
  creditUrl: 'https://www.expedia.com.ph/San-Fernando-Hotels-JV-Hotel-And-Resort.h92498179.Hotel-Information',
}
const locationOneEightyPhoto: PlaceImage = {
  src: '/places/location-one-eighty.jpg',
  alt: 'Exterior photo from the Location One Eighty hotel listing',
  credit: 'Agoda listing photo',
  creditUrl: 'https://www.agoda.com/location-one-eighty/hotel/la-union-ph.html',
}
const formochaPhoto: PlaceImage = {
  src: '/places/formocha-taiwan-milk-tea.jpg',
  alt: 'Formocha Taiwan Milk Tea branded drinks',
  credit: 'Pinoy Entrepreneur',
  creditUrl: 'https://www.pinoy-entrepreneur.com/2021/04/22/formocha-taiwan-milktea/',
}
const sagatCrustPhoto: PlaceImage = {
  src: '/places/sagat-crust-food.jpg',
  alt: 'Food photo from Sagat Crust Food House at Robinsons Place San Fernando La Union',
  credit: 'Sagat Crust Food House · Foodpanda listing',
  creditUrl: 'https://www.foodpanda.ph/restaurant/nctu/sagat-crust-food-house-robinsons-place-san-fernando-la-union',
}
const takoyakiLabPhoto: PlaceImage = {
  src: '/places/takoyaki-lab-food.jpg',
  alt: 'Takoyaki dish from Takoyaki Lab at Robinsons Place San Fernando La Union',
  credit: 'Takoyaki Lab · Foodpanda listing',
  creditUrl: 'https://www.foodpanda.ph/restaurant/fpvc/takoyaki-lab-robinsons-place-san-fernando-la-union',
}
const avocadoriaPhoto: PlaceImage = {
  src: '/places/avocadoria-brand-display.jpg',
  alt: 'Avocadoria.ph branded kiosk and menu display',
  credit: 'Philippine Franchise Association',
  creditUrl: 'https://www.pfa.org.ph/product-page/avocadoria-ph',
}

const placePhotosById: Record<string, PlaceImage> = {
  'city-hall': tourismPhotos['San Fernando City Hall'],
  'airport': airportPhoto,
  'plaza': townPlazaPhoto,
  'people-park': peopleParkPhoto,
  'sillag-park': sillagParkPhoto,
  'poro-baywalk': poroBaywalkPhoto,
  'seaport': seaportPhoto,
  'sm-city': smCityPhoto,
  'sm-sandbox': smSandboxPhoto,
  'sfc-cathedral': cathedralPhoto,
  'thunderbird': thunderbirdPhoto,
  'freedom-park': tourismPhotos['Heroes Hill'],
  'botanical-garden': tourismPhotos['La Union Botanical Garden'],
  'bacsil-ridge': tourismPhotos['Bacsil Ridge Monument'],
  'carrile-tower': tourismPhotos['Car-rile Tower (Moro Watchtower)'],
  'christ-redeemer': tourismPhotos['Christ the Redeemer'],
  'science-centrum': tourismPhotos['La Union Science Centrum and Museum'],
  'poro-lighthouse': tourismPhotos['Poro Point Lighthouse'],
  'city-beach-coast': tourismPhotos['San Fernando Beach Coast'],
  'carlatan-surf': tourismPhotos['Carlatan Surfing Area'],
  'kasay-sanctuary': tourismPhotos['Kasay Marine Sanctuary'],
  'lingsat-sanctuary': tourismPhotos['Lingsat Marine Sanctuary'],
  'poro-mpa': tourismPhotos['Poro Marine Protected Area'],
  'ma-cho': tourismPhotos['Ma-Cho Temple'],
  'friendship-pagoda': tourismPhotos['Filipino-Chinese Friendship Pagoda'],
  'pindangan-ruins': tourismPhotos['Pindangan Ruins'],
  'manna-mall': mannaMallPhoto,
  'city-plaza-hotel': plazaHotelPhoto,
  'blue-marlin': blueMarlinPhoto,
  'jv-resort': jvResortPhoto,
  'location-180': locationOneEightyPhoto,
}

const placePhotosByName: Record<string, PlaceImage> = {
  'City Government of San Fernando – City Hall': tourismPhotos['San Fernando City Hall'],
  'Freedom Park / Heroes Hill': tourismPhotos['Heroes Hill'],
  'La Union Botanical and Zoological Garden': tourismPhotos['La Union Botanical Garden'],
  'Bacsil Ridge Monument and Viewdeck': tourismPhotos['Bacsil Ridge Monument'],
  'Poro Point San Fernando Airport': airportPhoto,
  'Nisce Skin Clinic': nisceBranchPhoto,
  'Formocha Taiwan Milk Tea': formochaPhoto,
  'Sagat Crust': sagatCrustPhoto,
  'Takoyaki Lab': takoyakiLabPhoto,
  'Avocadoria': avocadoriaPhoto,
}

function place(
  id: string,
  name: string,
  category: PlaceCategoryId,
  address: string,
  sourceLabel: string,
  sourceUrl: string,
  note?: string,
  image?: PlaceImage,
): PlaceRecord {
  const placeImage = image ?? placePhotosById[id] ?? placePhotosByName[name] ?? tourismPhotos[name]
  return { id, name, category, address, sourceLabel, sourceUrl, ...(note ? { note } : {}), ...(placeImage ? { image: placeImage } : {}) }
}

const agencyRows: [string, string, PlaceCategoryId][] = [
  ['580th Aircraft Control and Warning Wing, Philippine Air Force', 'Wallace Air Station, City of San Fernando', 'safety'],
  ['Bangko Sentral ng Pilipinas – La Union Branch', 'City of San Fernando', 'finance'],
  ['Bureau of Customs – Port of San Fernando', 'Pennsylvania Avenue, Poro Point', 'government'],
  ['Bureau of Immigration – La Union District Office', 'Pennsylvania Avenue, Poro Point', 'government'],
  ['Bureau of Internal Revenue – Revenue District Office No. 03', '2nd Floor, Manna Mall, Pagdaraoan', 'government'],
  ['Bureau of Fisheries and Aquatic Resources – Regional Office 1', 'Government Center, Sevilla', 'government'],
  ['Bureau of Jail Management and Penology – Regional Office 1', 'Camp Oscar Florendo, Barangay Parian', 'safety'],
  ["BJMP Provincial Jail Administrator's Office – La Union", 'Barangay Pias', 'safety'],
  ['BJMP San Fernando City District Jail', 'Barangay Pias', 'safety'],
  ['Bureau of Local Government Finance – Regional Office 1', '2nd Floor, Kenny Plaza, Quezon Avenue', 'government'],
  ['Bureau of the Treasury – Regional Office 1', 'Aguila Road, Sevilla Norte', 'government'],
  ['Civil Service Commission – Regional Office 1', 'Quezon Avenue', 'government'],
  ['Civil Service Commission – La Union Field Office', 'Aguila Road', 'government'],
  ['Coast Guard District Northwestern Luzon', 'Poro Point', 'safety'],
  ['Commission on Audit – Regional Office 1', 'Government Center, Sevilla', 'government'],
  ['Commission on Elections – La Union Provincial Office', 'City of San Fernando', 'government'],
  ['Commission on Elections – Regional Office 1', '2nd Floor, Kenny Plaza, Catbangen', 'government'],
  ['Commission on Higher Education – Regional Office I', 'National Highway, Sevilla', 'education'],
  ['Commission on Human Rights – Region I', 'Capitol Hill, Government Center 2, Sevilla', 'government'],
  ['Commission on Population and Development (CPD) – Region I', 'JANPAC Building, Sevilla', 'government'],
  ['Department of Environment and Natural Resources – Region I', 'Government Center, Sevilla', 'government'],
  ['Mines and Geosciences Bureau – Regional Office 1', 'DENR Building, Government Center, Sevilla', 'government'],
  ['Environmental Management Bureau – Regional Office 1', 'DENR Building, Government Center, Sevilla', 'government'],
  ['Department of Agrarian Reform – La Union Provincial Office', 'La Union Provincial Office, City of San Fernando', 'government'],
  ['Department of Agrarian Reform – Regional Office 1', 'North Gate Square Building, Carlatan', 'government'],
  ['Department of Agriculture – Regional Field Office I', 'Aguila Road, Sevilla', 'government'],
  ['Department of Budget and Management – Regional Office 1', 'Government Center, Sevilla', 'government'],
  ['Department of Economy, Planning, and Development – Regional Office I', 'Guerrero Road', 'government'],
  ['Department of Education – Region I', 'Flores Street, Catbangen', 'education'],
  ['DepEd City of San Fernando Schools Division Office', 'Barangay Tanqui', 'education'],
  ['DepEd La Union Schools Division Office', 'Flores Street, Catbangen', 'education'],
  ['Department of Foreign Affairs – Consular Office La Union', '2nd Floor, CSI Mall, Biday', 'government'],
  ['Department of Health – Ilocos Center for Health Development', 'DOH compound, Barangay Parian', 'health'],
  ['Department of Human Settlements and Urban Development – Regional Office I', '3rd Floor, Florentino Building, General Luna Street', 'government'],
  ['Department of Information and Communications Technology – Region 1', 'DMMMSU Open University System, Catbangen', 'government'],
  ['Department of Justice – Region I', 'Justice Hall, Government Center, Sevilla', 'government'],
  ['La Union Provincial Prosecutor’s Office', 'Justice Hall, Government Center, Sevilla', 'government'],
  ['Parole and Probation Administration – Region 1', 'O.D. Leones Building, Aguila Road, Sevilla', 'government'],
  ['San Fernando City Parole and Probation Office', 'Hall of Justice, Sevilla Heights', 'government'],
  ['Department of Labor and Employment – Region 1', 'Parammata Building B, Biday', 'government'],
  ['DOLE La Union Field Office', 'RSKK Building, Diversion Road, Biday', 'government'],
  ['Department of Migrant Workers – Region 1', '2nd Floor, Kenny Plaza, Quezon Avenue', 'government'],
  ['Department of Public Works and Highways – Region 1', 'DPWH Building, Aguila Road', 'government'],
  ['DPWH La Union 1st District Engineering Office', 'Lingsat', 'government'],
  ['Department of Science and Technology – Region 1', 'DMMMSU Mid La Union Campus', 'government'],
  ['DOST La Union Provincial Office', 'Government Center, Sevilla', 'government'],
  ['Department of Social Welfare and Development – Field Office I', 'DSWD Building, Quezon Avenue', 'government'],
  ['Department of the Interior and Local Government – La Union Provincial Office', 'Aguila Road, Sevilla', 'government'],
  ['DILG Regional Office 1', 'City of San Fernando', 'government'],
  ['Department of Tourism – Region 1', '2nd Floor, Nisce Business Center, National Highway', 'government'],
  ['Department of Trade and Industry – Region 1', '4th Floor, Juanita Commercial Building, Quezon Avenue', 'government'],
  ['DTI La Union Provincial Office', 'AJ Realty, National Highway, Madayegdeg', 'government'],
  ['Development Bank of the Philippines', 'LUECO Building II, City of San Fernando', 'finance'],
  ['Government Service Insurance System – La Union', 'Bugayong Building, Quezon Avenue, Catbangen', 'finance'],
  ['Ilocos Training and Regional Medical Center', 'MacArthur Highway, Barangay Parian', 'health'],
  ['Land Bank of the Philippines – La Union Branch', 'LBP Building, Quezon Avenue', 'finance'],
  ['Land Transportation Franchising and Regulatory Board – Region 1', 'Government Center, Sevilla', 'government'],
  ['Land Transportation Office – Region 1', 'Aguila Road, Sevilla', 'government'],
  ['Maritime Industry Authority – Regional Office 1 and 2', '3rd Floor, Tan Building, Quezon Avenue, Sevilla', 'government'],
  ['National Bureau of Investigation – Regional Office 1', 'Aguila Road, Sevilla', 'government'],
  ['National Commission on Indigenous Peoples – Regional Office 1', 'Braganza Building, Sevilla', 'government'],
  ['National Nutrition Council – Region 1', 'DOH compound, Barangay Parian', 'government'],
  ['National Police Commission – Regional Office I', 'Government Center, Sevilla', 'safety'],
  ['National Telecommunications Commission – Region 1', 'Dacanay Avenue, San Francisco', 'government'],
  ['Northern Luzon Naval Command, Philippine Navy', 'Naval Station Ernesto Ogbinar, Poro Point', 'safety'],
  ['Office of Civil Defense – Region 1', 'Government Center 2, Aguila Road, Sevilla', 'safety'],
  ['Overseas Workers Welfare Administration – Region 1', '2nd Floor, Kenny Plaza, Quezon Avenue', 'government'],
  ['Pag-IBIG Fund – La Union Branch', 'Pag-IBIG Fund Building, Government Center, Sevilla', 'government'],
  ['Philippine Drug Enforcement Agency – Regional Office 1', 'PDEA Building, Camp Diego Silang, Carlatan', 'safety'],
  ['Philippine Information Agency – Region 1', 'Old Florentino Building, General Luna Street', 'government'],
  ['Police Regional Office 1 – Philippine National Police', 'Barangay Parian', 'safety'],
  ['La Union Police Provincial Office', 'Camp Diego Silang, Carlatan', 'safety'],
  ['Philippine Ports Authority – PMO Northern Luzon', 'City of San Fernando', 'transport'],
  ['Philippine Postal Corporation – Postal Area II (Northwest Luzon Area)', 'Catbangen', 'everyday'],
  ['Philippine Statistics Authority – Regional Statistical Services Office I', 'Parammata Building, Biday', 'government'],
  ['Philippine Statistics Authority – La Union Provincial Statistical Office', 'The Fifth Building, Ancheta Street, Barangay IV', 'government'],
  ['Poro Point Industrial Corporation', 'Pier 2, Poro Point', 'government'],
  ['Poro Point Management Corporation', 'Governor Joaquin L. Ortega Avenue, Poro', 'government'],
  ['Provincial Environment and Natural Resources Office – La Union', 'DENR Building, Government Center, Sevilla', 'government'],
  ['Public Attorney’s Office – Region 1', 'Justice Hall, Sevilla Center', 'government'],
  ['Regional Trial Court – Branch 10', 'Bulwagan ng Katarungan, Government Center, Sevilla', 'safety'],
  ['Regional Trial Court – Branch 26', 'Hall of Justice, Sevilla', 'safety'],
  ['Regional Trial Court – Branch 27', 'Hall of Justice, Sevilla', 'safety'],
  ['Regional Trial Court – Branch 28', 'Hall of Justice, Sevilla', 'safety'],
  ['Regional Trial Court – Branch 30', 'Hall of Justice, Sevilla', 'safety'],
  ['Regional Trial Court – Branch 66', 'Hall of Justice, Sevilla', 'safety'],
  ['Regional Tripartite Wages and Productivity Board – Region I', 'Parammata Building B, Biday', 'government'],
  ['Social Security System – La Union Branch', 'SSS Building, Government Center, Sevilla', 'government'],
  ['TESDA – Regional Office 1', 'Quezon Avenue, Catbangen', 'education'],
  ['TESDA – La Union Provincial Office', 'TESDA Complex, Catbangen', 'education'],
]

const agencyNameSources: Record<string, { label: string; url: string }> = {
  'Bureau of Internal Revenue – Revenue District Office No. 03': {
    label: 'BIR Revenue District Office No. 03',
    url: 'https://web-services.bir.gov.ph/eappointment/book_now.html',
  },
  'Commission on Higher Education – Regional Office I': {
    label: 'CHED Regional Office I directory',
    url: 'https://legacy.ched.gov.ph/regional-offices/',
  },
  'Commission on Human Rights – Region I': {
    label: 'CHR Region I directory',
    url: 'https://chr.gov.ph/chr-directory/',
  },
  'Commission on Population and Development (CPD) – Region I': {
    label: 'CPD Region I official site',
    url: 'https://region1.cpd.gov.ph/',
  },
  'Department of Environment and Natural Resources – Region I': {
    label: 'DENR Region I office directory',
    url: 'https://denr.gov.ph/wp-content/uploads/2025/01/DAO-2016-29_FOI-Manual-Updated-as-of-December-2024.pdf',
  },
  'Department of Agriculture – Regional Field Office I': {
    label: 'DA Regional Field Office I directory',
    url: 'https://www.da.gov.ph/directory-of-officials/',
  },
  'Department of Economy, Planning, and Development – Regional Office I': {
    label: 'DEPDev Regional Office I',
    url: 'https://dro1.depdev.gov.ph/',
  },
  'Department of Education – Region I': {
    label: 'DepEd regional and division office directory',
    url: 'https://www.deped.gov.ph/contact-us/regional-division-offices-directory/',
  },
  'Department of Health – Ilocos Center for Health Development': {
    label: 'DOH Ilocos Center for Health Development',
    url: 'https://ro1.doh.gov.ph/',
  },
  'Department of Justice – Region I': {
    label: 'DOJ regional prosecutors directory',
    url: 'https://www.doj.gov.ph/regional-prosecutors.html',
  },
  'Department of Social Welfare and Development – Field Office I': {
    label: 'DSWD Field Office I',
    url: 'https://fo1.dswd.gov.ph/',
  },
  'National Police Commission – Regional Office I': {
    label: 'NAPOLCOM Regional Office I',
    url: 'https://napolcom.gov.ph/r1/index-services.php',
  },
  'Police Regional Office 1 – Philippine National Police': {
    label: 'La Union police office directory',
    url: 'https://launion.gov.ph/wp-content/uploads/2024/11/PDRRMP%202023-2025.pdf',
  },
  'Philippine Postal Corporation – Postal Area II (Northwest Luzon Area)': {
    label: 'PHLPost Citizen’s Charter 2026',
    url: 'https://phlpost.gov.ph/wp-content/uploads/2026/04/APPROVED-PHLPost-Citizens-Charter-Series-of-2026.pdf',
  },
  'Philippine Statistics Authority – Regional Statistical Services Office I': {
    label: 'PSA Regional Statistical Services Office I',
    url: 'https://rsso01.psa.gov.ph/',
  },
  'Philippine Statistics Authority – La Union Provincial Statistical Office': {
    label: 'PSA La Union Provincial Statistical Office',
    url: 'https://rsso01.psa.gov.ph/',
  },
  'Regional Tripartite Wages and Productivity Board – Region I': {
    label: 'NWPC RTWPB-I directory',
    url: 'https://nwpc.dole.gov.ph/connect-with-us/',
  },
}

const agencyPlaces = agencyRows.map(([name, address, category], index) => {
  const source = agencyNameSources[name]
  return place(
    `agency-${index + 1}`,
    name,
    category,
    address,
    source?.label ?? agencySource,
    source?.url ?? agencyDirectory,
  )
})

// The museum already has a curated Places entry; keep its office detail page, but don't list it twice here.
const cityOfficePlaces = offices
  .filter((office) => office.slug !== 'la-union-science-centrum-and-museum')
  .map((office) =>
    place(
      `city-office-${office.slug}`,
      office.name,
      'government',
      office.address && office.address !== '*' ? office.address : 'City Hall, City of San Fernando, La Union',
      'City office profile',
      `/government/offices/${office.slug}`,
    ),
)

const barangayHallPlaces = barangays.map((barangay) =>
  place(
    `barangay-hall-${barangay.slug}`,
    `${barangay.name} Barangay Hall`,
    'government',
    `${barangay.name}, City of San Fernando, La Union`,
    'Barangay profile',
    `/government/barangays/${barangay.slug}`,
  ),
)

const schoolRows = [
  'AMA Computer College – La Union, Inc.',
  'CICOSAT Colleges',
  'Don Mariano Marcos Memorial State University – Mid La Union Campus',
  'Don Mariano Marcos Memorial State University – Open University System',
  'Leading Edge International Aviation Academy, Inc.',
  'Lorma Colleges',
  'Northern Philippines College for Maritime Science and Technology, Inc.',
  'Saint John Bosco College of Northern Luzon',
  'Saint Louis College of San Fernando, La Union, Inc.',
  'Sea and Sky College',
  'Union Christian College',
]

const schoolList = 'https://launion.gov.ph/wp-content/uploads/2026/02/Tertiary-Schools-in-La-Union-Updated-2026.pdf'
const schoolPlaces = schoolRows.map((name, index) =>
  place(`college-${index + 1}`, name, 'education', 'City of San Fernando, La Union', 'La Union tertiary schools list · 2026', schoolList),
)

const tourismNames = [
  // Other tourism records are already represented by their curated place cards or office profiles.
  'Abut Bamboo Craft-making (Basket Making Industry)',
  'Halo-Halo de Iloko',
  'Ibit’s Farm',
  'Tomb of the Unknown Soldier',
]

const tourismPlaces = tourismNames.map((name, index) =>
  place(`tourism-${index + 1}`, name, ['Halo-Halo de Iloko'].includes(name) ? 'food' : 'attractions', 'City of San Fernando, La Union', 'Provincial tourism destination list', tourismSource),
)

const mallAddress = 'Robinsons La Union, MacArthur Highway, Barangay Sevilla'
const mallRetailers = [
  '@TOKYO', 'AAP', 'Aficionado', 'Aquaflask', 'Argentée', 'Bench', 'Broadway Gems', 'Core Pacific', 'CY7 Cellphone & Accessories',
  'Daiso Japan', 'Denim Hub', 'Digital Walker', 'Executive Optical', 'G&G', 'GameXtreme', 'Guanzon Mobitek', 'Handyman',
  'Ian Darcy', 'Infinix', 'LBC', 'Levi’s', 'Manjaru', 'Mandaue Foam and Home Store', 'Mobile Care', 'National Book Store', 'NCAT', 'Octagon',
  'Oxygen', 'PC Express', 'Penshoppe', 'Picture City', 'Power Mac Center', 'Robinsons Appliances', 'Robinsons Department Store',
  'Robinsons Supermarket', 'Samsung', 'Si-Gabrillo Optical', 'Smart', 'Smile City Dental Essentials', 'Sprinto', 'Synchro',
  'Tech101', 'Time Check', 'Watsons', 'World Balance', 'Xiaomi', 'OTH Tech', 'Repair Me', 'Super50',
]
const mallFood = [
  'Beanleaf Coffee & Tea', 'Ben’s Halo Halo', 'Botejyu', 'BreadTalk', 'Candy Corner', 'Chapo’s Grill & Sizzlers', 'Chia’s Lechon House',
  'Classic Savory', 'Chizmozza', 'Dunkin’', 'Famous Belgian', 'Famous Belgian Waffle', 'Formocha Taiwan Milk Tea', 'Fruity Blends', 'Gem’s Empanada',
  'Gong Cha', 'Hongkong Style Noodles & Dimsum', 'Jollibee', 'Kettle Korn', 'KFC', 'Lemon Hub', 'Lemon Life', 'Mary Grace Cafe',
  'Monster Wings', 'Mr. Kimbob', 'Pepa Wings', 'Potato Corner', 'Sagat Crust', 'Sam’s Everything on Sticks', 'Seashack',
  'Shawarma Shack', 'Siomai House', 'Sonyda', 'Takoyaki Lab', 'Turks', 'Waffle Time', 'Yeobo Corndog', 'ZYX Katsumaki',
  'Buko Island', 'Citi Bites Pizza & Pasta', 'Don’s Original Spanish Churros', 'Macao Imperial Tea', 'Lutong Bahay ni Manang',
  'Avocadoria', 'Lechon House',
]
const mallServices = [
  'Beautederm', 'Booze and Barbers', 'David’s Salon & Topten Nails', 'Dr. Brows', 'iSports', 'Kidzoona', 'Kids Box by Kidzoona', 'Life 4 Cuts',
  'Luxederm Face and Body', 'Nail Cocktales', 'Nailandia', 'Nisce Skin Clinic', 'Ricsjen Beauty & Wellness', 'Robinsons Movieworld',
  'Tom’s World', 'Tronix', 'Zion', 'Transfer It',
]
const smMall = 'SM City La Union, Diversion Road, Barangay Biday'
const smRetailers = [
  'SM Store', 'SM Supermarket', 'Ace Hardware', 'Toy Kingdom', 'Levi’s', 'Watsons', 'Surplus', 'Pet Express', 'Adidas', 'Miniso',
  'Sports Central', 'SM Appliance Center', 'Puma', 'UNIQLO', 'National Book Store',
]
const smFoodHall = [
  'Lechon Belly House', 'Kain', 'Kayu', 'Krisp', 'Steak and Gravy', 'Potato Corner', 'Turks', 'Sook Thai', 'Seoul Good', 'Shibuya',
  'Xie Xie', 'Seawadeeka', 'Bebo’s Bombay Burritos', 'Go Berry', 'Malabar',
]

const tenantPlaces = [
  ...mallRetailers.map((name, index) => place(`rob-shop-${index + 1}`, name, 'shopping', mallAddress, 'Robinsons Malls tenant directory', robinsonsDirectory, `Listed at Robinsons La Union${name === 'Robinsons Supermarket' ? ' · Level 1' : ''}.`)),
  ...mallFood.map((name, index) => place(`rob-food-${index + 1}`, name, 'food', mallAddress, 'Robinsons Malls tenant directory', robinsonsDirectory, 'Listed in the mall’s dining directory; check the mall listing for current floor and hours.')),
  ...mallServices.map((name, index) => place(`rob-service-${index + 1}`, name, 'services', mallAddress, 'Robinsons Malls tenant directory', robinsonsDirectory, 'Listed in the mall’s services and leisure directory.')),
  place('rob-authorized-lotto', 'Authorized Lotto Agent – Robinsons La Union', 'finance', mallAddress, 'Robinsons Malls tenant directory', robinsonsDirectory),
  place('rob-bpi', 'BPI – Robinsons La Union', 'finance', mallAddress, 'Robinsons Malls tenant directory', robinsonsDirectory),
  place('rob-lorma-lifecheck', 'Lorma LifeCheck – Robinsons La Union', 'health', mallAddress, 'Robinsons Malls tenant directory', robinsonsDirectory),
  ...smRetailers.flatMap((name, index) => name === 'SM Supermarket' ? [] : [
    place(`sm-shop-${index + 1}`, name, name === 'Watsons' ? 'health' : name === 'Ace Hardware' ? 'everyday' : 'shopping', smMall, 'SM Prime official mall opening directory · Oct. 2025', 'https://www.smprime.com/company_releases/sm-prime-opens-89th-mall-sm-city-la-union-to-feature-sandbox-outdoor-space/'),
  ]),
  ...smFoodHall.map((name, index) => place(`sm-food-${index + 1}`, name, 'food', smMall, 'SM Food Hall launch directory · Oct. 2025', 'https://businessmirror.com.ph/2025/10/21/sm-food-hall-opens-at-sm-city-la-union-and-its-a-destination-for-a-new-wave-of-flavors/')),
  place('sm-italiannis', 'Italianni’s – SM City La Union', 'food', smMall, 'Reported open · Feb. 2026', 'https://businessmirror.com.ph/2026/02/14/surfs-up-italiannis-and-tgifridays-are-now-open-in-sm-city-la-union/'),
  place('sm-tgif', 'TGI Fridays – SM City La Union', 'food', smMall, 'Reported open · Feb. 2026', 'https://businessmirror.com.ph/2026/02/14/surfs-up-italiannis-and-tgifridays-are-now-open-in-sm-city-la-union/'),
  place('sm-bdo', 'BDO – SM City La Union', 'finance', smMall, 'SM Prime official mall opening directory', 'https://www.smprime.com/company_releases/sm-prime-opens-89th-mall-sm-city-la-union-to-feature-sandbox-outdoor-space/'),
  ...['Ramen Nagi', 'Chili’s', 'Starbucks', 'The Matcha Tokyo', 'Anytime Fitness', 'FantasyWorld', 'Conti’s Bakeshop and Restaurant', 'Mesa'].map((name, index) =>
    place(`sm-current-${index + 1}`, `${name} – SM City La Union`, name === 'Anytime Fitness' ? 'services' : 'food', smMall, 'SM City La Union social updates · 2026', 'https://www.findglocal.com/PH/San-Fernando/373216039218904/SM-City-La-Union'),
  ),
  place('sm-cinema', 'SM Cinema – SM City La Union', 'services', smMall, 'SM Prime official mall opening directory', 'https://www.smprime.com/company_releases/sm-prime-opens-89th-mall-sm-city-la-union-to-feature-sandbox-outdoor-space/'),
  place('sm-sandbox', 'Sandbox outdoor event space and bike lane', 'parks', smMall, 'SM Prime official mall opening directory', 'https://www.smprime.com/company_releases/sm-prime-opens-89th-mall-sm-city-la-union-to-feature-sandbox-outdoor-space/'),
]

const namedPlaces: PlaceRecord[] = [
  place('city-hall', 'City Government of San Fernando – City Hall', 'government', 'City Hall, City of San Fernando', 'City Government departments directory', cityDepartments),
  place('provincial-capitol', 'La Union Provincial Capitol', 'government', 'Government Center, Sevilla', 'Provincial tourism destination list', tourismSource),
  place('trc-lu', 'DOH Treatment and Rehabilitation Center – La Union', 'health', 'ITRMC Compound, Barangay Parian', 'DOH Treatment and Rehabilitation Center directory', 'https://trclu.doh.gov.ph/directory/', 'Separate entry from ITRMC; DOH facility inside the ITRMC compound.'),
  place('bethany', 'Bethany Hospital', 'health', 'Widdoes Street, Barangay II', 'PhilHealth-accredited hospital list · Sept. 2026', 'https://www.philhealth.gov.ph/partners/providers/facilities/accredited/HOSP_093026.pdf'),
  place('cicosat-hospital', 'CICOSAT Hospital', 'health', 'Barangay Lingsat', 'Google Maps and provider directories', `${maps}${encodeURIComponent('CICOSAT Hospital, Lingsat, San Fernando City, La Union')}`),
  place('lorma-medical', 'Lorma Medical Center', 'health', 'Carlatan', 'PhilHealth-accredited hospital list · Sept. 2026', 'https://www.philhealth.gov.ph/partners/providers/facilities/accredited/HOSP_093026.pdf'),
  place('lumed-hospital', 'La Union Medical Diagnostic Center and Hospital (LUMED)', 'health', 'Ancheta Street corner Bucaneg Street', 'LUMED official history and PhilHealth listing', 'https://lumed.com.ph/about-lumed'),
  place('medisense', 'Medisense Laboratory Center – La Union', 'health', '2nd Floor, Parammata Building, Diversion Road, Biday', 'Current provider directory · reviewed Aug. 2026', 'https://medidocph.online/providers/medisense-laboratory-center-inc-la-union-branch/'),
  place('healthpro', 'HealthPro Multi-Specialty Center – La Union', 'health', 'National Highway, Catbangen', 'Accredited provider directory', 'https://dev.chmf.coop/accredited-providers-2/'),
  ...schoolPlaces,
  place('sm-city', 'SM City La Union', 'shopping', 'Along Diversion Road, Barangay Biday', 'SM Prime official opening release · Oct. 2025', 'https://www.smprime.com/company_releases/sm-prime-opens-89th-mall-sm-city-la-union-to-feature-sandbox-outdoor-space/'),
  place('robinsons-la-union', 'Robinsons La Union', 'shopping', mallAddress, 'Robinsons Malls official directory', robinsonsDirectory),
  place('csi-mall', 'CSI Mall La Union', 'shopping', 'Pagdaraogan-Biday Road', 'Google Maps shopping results', `${maps}${encodeURIComponent('CSI Mall La Union, San Fernando City, La Union')}`),
  place('manna-mall', 'Manna Mall', 'shopping', 'Pagdaraogan-Biday Road, Pagdaraogan', 'Google Maps shopping results; business listing updated Sep. 2026', `${maps}${encodeURIComponent('Manna Mall, San Fernando City, La Union')}`),
  place('san-fernando-market', 'San Fernando Public Market', 'shopping', 'Rizal Avenue', 'Google Maps and current local directory listings', `${maps}${encodeURIComponent('San Fernando Public Market, San Fernando City, La Union')}`),
  place('savemore', 'Savemore Market – San Fernando', 'shopping', 'Rizal Avenue, Barangay IV', 'Watsons store locator at Savemore Market', 'https://www.watsons.com.ph/store/wtcph_1483_EN/watsons-savemore-san-fernando'),
  place('puregold', 'Puregold – La Union', 'shopping', 'Manna Mall, Pagdaraogan-Biday Road', 'Map listing and recent local directory listing', `${maps}${encodeURIComponent('Puregold La Union, San Fernando City, La Union')}`),
  place('robinsons-easymart', 'Robinsons Easymart – Lingsat', 'shopping', 'Manila North Road, Lingsat', 'Recent local travel directory listing', 'https://en.wikivoyage.org/wiki/San_Fernando_(La_Union)'),
  place('sm-supermarket', 'SM Supermarket – SM City La Union', 'shopping', 'SM City La Union, Diversion Road, Biday', 'SM Prime official mall release', 'https://www.smprime.com/company_releases/sm-prime-opens-89th-mall-sm-city-la-union-to-feature-sandbox-outdoor-space/'),
  place('csi-supermarket', 'CSI Supermarket', 'shopping', 'CSI Mall La Union', 'Google Maps and business directory listings', `${maps}${encodeURIComponent('CSI Supermarket, San Fernando City, La Union')}`),
  place('sillag-park', 'SILLAG Park', 'parks', 'Poro Point Baywalk', 'Philippine Information Agency · opened June 12, 2026', 'https://pia.gov.ph/news/families-gain-new-space-for-bonding-fitness-as-sillag-park-opens-in-la-union/'),
  place('plaza', 'San Fernando City Plaza', 'parks', 'City center', 'City Government life and tourism page', 'https://www.sanfernandocity.gov.ph/life-in-csf/'),
  place('people-park', 'City Fountain and People’s Park', 'parks', 'City center', 'City Government life and tourism page', 'https://www.sanfernandocity.gov.ph/life-in-csf/'),
  place('freedom-park', 'Freedom Park / Heroes Hill', 'parks', 'City of San Fernando', 'Provincial tourism destination list', tourismSource),
  place('poro-baywalk', 'Poro Point Baywalk', 'parks', 'Poro Point Freeport Zone', 'Poro Point Management Corporation Baywalk page', 'https://poropointfreeport.gov.ph/new/poro-point-baywalk/'),
  place('botanical-garden', 'La Union Botanical and Zoological Garden', 'parks', 'Barangay Cadaclan', 'Provincial tourism destination list', tourismSource),
  place('airport', 'Poro Point San Fernando Airport', 'transport', 'California Avenue, Barangay Canaoay', 'La Union provincial agency directory · Feb. 27, 2026', agencyDirectory),
  place('seaport', 'San Fernando International Seaport', 'transport', 'Poro Point Freeport Zone', 'Poro Point Management Corporation seaport overview', 'https://poropointfreeport.gov.ph/investment/san-fernando-international-seaport/'),
  place('city-plaza-hotel', 'Plaza Hotel', 'stay', 'City center, San Fernando City', 'Google Hotels listing', 'https://www.google.com/travel/hotels/entity/ChcIutOGtvLN6uxxGgsvZy8xdGhjcHdkdhAB'),
  place('travelite', 'Travelite Express Hotel', 'stay', 'San Fernando City, La Union', 'Google Hotels listing', 'https://www.google.com/travel/hotels/entity/CgsIie2euvHg38qfARAB?gsas=1'),
  place('blue-marlin', 'La Union Blue Marlin Resort', 'stay', 'Airport Road, San Fernando City', 'Google Hotels listing', 'https://www.google.com/travel/hotels/entity/ChkI5_n_5biqgM8wGg0vZy8xMWNsbWY4dG1tEAE?gsas=1'),
  place('aureo', 'Aureo La Union', 'stay', 'Munar Residence Road, San Fernando City', 'Google Hotels listing', 'https://www.google.com/travel/hotels/entity/ChkI9YuKu7nm4rp9Gg0vZy8xMWM0MjhwNjkxEAE?gsas=1'),
  place('jv-resort', 'J&V Hotel and Resort', 'stay', 'Purok 5, Barangay Sevilla', 'Google Hotels listing', 'https://www.google.com/travel/hotels/entity/ChoInMPWw9WRyuDSARoNL2cvMTFycGQ5emJkeBAB?gsas=1'),
  place('location-180', 'Location One Eighty', 'stay', 'Carlatan', 'Google Hotels listing', 'https://www.google.com/travel/hotels/entity/ChkIheTBweS0ku5sGg0vZy8xMWcyNHkweDV2EAE?gsas=1'),
  place('thunderbird', 'Thunderbird Resorts and Casinos Poro Point', 'stay', 'Poro Point Freeport Zone', 'Google Hotels listing', 'https://www.google.com/travel/hotels/entity/CgoIqeaItYPZ15x2EAE?gsas=1'),
  place('sfc-cathedral', 'Cathedral Parish of Saint William the Hermit', 'faith', 'City center', 'Google Maps listing and provincial tourism references', `${maps}${encodeURIComponent('Cathedral Parish of Saint William the Hermit San Fernando La Union')}`),
  place('ma-cho', 'Ma-Cho Temple', 'faith', 'Barangay I', 'Provincial tourism destination list', tourismSource),
  place('friendship-pagoda', 'Filipino-Chinese Friendship Pagoda', 'faith', 'City of San Fernando', 'Provincial tourism destination list', tourismSource),
  place('pindangan-ruins', 'Pindangan Ruins', 'faith', 'Barangay Parian', 'City Government destination page', 'https://www.sanfernandocity.gov.ph/pindangan-ruins/'),
  place('partas-terminal', 'Partas Bus Terminal – San Fernando', 'transport', 'San Fernando City, La Union', 'Google Maps search; confirm route and terminal before travel', `${maps}${encodeURIComponent('Partas Bus Terminal San Fernando La Union')}`),
  place('city-bus-terminals', 'Other intercity bus terminals', 'transport', 'San Fernando City, La Union', 'Live Google Maps category search', `${maps}${encodeURIComponent('bus terminals San Fernando City La Union')}`, 'Use the current map results to compare operators and confirm boarding points.'),
  place('bacsil-ridge', 'Bacsil Ridge Monument and Viewdeck', 'attractions', 'Barangay Bacsil', 'Provincial tourism destination list', tourismSource),
  place('carrile-tower', 'Car-rile Tower (Moro Watchtower)', 'attractions', 'City of San Fernando', 'Provincial tourism destination list', tourismSource),
  place('christ-redeemer', 'Christ the Redeemer', 'attractions', 'City of San Fernando', 'Provincial tourism destination list', tourismSource),
  place('science-centrum', 'La Union Science Centrum and Museum', 'attractions', 'Barangay Cadaclan', 'Provincial tourism destination list', tourismSource),
  place('poro-lighthouse', 'Poro Point Lighthouse', 'attractions', 'Poro Point Freeport Zone', 'Provincial tourism destination list', tourismSource),
  place('city-beach-coast', 'San Fernando Beach Coast', 'attractions', 'Coastal barangays, City of San Fernando', 'Provincial tourism destination list', tourismSource),
  place('carlatan-surf', 'Carlatan Surfing Area', 'parks', 'Barangay Carlatan', 'Provincial tourism destination list', tourismSource),
  place('kasay-sanctuary', 'Kasay Marine Sanctuary', 'parks', 'Barangay Kasay', 'Provincial tourism destination list', tourismSource),
  place('lingsat-sanctuary', 'Lingsat Marine Sanctuary', 'parks', 'Barangay Lingsat', 'Provincial tourism destination list', tourismSource),
  place('poro-mpa', 'Poro Marine Protected Area', 'parks', 'Poro Point coastal area', 'Provincial tourism destination list', tourismSource),
  place('city-offices-link', 'City government departments and offices', 'government', 'San Fernando City Hall', 'Official city departments directory', cityDepartments, 'Open the linked directory for individual city departments and service contacts.'),
  place('barangay-halls-link', 'All 59 barangay halls and profiles', 'government', 'All city barangays', 'Better San Fernando barangay directory', '/government/barangays', 'Open the city’s interactive barangay directory for each barangay and its profile.'),
  place('ev-charging', 'EV charging and fuel stops', 'everyday', 'San Fernando City, La Union', 'Live Google Maps category search', `${maps}${encodeURIComponent('EV charging stations gas stations San Fernando City La Union')}`),
  place('banking-map', 'Banks, ATMs and remittance centers', 'finance', 'San Fernando City, La Union', 'Live Google Maps category search', `${maps}${encodeURIComponent('banks ATMs remittance San Fernando City La Union')}`),
  place('restaurants-map', 'More restaurants and fast-food branches', 'food', 'San Fernando City, La Union', 'Live Google Maps category search', `${maps}${encodeURIComponent('restaurants fast food San Fernando City La Union')}`),
  place('pharmacies-map', 'Pharmacies and drugstores', 'health', 'San Fernando City, La Union', 'Live Google Maps category search', `${maps}${encodeURIComponent('pharmacies drugstores San Fernando City La Union')}`),
  place('schools-map', 'Public and private elementary and high schools', 'education', 'San Fernando City, La Union', 'DepEd Region 1 school registry and Google Maps', 'https://deped.ro1apps.com/schoolreg', 'The 2026 provincial list covers tertiary schools; use the DepEd registry for basic education schools.'),
  place('city-clinics-map', 'Clinics, dentists and diagnostic centers', 'health', 'San Fernando City, La Union', 'Live Google Maps category search', `${maps}${encodeURIComponent('clinics dentists diagnostic centers San Fernando City La Union')}`),
  place('city-hotel-map', 'More hotels, inns and homestays', 'stay', 'San Fernando City, La Union', 'Live Google Maps category search', `${maps}${encodeURIComponent('hotels inns homestays San Fernando City La Union')}`),
  place('city-services-map', 'More personal and household services', 'services', 'San Fernando City, La Union', 'Live Google Maps category search', `${maps}${encodeURIComponent('salons gyms repair services San Fernando City La Union')}`),
  place('city-everyday-map', 'Post, internet, utilities and essential services', 'everyday', 'San Fernando City, La Union', 'Live Google Maps category search', `${maps}${encodeURIComponent('post office internet providers utilities San Fernando City La Union')}`),
]

const placeByIdentity = new Map<string, PlaceRecord>()
for (const item of [...agencyPlaces, ...cityOfficePlaces, ...barangayHallPlaces, ...tourismPlaces, ...tenantPlaces, ...namedPlaces]) {
  placeByIdentity.set(`${normalizePlaceName(item.name)}|${normalizePlaceName(item.address)}|${item.category}`, item)
}

export const places: PlaceRecord[] = [...placeByIdentity.values()]

function normalizePlaceName(name: string) {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

export function googleMapsSearch(place: Pick<PlaceRecord, 'name' | 'address'>) {
  return `${maps}${encodeURIComponent(`${place.name}, ${place.address}, San Fernando City, La Union`)}`
}

export function categoryMapsSearch(category?: PlaceCategory) {
  const query = category
    ? `${category.mapQuery} in San Fernando City, La Union, Philippines`
    : 'places and businesses in San Fernando City, La Union, Philippines'
  return `${maps}${encodeURIComponent(query)}`
}
