import React from 'react'
import InfoCard from '../../ui/BlogCard'
import blogData from '@/data/blog-posts.json'

interface Blog {
  heading: string
  date: string
  isoDate: string
  description: string
  imageUrl?: string
  href?: string
}

// Homepage section renders the three newest posts from the same registry the
// /blog/ page and /rss.xml are generated from (src/data/blog-posts.json).
const posts = (blogData.posts as Blog[]).slice(0, 3)

const OutBlogs: React.FC = () => {
  return (
    <div className="py-10 pb-25 px-4 bg-white">
      <h2 className="text-center py-5 font-[700] text-[#b35000] text-[30px] md:text-[40px] leading-[44px] mb-7">
        Our Blogs
      </h2>
      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 items-start">
        {posts.map((blog) => (
          <InfoCard
            key={blog.heading}
            heading={blog.heading}
            date={blog.date}
            description={blog.description}
            imageUrl={blog.imageUrl}
            href={blog.href}
          />
        ))}
      </div>
    </div>
  )
}

export default OutBlogs
