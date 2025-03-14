import Image from "next/image"

export function IntermediairHowItWorksSection() {
  return (
    <section id="hoe-werkt-het" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-2">
              In vier stappen
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Zo werkt Subrise voor jou als intermediair</h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full"></div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl space-y-24">
          <StepItem
            number={1}
            title="Eenvoudige aanvraagbegeleiding"
            description="Onze AI helpt je bij het snel en nauwkeurig opstellen van sterke WBSO-aanvragen. Technische details van klanten worden automatisch vertaald naar heldere, RVO-proof aanvragen."
            imageSrc="/images/ai-assisted.jpg"
            imageAlt="AI-assisted application process"
            imageRight={true}
          />

          <StepItem
            number={2}
            title="Automatische compliance & rapportage"
            description="Real-time inzicht in de voortgang van klantprojecten en automatische controles op naleving van de subsidievoorwaarden. Proactieve signalering voorkomt problemen bij controles."
            imageSrc="/images/real-time-progress.jpg"
            imageAlt="Real-time progress reporting"
            imageRight={false}
          />

          <StepItem
            number={3}
            title="Slimme urenregistratie & integratie"
            description="Door integratie met <a href='https://timiapp.com' target='_blank' rel='noopener noreferrer' className='text-indigo-600 hover:underline'>Timi</a> worden klanturen automatisch gekoppeld aan projectvoortgang en administratieve vereisten."
            imageSrc="/images/time-tracking.jpg"
            imageAlt="Time tracking integration"
            imageRight={true}
          />

          <StepItem
            number={4}
            title="Eén-klik aanvraag en overzichtelijke controle"
            description="Minder papierwerk, minder fouten. Alle documentatie overzichtelijk en direct beschikbaar voor elke RVO-controle."
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
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-lg">
            {number}
          </div>
          <h3 className="ml-4 text-2xl font-bold text-gray-900">{title}</h3>
        </div>
        <p className="text-gray-500 bg-indigo-50 p-6 rounded-xl text-lg" dangerouslySetInnerHTML={{ __html: description }}>
        </p>
      </div>
      <div className={`order-1 ${imageRight ? 'lg:order-2' : ''} flex justify-center`}>
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-amber-400 rounded-3xl blur opacity-30"></div>
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
