import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl">
      <head>
        <title>WBSO.ai</title>
        <meta name="description" content="Redirecting to WBSO.ai" />
      </head>
      <body>{children}</body>
    </html>
  );
}
