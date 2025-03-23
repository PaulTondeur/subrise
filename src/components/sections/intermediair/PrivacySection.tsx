import Link from "next/link";
import { CheckCircle } from "lucide-react";

export function IntermediairPrivacySection() {
  return (
    <section
      id="privacy"
      className="py-20 bg-gradient-to-br from-indigo-50 to-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-2">
              Veilig werken met klantgegevens
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">
              Privacy Gegarandeerd
            </h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 text-lg md:text-xl">
              Bescherm de innovaties van uw klanten met onze EU-gecertificeerde beveiliging
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="max-w-xl md:text-center mx-auto mb-8">
            <p className="text-gray-600">
              Als intermediair werkt u met vertrouwelijke informatie van uw klanten. Subrise is
              gebouwd met &quot;
              <Link
                href="https://madewithsunrise.com"
                target="_blank"
                className="text-indigo-600 hover:underline"
              >
                Made With Sunrise
              </Link>
              &quot;, waardoor u met een gerust hart WBSO-aanvragen kunt verwerken in een veilige en
              afgeschermde AI-omgeving.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-2">
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start mb-3">
                <CheckCircle className="text-indigo-500 h-6 w-6 mr-2" />
                <h3 className="font-semibold text-gray-800">Gescheiden klantomgevingen</h3>
              </div>
              <p className="text-gray-600 text-sm ml-7">
                Elke klant krijgt een eigen afgeschermde omgeving. Zo blijven projecten en
                innovaties van verschillende klanten strikt gescheiden en veilig.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start mb-3">
                <CheckCircle className="text-indigo-500 h-6 w-6 mr-2" />
                <h3 className="font-semibold text-gray-800">Europese dataverwerking</h3>
              </div>
              <p className="text-gray-600 text-sm ml-7">
                Als intermediair kunt u uw klanten garanderen dat hun gegevens binnen de EU blijven
                en voldoen aan alle GDPR-richtlijnen. Perfect voor bedrijven die hier strenge eisen
                aan stellen.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-start mb-3">
                <CheckCircle className="text-indigo-500 h-6 w-6 mr-2" />
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
                <CheckCircle className="text-indigo-500 h-6 w-6 mr-2" />
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
              Met Subrise kunt u zonder zorgen AI inzetten om WBSO-aanvragen efficiënt te verwerken,
              terwijl uw klanten verzekerd zijn dat hun innovaties en bedrijfsgeheimen in veilige
              handen blijven.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
