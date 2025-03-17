export function IntermediairFeaturesSection() {
  return (
    <section id="voordelen" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-2">
              Voor intermediairs
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Waarom kiezen WBSO intermediairs voor Subrise?</h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full"></div>
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-8 py-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            }
            title="Verhoog je efficiëntie"
            description="Werk slimmer, niet harder. Onze AI-gebaseerde assistentie versnelt het schrijven van de aanvraag, waardoor je meer klanten kunt bedienen in minder tijd."
          />
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
            title="Lagere kosten, hogere marges"
            description="Automatiseer tijdrovende taken en beperk administratieve kosten, waardoor je concurrerende tarieven kunt bieden en toch gezonde marges behoudt."
          />
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            }
            title="Altijd RVO compliant"
            description="Onze slimme compliance-checks geven real-time inzicht en zekerheid dat elke aanvraag voldoet aan de RVO-eisen."
          />
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            }
            title="Eenvoudig samenwerken"
            description="Krijg direct overzicht van alle klantprojecten, voortgang en statusupdates. Je behoudt de controle, terwijl je klanten meer transparantie ervaren."
          />
          <FeatureCard
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            }
            title="Veilig en betrouwbaar"
            description="Volledig versleuteld en GDPR-proof, gehost binnen de EU. Jouw data en die van je klanten blijven veilig en beschermd."
          />
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="feature-card flex flex-col items-start space-y-4 p-6 rounded-xl transition-all hover:shadow-lg border border-gray-100 bg-white h-full">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 text-center w-full">{title}</h3>
      <p className="text-gray-500 text-center">{description}</p>
    </div>
  )
} 
