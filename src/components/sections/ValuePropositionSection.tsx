import { Highlight } from "@/components/ui/highlight"

export function ValuePropositionSection() {
  return (
    <section className="py-12 bg-gradient-to-r from-corporate-600 to-corporate-800 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl font-medium">
            Met Subrise vraag je <Highlight className="bg-white/20 text-white">zelf</Highlight> WBSO aan in een gestroomlijnd, AI- ondersteund platform – <Highlight className="bg-white/20 text-white">sneller</Highlight>, <Highlight className="bg-white/20 text-white">eenvoudiger</Highlight> en tot wel <Highlight className="bg-white/20 text-white">70% voordeliger</Highlight> dan traditionele subsidieadviseurs.
          </p>
        </div>
      </div>
    </section>
  )
} 
