import React from "react";
import type { Metadata } from "next";
import HeroSection from "@/components/ui/HeroSection";

export const metadata: Metadata = {
  title: "Charity and Nonprofit Technology Directory",
  description:
    "Explore free and open source technology tools for nonprofit organizations. Find solutions for web hosting, office automation, CRM, and more.",
  alternates: {
    canonical: "/charity-and-nonprofit-technology-directory",
  },
};

const categories = [
  {
    name: "Charity Websites",
    items: [
      "WordPress Web Hosting",
      "WordPress Themes",
      "WordPress Plugins",
      "WordPress Management",
    ],
  },
  {
    name: "Accounting",
    items: ["Installed Software", "Cloud Based"],
  },
  {
    name: "Office Automation",
    items: ["Office Suites", "Customer Relationship Management Systems"],
  },
  {
    name: "Management Tools",
    items: ["Time Tracking", "Volunteer Management"],
  },
];

const TechDirectoryPage = () => {
  return (
    <div>
      <HeroSection
        heading="Technology Directory"
        paragraph="A nonprofit technology directory focused on startup charities with a preference for open source and free solutions."
        heroImg="/Images/donation.webp"
      />

      {/* Intro */}
      <section className="py-[60px] bg-[#fcfcfc]">
        <div className="w-[90%] md:w-[80%] max-w-[900px] mx-auto">
          <h2 className="text-[28px] md:text-[36px] font-[700] leading-[40px] text-center text-[#f27022] mb-8">
            Charity Nonprofit Tech Directory
          </h2>

          <div className="space-y-6 mb-12" id="lato-font">
            <p className="text-[18px] font-[500] leading-[28px] text-[#333]">
              The Nonprofit technology directory will focus on the startup
              charity and will have a heavy preference for items that are open
              source or free. At the end of the day however it is up to each and
              every nonprofit or charity to decide what is best for them.
            </p>

            <p className="text-[18px] font-[500] leading-[28px] text-[#333]">
              This Nonprofit Technology Directory expands on the great work of
              techsoup.org and grassroots.org by moving the focus on products
              outside those that have directly partnered with us to show you all
              offers both from for-profit and nonprofit companies.
            </p>

            <p className="text-[18px] font-[500] leading-[28px] text-[#333]">
              Many of the providers on other directories are tailored to the
              nonprofit sector but do not offer the best solutions and should be
              compared to the best solutions industry wide.
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="bg-white rounded-[10px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.08)] p-6"
              >
                <h3 className="text-[20px] font-[700] text-[#2583ab] mb-3">
                  {cat.name}
                </h3>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="text-[16px] font-[500] text-[#333] pl-4 border-l-2 border-[#e88d33]"
                      id="lato-font"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-[50px] bg-[#0c5575]">
        <div className="w-[90%] md:w-[80%] max-w-[900px] mx-auto text-center">
          <h2 className="text-[28px] md:text-[36px] font-[700] text-white leading-[40px] mb-4">
            Have Questions?
          </h2>
          <p
            className="text-[18px] text-white/90 font-[500] leading-[28px] mb-4"
            id="lato-font"
          >
            Have questions about consultation or hosting? Want to know more
            about nonprofits? Give a real person a call:
          </p>
          <div className="space-y-1 mb-6">
            <p className="text-[18px] text-white font-[600]">
              Clarke Moyer:{" "}
              <a href="tel:+15202228104" className="text-[#e88d33] hover:underline">
                (520) 222-8104
              </a>
            </p>
          </div>
          <a
            href="/contact-us"
            className="inline-block px-[30px] py-[10px] text-white border border-[#f27022] rounded-[10px] text-[18px] bg-[#f27022] font-[600] shadow-md hover:shadow-[0px_12px_18px_-6px_#f27022] transition-all duration-300"
            id="montserrat-font"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default TechDirectoryPage;
