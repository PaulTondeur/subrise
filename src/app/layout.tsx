import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'

export const metadata: Metadata = {
  title: 'Zelf WBSO aanvragen, eenvoudiger dan ooit | Subrise',
  description: 'Bespaar tijd en geld bij WBSO-aanvragen. Ons AI-platform helpt ondernemers en adviseurs het administratieve proces te vereenvoudigen en subsidies efficiënt aan te vragen.',
  keywords: 'WBSO aanvragen, WBSO subsidie, innovatie belastingvoordeel, R&D subsidie, AI platform WBSO, WBSO administratie vereenvoudigen, technologische innovatie, onderzoek en ontwikkeling',
  creator: 'Subrise',
  publisher: 'Subrise',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Zelf WBSO aanvragen, eenvoudiger dan ooit | Subrise',
    description: 'Bespaar tijd en geld bij WBSO-aanvragen. Ons AI-platform vereenvoudigt het administratieve proces.',
    url: 'https://www.subrise.eu',
    siteName: 'Subrise',
    locale: 'nl_NL',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Subrise - Zelf WBSO aanvragen, eenvoudiger dan ooit',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zelf WBSO aanvragen, eenvoudiger dan ooit | Subrise',
    description: 'Ons AI-platform vereenvoudigt WBSO-administratie en bespaart tijd en geld.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.subrise.eu',
  },
  metadataBase: new URL('https://www.subrise.eu'),
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl">
      <head>
        <Script
          defer
          data-domain="subrise.eu"
          src="https://pa.paultondeur.com/js/script.hash.outbound-links.tagged-events.js"
          strategy="afterInteractive"
        />
        <Script id="plausible-setup" strategy="afterInteractive">
          {`window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`}
        </Script>
      </head>
      <body>
        <SmoothScrollProvider options={{ headerSelector: 'header', additionalOffset: 0, duration: 800 }}>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
