"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

export function Footer() {
  const pathname = usePathname()
  const isIntermediairPage = pathname === "/intermediair"
  
  const bgColor = isIntermediairPage ? "bg-indigo-900" : "bg-corporate-900"
  const textColor = isIntermediairPage ? "text-indigo-700" : "text-corporate-700"
  const textLightColor = isIntermediairPage ? "text-indigo-200" : "text-corporate-200"
  const textHoverColor = isIntermediairPage ? "hover:text-indigo-50" : "hover:text-white"
  const borderColor = isIntermediairPage ? "border-indigo-700" : "border-corporate-700"
  const iconColor = isIntermediairPage ? "text-indigo-300" : "text-corporate-300"
  
  // Link items for both columns
  const linkItems = [
    { href: "#features", label: "Voordelen" },
    { href: "#how-it-works", label: "Hoe werkt het" },
    { href: "#waitlist", label: "Wachtlijst" },
    { href: "#contact", label: "Contact" }
  ]
  
  // Function to handle link clicks
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // If the link is for the current page type (intermediair or not), let it behave normally
    const isIntermediairLink = path.startsWith('/intermediair')
    if ((isIntermediairPage && isIntermediairLink) || (!isIntermediairPage && !isIntermediairLink)) {
      // Let the default behavior happen for same-page hash links
      return
    }
    
    // For links to different page types, prevent default and navigate programmatically
    e.preventDefault();
    window.location.href = path
  }
  
  return (
    <footer className={`pt-12 pb-6 ${bgColor} text-white`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className={`bg-white ${textColor} rounded-md p-1 w-8 h-8 flex items-center justify-center font-bold`}>
                S
              </div>
              <span className="text-xl font-bold">Subrise</span>
            </div>
            <p className={`${textLightColor} text-sm`}>
              Maak WBSO-aanvragen eenvoudiger dan ooit met ons AI-ondersteund platform.
            </p>
          </div>
          
          {/* Ondernemers Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <Link 
                href="/" 
                className={`opacity-100 hover:opacity-90 ${textHoverColor} transition-all`}
              >
                Voor Ondernemers
              </Link>
            </h3>
            <ul className="space-y-2">
              {linkItems.map((item, index) => (
                <li key={`ondernemer-${index}`}>
                  <a 
                    href={`/${item.href}`} 
                    className={`${textLightColor} ${textHoverColor} opacity-80 hover:opacity-100 transition-all`}
                    onClick={(e) => handleLinkClick(e, `/${item.href}`)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Intermediairs Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <Link 
                href="/intermediair" 
                className={`opacity-100 hover:opacity-90 ${textHoverColor} transition-all`}
              >
                Voor Intermediairs
              </Link>
            </h3>
            <ul className="space-y-2">
              {linkItems.map((item, index) => (
                <li key={`intermediair-${index}`}>
                  <a 
                    href={`/intermediair${item.href}`} 
                    className={`${textLightColor} ${textHoverColor} opacity-80 hover:opacity-100 transition-all`}
                    onClick={(e) => handleLinkClick(e, `/intermediair${item.href}`)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
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
                  className={`mr-2 h-5 w-5 ${iconColor}`}
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href="mailto:info@subrise.eu" className={`${textLightColor} ${textHoverColor} opacity-80 hover:opacity-100 transition-all`}>
                  info@subrise.eu
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={`border-t ${borderColor} mt-8 pt-8 justify-center items-center`}>
          <p className={`text-center text-sm leading-loose ${textLightColor}`}>
            © {new Date().getFullYear()} Subrise. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  )
} 
