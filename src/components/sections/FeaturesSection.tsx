export function FeaturesSection() {
  return (
    <section id="voordelen" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-corporate-100 text-corporate-700 text-sm font-medium mb-2">
              Waarom Subrise?
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Voordelen</h2>
            <div className="w-20 h-1 bg-corporate-500 mx-auto rounded-full"></div>
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
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            }
            title="Volledige controle"
            description="Je regelt je WBSO-aanvraag zelf, zonder afhankelijkheid van derden."
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
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            }
            title="Maximaal voordeel"
            description="Geen bemiddelingskosten, jij behoudt 100% van je subsidie."
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
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            }
            title="Slimme AI-assistentie"
            description="Ondersteuning bij het schrijven van je aanvraag en naleving van de WBSO-regels."
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
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            }
            title="Altijd inzicht in je voortgang"
            description="Direct overzicht van je aanvraagstatus, real-time rapportages en controle-checks."
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
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            }
            title="Veilig en compliant"
            description="Gehost in de EU, privacyvriendelijke AI, volledig GDPR-proof. Jouw data blijft binnen Europa en lekt niet naar derden."
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
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
            title="24 uur per dag"
            description="Toegang tot advies, zonder te wachten, voor iedereen binnen je team."
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
    <div className="feature-card flex flex-col items-start space-y-4 p-6 rounded-xl transition-all hover:shadow-lg border border-gray-100 bg-white">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-corporate-100 text-corporate-600">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      <p className="text-gray-500">{description}</p>
    </div>
  )
} 
