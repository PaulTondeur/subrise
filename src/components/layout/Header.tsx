"use client";

import { MainNav } from "@/components/main-nav";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const pathname = usePathname();
  const isIntermediairMode = pathname.startsWith("/intermediair");

  const switchToPath = isIntermediairMode ? "/" : "/intermediair";
  const switchToText = isIntermediairMode ? "ondernemers" : "intermediairs";
  const loginPath = isIntermediairMode ? "/intermediair/login" : "/login";

  const switchButtonClasses = isIntermediairMode
    ? "inline-flex items-center justify-center px-4 py-2 bg-corporate-600 hover:bg-corporate-700 text-white rounded-full"
    : "inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full";

  const loginButtonClasses = isIntermediairMode
    ? "inline-flex items-center justify-center px-4 py-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 rounded-full"
    : "inline-flex items-center justify-center px-4 py-2 border border-corporate-600 text-corporate-600 hover:bg-corporate-50 rounded-full";

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if we're already on the home page
    const isOnHomePage = isIntermediairMode
      ? pathname === "/intermediair" ||
        pathname === "/intermediair/" ||
        pathname.startsWith("/intermediair#")
      : pathname === "/" || pathname === "/#" || pathname.startsWith("/#");

    // Only prevent default and scroll if we're already on the home page
    if (isOnHomePage) {
      e.preventDefault();

      // Use smooth scroll with the same duration as defined in the SmoothScrollProvider
      const duration = 800; // Match the duration in layout.tsx

      // Custom smooth scroll implementation with easeInOutCubic easing
      const startPosition = window.scrollY;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;

        if (elapsedTime >= duration) {
          window.scrollTo(0, 0);
          return;
        }

        // Use easeInOutCubic for smooth animation
        const progress = elapsedTime / duration;
        const easeProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startPosition * (1 - easeProgress));
        requestAnimationFrame(animateScroll);
      };

      requestAnimationFrame(animateScroll);
    }
    // Otherwise, let the default navigation happen
  };

  return (
    <header className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <Link
          href={isIntermediairMode ? "/intermediair#home" : "/#home"}
          onClick={scrollToTop}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image
            src="/logo.png"
            alt="Subrise Logo"
            width={120}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
          {isIntermediairMode ? (
            <span className="hidden sm:inline-block text-xs border-l pl-2 mt-1">intermediair</span>
          ) : null}
        </Link>
        <div className="hidden lg:block">
          <MainNav />
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href={loginPath} className={loginButtonClasses}>
            <span className="sm:hidden">Login</span>
            <span className="hidden sm:inline-block">Inloggen</span>
          </Link>
          <Link href={switchToPath} className={switchButtonClasses}>
            <span className="hidden sm:inline-block">Voor&nbsp;</span>
            <span className="capitalize sm:normal-case">{switchToText}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
