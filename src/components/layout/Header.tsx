"use client"

import { MainNav } from "@/components/main-nav"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function Header() {
  const pathname = usePathname()
  const isIntermediairMode = pathname.startsWith("/intermediair")

  const switchToPath = isIntermediairMode ? "/" : "/intermediair"
  const switchToText = isIntermediairMode ? "ondernemers" : "intermediairs"
  const loginPath = isIntermediairMode ? "/intermediair/login" : "/login"
  
  const switchButtonClasses = isIntermediairMode 
    ? "inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full gap-2"
    : "inline-flex items-center justify-center px-4 py-2 bg-corporate-600 hover:bg-corporate-700 text-white rounded-full gap-2"
  
  const loginButtonClasses = isIntermediairMode
    ? "inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full"
    : "inline-flex items-center justify-center px-4 py-2 border border-corporate-600 text-corporate-600 hover:bg-corporate-50 rounded-full"
  
  const logoClasses = isIntermediairMode
    ? "bg-white text-indigo-700 rounded-md p-1 w-8 h-8 flex items-center justify-center font-bold"
    : "bg-white text-corporate-700 rounded-md p-1 w-8 h-8 flex items-center justify-center font-bold"
  
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if we're already on the home page
    const isOnHomePage = isIntermediairMode 
      ? pathname === "/intermediair" || pathname === "/intermediair/" || pathname.startsWith("/intermediair#")
      : pathname === "/" || pathname === "/#" || pathname.startsWith("/#");
    
    // Only prevent default and scroll if we're already on the home page
    if (isOnHomePage) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      e.preventDefault();
    }
    // Otherwise, let the default navigation happen
  }
  
  return (
    <header className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <Link href={isIntermediairMode ? "/intermediair#home" : "/#home"} onClick={scrollToTop} className="flex items-center gap-2 cursor-pointer">
          <div className={logoClasses}>
            S
          </div>
          <span className="text-xl font-bold">Subrise</span>
          {isIntermediairMode ? <span className="hidden sm:inline-block text-xs border-l pl-2">intermediair</span> : null}
        </Link>
        <div className="hidden lg:block">
          <MainNav />
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href={loginPath}
            className={loginButtonClasses}
          >
            <span className="sm:hidden">Login</span>
            <span className="hidden sm:inline-block">Inloggen</span>
          </Link>
          <Link
            href={switchToPath}
            className={switchButtonClasses}
          >
            <span className="hidden sm:inline-block">Voor</span>
            <span className="capitalize sm:normal-case">{switchToText}</span>
          </Link>
        </div>
      </div>
    </header>
  )
} 
