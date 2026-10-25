import { ArrowUpRight, Building2, Mail, MapPin, Phone } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { NotFoundPage } from './NotFoundPage'
import { EmptyState } from '../components/EmptyState'
import { PageHero } from '../components/PageHero'
import { SectionHeading } from '../components/SectionHeading'
import { ServiceCard } from '../components/ServiceCard'
import { SourceNote } from '../components/SourceNote'
import { LocalizedText } from '../i18n/LocalizedText'
import { city } from '../data/city'
import { offices } from '../data/offices'
import { services } from '../data/services'
import { useLanguage } from '../i18n/language'
import { telHref } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

export function OfficeDetailPage() {
  const { translate } = useLanguage()
  const { slug } = useParams<{ slug: string }>()
  const office = offices.find((item) => item.slug === slug)
  const officeServices = office
    ? services
        .filter((service) => service.officeCode === office.code)
        .sort((a, b) => a.title.localeCompare(b.title))
    : []

  usePageMeta(
    office?.name ?? 'Office not found',
    office
      ? translate('Office profile help')
      : undefined,
  )

  if (!office) return <NotFoundPage />

  const address = office.address && office.address !== '*' ? office.address : city.address
  const hasDirectPhone = Boolean(office.contact) && !/local|loc/i.test(office.contact)

  return (
    <>
      <PageHero
        eyebrow={translate('City office')}
        title={office.name}
        description={translate('Office profile help')}
        crumbs={[
          { label: 'Government', href: '/government' },
          { label: 'Offices', href: '/government/offices' },
          { label: office.name },
        ]}
      >
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-xs font-semibold text-ink-700">
            <Building2 aria-hidden="true" className="size-3.5 text-brand-700" />
            <LocalizedText text={office.sector} />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-700 px-3 py-1.5 text-xs font-bold text-white">
            {officeServices.length} {translate(officeServices.length === 1 ? 'service' : 'services')}
          </span>
        </div>
      </PageHero>

      <div className="container-page py-10 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <SectionHeading eyebrow={translate('Contact')} title={translate('Visit, call, or write')} />
            <div className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-card sm:p-7">
              <dl className="grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400">{translate('Office head')}</dt>
                  <dd className="mt-1.5 text-[15px] font-semibold leading-6 text-ink-900">
                    {office.head || translate('Head not listed')}
                  </dd>
                  {office.position ? <dd className="mt-0.5 text-sm text-ink-500"><LocalizedText text={office.position} /></dd> : null}
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400">{translate('Phone')}</dt>
                  <dd className="mt-1.5 flex items-start gap-2 text-[15px] font-semibold leading-6 text-ink-900">
                    <Phone aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-600" />
                    {office.contact ? (
                      hasDirectPhone ? (
                        <a href={telHref(office.contact)} className="break-words hover:text-brand-700">
                          {office.contact}
                        </a>
                      ) : (
                        <span className="break-words">{office.contact}</span>
                      )
                    ) : (
                      <span className="font-normal text-ink-400">{translate('Not listed')}</span>
                    )}
                  </dd>
                  {office.locals ? (
                    <dd className="mt-1 pl-6 text-xs text-ink-500">{translate('Local')} {office.locals}</dd>
                  ) : null}
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400">{translate('Email')}</dt>
                  <dd className="mt-1.5 flex items-start gap-2 text-[15px] font-semibold leading-6 text-ink-900">
                    <Mail aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-600" />
                    {office.email ? (
                      <a href={`mailto:${office.email}`} className="break-all hover:text-brand-700">
                        {office.email}
                      </a>
                    ) : (
                      <span className="font-normal text-ink-400">{translate('Not listed')}</span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.12em] text-ink-400">{translate('Address')}</dt>
                  <dd className="mt-1.5 flex items-start gap-2 text-[15px] font-semibold leading-6 text-ink-900">
                    <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0 text-brand-600" />
                    <span>{address}</span>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-12">
              <SectionHeading
                eyebrow={`${officeServices.length} ${translate(officeServices.length === 1 ? 'service' : 'services')}`}
                title={translate('Services handled here')}
                description={translate('These services are listed under this office in the Citizens’ Charter.')}
              />

              {officeServices.length ? (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {officeServices.map((service) => (
                    <ServiceCard key={service.slug} service={service} categoryName={service.classification} />
                  ))}
                </div>
              ) : (
                <div className="mt-6">
                  <EmptyState
                    title={translate('No services listed')}
                    description={translate('The Citizens’ Charter does not list any services for this office. Browse the full directory to find the right office.')}
                    action={
                      <Link
                        to="/services"
                        viewTransition
                        className="rounded-xl bg-brand-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-800"
                      >
                        {translate('Browse all services')}
                      </Link>
                    }
                  />
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-400">{translate('Office at a glance')}</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="border-b border-line pb-3">
                  <dt className="text-xs font-semibold text-ink-500">{translate('Sector')}</dt>
                  <dd className="mt-1 font-semibold leading-6 text-ink-900"><LocalizedText text={office.sector} /></dd>
                </div>
                <div className="border-b border-line pb-3">
                  <dt className="text-xs font-semibold text-ink-500">{translate('Services')}</dt>
                  <dd className="mt-1 font-semibold leading-6 text-ink-900">{officeServices.length}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-ink-500">{translate('City Hall hours')}</dt>
                  <dd className="mt-1 font-semibold leading-6 text-ink-900">{city.hours}</dd>
                </div>
              </dl>
            </div>

            {office.ccUrl ? (
              <a
                href={office.ccUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl bg-brand-700 p-5 text-sm font-bold text-white shadow-card transition hover:bg-brand-800"
              >
                <span>{translate('Citizens’ Charter office page')}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ) : null}

            <SourceNote href={office.sourceUrl} linkLabel={translate('View the official office page')}>
              {translate('Contacts and office details come from the City Government of San Fernando. Check the official directory for changes before contacting or visiting the office.')}
            </SourceNote>
          </aside>
        </div>
      </div>
    </>
  )
}
