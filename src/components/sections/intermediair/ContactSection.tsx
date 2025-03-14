export function IntermediairContactSection() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-2">
              Hulp nodig?
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-gray-900">Neem contact op</h2>
            <div className="w-20 h-1 bg-indigo-500 mx-auto rounded-full"></div>
            <p className="text-gray-500 md:text-xl mt-4">
              Heb je vragen? We helpen je graag verder.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <a
              href="mailto:info@subrise.eu"
              className="inline-flex items-center justify-center px-6 py-3 border border-indigo-300 hover:bg-indigo-50 text-indigo-700 rounded-full"
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
            <a
              href="tel:+31612345678"
              className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
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
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>{" "}
              Bel ons direct
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 
