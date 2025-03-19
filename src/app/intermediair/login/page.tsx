import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { LoginForm } from "@/components/login-form"
import { WaitlistForm } from "@/components/waitlist"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'WBSO Adviseur Dashboard Login | Voor intermediairs | Subrise',
  description: 'Log in op het WBSO adviseur dashboard en beheer efficiënt uw klantenportfolio.',
  keywords: 'WBSO adviseur login, WBSO intermediair dashboard, WBSO adviesbureau portal, WBSO klantenbeheer, WBSO dienstverlening software, WBSO expert platform',
  alternates: {
    canonical: 'https://www.subrise.eu/intermediair/login',
  },
  openGraph: {
    title: 'WBSO Adviseur Dashboard Login | Voor intermediairs | Subrise',
    description: 'Log in op het WBSO adviseur dashboard en beheer efficiënt uw klantenportfolio met ons geavanceerde platform.',
    url: 'https://www.subrise.eu/intermediair/login',
  },
}

export default function IntermediairLoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="py-16 bg-gradient-to-br from-indigo-50 to-indigo-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Inloggen als intermediair
                </h1>
                <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full mb-4"></div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Heeft u al een account? Log hieronder in om toegang te krijgen tot uw Subrise dashboard.
                </p>
              </div>
              
              <div className="mb-12">
                <LoginForm isIntermediary={true} />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-200 text-indigo-700 text-sm font-medium mb-2">
                  Beperkte plaatsen
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Nog geen account?
                </h2>
                <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full mb-4"></div>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                  We laten mondjesmaat intermediairs toe om Subrise als eerste te gebruiken. Wil jij als een van de eersten profiteren? Meld je dan nu aan voor de wachtlijst!
                </p>
              </div>
              <div className="flex justify-center">
                <div className="w-full max-w-md">
                  <WaitlistForm isIntermediary={true} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
} 