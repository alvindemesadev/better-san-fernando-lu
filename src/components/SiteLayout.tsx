import {
  ArrowUpRight,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import logoLight from '../assets/logo-light.png'
import { categories } from '../data/categories'
import { city } from '../data/city'
import { telHref } from '../lib/utils'
import { PageFallback } from './PageFallback'
import { ScrollProgress } from './ScrollProgress'

const CommandPalette = lazy(() =>
  import('./CommandPalette').then((module) => ({ default: module.CommandPalette })),
)

const primaryNav = [
  { label: 'Services', href: '/services' },
  { label: 'Government', href: '/government' },
  { label: 'City', href: '/city' },
  { label: 'Transparency', href: '/transparency' },
  { label: 'News', href: '/news' },
  { label: 'About', href: '/about' },
]

function navClass({ isActive }: { isActive: boolean }) {
  return `inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-600 hover:bg-surface hover:text-ink-950'
  }`
}

export function SiteLayout() {
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [paletteLoaded, setPaletteLoaded] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const menuOpen = menuPath === location.pathname

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteLoaded(true)
        setPaletteOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!menuOpen) return

    function closeMenuOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuPath(null)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', closeMenuOnEscape)
    return () => window.removeEventListener('keydown', closeMenuOnEscape)
  }, [menuOpen])

  function openPalette() {
    setPaletteLoaded(true)
    setPaletteOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <a
        href="#main-content"
        className="sr-only z-[70] rounded-lg bg-white px-4 py-2 font-semibold text-brand-700 shadow-lg focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <div className="bg-ink-950 text-white">
        <div className="container-page flex min-h-9 flex-wrap items-center justify-between gap-x-6 gap-y-1 py-1.5 text-[11px] sm:text-xs">
          <p className="inline-flex items-center gap-1.5 text-white/65">
            <ShieldCheck aria-hidden="true" className="size-3.5 text-accent" />
            An independent civic project, not the official city website
          </p>
          <div className="flex items-center gap-4">
            <a
              href={city.website}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-white/70 transition hover:text-white"
            >
              Official city website
              <ExternalLink aria-hidden="true" className="size-3" />
            </a>
            <a href="tel:911" className="font-bold text-accent transition hover:text-white">
              Emergency: 911
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-line bg-white">
        <div className="container-page flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
          <Link to="/" viewTransition className="group flex min-w-0 items-center">
            <img
              src={logo}
              alt="Better San Fernando"
              width="960"
              height="199"
              className="h-9 w-auto shrink-0 sm:h-10"
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {primaryNav.map((item) => (
              <NavLink key={item.href} to={item.href} viewTransition className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={openPalette}
              aria-label="Search this site (Ctrl+K)"
              title="Search (Ctrl+K)"
              className="inline-flex size-11 items-center justify-center rounded-xl text-ink-600 transition hover:bg-surface hover:text-brand-700"
            >
              <Search aria-hidden="true" className="size-5" />
            </button>
            <Link
              to="/government/hotlines"
              viewTransition
              className="hidden rounded-xl border border-line px-3.5 py-2 text-xs font-bold text-ink-700 transition hover:border-brand-200 hover:text-brand-700 sm:inline-flex"
            >
              Hotlines
            </Link>
            <button
              type="button"
              ref={menuButtonRef}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuPath(menuOpen ? null : location.pathname)}
              className="inline-flex size-11 items-center justify-center rounded-xl text-ink-700 transition hover:bg-surface lg:hidden"
            >
              {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {menuOpen ? (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-6.5rem)] overflow-y-auto border-t border-line bg-white shadow-xl lg:hidden"
            >
              <nav aria-label="Mobile navigation" className="container-page grid gap-1 py-4">
                {primaryNav.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    viewTransition
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-[15px] font-semibold transition ${
                        isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-surface'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
                <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-4">
                  <Link
                    to="/government/hotlines"
                    viewTransition
                    className="rounded-xl bg-surface px-4 py-3 text-sm font-semibold text-ink-700"
                  >
                    Emergency hotlines
                  </Link>
                  <Link
                    to="/search"
                    viewTransition
                    className="rounded-xl bg-surface px-4 py-3 text-sm font-semibold text-ink-700"
                  >
                    Search the site
                  </Link>
                </div>
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main id="main-content" tabIndex={-1} className="flex-1 scroll-mt-24">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>

      {paletteLoaded ? (
        <Suspense fallback={null}>
          <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
        </Suspense>
      ) : null}

      <footer className="mt-auto bg-ink-950 text-white">
        <div className="container-page py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1.1fr]">
            <div>
              <div>
                <img
                  src={logoLight}
                  alt="Better San Fernando"
                  width="960"
                  height="199"
                  className="h-10 w-auto"
                />
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
                  La Union · Civic guide
                </p>
              </div>
              <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
                A clearer, independent guide to city services, public officials, barangays, and public money.
                Built with open data and links to official sources.
              </p>
              <a
                href={city.website}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/15"
              >
                Visit the official city website
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Explore</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  ['All services', '/services'],
                  ['Online services', '/online-services'],
                  ['City government', '/government'],
                  ['City officials', '/government/officials'],
                  ['Barangays', '/government/barangays'],
                  ['Ordinances and executive orders', '/government/legislation'],
                  ['City profile', '/city'],
                  ['Life and tourism', '/city/life'],
                  ['Business and investment', '/city/business'],
                  ['Transparency', '/transparency'],
                  ['Infrastructure projects', '/transparency/projects'],
                  ['News', '/news'],
                  ['News archive', '/news/archive'],
                ].map(([label, href]) => (
                  <li key={href}>
                    <Link to={href} viewTransition className="text-white/70 transition hover:text-white">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">Service categories</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {categories.slice(0, 6).map((category) => (
                  <li key={category.slug}>
                    <Link
                      to={`/services/${category.slug}`}
                      viewTransition
                      className="text-white/70 transition hover:text-white"
                    >
                      {category.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">City Hall</h2>
              <ul className="mt-4 space-y-3 text-sm text-white/70">
                <li className="flex gap-2.5">
                  <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                  <span>{city.address}</span>
                </li>
                <li className="flex gap-2.5">
                  <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                  <a href={telHref(city.trunkline)} className="transition hover:text-white">
                    {city.trunkline}
                  </a>
                </li>
                <li className="flex gap-2.5">
                  <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                  <a href={`mailto:${city.email}`} className="break-all transition hover:text-white">
                    {city.email}
                  </a>
                </li>
                <li className="flex gap-2.5">
                  <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-300" />
                  <span>{city.hours}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 lg:flex-row lg:items-center lg:justify-between">
            <p>
              © 2026 Better San Fernando. Independent civic project. Data last verified October 21, 2026.
            </p>
            <nav aria-label="Legal and site links" className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                ['Sitemap', '/sitemap'],
                ['Accessibility', '/accessibility'],
                ['Privacy', '/privacy'],
                ['Terms', '/terms'],
                ['Contact', '/contact'],
              ].map(([label, href]) => (
                <Link key={href} to={href} viewTransition className="transition hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}
