import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { IntermediairHeroSection } from "@/components/sections/intermediair/HeroSection"
import { IntermediairValuePropositionSection } from "@/components/sections/intermediair/ValuePropositionSection"
import { IntermediairFeaturesSection } from "@/components/sections/intermediair/FeaturesSection"
import { IntermediairPainPointsSection } from "@/components/sections/intermediair/PainPointsSection"
import { IntermediairHowItWorksSection } from "@/components/sections/intermediair/HowItWorksSection"
import { IntermediairResultSection } from "@/components/sections/intermediair/ResultSection"
import { IntermediairWaitlistSection } from "@/components/sections/intermediair/WaitlistSection"
import { IntermediairContactSection } from "@/components/sections/intermediair/ContactSection"

export default function IntermediairPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <IntermediairHeroSection />
        <IntermediairValuePropositionSection />
        <IntermediairFeaturesSection />
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
