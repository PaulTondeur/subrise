import Image from "next/image"
import { Highlight } from "@/components/ui/highlight"

export function PainPointsSection() {
  return (
    <section
      id="uitdagingen"
      className="py-20 bg-gradient-to-br from-corporate-50 to-corporate-100 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative">
      <div className="space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-corporate-200 text-corporate-700 text-sm font-medium mb-2">
          Veelvoorkomende WBSO-uitdagingen
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
          Herkenbaar?
        </h2>
        <div className="w-20 h-1 bg-corporate-500 rounded-full"></div>
        </div>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start mt-6">
          <div className="space-y-6">
            <ul className="space-y-4">
              <PainPoint text="Het kost ons te veel tijd en moeite om de WBSO-administratie bij te houden." highlight="te veel tijd en moeite" />
              <PainPoint text="We schakelen een adviseur in, maar verliezen daardoor een flink deel van onze subsidie." highlight="flink deel van onze subsidie" />
              <PainPoint text="We willen zelf aanvragen, maar weten niet zeker of we het goed doen." />
              <PainPoint text="We zouden graag meer inzicht hebben in onze subsidieaanvraag en of we nog op schema zitten." />
              <PainPoint text="Kan ik deze uren schrijven op het WBSO project?" />
            </ul>
          </div>
          <div className="flex mx-auto">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-corporate-400 to-accent2-400 rounded-3xl blur opacity-30"></div>
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
            Dat is precies waarom we Subrise hebben ontwikkeld. Ons platform neemt de complexiteit weg, zodat jij
            je kunt focussen op waar het echt om draait: <Highlight className="text-corporate-600">innovatie</Highlight>. 
            Wij hebben als ondernemers al veel met de WBSO te maken gehad en weten daarom precies wat belangrijk is voor jou.
          </p>
        </div>
      </div>
    </section>
  )
}

interface PainPointProps {
  text: string
  highlight?: string
}

function PainPoint({ text, highlight }: PainPointProps) {
  const parts = highlight 
    ? text.split(highlight)
    : [text]

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
        className="mr-3 h-6 w-6 text-corporate-500 mt-0.5 flex-shrink-0"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
      <span>
        &ldquo;
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {highlight && i < parts.length - 1 && (
              <Highlight className="bg-yellow-100 text-gray-900">{highlight}</Highlight>
            )}
          </span>
        ))}
        &rdquo;
      </span>
    </li>
  )
} 
