import React from "react";
import Hero from "@/components/domains/Hero";
import DearProspective from "@/components/domains/Dear-Prospective";
import OrderYourDomain from "@/components/domains/Order-Your-Domain";
import CardsSection from "@/components/domains/Cards-Section";
import VerifyYourDomain from "@/components/domains/Verify-Your-Domain";
import Seperater from "@/components/domains/Seperater";
import SetupEmailHosting from "@/components/domains/Setup-Email-Hosting";
import CurvedBlueSection from "@/components/domains/Curved-Blue-Section";
import CurvedBlackSection from "@/components/domains/Curved-Black-Section";
import GetNewWebsite from "@/components/domains/Get-New-Website";

const index = () => {
  return (
    <div>
      <div className="pt-[80px]">
        <Hero />
        <DearProspective />
        <OrderYourDomain />
        <CardsSection />
        <VerifyYourDomain />
        <Seperater />
        <SetupEmailHosting />
        <CurvedBlueSection />
        <CurvedBlackSection />
        <GetNewWebsite />
      </div>
    </div>
  );
};

export default index;
