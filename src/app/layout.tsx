import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SubRise | WBSO-aanvragen eenvoudiger dan ooit',
  description: 'Maak WBSO-aanvragen eenvoudiger dan ooit met ons AI-ondersteund platform. Bespaar tijd, houd 100% van je subsidie en houd alles in eigen beheer.',
  keywords: 'WBSO, subsidie, innovatie, R&D, AI, platform, administratie, aanvraag, RVO',
  authors: [{ name: 'SubRise Team' }],
  creator: 'SubRise',
  publisher: 'SubRise',
  openGraph: {
    title: 'SubRise | WBSO-aanvragen eenvoudiger dan ooit',
    description: 'Maak WBSO-aanvragen eenvoudiger dan ooit met ons AI-ondersteund platform. Bespaar tijd, houd 100% van je subsidie en houd alles in eigen beheer.',
    url: 'https://subrise.nl',
    siteName: 'SubRise',
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
      <body>{children}</body>
    </html>
  )
}
