export type ServiceCategorySlug =
  | 'business' | 'taxes' | 'certificates' | 'health' | 'social' | 'agriculture'
  | 'infrastructure' | 'environment' | 'safety' | 'employment' | 'youth' | 'governance';

export interface Service {
  slug: string;
  title: string;
  office: string;
  officeCode: string;
  category: ServiceCategorySlug;
  classification: string;
  transactionType: string;
  whoMayAvail: string;
  description: string;
  summary: string;
  fees: string;
  pdfs: string[];
  sourceUrl: string;
  lastVerified: string;
  dataNote?: string;
}

export interface ServiceCategory {
  slug: ServiceCategorySlug;
  name: string;
  shortName: string;
  icon: string;
  description: string;
  examples: string[];
  serviceCount: number;
}

export interface Office {
  slug: string;
  name: string;
  code: string | null;
  sector: string;
  head: string;
  position: string;
  contact: string;
  email: string;
  address: string;
  locals: string;
  serviceCount: number;
  ccUrl: string;
  sourceUrl: string;
}

export interface Barangay {
  slug: string;
  name: string;
  district: string;
  districtNumber: number;
  population2024: number;
  population2020: number;
  population2015: number;
  share: string;
  change: string;
  apgr: string;
  rank: number;
  poblacion: boolean;
  punongBarangay: string;
  kagawads: string[];
  skChairperson: string | null;
  sourceUrl: string;
  dilgSourceUrl: string;
}

export interface Official {
  slug: string;
  name: string;
  role: string;
  photo: string | null;
  bioUrl: string;
  note: string;
}

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  sourceUrl: string;
}

export interface BudgetDoc {
  title: string;
  url: string;
  category: string;
  description: string;
}

export interface Hotline {
  label: string;
  numbers: string[];
  email?: string;
  note: string;
  primary?: boolean;
}

export interface Faq {
  q: string;
  a: string;
  link: string;
  source: string;
}

export interface CityStats {
  label: string;
  value: string;
  note: string;
}

export interface Source {
  name: string;
  url: string;
  note: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  text: string;
}

export interface CityFact {
  label: string;
  value: string;
  note?: string;
}

export interface FactGroup {
  title: string;
  facts: CityFact[];
}

export interface OnlineService {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  url: string;
  category: string;
  note?: string;
}

export interface BidResult {
  date: string;
  reference: string;
  title: string;
  url: string;
}

export interface BidBulletin {
  label: string;
  url: string;
}
