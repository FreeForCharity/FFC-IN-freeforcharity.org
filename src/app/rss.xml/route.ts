import blogData from '@/data/blog-posts.json'

// RSS feed generated at build time from the blog registry (issue #384).
// Static export: this route handler runs during `next build` only.
export const dynamic = 'force-static'

const SITE = 'https://www.freeforcharity.org'

function escapeXml(s: string) {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

export async function GET() {
  const items = blogData.posts
    .map((post) => {
      const link = post.href?.startsWith('/')
        ? `${SITE}${post.href}`
        : (post.href ?? `${SITE}/blog/`)
      return `    <item>
      <title>${escapeXml(post.heading)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="false">${escapeXml(post.isoDate + ':' + post.heading)}</guid>
      <pubDate>${new Date(post.isoDate + 'T12:00:00Z').toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Free For Charity Blog</title>
    <link>${SITE}/blog/</link>
    <description>News and updates from Free For Charity — free websites, domains, and Microsoft 365 for nonprofits.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`
  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
