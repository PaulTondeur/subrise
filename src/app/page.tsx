import Image from "next/image"
import { MainNav } from "@/components/main-nav"
import { WaitlistForm } from "@/components/waitlist-form"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-white text-corporate-700 rounded-md p-1 w-8 h-8 flex items-center justify-center font-bold">
              S
            </div>
            <span className="text-xl font-bold">SubRise</span>
          </div>
          <div className="hidden md:block">
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#waitlist"
              className="inline-flex items-center justify-center px-4 py-2 bg-corporate-600 hover:bg-corporate-700 text-white rounded-full"
            >
              Plaats mij op de wachtlijst
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 hero-pattern relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-corporate-500/10 blur-3xl rounded-full -mr-20"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-accent2-500/10 blur-3xl rounded-full -ml-20"></div>
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-corporate-100 text-corporate-700 text-sm font-medium mb-2">
                  WBSO-subsidie vereenvoudigd
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900">
                  WBSO-aanvragen eenvoudiger dan ooit
                </h1>
                <p className="max-w-[600px] text-gray-700 md:text-xl font-medium">
                  Bespaar tijd. Houd 100% van je subsidie. Alles in eigen beheer.
                </p>
                <p className="text-gray-500">
                  Innovatie stimuleren zou eenvoudig moeten zijn. Toch worstelen veel bedrijven met de administratieve
                  last van WBSO-aanvragen en rapportages. Uren aan papierwerk, complexe voorwaarden en hoge kosten voor
                  externe bemiddelaars? Dat kan anders.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#waitlist"
                    className="inline-flex items-center justify-center px-6 py-3 bg-corporate-600 hover:bg-corporate-700 text-white rounded-full"
                  >
                    Plaats mij op de wachtlijst{" "}
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
                    href="#how-it-works"
                    className="inline-flex items-center justify-center px-6 py-3 border border-corporate-300 hover:bg-corporate-50 text-corporate-700 rounded-full"
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
                  <div className="absolute -inset-1 bg-gradient-to-r from-corporate-400 to-accent2-400 rounded-3xl blur opacity-30"></div>
                  <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
                    <Image
                      src="/images/team-working.jpg"
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

        {/* Main Value Proposition */}
        <section className="py-12 bg-gradient-to-r from-corporate-600 to-corporate-800 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl font-medium">
                Met SubRise vraag je zelf WBSO aan in een gestroomlijnd, AI- ondersteund platform – sneller, eenvoudiger
                en tot wel 70% voordeliger dan traditionele subsidieadviseurs.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-corporate-100 text-corporate-700 text-sm font-medium mb-2">
                  Waarom SubRise?
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-gray-900">Voordelen</h2>
                <div className="w-20 h-1 bg-corporate-500 mx-auto rounded-full"></div>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl items-center gap-8 py-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="feature-card flex flex-col items-start space-y-4 p-6 rounded-xl transition-all hover:shadow-lg border border-gray-100 bg-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-corporate-100 text-corporate-600">
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
                </div>
                <h3 className="text-xl font-bold text-gray-900">Volledige controle</h3>
                <p className="text-gray-500">Je regelt je WBSO-aanvraag zelf, zonder afhankelijkheid van derden.</p>
              </div>
              <div className="feature-card flex flex-col items-start space-y-4 p-6 rounded-xl transition-all hover:shadow-lg border border-gray-100 bg-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-corporate-100 text-corporate-600">
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
                </div>
                <h3 className="text-xl font-bold text-gray-900">Maximaal voordeel</h3>
                <p className="text-gray-500">Geen bemiddelingskosten, jij behoudt 100% van je subsidie.</p>
              </div>
              <div className="feature-card flex flex-col items-start space-y-4 p-6 rounded-xl transition-all hover:shadow-lg border border-gray-100 bg-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-corporate-100 text-corporate-600">
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
                </div>
                <h3 className="text-xl font-bold text-gray-900">Slimme AI-assistentie</h3>
                <p className="text-gray-500">
                  Ondersteuning bij het schrijven van je aanvraag en naleving van de WBSO-regels.
                </p>
              </div>
              <div className="feature-card flex flex-col items-start space-y-4 p-6 rounded-xl transition-all hover:shadow-lg border border-gray-100 bg-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-corporate-100 text-corporate-600">
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
                </div>
                <h3 className="text-xl font-bold text-gray-900">Altijd inzicht in je voortgang</h3>
                <p className="text-gray-500">
                  Direct overzicht van je aanvraagstatus, real-time rapportages en controle-checks.
                </p>
              </div>
              <div className="feature-card flex flex-col items-start space-y-4 p-6 rounded-xl transition-all hover:shadow-lg border border-gray-100 bg-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-corporate-100 text-corporate-600">
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
                </div>
                <h3 className="text-xl font-bold text-gray-900">Veilig en compliant</h3>
                <p className="text-gray-500">
                  Gehost in de EU, privacyvriendelijke AI, volledig GDPR-proof. Jouw data blijft binnen Europa en lekt
                  niet naar derden.
                </p>
              </div>
              <div className="feature-card flex flex-col items-start space-y-4 p-6 rounded-xl transition-all hover:shadow-lg border border-gray-100 bg-white">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-corporate-100 text-corporate-600">
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
                </div>
                <h3 className="text-xl font-bold text-gray-900">24 uur per dag</h3>
                <p className="text-gray-500">Toegang tot advies, zonder te wachten, voor iedereen binnen je team.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section
          id="pain-points"
          className="py-20 bg-gradient-to-br from-corporate-50 to-corporate-100 relative overflow-hidden"
        >
          <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-corporate-500/10 blur-3xl rounded-full -ml-20 -mt-20"></div>
          <div className="absolute bottom-0 right-0 w-1/4 h-1/2 bg-accent2-500/10 blur-3xl rounded-full -mr-20"></div>
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-corporate-200 text-corporate-700 text-sm font-medium mb-2">
                  Veelvoorkomende uitdagingen
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
                  Uitdagingen bij WBSO
                </h2>
                <div className="w-20 h-1 bg-corporate-500 rounded-full"></div>
                <ul className="space-y-4 mt-6">
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
                    <span>&ldquo;Het kost ons te veel tijd en moeite om de WBSO-administratie bij te houden.&rdquo;</span>
                  </li>
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
                      &ldquo;We schakelen een adviseur in, maar verliezen daardoor een flink deel van onze subsidie.&rdquo;
                    </span>
                  </li>
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
                    <span>&ldquo;We willen zelf aanvragen, maar weten niet zeker of we het goed doen.&rdquo;</span>
                  </li>
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
                      &ldquo;We zouden graag meer inzicht hebben in onze subsidieaanvraag en of we nog op schema zitten.&rdquo;
                    </span>
                  </li>
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
                    <span>&ldquo;Kan ik deze uren schrijven op het WBSO project?&rdquo;</span>
                  </li>
                </ul>
                <p className="text-gray-500 mt-6 bg-white p-5 rounded-xl shadow-sm">
                  Dat is precies waarom we SubRise hebben ontwikkeld. Ons platform neemt de complexiteit weg, zodat jij
                  je kunt focussen op waar het echt om draait: innovatie. Wij hebben als ondernemers al veel met de WBSO
                  te maken gehad en weten daarom precies wat belangrijk is voor jou.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-corporate-400 to-accent2-400 rounded-3xl blur opacity-30"></div>
                  <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
                    <Image
                      src="/images/frustrated-business.jpg"
                      alt="Frustrated business person with paperwork"
                      width={600}
                      height={400}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
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
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <div className="flex items-center mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-corporate-600 text-white font-bold text-lg">
                      1
                    </div>
                    <h3 className="ml-4 text-2xl font-bold text-gray-900">Eenvoudig je aanvraag opstellen</h3>
                  </div>
                  <p className="text-gray-500 bg-corporate-50 p-6 rounded-xl text-lg">
                    Onze AI-gebaseerde begeleiding helpt je stap voor stap bij het schrijven van een sterke
                    WBSO-aanvraag. Het platform stelt slimme vragen in jouw taal en helpt je jouw innovaties helder te
                    formuleren. Onze AI begrijpt technische uitleg en zet deze om in een aanvraag die voldoet aan de
                    RVO-vereisten.
                  </p>
                </div>
                <div className="order-1 lg:order-2 flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-corporate-400 to-accent2-400 rounded-3xl blur opacity-30"></div>
                    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
                      <Image
                        src="/images/ai-assisted.jpg"
                        alt="AI-assisted application process"
                        width={500}
                        height={350}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-corporate-400 to-accent2-400 rounded-3xl blur opacity-30"></div>
                    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
                      <Image
                        src="/images/real-time-progress.jpg"
                        alt="Real-time progress reporting"
                        width={500}
                        height={350}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-corporate-600 text-white font-bold text-lg">
                      2
                    </div>
                    <h3 className="ml-4 text-2xl font-bold text-gray-900">
                      Automatische voortgangsrapportage & compliance-checks
                    </h3>
                  </div>
                  <p className="text-gray-500 bg-corporate-50 p-6 rounded-xl text-lg">
                    Krijg real-time inzicht in de voortgang van je project en controleer direct of de geboekte uren
                    voldoen aan je aanvraag. Onze AI analyseert en signaleert afwijkingen, zodat jij erop kan vertrouwen
                    dat je RVO-proof bent.
                  </p>
                </div>
              </div>

              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <div className="flex items-center mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-corporate-600 text-white font-bold text-lg">
                      3
                    </div>
                    <h3 className="ml-4 text-2xl font-bold text-gray-900">
                      Urenregistratie en documentatie gekoppeld
                    </h3>
                  </div>
                  <p className="text-gray-500 bg-corporate-50 p-6 rounded-xl text-lg">
                    Dankzij de integratie met Timi worden je R&D-uren die binnen je aanvraag passen automatisch gelogd
                    en gekoppeld aan je projectvoortgang.
                  </p>
                </div>
                <div className="order-1 lg:order-2 flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-corporate-400 to-accent2-400 rounded-3xl blur opacity-30"></div>
                    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
                      <Image
                        src="/images/time-tracking.jpg"
                        alt="Time tracking integration"
                        width={500}
                        height={350}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-corporate-400 to-accent2-400 rounded-3xl blur opacity-30"></div>
                    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
                      <Image
                        src="/images/one-click-application.jpg"
                        alt="One-click application and control"
                        width={500}
                        height={350}
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-corporate-600 text-white font-bold text-lg">
                      4
                    </div>
                    <h3 className="ml-4 text-2xl font-bold text-gray-900">Aanvraag en controle in één klik</h3>
                  </div>
                  <p className="text-gray-500 bg-corporate-50 p-6 rounded-xl text-lg">
                    Geen gedoe met lange formulieren – ons platform automatiseert een volledige en correcte aanvraag.
                    Bij een RVO-controle heb je direct alle documentatie overzichtelijk bij elkaar, zodat je altijd goed
                    voorbereid bent.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Result Section */}
        <section className="py-20 bg-gradient-to-r from-corporate-600 to-corporate-800 text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">Het resultaat?</h2>
              <p className="text-xl md:text-2xl font-medium">
                Minder administratie, meer zekerheid en méér van je subsidie beschikbaar voor innovatie – precies
                waarvoor het bedoeld is.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          id="waitlist"
          className="py-20 bg-gradient-to-br from-corporate-50 to-corporate-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-corporate-500/10 blur-3xl rounded-full -mr-20"></div>
          <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-accent2-500/10 blur-3xl rounded-full -ml-20"></div>
          <div className="container mx-auto px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-block px-3 py-1 rounded-full bg-corporate-200 text-corporate-700 text-sm font-medium mb-2">
                  Beperkte plaatsen
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">
                  Meld je aan voor de wachtlijst
                </h2>
                <div className="w-20 h-1 bg-corporate-500 mx-auto rounded-full"></div>
                <p className="text-gray-500 md:text-xl mt-4">
                  We laten mondjesmaat bedrijven toe om SubRise als eerste te gebruiken. Wil jij als een van de eersten
                  profiteren? Meld je dan nu aan voor de wachtlijst!
                </p>
              </div>
              <div className="w-full max-w-md space-y-4 mt-6">
                <WaitlistForm />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block px-3 py-1 rounded-full bg-corporate-100 text-corporate-700 text-sm font-medium mb-2">
                  Hulp nodig?
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">Heb je vragen?</h2>
                <div className="w-20 h-1 bg-corporate-500 mx-auto rounded-full"></div>
                <p className="text-gray-500 md:text-xl mt-4">Neem contact met ons op en we helpen je graag verder.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <a
                  href="mailto:info@example.com"
                  className="inline-flex items-center justify-center px-6 py-3 border border-corporate-300 hover:bg-corporate-50 text-corporate-700 rounded-full"
                >
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
                    className="mr-2 h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>{" "}
                  Contact opnemen
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-12 bg-corporate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-white text-corporate-700 rounded-md p-1 w-8 h-8 flex items-center justify-center font-bold">
                  S
                </div>
                <span className="text-xl font-bold">SubRise</span>
              </div>
              <p className="text-corporate-200 text-sm">
                Maak WBSO-aanvragen eenvoudiger dan ooit met ons AI-ondersteund platform.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-corporate-200 hover:text-white transition-colors">
                    Voordelen
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-corporate-200 hover:text-white transition-colors">
                    Hoe werkt het
                  </a>
                </li>
                <li>
                  <a href="#waitlist" className="text-corporate-200 hover:text-white transition-colors">
                    Wachtlijst
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-corporate-200 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
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
                    className="mr-2 h-5 w-5 text-corporate-300"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <a href="mailto:info@example.com" className="text-corporate-200 hover:text-white transition-colors">
                    info@example.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-corporate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-sm leading-loose text-corporate-300 md:text-left">
              © {new Date().getFullYear()} SubRise. Alle rechten voorbehouden.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm font-medium text-corporate-300 hover:text-white transition-colors">
                Algemene voorwaarden
              </a>
              <a href="#" className="text-sm font-medium text-corporate-300 hover:text-white transition-colors">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

