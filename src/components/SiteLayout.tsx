import {
  Accessibility,
  ArrowUpRight,
  Archive,
  Briefcase,
  BriefcaseBusiness,
  Building2,
  ChartNoAxesCombined,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock,
  ExternalLink,
  FileBadge,
  FileText,
  GraduationCap,
  HandHeart,
  HardHat,
  HeartPulse,
  Landmark,
  Leaf,
  Mail,
  MapPin,
  MapPinned,
  Menu,
  Newspaper,
  Phone,
  ReceiptText,
  ScrollText,
  Search,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Sprout,
  UsersRound,
  X,
  type LucideIcon,
} from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import logoLight from '../assets/logo-light.png'
import { categories } from '../data/categories'
import { city } from '../data/city'
import { telHref } from '../lib/utils'
import { BackToTopButton } from './BackToTopButton'
import { PageFallback } from './PageFallback'
import { ScrollProgress } from './ScrollProgress'

const CommandPalette = lazy(() =>
  import('./CommandPalette').then((module) => ({ default: module.CommandPalette })),
)

type MenuLink = { label: string; href: string; description: string; Icon: LucideIcon }
type MenuSection = { title: string; items: MenuLink[] }
type PrimaryNavItem = {
  label: string
  href: string
  activePaths?: string[]
  sections: MenuSection[]
}

const menuLink = (label: string, href: string, description: string, Icon: LucideIcon): MenuLink => ({
  label,
  href,
  description,
  Icon,
})

const categoryIcons: Record<string, LucideIcon> = {
  Briefcase,
  ReceiptText,
  FileBadge,
  HeartPulse,
  HandHeart,
  Sprout,
  HardHat,
  Leaf,
  ShieldAlert,
  BriefcaseBusiness,
  GraduationCap,
  Landmark,
}

const serviceCategories = categories.map((category) =>
  menuLink(
    category.name,
    `/services/${category.slug}`,
    category.description,
    categoryIcons[category.icon] ?? Briefcase,
  ),
)

const primaryNav: PrimaryNavItem[] = [
  {
    label: 'Services',
    href: '/services',
    sections: [
      { title: 'Browse by need', items: serviceCategories.slice(0, 6) },
      {
        title: 'More categories',
        items: [
          ...serviceCategories.slice(6),
          menuLink('Online services', '/online-services', 'Start or complete city services online.', Clock),
        ],
      },
    ],
  },
  {
    label: 'Government',
    href: '/government',
    sections: [
      {
        title: 'People and places',
        items: [
          menuLink('City officials', '/government/officials', 'Meet elected officials and city leaders.', UsersRound),
          menuLink('City offices', '/government/offices', 'Find departments, services, and office contacts.', Building2),
          menuLink('Barangays', '/government/barangays', 'Browse barangay profiles, officials, and districts.', MapPinned),
        ],
      },
      {
        title: 'Public information',
        items: [
          menuLink('Emergency hotlines', '/government/hotlines', 'Find city and national emergency contacts.', Siren),
          menuLink('Ordinances and orders', '/government/legislation', 'Browse published local laws and executive orders.', ScrollText),
        ],
      },
    ],
  },
  {
    label: 'City',
    href: '/city',
    sections: [
      {
        title: 'Discover San Fernando',
        items: [
          menuLink('City profile', '/city', 'Explore the city’s profile, people, and local context.', Landmark),
          menuLink('Life and tourism', '/city/life', 'Explore local places, culture, and things to do.', MapPinned),
          menuLink('Places directory', '/city/places', 'Find agencies, health facilities, shopping, food, attractions, and services.', MapPinned),
        ],
      },
      {
        title: 'Build and invest',
        items: [
          menuLink('Business and investment', '/city/business', 'Review business guidance, opportunities, and local costs.', BriefcaseBusiness),
        ],
      },
    ],
  },
  {
    label: 'Transparency',
    href: '/transparency',
    sections: [
      {
        title: 'Public funds',
        items: [
          menuLink('Budget', '/transparency/budget', 'Review published city budget information.', ChartNoAxesCombined),
          menuLink('Procurement', '/transparency/procurement', 'Browse bid notices and procurement results.', FileText),
        ],
      },
      {
        title: 'Public records',
        items: [
          menuLink('Open data', '/transparency/open-data', 'Find datasets and source documents.', Archive),
          menuLink('Projects', '/transparency/projects', 'See published infrastructure and city projects.', Building2),
        ],
      },
    ],
  },
  {
    label: 'News',
    href: '/news',
    sections: [
      {
        title: 'City Hall updates',
        items: [
          menuLink('Latest updates', '/news', 'Read recent announcements linked to their official sources.', Newspaper),
          menuLink('News archive', '/news/archive', 'Browse older announcements and stories.', Archive),
        ],
      },
    ],
  },
  {
    label: 'About',
    href: '/about',
    activePaths: ['/contact', '/faq', '/accessibility', '/privacy', '/terms', '/sitemap'],
    sections: [
      {
        title: 'About this guide',
        items: [
          menuLink('About the project', '/about', 'Learn how this independent civic guide is put together.', ShieldCheck),
          menuLink('Contact', '/contact', 'Send feedback or report an issue with the guide.', Mail),
        ],
      },
      {
        title: 'Help and access',
        items: [
          menuLink('Frequently asked questions', '/faq', 'Get answers about using the site and its information.', CircleHelp),
          menuLink('Accessibility', '/accessibility', 'Learn about keyboard access and inclusive site features.', Accessibility),
        ],
      },
    ],
  },
]

function isNavItemActive(item: PrimaryNavItem, pathname: string) {
  return (
    pathname === item.href ||
    pathname.startsWith(`${item.href}/`) ||
    item.activePaths?.some((path) => pathname === path || pathname.startsWith(`${path}/`))
  )
}

function MenuLinkTile({ item, onNavigate }: { item: MenuLink; onNavigate: () => void }) {
  const Icon = item.Icon

  return (
    <Link
      to={item.href}
      viewTransition
      onClick={onNavigate}
      className="group/menu-link flex min-w-0 gap-3 rounded-xl p-2.5 transition hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line bg-white text-brand-700 shadow-sm transition group-hover/menu-link:border-brand-200 group-hover/menu-link:bg-brand-50">
        <Icon aria-hidden="true" className="size-[18px]" />
      </span>
      <span className="min-w-0 flex-1 py-0.5">
        <span className="flex items-center justify-between gap-2 text-[13px] font-bold leading-5 text-ink-900">
          {item.label}
          <ChevronRight aria-hidden="true" className="size-3.5 shrink-0 text-ink-400 opacity-0 transition group-hover/menu-link:translate-x-0.5 group-hover/menu-link:opacity-100" />
        </span>
        <span className="mt-0.5 block line-clamp-2 text-xs leading-[1.4] text-ink-500">{item.description}</span>
      </span>
    </Link>
  )
}

function FooterGroup({ title, children }: { title: string; children: ReactNode }) {
  const [desktopOpen, setDesktopOpen] = useState(false)

  useEffect(() => {
    const breakpoint = window.matchMedia('(min-width: 1024px)')
    const updateOpenState = () => setDesktopOpen(breakpoint.matches)
    updateOpenState()
    breakpoint.addEventListener('change', updateOpenState)
    return () => breakpoint.removeEventListener('change', updateOpenState)
  }, [])

  return (
    <details
      open={desktopOpen}
      className="group/footer rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
    >
      <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.16em] text-white/60 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300 [&::-webkit-details-marker]:hidden lg:min-h-0 lg:cursor-default">
        {title}
        <ChevronDown
          aria-hidden="true"
          className="size-4 shrink-0 text-white/50 transition group-open/footer:rotate-180 lg:hidden"
        />
      </summary>
      <div className="mt-3 lg:mt-4">{children}</div>
    </details>
  )
}

export function SiteLayout() {
  const [menuPath, setMenuPath] = useState<string | null>(null)
  const [mobileSection, setMobileSection] = useState('')
  const [mobileMenuTop, setMobileMenuTop] = useState(0)
  const [desktopMenu, setDesktopMenu] = useState<string | null>(null)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [paletteLoaded, setPaletteLoaded] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const desktopMenuRef = useRef<HTMLDivElement>(null)
  const desktopTriggerRef = useRef<HTMLButtonElement>(null)
  const location = useLocation()
  const menuOpen = menuPath === location.pathname
  const activeNavItem = primaryNav.find((item) => item.label === desktopMenu)
  const menuPanelWidth = activeNavItem?.sections.length === 1
    ? 'w-[min(620px,calc(100vw-2rem))]'
    : 'w-[min(860px,calc(100vw-2rem))]'

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

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    const updateMenuTop = () => setMobileMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 0)
    document.body.style.overflow = 'hidden'
    updateMenuTop()
    window.addEventListener('resize', updateMenuTop)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('resize', updateMenuTop)
    }
  }, [menuOpen])

  useEffect(() => {
    if (!desktopMenu) return

    function closeOnOutsidePointer(event: PointerEvent) {
      if (!desktopMenuRef.current?.contains(event.target as Node)) setDesktopMenu(null)
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setDesktopMenu(null)
        desktopTriggerRef.current?.focus()
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePointer)
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsidePointer)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [desktopMenu])

  useEffect(() => setDesktopMenu(null), [location.pathname])

  function closeNavigation() {
    setDesktopMenu(null)
    setMenuPath(null)
  }

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

      <header ref={headerRef} className="sticky top-0 z-50 border-b border-line bg-white">
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

          <div
            ref={desktopMenuRef}
            onMouseLeave={() => setDesktopMenu(null)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDesktopMenu(null)
            }}
            className="relative hidden items-center lg:flex"
          >
            <nav aria-label="Main navigation" className="flex items-center gap-0.5">
              {primaryNav.map((item) => {
                const expanded = desktopMenu === item.label
                const current = isNavItemActive(item, location.pathname)

                return (
                  <button
                    key={item.href}
                    type="button"
                    ref={expanded ? desktopTriggerRef : undefined}
                    aria-expanded={expanded}
                    aria-controls={expanded ? `desktop-menu-${item.label.toLowerCase()}` : undefined}
                    onMouseEnter={() => setDesktopMenu(item.label)}
                    onFocus={(event) => {
                      if (event.currentTarget.matches(':focus-visible')) setDesktopMenu(item.label)
                    }}
                    onClick={(event) => {
                      desktopTriggerRef.current = event.currentTarget
                      const supportsHover = window.matchMedia('(hover: hover)').matches
                      setDesktopMenu(expanded && !supportsHover ? null : item.label)
                    }}
                    className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-2 text-[13px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 ${
                      expanded || current
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-ink-600 hover:bg-surface hover:text-ink-950'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden="true"
                      className={`size-3.5 text-ink-400 transition ${expanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                )
              })}
            </nav>

            <AnimatePresence initial={false}>
              {activeNavItem ? (
                <motion.div
                  id={`desktop-menu-${activeNavItem.label.toLowerCase()}`}
                  initial={{ opacity: 0, y: -6, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.99 }}
                  transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className={`absolute left-1/2 top-[calc(100%+1.125rem)] z-[60] ${menuPanelWidth} -translate-x-1/2 rounded-2xl border border-line bg-white shadow-[0_24px_70px_-24px_rgba(15,23,42,0.32)]`}
                >
                  <div aria-hidden="true" className="absolute inset-x-0 -top-[1.125rem] h-[1.125rem]" />
                  <div className="max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-2xl">
                    <div className="p-3 sm:p-5">
                      <div className="mb-3 flex items-center justify-between gap-3 border-b border-line px-2 pb-3">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-ink-400">
                            Explore {activeNavItem.label}
                          </p>
                          <Link
                            to={activeNavItem.href}
                            viewTransition
                            onClick={closeNavigation}
                            className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-brand-700 hover:text-brand-800 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-brand-500"
                          >
                            View {activeNavItem.label.toLowerCase()} overview
                            <ChevronRight aria-hidden="true" className="size-4" />
                          </Link>
                        </div>
                        <button
                          type="button"
                          onClick={() => setDesktopMenu(null)}
                          aria-label={`Close ${activeNavItem.label} menu`}
                          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-ink-500 transition hover:bg-surface hover:text-ink-900 focus-visible:outline-2 focus-visible:outline-brand-500"
                        >
                          <X aria-hidden="true" className="size-4" />
                        </button>
                      </div>
                      <div className="grid gap-x-4 gap-y-5 md:grid-cols-2">
                        {activeNavItem.sections.map((section) => (
                          <section key={section.title}>
                            <h2 className="px-2.5 pb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400">
                              {section.title}
                            </h2>
                            <div className="grid gap-0.5">
                              {section.items.map((item) => (
                                <MenuLinkTile key={item.href} item={item} onNavigate={closeNavigation} />
                              ))}
                            </div>
                          </section>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

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
              onClick={() => {
                if (menuOpen) {
                  closeNavigation()
                } else {
                  setMobileMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 0)
                  setMobileSection('')
                  setMenuPath(location.pathname)
                }
              }}
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
              style={{ top: mobileMenuTop }}
              className="fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-hidden border-t border-line bg-white shadow-xl lg:hidden"
            >
              <nav aria-label="Mobile navigation" className="container-page min-h-0 flex-1 overflow-y-auto overscroll-contain py-3">
                <div className="divide-y divide-line border-b border-line">
                  {primaryNav.map((item) => {
                    const expanded = mobileSection === item.label
                    const current = isNavItemActive(item, location.pathname)

                    return (
                      <section key={item.href}>
                        <button
                          type="button"
                          aria-expanded={expanded}
                          aria-controls={expanded ? `mobile-section-${item.label.toLowerCase()}` : undefined}
                          onClick={() => setMobileSection(expanded ? '' : item.label)}
                          className={`flex min-h-12 w-full items-center justify-between gap-3 py-3 text-left focus-visible:rounded-lg focus-visible:outline-2 focus-visible:outline-brand-500 ${
                            current ? 'text-brand-700' : 'text-ink-800'
                          }`}
                        >
                          <span>
                            <span className="block text-[15px] font-bold">{item.label}</span>
                            <span className="mt-0.5 block text-[11px] text-ink-500">
                              {item.sections.reduce((count, section) => count + section.items.length, 0)} links
                            </span>
                          </span>
                          <ChevronDown
                            aria-hidden="true"
                            className={`size-4 shrink-0 text-ink-400 transition ${expanded ? 'rotate-180' : ''}`}
                          />
                        </button>

                        {expanded ? (
                          <div id={`mobile-section-${item.label.toLowerCase()}`} className="pb-4">
                            <Link
                              to={item.href}
                              viewTransition
                              onClick={closeNavigation}
                              className="mb-3 flex items-center justify-between rounded-xl bg-brand-50 px-3.5 py-3 text-sm font-bold text-brand-700 focus-visible:outline-2 focus-visible:outline-brand-500"
                            >
                              View {item.label.toLowerCase()} overview
                              <ChevronRight aria-hidden="true" className="size-4" />
                            </Link>
                            <div className="grid gap-4">
                              {item.sections.map((section) => (
                                <section key={section.title}>
                                  <h2 className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-400">
                                    {section.title}
                                  </h2>
                                  <div className="grid gap-1">
                                    {section.items.map((link) => {
                                      const Icon = link.Icon
                                      return (
                                        <Link
                                          key={link.href}
                                          to={link.href}
                                          viewTransition
                                          onClick={closeNavigation}
                                          className="flex min-w-0 items-start gap-3 rounded-xl px-2.5 py-2.5 transition hover:bg-surface focus-visible:outline-2 focus-visible:outline-brand-500"
                                        >
                                          <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-700" />
                                          <span className="min-w-0">
                                            <span className="block text-[13px] font-semibold leading-5 text-ink-900">
                                              {link.label}
                                            </span>
                                            <span className="mt-0.5 block line-clamp-2 text-xs leading-[1.4] text-ink-500">
                                              {link.description}
                                            </span>
                                          </span>
                                        </Link>
                                      )
                                    })}
                                  </div>
                                </section>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </section>
                    )
                  })}
                </div>
              </nav>
              <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-line bg-white px-4 py-3">
                <Link
                  to="/government/hotlines"
                  viewTransition
                  onClick={closeNavigation}
                  className="rounded-xl bg-surface px-3 py-3 text-center text-sm font-semibold text-ink-700 transition hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-brand-500"
                >
                  Emergency hotlines
                </Link>
                <Link
                  to="/search"
                  viewTransition
                  onClick={closeNavigation}
                  className="rounded-xl bg-surface px-3 py-3 text-center text-sm font-semibold text-ink-700 transition hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-brand-500"
                >
                  Search the site
                </Link>
              </div>
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

            <FooterGroup title="Explore">
              <ul className="space-y-2.5 text-sm">
                {[
                  ['All services', '/services'],
                  ['Online services', '/online-services'],
                  ['City government', '/government'],
                  ['City officials', '/government/officials'],
                  ['Barangays', '/government/barangays'],
                  ['Ordinances and executive orders', '/government/legislation'],
                  ['City profile', '/city'],
                  ['Life and tourism', '/city/life'],
                  ['Places directory', '/city/places'],
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
            </FooterGroup>

            <FooterGroup title="Service categories">
              <ul className="space-y-2.5 text-sm">
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
            </FooterGroup>

            <FooterGroup title="City Hall">
              <ul className="space-y-3 text-sm text-white/70">
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
            </FooterGroup>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 lg:flex-row lg:items-center lg:justify-between">
            <p>
              © 2026 Better San Fernando. Independent civic project. Source dates vary by dataset; see page citations.
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
      <BackToTopButton />
    </div>
  )
}
