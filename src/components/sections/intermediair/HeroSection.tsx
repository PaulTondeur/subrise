import Image from "next/image"

export function IntermediairHeroSection() {
  return (
    <section className="py-20 md:py-28 hero-pattern relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-500/10 blur-3xl rounded-full -mr-20"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-accent2-500/10 blur-3xl rounded-full -ml-20"></div>
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-2">
              Subrise voor Intermediairs
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900">
              Subsidieaanvragen veel efficiënter met AI-oplossingen
            </h1>
            <p className="max-w-[600px] text-gray-700 text-lg md:text-xl font-medium">
              Bespaar tijd. Investeer meer in je klanten.
            </p>
            <p className="text-gray-500">
              WBSO aanvragen is meer dan aanvragen indienen. Het draait om sterke klantrelaties en een diep begrip van hun innovaties. Subrise automatiseert het repetitieve werk, zodat jij je kunt focussen op wat écht telt: vanuit een vertrouwensrelatie je klanten adviseren.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#wachtlijst"
                className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
              >
                Meld je aan voor de wachtlijst{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-4 w-4"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="#hoe-werkt-het"
                className="inline-flex items-center justify-center px-6 py-3 border border-indigo-300 hover:bg-indigo-50 text-indigo-700 rounded-full"
              >
                Hoe werkt het{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2 h-4 w-4"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-accent2-400 rounded-3xl blur opacity-30"></div>
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
                <Image
                  src="/images/whiteboard.jpg"
                  alt="Team working on innovation projects"
                  width={600}
                  height={400}
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 
