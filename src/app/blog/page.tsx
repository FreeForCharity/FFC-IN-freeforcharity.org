import { pageMetadata } from '@/lib/page-metadata'
import React from 'react'
import HeroSection from '@/components/ui/HeroSection'
import BlogCard from '@/components/ui/BlogCard'
import blogData from '@/data/blog-posts.json'

export const metadata = pageMetadata({
  title: 'Blog',
  description:
    'News and updates from Free For Charity. Read about our GuideStar transparency seals, nonprofit tools, endorsements, and more.',
  canonical: '/blog/',
})

const blogPosts = blogData.posts

const BlogPage = () => {
  return (
    <div>
      <HeroSection
        heading="Blog"
        paragraph="News, updates, and insights from Free For Charity. Stay informed about our mission and the nonprofit community."
        heroImg="/Images/donation.webp"
      />

      <section className="py-[60px] bg-[#fcfcfc]">
        <div className="w-[90%] md:w-[85%] max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <BlogCard
                key={idx}
                heading={post.heading}
                date={post.date}
                description={post.description}
                imageUrl={post.imageUrl}
                href={'href' in post ? post.href : undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogPage
