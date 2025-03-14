import { WaitlistForm } from "@/components/waitlist-form"

export function IntermediairWaitlistSection() {
  return (
    <section
      id="waitlist"
      className="py-20 bg-gradient-to-br from-indigo-50 to-indigo-100 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-indigo-500/10 blur-3xl rounded-full -mr-20"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-amber-500/10 blur-3xl rounded-full -ml-20"></div>
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-200 text-indigo-700 text-sm font-medium mb-2">
              Beperkte plaatsen beschikbaar
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
              Als een van de eersten Subrise gebruiken?
            </h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 md:text-xl mt-4">
              We laten mondjesmaat bedrijven toe om Subrise als eerste te gebruiken. Wil jij als een van de eersten profiteren? Meld je dan nu aan voor de wachtlijst!
            </p>
          </div>
          <div className="w-full max-w-md space-y-4 mt-6">
            <WaitlistForm isIntermediary={true} />
          </div>
        </div>
      </div>
    </section>
  )
} 
