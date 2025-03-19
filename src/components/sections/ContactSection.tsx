export function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-corporate-100 text-corporate-700 text-sm font-medium mb-2">
              Hulp nodig?
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">Heb je vragen?</h2>
            <div className="w-20 h-1 bg-corporate-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 text-lg md:text-xl mt-4">Neem contact met ons op en we helpen je graag verder.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <a
              href="mailto:info@subrise.eu"
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
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>{" "}
              Stuur ons een e-mail
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 