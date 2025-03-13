import Image from "next/image"

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-corporate-100 text-corporate-700 text-sm font-medium mb-2">
              Stap voor stap
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Hoe werkt het?</h2>
            <div className="w-20 h-1 bg-corporate-500 mx-auto rounded-full"></div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl space-y-24">
          <StepItem
            number={1}
            title="Eenvoudig je aanvraag opstellen"
            description="Onze AI-gebaseerde begeleiding helpt je stap voor stap bij het schrijven van een sterke WBSO-aanvraag. Het platform stelt slimme vragen in jouw taal en helpt je jouw innovaties helder te formuleren. Onze AI begrijpt technische uitleg en zet deze om in een aanvraag die voldoet aan de RVO-vereisten."
            imageSrc="/images/ai-assisted.jpg"
            imageAlt="AI-assisted application process"
            imageRight={true}
          />

          <StepItem
            number={2}
            title="Automatische voortgangsrapportage & compliance-checks"
            description="Krijg real-time inzicht in de voortgang van je project en controleer direct of de geboekte uren voldoen aan je aanvraag. Onze AI analyseert en signaleert afwijkingen, zodat jij erop kan vertrouwen dat je RVO-proof bent."
            imageSrc="/images/real-time-progress.jpg"
            imageAlt="Real-time progress reporting"
            imageRight={false}
          />

          <StepItem
            number={3}
            title="Urenregistratie en documentatie gekoppeld"
            description="Dankzij de integratie met Timi worden je R&D-uren die binnen je aanvraag passen automatisch gelogd en gekoppeld aan je projectvoortgang."
            imageSrc="/images/time-tracking.jpg"
            imageAlt="Time tracking integration"
            imageRight={true}
          />

          <StepItem
            number={4}
            title="Aanvraag en controle in één klik"
            description="Geen gedoe met lange formulieren – ons platform automatiseert een volledige en correcte aanvraag. Bij een RVO-controle heb je direct alle documentatie overzichtelijk bij elkaar, zodat je altijd goed voorbereid bent."
            imageSrc="/images/one-click-application.jpg"
            imageAlt="One-click application and control"
            imageRight={false}
          />
        </div>
      </div>
    </section>
  )
}

interface StepItemProps {
  number: number
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  imageRight: boolean
}

function StepItem({ number, title, description, imageSrc, imageAlt, imageRight }: StepItemProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
      <div className={`order-2 ${imageRight ? 'lg:order-1' : ''}`}>
        <div className="flex items-center mb-6">
          <div className="flex h-12 w-12 min-w-[3rem] flex-shrink-0 items-center justify-center rounded-full bg-corporate-600 text-white text-xl shadow-md ring-2 ring-corporate-500/20">
            {number}
          </div>
          <h3 className="ml-4 text-2xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-500 bg-corporate-50 p-6 rounded-xl text-lg">
          {description}
        </p>
      </div>
      <div className={`order-1 ${imageRight ? 'lg:order-2' : ''} flex justify-center`}>
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-corporate-400 to-accent2-400 rounded-3xl blur opacity-30"></div>
          <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={500}
              height={350}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 