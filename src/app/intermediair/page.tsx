import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { IntermediairHeroSection } from "@/components/sections/intermediair/HeroSection"
import { IntermediairValuePropositionSection } from "@/components/sections/intermediair/ValuePropositionSection"
import { IntermediairFeaturesSection } from "@/components/sections/intermediair/FeaturesSection"
import { IntermediairPrivacySection } from "@/components/sections/intermediair/PrivacySection"
import { IntermediairPainPointsSection } from "@/components/sections/intermediair/PainPointsSection"
import { IntermediairHowItWorksSection } from "@/components/sections/intermediair/HowItWorksSection"
import { IntermediairResultSection } from "@/components/sections/intermediair/ResultSection"
import { IntermediairWaitlistSection } from "@/components/sections/intermediair/WaitlistSection"
import { IntermediairContactSection } from "@/components/sections/intermediair/ContactSection"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'WBSO Adviseurs & Intermediairs Platform | Subrise',
  description: 'Verhoog de efficiëntie van uw WBSO-dienstverlening als adviseur of intermediair. Ons AI-platform helpt u meer klanten te bedienen, administratie te automatiseren en betere subsidieaanvragen te maken.',
  keywords: 'WBSO voor intermediairs, WBSO adviesbureau software, WBSO dienstverlening verbeteren, adviseur WBSO platform, WBSO administratie automatiseren, WBSO adviseurs, fiscaal adviseur innovatie',
  alternates: {
    canonical: 'https://www.subrise.eu/intermediair',
  },
  openGraph: {
    title: 'WBSO Adviseurs & Intermediairs Platform | Subrise',
    description: 'Verhoog de efficiëntie van uw WBSO-dienstverlening als adviseur of intermediair met ons AI-platform.',
    url: 'https://www.subrise.eu/intermediair',
    type: 'website',
  },
}

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
  )
} 
