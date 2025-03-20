import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/sections/HeroSection"
import { ValuePropositionSection } from "@/components/sections/ValuePropositionSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { PainPointsSection } from "@/components/sections/PainPointsSection"
import { HowItWorksSection } from "@/components/sections/HowItWorksSection"
import { ResultSection } from "@/components/sections/ResultSection"
import { PrivacySection } from "@/components/sections/PrivacySection"
import { WaitlistSection } from "@/components/sections/WaitlistSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Zelf WBSO aanvragen, eenvoudiger dan ooit | Subrise',
  description: 'Bespaar tijd en geld op uw WBSO-aanvragen met ons AI-platform. Behoud 100% van uw subsidie, geen tussenpersoon nodig. Simpele administratie voor innovatieprojecten.',
  keywords: 'WBSO aanvraag indienen, WBSO subsidie aanvragen, innovatie subsidie, R&D belastingvoordeel, WBSO administratie vereenvoudigen, technologische innovatie, onderzoek en ontwikkeling subsidie',
  alternates: {
    canonical: 'https://www.subrise.eu',
  },
  openGraph: {
    title: 'Zelf WBSO aanvragen, eenvoudiger dan ooit | Subrise',
    description: 'Bespaar tijd en geld op uw WBSO-aanvragen met ons AI-platform. Behoud 100% van uw subsidie zonder tussenpersoon.',
    url: 'https://www.subrise.eu',
    type: 'website',
  },
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ValuePropositionSection />
        <FeaturesSection />
        <PainPointsSection />
        <HowItWorksSection />
        <ResultSection />
        <PrivacySection />
        <WaitlistSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

