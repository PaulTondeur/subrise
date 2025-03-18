import { MWSText } from "../ui/MWSText"
import Link from "next/link"

export function PrivacySection() {
  return (
    <section id="privacy" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-corporate-100 text-corporate-700 text-sm font-medium mb-2">
              AI-ondersteuning, veilige & beschermde 
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Bescherm uw Innovatie</h2>
            <div className="w-20 h-1 bg-corporate-500 mx-auto rounded-full"></div>
          </div>
        </div>
        <div className="flex flex-col gap-4 mx-auto max-w-4xl">
          <p className="max-w-[600px] text-gray-700 md:text-xl font-medium">
            Uw Innovaties, onze beveiliging. 100% binnen de EU.
          </p>
          <p className="max-w-[600px] text-gray-500">
            Bij Subrise begrijpen we dat innovatieve bedrijven maximale controle en veiligheid over hun gegevens willen. Daarom maken is Subrise <Link href="https://madewithsunrise.com" target="_blank"><MWSText>Made With Sunrise</MWSText></Link>, dat zorgt voor een veilige en afgeschermde AI-omgeving. Dit biedt de volgende voordelen:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-start mb-3">
                <span className="text-corporate-500 text-xl mr-2">✅</span>
                <h3 className="font-semibold text-gray-800">Gegevens blijven 100% binnen de EU</h3>
              </div>
              <p className="text-gray-600 text-sm ml-7">
                Uw vertrouwelijke innovaties worden uitsluitend verwerkt en opgeslagen binnen Europa. Zo voldoen we aan de strengste GDPR-richtlijnen en voorkomt u dat uw gegevens buiten de EU terechtkomen.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-start mb-3">
                <span className="text-corporate-500 text-xl mr-2">✅</span>
                <h3 className="font-semibold text-gray-800">AI draait in onze eigen beveiligde omgeving</h3>
              </div>
              <p className="text-gray-600 text-sm ml-7">
                Wij verwerken uw gegevens uitsluitend binnen onze eigen afgeschermde infrastructuur. Dit betekent dat uw data niet wordt gedeeld met externe AI-platformen en niet toegankelijk is voor partijen buiten Subrise.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-start mb-3">
                <span className="text-corporate-500 text-xl mr-2">✅</span>
                <h3 className="font-semibold text-gray-800">Geen AI-training met uw data</h3>
              </div>
              <p className="text-gray-600 text-sm ml-7">
                In tegenstelling tot commerciële AI-diensten, wordt uw data bij ons niet gebruikt om AI-modellen verder te trainen of te verbeteren. Uw innovaties blijven exclusief van u.
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-lg border border-gray-100 shadow-sm">
              <div className="flex items-start mb-3">
                <span className="text-corporate-500 text-xl mr-2">✅</span>
                <h3 className="font-semibold text-gray-800">End-to-end encryptie</h3>
              </div>
              <p className="text-gray-600 text-sm ml-7">
                Uw data is altijd versleuteld, zowel tijdens verzending als opslag, zodat deze niet toegankelijk is voor onbevoegden.
              </p>
            </div>
          </div>

          <p className="max-w-[600px] text-gray-500 mt-4">
            Met Subrise kunt u met een gerust hart uw WBSO-aanvragen indienen, wetende dat uw data veilig, privé en volledig binnen Europa blijft.
          </p>
        </div>
      </div>
    </section>
  )
} 