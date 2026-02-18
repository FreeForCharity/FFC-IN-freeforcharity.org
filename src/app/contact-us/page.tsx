import type { Metadata } from "next";
import React from "react";
import HeroSection from "@/components/ui/HeroSection";
import ContactSection from "@/components/contact-us-components/Contact-Us";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Free For Charity. We connect students, professionals, and businesses with charities in need of support.",
  alternates: { canonical: "/contact-us" },
};

const index = () => {
  return (
    <div>
      <div>
        <HeroSection
          heading="Get In Touch with Free for Charity"
          paragraph="Connecting Students, Professionals, & Businesses with Charities in Need"
          heroImg="/Images/about-us.webp"
          fontSize={36}
          lineHeight={50}
          imageContainerWidth="w-[100%]"
        />

        <ContactSection />
      </div>
    </div>
  );
};

export default index;
