import Link from "next/link"

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-corporate-100">
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-corporate-100 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-corporate-600">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-corporate-800">Bedankt voor je aanmelding!</h1>
          
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            We hebben je gegevens ontvangen en gaan ermee aan de slag. Binnen 48 uur nemen we contact met je op om te bespreken hoe we je kunnen helpen met je WBSO-administratie.
          </p>
          
          <div className="mt-8">
            <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-corporate-600 hover:bg-corporate-700 text-white rounded-xl transition duration-150 ease-in-out">
              Terug naar homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 
