"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavItem {
  href: string
  label: string
}

export function MainNav() {
  const pathname = usePathname()
  const isIntermediairPage = pathname.startsWith("/intermediair")
  const isLoginPage = pathname.includes("/login")
  const basePath = isIntermediairPage ? "/intermediair" : "/"
  
  const highlightColor = isIntermediairPage ? "text-indigo-600" : "text-corporate-600"
  const hoverColor = isIntermediairPage ? "hover:text-indigo-600" : "hover:text-corporate-600"
  const indicatorColor = isIntermediairPage ? "bg-indigo-600" : "bg-corporate-600"
  
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })

  const navRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<Map<string, HTMLAnchorElement>>(new Map())

    const navItems: NavItem[] = isIntermediairPage ?[
      { href: `${basePath}#voordelen`, label: "Voordelen" },
      { href: `${basePath}#privacy`, label: "Privacy" },
      { href: `${basePath}#uitdagingen`, label: "Uitdagingen" },
      { href: `${basePath}#hoe-werkt-het`, label: "Hoe werkt het" },
      { href: `${basePath}#wachtlijst`, label: "Wachtlijst" },
      { href: `${basePath}#contact`, label: "Contact" },
    ] : [
      { href: `${basePath}#voordelen`, label: "Voordelen" },
      { href: `${basePath}#uitdagingen`, label: "Uitdagingen" },
      { href: `${basePath}#hoe-werkt-het`, label: "Hoe werkt het" },
      { href: `${basePath}#privacy`, label: "Privacy" },
      { href: `${basePath}#wachtlijst`, label: "Wachtlijst" },
      { href: `${basePath}#contact`, label: "Contact" },
    ]

  // Update indicator position when active section changes
  useEffect(() => {
    if (!activeSection || isLoginPage) {
      // Hide indicator when no active section or on login page
      setIndicatorStyle({
        left: 0,
        width: 0,
        opacity: 0,
      })
      return
    }

    const activeItem = itemsRef.current.get(`${basePath}#${activeSection}`)
    if (!activeItem || !navRef.current) return

    const navRect = navRef.current.getBoundingClientRect()
    const activeRect = activeItem.getBoundingClientRect()

    setIndicatorStyle({
      left: activeRect.left - navRect.left,
      width: activeRect.width,
      opacity: 1,
    })
  }, [activeSection, basePath, isLoginPage])

  useEffect(() => {
    // Only run this effect on the main pages, not on login pages
    if (isLoginPage) return

    // Get all sections that should be observed
    const sections = document.querySelectorAll("section[id]")
    if (sections.length === 0) return

    // Get header height for offset calculations
    const header = document.querySelector("header")
    const headerHeight = header ? header.offsetHeight : 0

    // Function to determine which section is active
    const determineActiveSection = () => {
      // If at the top of the page, no section is active
      if (window.scrollY < 100) {
        setActiveSection(null)
        return
      }

      // Check each section's position
      let currentSection: string | null = null
      let maxVisibleHeight = 0

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top
        const sectionBottom = rect.bottom

        // Calculate how much of the section is visible in the viewport
        const visibleTop = Math.max(sectionTop, headerHeight)
        const visibleBottom = Math.min(sectionBottom, window.innerHeight)
        const visibleHeight = Math.max(0, visibleBottom - visibleTop)

        // If this section has more visible area than previous max, it becomes the active section
        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight
          currentSection = section.id
        }
      })

      setActiveSection(currentSection)
    }

    // Initial check
    determineActiveSection()

    // Add event listeners
    window.addEventListener("scroll", determineActiveSection)
    window.addEventListener("resize", determineActiveSection)

    // Cleanup
    return () => {
      window.removeEventListener("scroll", determineActiveSection)
      window.removeEventListener("resize", determineActiveSection)
    }
  }, [isLoginPage])

  return (
    <nav className="relative flex gap-5 xl:gap-8" ref={navRef}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          ref={(el) => {
            if (el) itemsRef.current.set(item.href, el)
          }}
          className={`text-sm font-medium transition-colors relative py-1 ${
            activeSection === item.href.substring(item.href.indexOf('#') + 1) ? highlightColor : hoverColor
          }`}
        >
          {item.label}
        </Link>
      ))}

      {/* Animated indicator */}
      <div
        className={`absolute bottom-0 h-0.5 transition-all duration-300 ease-in-out ${indicatorColor}`}
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
          opacity: indicatorStyle.opacity,
        }}
      />
    </nav>
  )
}

