import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/ui/HeroSection";
import BlogCard from "@/components/ui/BlogCard";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News and updates from Free For Charity. Read about our GuideStar transparency seals, nonprofit tools, endorsements, and more.",
  alternates: {
    canonical: "/blog",
  },
};

const blogPosts = [
  {
    heading: "We just updated for the 2022 GuideStar Platinum Seal",
    date: "2022",
    description:
      "We're excited to share that our organization has earned a 2022 Platinum Seal of Transparency with Candid! Now, you can support our work with trust and confidence by viewing our nonprofit profile.",
    imageUrl: "/Images/donation.webp",
  },
  {
    heading:
      "Our organization earned a 2021 Platinum Seal of Transparency!",
    date: "2021",
    description:
      "Now, everyone can see our strategy, metrics, and achievements. Check out our updated nonprofit profile on Candid.",
    imageUrl: "/Images/donation.webp",
  },
  {
    heading: "What is the cost?",
    date: "",
    description:
      "You would be amazed at how frequently we get asked this question about our costs. For our consulting engagements we are actually 100% free. While there are many companies and other nonprofits that charge for these services, we provide them for free!",
    imageUrl: "/Images/donation.webp",
  },
  {
    heading:
      "Free For Charity Just Earned the Platinum Seal of Transparency",
    date: "",
    description:
      "Great news! Free For Charity just earned the Platinum Seal of Transparency from GuideStar, the world's largest source of nonprofit information. By sharing these metrics, we're helping the sector move beyond simplistic financial ratios to assess nonprofit progress.",
    imageUrl: "/Images/donation.webp",
  },
  {
    heading:
      "Using a Registered Agent Service (Northwest Registered Agent)",
    date: "",
    description:
      "Free For Charity uses a unique service for managing legal compliance for the non-profit. We use a registered agent service called Northwest Registered Agent.",
    imageUrl: "/Images/donation.webp",
  },
  {
    heading: "Podio Sponsorship Program",
    date: "",
    description:
      "With our brand new 501c3 status we are getting access to a lot of new and exciting tools. Free for Charity is now formally testing out Podio. Once tested we will add it to our technology directory.",
    imageUrl: "/Images/donation.webp",
  },
];

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
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
