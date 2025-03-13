export function Footer() {
  return (
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
  )
} 