import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PricingHero from "@/components/pricing/PricingHero";
import PricingPath from "@/components/pricing/PricingPath";
import CreditsForward from "@/components/pricing/CreditsForward";
import QuickWinsSection from "@/components/pricing/QuickWinsSection";
import EntryPointsSection from "@/components/pricing/EntryPointsSection";
import RetainersSection from "@/components/pricing/RetainersSection";
import ProjectsSection from "@/components/pricing/ProjectsSection";
import PricingCTA from "@/components/pricing/PricingCTA";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for AI-native revenue operating systems. Discovery sprints from $2,000, assessments, project work, and ongoing retainers. No surprises.",
  openGraph: {
    title: "Pricing | Kairos Performance",
    description:
      "Transparent pricing for AI-native revenue operating systems. Discovery sprints from $2,000, assessments, project work, and ongoing retainers. No surprises.",
  },
};

export default function PricingPage() {
  return (
    <>
      {/* On desktop, hero + overview fill the first screen so the cards sit
          just above the fold at any height. Extra space goes to the hero's
          padding; capped so very tall screens don't get a cavernous hero. */}
      <div className="flex flex-col lg:min-h-[min(calc(100svh-2rem),1000px)]">
        <PricingHero />
        <PricingPath />
      </div>
      <RetainersSection />
      <QuickWinsSection />
      <EntryPointsSection />
      <ProjectsSection />
      <CreditsForward />
      <PricingCTA />
      <Footer />
    </>
  );
}
