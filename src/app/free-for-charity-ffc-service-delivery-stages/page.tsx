import type { Metadata } from "next";
import React from "react";
import Hero from "@/components/free-for-charity-ffc-service-delivery-stages-components/Hero";

export const metadata: Metadata = {
  title: "Service Delivery Stages",
  description:
    "Free For Charity service delivery process: charity validation stages, onboarding philosophy, and how we deliver free technology services to nonprofits.",
  alternates: { canonical: "/free-for-charity-ffc-service-delivery-stages" },
};

const index = () => {
  return (
    <div>
      <Hero />
    </div>
  );
};

export default index;
