import type { Metadata } from 'next'
import Link from 'next/link'
import AdminGuideLink from '@/components/ui/AdminGuideLink'
import { adminLinks, ffcAdminUrl } from '@/data/admin-links'

export const metadata: Metadata = {
  title: 'cPanel Backup SOP',
  description: 'Internal Free For Charity admin runbook for cPanel backups.',
  robots: { index: false, follow: false },
}

export default function CpanelBackupSop() {
  return (
    <div
      className="lg:min-h-screen w-[90%] md:w-[80%] max-w-[1080px] mx-auto"
      data-font="aria-font"
    >
      <div className="pt-[138px] pb-[60px]">
        <p className="text-[14px] font-[500] text-[#666] uppercase tracking-wider mb-[10px]">
          Internal SOP &mdash; FFC Admin
        </p>
        <h1 className="text-[36px] leading-[40px] font-[600] text-[#333] mb-[24px]">
          cPanel Backup SOP
        </h1>
        <p className="text-[16px] leading-[26px] font-[500] text-[#333] mb-[20px]">
          The full text of this standard operating procedure is maintained off-site and is
          restricted to FFC administrators. This page exists as a stable URL that the admin handbook
          and other internal docs can link to; it is intentionally not indexed by search engines.
        </p>
        <p className="text-[16px] leading-[26px] font-[500] text-[#333] mb-[20px]">
          See the runbook in{' '}
          <code className="px-1 py-0.5 bg-[#f4f4f4] rounded">docs/CUTOVER-HANDOFF.md</code> and the
          helper script{' '}
          <code className="px-1 py-0.5 bg-[#f4f4f4] rounded">scripts/cpanel-backup.sh</code> in the
          FFC-IN-freeforcharity.org repository for the operational steps.
        </p>
        <p className="text-[14px] leading-[24px] font-[500] text-[#666] mb-[20px]">
          If you arrived here looking for public content, head back to the{' '}
          <Link href="/" className="text-[#0567B1] underline">
            Free For Charity homepage
          </Link>{' '}
          or the{' '}
          <Link href="/about-us" className="text-[#0567B1] underline">
            About Us page
          </Link>
          .
        </p>
        <div className="max-w-[560px]">
          <AdminGuideLink
            variant="legacy"
            href={ffcAdminUrl(adminLinks['cpanel-backup-sop'].newModel)}
            description="Legacy WordPress/cPanel backup SOP reference on the FFC Admin portal."
          />
        </div>
      </div>
    </div>
  )
}
