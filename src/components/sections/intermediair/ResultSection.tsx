export function IntermediairResultSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">Het resultaat</h2>
          <p className="text-xl md:text-2xl font-medium mb-8">
            Meer klanten ondersteunen met minder inspanning, betere resultaten en tevreden klanten die zich 
            volledig kunnen richten op innovatie.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-3">Efficiënter</h3>
              <p>Bespaar kostbare tijd door automatisering van repetitieve taken</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-3">Schaalbaarder</h3>
              <p>Groei je klantenbestand zonder evenredige groei in werklast</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-3">Winstgevender</h3>
              <p>Verhoog je marge door waardevolle diensten te leveren met minder kosten</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
