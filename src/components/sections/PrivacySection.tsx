import Link from "next/link";
import { CheckCircle } from "lucide-react";

export function PrivacySection() {
  return (
    <section
      id="privacy"
      className="py-20 bg-gradient-to-br from-corporate-50 to-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-corporate-100 text-corporate-700 text-sm font-medium mb-2">
              AI-ondersteuning, veilig & beschermd
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
              Bescherm uw Innovatie
            </h2>
            <div className="w-20 h-1 bg-corporate-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 text-lg md:text-xl">
              Uw Innovaties, onze beveiliging. 100% binnen de EU.
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="max-w-xl md:text-center mx-auto mb-8">
            <p className="text-gray-600">
              Bij Subrise begrijpen we dat innovatieve bedrijven maximale controle en veiligheid
              over hun gegevens willen. Daarom is Subrise gemaakt met{" "}
              <Link
                href="https://madewithsunrise.com"
                target="_blank"
                className="text-indigo-600 hover:underline"
              >
                Made With Sunrise
              </Link>{" "}
              dat zorgt voor een veilige en afgeschermde AI-omgeving. Dit biedt de volgende
              voordelen:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-2">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start mb-3">
                <CheckCircle className="text-corporate-500 h-6 w-6 mr-2" />
                <h3 className="font-semibold text-gray-800">Gegevens blijven 100% binnen de EU</h3>
              </div>
              <p className="text-gray-600 text-sm ml-7">
                Uw vertrouwelijke innovaties worden uitsluitend verwerkt en opgeslagen binnen
                Europa. Zo voldoen we aan de strengste GDPR-richtlijnen en voorkomt u dat uw
                gegevens buiten de EU terechtkomen.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start mb-3">
                <CheckCircle className="text-corporate-500 h-6 w-6 mr-2" />
                <h3 className="font-semibold text-gray-800">
                  AI draait in onze eigen beveiligde omgeving
                </h3>
              </div>
              <p className="text-gray-600 text-sm ml-7">
                Wij verwerken uw gegevens uitsluitend binnen onze eigen afgeschermde infrastructuur.
                Dit betekent dat uw data niet wordt gedeeld met externe AI-platformen en niet
                toegankelijk is voor partijen buiten Subrise.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start mb-3">
                <CheckCircle className="text-corporate-500 h-6 w-6 mr-2" />
                <h3 className="font-semibold text-gray-800">Geen AI-training met uw data</h3>
              </div>
              <p className="text-gray-600 text-sm ml-7">
                In tegenstelling tot commerciële AI-diensten, wordt uw data bij ons niet gebruikt om
                AI-modellen verder te trainen of te verbeteren. Uw innovaties blijven exclusief van
                u.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start mb-3">
                <CheckCircle className="text-corporate-500 h-6 w-6 mr-2" />
                <h3 className="font-semibold text-gray-800">End-to-end encryptie</h3>
              </div>
              <p className="text-gray-600 text-sm ml-7">
                Uw data is altijd versleuteld, zowel tijdens verzending als opslag, zodat deze niet
                toegankelijk is voor onbevoegden.
              </p>
            </div>
          </div>

          <div className="mt-12 max-w-xl mx-auto text-center">
            <p className="text-gray-700 text-xl leading-relaxed italic">
              Met Subrise kunt u met een gerust hart uw WBSO-aanvragen indienen, wetende dat uw data
              veilig, privé en volledig binnen Europa blijft.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
