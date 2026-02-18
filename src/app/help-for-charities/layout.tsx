import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help for Charities",
  description:
    "Resources and support for charity and nonprofit directors. Get instant access to free tools, domains, hosting, and technology services from Free For Charity.",
  alternates: { canonical: "/help-for-charities" },
};

export default function HelpForCharitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
