import type { Metadata } from "next";
import React from "react";
import Hero from "@/components/home/HeroSection";

export const metadata: Metadata = {
  title: "Home (Legacy)",
  robots: { index: false, follow: false },
};
import Mission from "@/components/home/MissionSection";
import SupportFreeforCharity from "@/components/home/SupportFreeforCharity";
import Testimonials from "@/components/home/Testimonials";
import Ourblogs from "@/components/home/Ourblogs";
import Contactus from "@/components/home/Contactus";

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Mission />
      <SupportFreeforCharity />
      <Testimonials />
      <Ourblogs />
      <Contactus />
    </div>
  );
};

export default Home;
