import { ArrowUpRight, ChevronDown, Clock, ExternalLink, HandHeart, Mail, MapPin, Phone } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import logoLight from '../assets/logo-light.png'
import { categories } from '../data/categories'
import { city } from '../data/city'
import { telHref } from '../lib/utils'
import { BackToTopButton } from './BackToTopButton'

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

export function SiteFooter() {
  return (
    <>
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
            </div>

            <FooterGroup title="Explore">
              <ul className="space-y-2.5 text-sm">
                {[
                  { label: 'All services', href: '/services' },
                  { label: 'Online services', href: '/online-services' },
                  { label: 'City government', href: '/government' },
                  { label: 'City officials', href: '/government/officials' },
                  { label: 'Barangays', href: '/government/barangays' },
                  { label: 'Ordinances and executive orders', href: '/government/legislation' },
                  { label: 'City profile', href: '/city' },
                  { label: 'Life and tourism', href: '/city/life' },
                  { label: 'Places directory', href: '/city/places' },
                  { label: 'Business and investment', href: '/city/business' },
                  { label: 'Transparency', href: '/transparency' },
                  { label: 'Infrastructure projects', href: '/transparency/projects' },
                  { label: 'News', href: '/news' },
                  { label: 'News archive', href: '/news/archive' },
                ].map(({ label, href }) => (
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

          <section
            aria-label="Official links and project contributions"
            className="mt-10 grid gap-8 border-t border-white/10 py-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center"
          >
            <div className="flex items-start gap-4">
              <a
                href="https://bettergov.ph/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
              >
                <img
                  src="/logos/bettergov-emblem-inversed.svg"
                  alt="BetterGov.ph"
                  width="48"
                  height="48"
                  className="size-10"
                />
              </a>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
                  Official &amp; broader ecosystem
                </p>
                <nav aria-label="Official and broader civic ecosystem" className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <a href={city.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-white/85 transition hover:text-white">
                    Official city portal
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                  <a href="https://bettergov.ph/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-white/85 transition hover:text-white">
                    National services — BetterGov
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                  <a href="https://lgu.bettergov.ph/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-white/85 transition hover:text-white">
                    Other LGUs — BetterLGU
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </a>
                </nav>
                <p className="mt-3 text-xs leading-5 text-white/55">
                  Better San Fernando is an independent civic project, not the official City Government website.
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-white/75">
                Cost to the people of San Fernando <span className="ml-1 font-extrabold text-emerald-300">₱0</span>
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://github.com/alvindemesadev/better-san-fernando-lu/issues/new"
                  target="_blank"
                  rel="noreferrer"
                  title="Offer to help or suggest an improvement"
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                >
                  <HandHeart aria-hidden="true" className="size-4" />
                  Volunteer with us
                </a>
                <a
                  href="https://github.com/alvindemesadev/better-san-fernando-lu"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                >
                  <ExternalLink aria-hidden="true" className="size-4" />
                  Open-source on GitHub
                </a>
                <a
                  href="https://github.com/alvindemesadev/better-san-fernando-lu/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-10 items-center gap-2 rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-300"
                >
                  Contribute code with us
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/60 lg:flex-row lg:items-center lg:justify-between">
            <p>
              © 2026 Better San Fernando. Independent civic project. Source dates vary by dataset; see page citations.
            </p>
            <nav aria-label="Legal and site links" className="flex flex-wrap gap-x-5 gap-y-2">
              {[
                { label: 'Sitemap', href: '/sitemap' },
                { label: 'Accessibility', href: '/accessibility' },
                { label: 'Privacy', href: '/privacy' },
                { label: 'Terms', href: '/terms' },
                { label: 'Contact', href: '/contact' },
              ].map(({ label, href }) => (
                <Link key={href} to={href} viewTransition className="transition hover:text-white">
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
      <BackToTopButton />
    </>
  )
}
