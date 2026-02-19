import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'cPanel Backup SOP',
  description: 'Free For Charity internal standard operating procedure for cPanel backups.',
  robots: { index: false, follow: false },
}

export default function CpanelBackupSopLayout({ children }: { children: React.ReactNode }) {
  return children
}
