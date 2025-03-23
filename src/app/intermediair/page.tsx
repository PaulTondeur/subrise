import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { IntermediairContactSection } from "@/components/sections/intermediair/ContactSection";
import { IntermediairFeaturesSection } from "@/components/sections/intermediair/FeaturesSection";
import { IntermediairHeroSection } from "@/components/sections/intermediair/HeroSection";
import { IntermediairHowItWorksSection } from "@/components/sections/intermediair/HowItWorksSection";
import { IntermediairPainPointsSection } from "@/components/sections/intermediair/PainPointsSection";
import { IntermediairPrivacySection } from "@/components/sections/intermediair/PrivacySection";
import { IntermediairResultSection } from "@/components/sections/intermediair/ResultSection";
import { IntermediairValuePropositionSection } from "@/components/sections/intermediair/ValuePropositionSection";
import { IntermediairWaitlistSection } from "@/components/sections/intermediair/WaitlistSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-ondersteuning voor WBSO Adviseurs & Intermediairs | Subrise",
  description:
    "Verhoog de efficiëntie van uw WBSO-dienstverlening als adviseur of intermediair. Ons AI-platform helpt u meer klanten te bedienen, administratie te automatiseren en betere subsidieaanvragen te maken.",
  keywords:
    "WBSO voor intermediairs, WBSO adviesbureau software, WBSO dienstverlening verbeteren, adviseur WBSO platform, WBSO administratie automatiseren, WBSO adviseurs, fiscaal adviseur innovatie",
  alternates: {
    canonical: "https://www.subrise.eu/intermediair",
  },
  openGraph: {
    title: "AI-ondersteuning voor WBSO Adviseurs & Intermediairs | Subrise",
    description:
      "Verhoog de efficiëntie van uw WBSO-dienstverlening als adviseur of intermediair met ons AI-platform.",
    url: "https://www.subrise.eu/intermediair",
    type: "website",
  },
};

export default function IntermediairPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <IntermediairHeroSection />
        <IntermediairValuePropositionSection />
        <IntermediairFeaturesSection />
        <IntermediairPrivacySection />
        <IntermediairPainPointsSection />
        <IntermediairHowItWorksSection />
        <IntermediairResultSection />
        <IntermediairWaitlistSection />
        <IntermediairContactSection />
      </main>
      <Footer />
    </div>
  );
}
