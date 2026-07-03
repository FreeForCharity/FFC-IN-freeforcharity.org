import { pageMetadata } from '@/lib/page-metadata'
import Link from 'next/link'
import statusData from '@/data/service-status.json'

export const metadata = pageMetadata({
  title: 'Service Status',
  description:
    'Is it just my site? Current health of FFC-managed services — charity hosting, DNS, the member portal — with honest last-checked timestamps and incident notes.',
  canonical: '/status/',
})

interface Service {
  name: string
  status: 'operational' | 'degraded' | 'outage' | 'unknown'
  detail: string
  checkedBy: string
  lastChecked: string
}

interface Incident {
  date: string
  title: string
  note: string
  resolved: boolean
}

const { services, incidents, updatedAt } = statusData as unknown as {
  services: Service[]
  incidents: Incident[]
  updatedAt: string
}

const STATUS_STYLE: Record<Service['status'], { label: string; classes: string }> = {
  operational: { label: 'Operational', classes: 'bg-[#e6f4ea] text-[#1e7d32] border-[#1e7d32]' },
  degraded: { label: 'Degraded', classes: 'bg-[#fef7e0] text-[#8a6d00] border-[#8a6d00]' },
  outage: { label: 'Outage', classes: 'bg-[#fdecea] text-[#b3261e] border-[#b3261e]' },
  unknown: { label: 'Not monitored', classes: 'bg-[#f1f3f4] text-[#555] border-[#999]' },
}

export default function StatusPage() {
  return (
    <div className="ffc-container py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-[var(--font-faustina)] text-[48px] leading-[60px] mb-4">
          Service Status
        </h1>
        <p className="font-[var(--font-lato)] text-[18px] leading-[28px] text-[#555] mb-2">
          &ldquo;Is it just my site?&rdquo; — check here first. This page is updated from our
          automated checks and by hand during incidents (not a real-time monitor), so every entry
          carries an honest last-checked date.
        </p>
        <p className="font-[var(--font-lato)] text-[14px] text-[#767672] mb-8">
          Page last updated {updatedAt}. Something looks down and isn&rsquo;t noted here?{' '}
          <Link href="/contact-us/" className="underline">
            Tell us
          </Link>{' '}
          — include your domain and what you saw.
        </p>

        <ul className="space-y-4">
          {services.map((service) => {
            const style = STATUS_STYLE[service.status]
            return (
              <li key={service.name} className="border border-gray-200 rounded-lg p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2
                    className="font-[var(--font-lato)] text-[19px] font-[600] text-[#333]"
                    data-font="lato-font"
                  >
                    {service.name}
                  </h2>
                  <span
                    className={`inline-block rounded-full border px-3 py-0.5 font-[var(--font-lato)] text-[13px] font-[600] ${style.classes}`}
                  >
                    {style.label}
                  </span>
                </div>
                <p className="font-[var(--font-lato)] text-[15px] leading-[24px] text-[#555] mt-2">
                  {service.detail}
                </p>
                <p className="font-[var(--font-lato)] text-[13px] text-[#767672] mt-1">
                  {service.checkedBy}
                  {service.lastChecked ? ` · last checked ${service.lastChecked}` : ''}
                </p>
              </li>
            )
          })}
        </ul>

        <h2 className="font-[var(--font-faustina)] text-[32px] leading-[40px] mt-10 mb-4">
          Incident notes
        </h2>
        {incidents.length === 0 ? (
          <p className="font-[var(--font-lato)] text-[17px] leading-[27px] text-[#555]">
            No current or recent incidents. When one occurs, a dated note appears here (and the
            change history of this page serves as the public incident log).
          </p>
        ) : (
          <ul className="space-y-3">
            {incidents.map((incident) => (
              <li
                key={incident.date + incident.title}
                className="border border-gray-200 rounded-lg p-4"
              >
                <p className="font-[var(--font-lato)] text-[16px] font-[600] text-[#333]">
                  {incident.date} — {incident.title}{' '}
                  {incident.resolved ? '(resolved)' : '(ongoing)'}
                </p>
                <p className="font-[var(--font-lato)] text-[15px] leading-[24px] text-[#555] mt-1">
                  {incident.note}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
