import Image from "next/image"

export function IntermediairPainPointsSection() {
  return (
    <section
      id="uitdagingen"
      className="py-20 bg-gradient-to-br from-indigo-50 to-indigo-100 relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-indigo-500/10 blur-3xl rounded-full -ml-20 -mt-20"></div>
      <div className="absolute bottom-0 right-0 w-1/4 h-1/2 bg-amber-500/10 blur-3xl rounded-full -mr-20"></div>
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-200 text-indigo-700 text-sm font-medium mb-2">
              Uitdagingen voor intermediairs
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
              Veelvoorkomende uitdagingen voor intermediairs
            </h2>
            <div className="w-20 h-1 bg-indigo-500 rounded-full"></div>
            <h3 className="text-xl font-semibold mt-4">Herkenbaar?</h3>
            <ul className="space-y-4 mt-6">
              <PainPoint text="We besteden te veel tijd aan handmatige rapportages en controle van klantgegevens." />
              <PainPoint text="We willen klanten een betere ervaring bieden, maar lopen tegen administratieve beperkingen aan." />
              <PainPoint text="We zoeken naar manieren om efficiënter te werken en meer klanten tegelijk te helpen." />
              <PainPoint text="Compliance-controles kosten ons onnodig veel tijd en energie." />
              <PainPoint text="We missen overzicht en directe inzichten in alle lopende aanvragen." />
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-amber-400 rounded-3xl blur opacity-30"></div>
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
                <Image
                  src="/images/paper.jpg"
                  alt="Frustrated business person with paperwork"
                  width={600}
                  height={400}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-gray-700 text-xl leading-relaxed italic">
            Precies daarom ontwikkelden wij Subrise speciaal voor intermediairs. Het platform stroomlijnt jouw processen 
            en verhoogt de kwaliteit van je dienstverlening, zodat jij en je klanten zich volledig op 
            <span className="font-semibold text-indigo-600"> innovatie</span> kunnen richten.
          </p>
        </div>
      </div>
    </section>
  )
}

interface PainPointProps {
  text: string
}

function PainPoint({ text }: PainPointProps) {
  return (
    <li className="flex items-start bg-white p-5 rounded-xl shadow-sm transition-all hover:shadow-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mr-3 h-6 w-6 text-indigo-500 mt-0.5 flex-shrink-0"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
      <span>&ldquo;{text}&rdquo;</span>
    </li>
  )
} 
