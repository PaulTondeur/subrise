"use client"

import { MainNav } from "@/components/main-nav"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function Header() {
  const pathname = usePathname()
  const isIntermediairPage = pathname === "/intermediair"

  const linkPath = isIntermediairPage ? "/" : "/intermediair"
  const linkText = isIntermediairPage ? "Voor ondernemers" : "Voor intermediairs"
  const buttonClasses = isIntermediairPage 
    ? "inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
    : "inline-flex items-center justify-center px-4 py-2 bg-corporate-600 hover:bg-corporate-700 text-white rounded-full"
  const logoClasses = isIntermediairPage
    ? "bg-white text-indigo-700 rounded-md p-1 w-8 h-8 flex items-center justify-center font-bold"
    : "bg-white text-corporate-700 rounded-md p-1 w-8 h-8 flex items-center justify-center font-bold"
  
  const scrollToTop = (e) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    e.preventDefault();
  }
  
  return (
    <header className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <Link href="#home" onClick={scrollToTop} className="flex items-center gap-2 cursor-pointer">
          <div className={logoClasses}>
            S
          </div>
          <span className="text-xl font-bold">Subrise</span>
        </Link>
        <div className="hidden md:block">
          <MainNav />
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={linkPath}
            className={buttonClasses}
          >
            {linkText}
          </Link>
        </div>
      </div>
    </header>
  )
} 
