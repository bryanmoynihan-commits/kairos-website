import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PricingHero from "@/components/pricing/PricingHero";
import EngagementTypes from "@/components/pricing/EngagementTypes";
import EngagementLadder from "@/components/pricing/EngagementLadder";
import QuickWinsSection from "@/components/pricing/QuickWinsSection";
import EntryPointsSection from "@/components/pricing/EntryPointsSection";
import RetainersSection from "@/components/pricing/RetainersSection";
import ProjectsSection from "@/components/pricing/ProjectsSection";
import InvestmentFactors from "@/components/pricing/InvestmentFactors";
import PricingCTA from "@/components/pricing/PricingCTA";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent pricing for AI-native RevOps consulting. Discovery sprints from $2,000, assessments, project work, and ongoing retainers \u2014 no surprises.",
  openGraph: {
    title: "Pricing | Kairos Performance",
    description:
      "Transparent pricing for AI-native RevOps consulting. Discovery sprints from $2,000, assessments, project work, and ongoing retainers \u2014 no surprises.",
  },
};

export default function PricingPage() {
  return (
    <>
      <PricingHero />
      <EngagementTypes />
      <EngagementLadder />
      <QuickWinsSection />
      <EntryPointsSection />
      <RetainersSection />
      <ProjectsSection />
      <InvestmentFactors />
      <PricingCTA />
      <Footer />
    </>
  );
}
