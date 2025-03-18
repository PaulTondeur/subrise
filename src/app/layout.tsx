import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Subrise | WBSO-aanvragen eenvoudiger dan ooit',
  description: 'Maak WBSO-aanvragen eenvoudiger dan ooit met ons AI-ondersteund platform. Bespaar tijd, houd 100% van je subsidie en houd alles in eigen beheer.',
  keywords: 'WBSO, subsidie, innovatie, R&D, AI, platform, administratie, aanvraag, RVO',
  creator: 'Subrise',
  publisher: 'Subrise',
  openGraph: {
    title: 'Subrise | WBSO-aanvragen eenvoudiger dan ooit',
    description: 'Maak WBSO-aanvragen eenvoudiger dan ooit met ons AI-ondersteund platform. Bespaar tijd, houd 100% van je subsidie en houd alles in eigen beheer.',
    url: 'https://subrise.eu',
    siteName: 'Subrise',
    locale: 'nl_NL',
    type: 'website',
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
      <body>{children}</body>
    </html>
  )
}
