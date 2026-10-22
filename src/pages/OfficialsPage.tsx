import { OfficialCard } from '../components/OfficialCard'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/SectionHeading'
import { SourceNote } from '../components/SourceNote'
import { city } from '../data/city'
import { cityElections, electionSourceUrl, electionSupplementSourceUrl } from '../data/elections'
import { officials } from '../data/officials'
import { formatDate } from '../lib/utils'
import { usePageMeta } from '../lib/usePageMeta'

export function OfficialsPage() {
  usePageMeta(
    'City officials',
    'Meet the mayor, vice mayor, 12 city councilors, and the SK Federation representative of San Fernando, La Union, and review the city’s election history.',
  )

  const mayor = officials.find((official) => official.role === 'City Mayor')
  const viceMayor = officials.find((official) => official.role === 'City Vice Mayor')
  const councilors = officials.filter((official) => official.role === 'City Councilor')
  const others = officials.filter(
    (official) => !['City Mayor', 'City Vice Mayor', 'City Councilor'].includes(official.role),
  )

  return (
    <>
      <PageHero
        eyebrow="City officials"
        title="The people in city hall"
        description="The elected leadership of San Fernando: the mayor, vice mayor, 12 city councilors, and the SK Federation representative. Profiles link to the official city website."
        crumbs={[{ label: 'Government', href: '/government' }, { label: 'Officials' }]}
      />

      <section>
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow="Executive"
              title="City leadership"
              description="The mayor leads the executive branch; the vice mayor presides over the Sangguniang Panlungsod."
            />
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {mayor ? (
              <Reveal>
                <OfficialCard official={mayor} featured />
              </Reveal>
            ) : null}
            {viceMayor ? (
              <Reveal delay={0.06}>
                <OfficialCard official={viceMayor} featured />
              </Reveal>
            ) : null}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="container-page py-12 sm:py-16">
          <Reveal>
            <SectionHeading
              eyebrow={`${councilors.length} members`}
              title="Sangguniang Panlungsod"
              description="The city council reviews and approves ordinances, resolutions, and the annual budget."
            />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {councilors.map((official, index) => (
              <Reveal key={official.slug} delay={(index % 4) * 0.04} className="h-full">
                <OfficialCard official={official} />
              </Reveal>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
            <div className="border-b border-line p-5 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">Election history</p>
              <h3 className="mt-2 text-xl font-extrabold tracking-tight text-ink-950">City mayors and vice mayors</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-ink-600">
                Winning candidates in city elections. Rows come from OpenHalalan; the 2007 mayoral winner is
                supplemented from the{' '}
                <a
                  href={electionSupplementSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-brand-700 underline decoration-brand-300 underline-offset-2 hover:text-brand-800"
                >
                  COMELEC list of elected city/municipal candidates
                </a>
                . Party labels are as recorded by each source.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <caption className="sr-only">Mayors and vice mayors of San Fernando, La Union, by election year</caption>
                <thead className="bg-surface text-[11px] font-bold uppercase tracking-[0.1em] text-ink-500">
                  <tr>
                    <th scope="col" className="px-5 py-3">
                      Year
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Mayor
                    </th>
                    <th scope="col" className="px-5 py-3">
                      Vice mayor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {cityElections.map((election) => (
                    <tr key={election.year} className={election.year === 2025 ? 'bg-brand-50' : undefined}>
                      <th scope="row" className="px-5 py-4 align-top text-base font-extrabold tabular-nums text-ink-950">
                        {election.year}
                      </th>
                      <td className="px-5 py-4 align-top">
                        {election.mayor ? (
                          <>
                            <span className="block font-bold text-ink-900">{election.mayor.name}</span>
                            <span className="mt-0.5 block text-xs text-ink-500">{election.mayor.party}</span>
                          </>
                        ) : (
                          <span className="text-sm text-ink-500">Not in source data</span>
                        )}
                      </td>
                      <td className="px-5 py-4 align-top">
                        {election.viceMayor ? (
                          <>
                            <span className="block font-bold text-ink-900">{election.viceMayor.name}</span>
                            <span className="mt-0.5 block text-xs text-ink-500">{election.viceMayor.party}</span>
                          </>
                        ) : (
                          <span className="text-sm text-ink-500">Not in source data</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-line p-4">
              <SourceNote href={electionSourceUrl} linkLabel="OpenHalalan on data.bettergov.ph">
                The OpenHalalan extract still omits the 2010 and 2013 cycles. Missing rows do not mean an election was
                not held.
              </SourceNote>
            </div>
          </div>
        </div>
      </section>

      {others.length ? (
        <section>
          <div className="container-page py-12 sm:py-16">
            <Reveal>
              <SectionHeading
                eyebrow="Ex-officio"
                title="Youth representation"
                description="The SK Federation representative sits on the city council as an ex-officio member."
              />
            </Reveal>
            <div className="mt-8 grid max-w-sm gap-5">
              {others.map((official) => (
                <OfficialCard key={official.slug} official={official} featured />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-line">
        <div className="container-page py-8">
          <SourceNote href={city.website} linkLabel="View official profiles">
            Portraits, roles, and profile links come from the City Government of San Fernando. This page does not
            publish personal contact details for officials. Data last verified on {formatDate(city.lastVerified)}.
          </SourceNote>
        </div>
      </section>
    </>
  )
}
