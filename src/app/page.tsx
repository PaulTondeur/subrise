import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/sections/HeroSection"
import { ValuePropositionSection } from "@/components/sections/ValuePropositionSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { PainPointsSection } from "@/components/sections/PainPointsSection"
import { HowItWorksSection } from "@/components/sections/HowItWorksSection"
import { ResultSection } from "@/components/sections/ResultSection"
import { WaitlistSection } from "@/components/sections/WaitlistSection"
import { ContactSection } from "@/components/sections/ContactSection"

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
        <WaitlistSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

