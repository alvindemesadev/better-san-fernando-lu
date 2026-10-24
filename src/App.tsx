import { MotionConfig } from 'motion/react'
import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { SiteLayout } from './components/SiteLayout'
import { SmoothScroll } from './components/SmoothScroll'
import { LanguageProvider } from './i18n/language'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'

const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({ default: module.AboutPage })))
const AccessibilityPage = lazy(() =>
  import('./pages/AccessibilityPage').then((module) => ({ default: module.AccessibilityPage })),
)
const BarangayDetailPage = lazy(() =>
  import('./pages/BarangayDetailPage').then((module) => ({ default: module.BarangayDetailPage })),
)
const BarangaysPage = lazy(() =>
  import('./pages/BarangaysPage').then((module) => ({ default: module.BarangaysPage })),
)
const BudgetPage = lazy(() => import('./pages/BudgetPage').then((module) => ({ default: module.BudgetPage })))
const BusinessPage = lazy(() => import('./pages/BusinessPage').then((module) => ({ default: module.BusinessPage })))
const CityProfilePage = lazy(() =>
  import('./pages/CityProfilePage').then((module) => ({ default: module.CityProfilePage })),
)
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({ default: module.ContactPage })))
const FaqPage = lazy(() => import('./pages/FaqPage').then((module) => ({ default: module.FaqPage })))
const GovernmentPage = lazy(() =>
  import('./pages/GovernmentPage').then((module) => ({ default: module.GovernmentPage })),
)
const HotlinesPage = lazy(() =>
  import('./pages/HotlinesPage').then((module) => ({ default: module.HotlinesPage })),
)
const LegislationPage = lazy(() =>
  import('./pages/LegislationPage').then((module) => ({ default: module.LegislationPage })),
)
const LifePage = lazy(() => import('./pages/LifePage').then((module) => ({ default: module.LifePage })))
const NewsDetailPage = lazy(() =>
  import('./pages/NewsDetailPage').then((module) => ({ default: module.NewsDetailPage })),
)
const NewsArchivePage = lazy(() =>
  import('./pages/NewsArchivePage').then((module) => ({ default: module.NewsArchivePage })),
)
const NewsPage = lazy(() => import('./pages/NewsPage').then((module) => ({ default: module.NewsPage })))
const OfficeDetailPage = lazy(() =>
  import('./pages/OfficeDetailPage').then((module) => ({ default: module.OfficeDetailPage })),
)
const OfficesPage = lazy(() => import('./pages/OfficesPage').then((module) => ({ default: module.OfficesPage })))
const OfficialsPage = lazy(() =>
  import('./pages/OfficialsPage').then((module) => ({ default: module.OfficialsPage })),
)
const OnlineServicesPage = lazy(() =>
  import('./pages/OnlineServicesPage').then((module) => ({ default: module.OnlineServicesPage })),
)
const OpenDataPage = lazy(() =>
  import('./pages/OpenDataPage').then((module) => ({ default: module.OpenDataPage })),
)
const PlacesPage = lazy(() => import('./pages/PlacesPage').then((module) => ({ default: module.PlacesPage })))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((module) => ({ default: module.PrivacyPage })))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })))
const ProcurementPage = lazy(() =>
  import('./pages/ProcurementPage').then((module) => ({ default: module.ProcurementPage })),
)
const SearchPage = lazy(() => import('./pages/SearchPage').then((module) => ({ default: module.SearchPage })))
const ServiceCategoryPage = lazy(() =>
  import('./pages/ServiceCategoryPage').then((module) => ({ default: module.ServiceCategoryPage })),
)
const ServiceDetailPage = lazy(() =>
  import('./pages/ServiceDetailPage').then((module) => ({ default: module.ServiceDetailPage })),
)
const ServicesPage = lazy(() => import('./pages/ServicesPage').then((module) => ({ default: module.ServicesPage })))
const SitemapPage = lazy(() => import('./pages/SitemapPage').then((module) => ({ default: module.SitemapPage })))
const TermsPage = lazy(() => import('./pages/TermsPage').then((module) => ({ default: module.TermsPage })))
const TransparencyPage = lazy(() =>
  import('./pages/TransparencyPage').then((module) => ({ default: module.TransparencyPage })),
)

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <SmoothScroll>
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route element={<SiteLayout />}>
                <Route index element={<HomePage />} />
                <Route path="services" element={<ServicesPage />} />
                <Route path="services/:category" element={<ServiceCategoryPage />} />
                <Route path="services/:category/:slug" element={<ServiceDetailPage />} />
                <Route path="government" element={<GovernmentPage />} />
                <Route path="government/officials" element={<OfficialsPage />} />
                <Route path="government/offices" element={<OfficesPage />} />
                <Route path="government/offices/:slug" element={<OfficeDetailPage />} />
                <Route path="government/barangays" element={<BarangaysPage />} />
                <Route path="government/barangays/:slug" element={<BarangayDetailPage />} />
                <Route path="government/hotlines" element={<HotlinesPage />} />
                <Route path="government/legislation" element={<LegislationPage />} />
                <Route path="city" element={<CityProfilePage />} />
                <Route path="city/life" element={<LifePage />} />
                <Route path="city/places" element={<PlacesPage />} />
                <Route path="city/business" element={<BusinessPage />} />
                <Route path="online-services" element={<OnlineServicesPage />} />
                <Route path="transparency" element={<TransparencyPage />} />
                <Route path="transparency/budget" element={<BudgetPage />} />
                <Route path="transparency/procurement" element={<ProcurementPage />} />
                <Route path="transparency/open-data" element={<OpenDataPage />} />
                <Route path="transparency/projects" element={<ProjectsPage />} />
                <Route path="news" element={<NewsPage />} />
                <Route path="news/archive" element={<NewsArchivePage />} />
                <Route path="news/:slug" element={<NewsDetailPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="sitemap" element={<SitemapPage />} />
                <Route path="accessibility" element={<AccessibilityPage />} />
                <Route path="privacy" element={<PrivacyPage />} />
                <Route path="terms" element={<TermsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SmoothScroll>
      </LanguageProvider>
    </MotionConfig>
  )
}
