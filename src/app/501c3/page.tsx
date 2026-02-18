import type { Metadata } from "next";
import HeroSection from "@/components/ui/HeroSection";
import HelpForCharitiesandNonprofit from "@/components/501c3-components/Help-For-Charities-and-Nonprofit";

export const metadata: Metadata = {
  title: "501(c)(3) Onboarding Guide",
  description:
    "Onboarding guide for verified 501(c)(3) charities. Get instant access to free domains, hosting, email, and technology tools from Free For Charity.",
  alternates: { canonical: "/501c3" },
};
import ReadyToGetStartedAndFaq from "@/components/501c3-components/Ready-to-get-started-and-faqs";
import CallSection from "@/components/help-for-charities-components/call-section";

const page = () => {
  return (
    <div>
      <HeroSection
        heading="501(c)3 Onboarding Guide"
        paragraph="If you are representing a charity or you currently work for a charity and want to improve your own skills start here to get help for your organization. You get instant access to many of our free tools and products right away!"
        heroImg="/Images/volunteer.webp"
      />
      <HelpForCharitiesandNonprofit />
      <ReadyToGetStartedAndFaq />
      <CallSection />
    </div>
  );
};

export default page;
