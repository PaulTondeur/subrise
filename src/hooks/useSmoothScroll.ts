import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Custom hook that adds smooth scrolling behavior to all internal links with hash fragments.
 * @param options Configuration options for the smooth scroll behavior
 */
export function useSmoothScroll(
  options: {
    /**
     * CSS selector for the fixed header element, if any
     * The height of this element will be used as offset when scrolling
     */
    headerSelector?: string;
    /**
     * Additional offset in pixels to add to the header height
     * Useful for additional spacing or when the header has a complex layout
     */
    additionalOffset?: number;
    /**
     * Whether to update the URL after scrolling
     */
    updateUrl?: boolean;
    /**
     * Duration of the scroll animation in milliseconds
     * If not provided, the browser's default smooth scroll behavior is used
     */
    duration?: number;
  } = {}
) {
  const pathname = usePathname();

  useEffect(() => {
    // Default options
    const { headerSelector = "header", additionalOffset = 0, updateUrl = true, duration } = options;

    // Smooth scroll implementation with custom duration
    const smoothScrollTo = (targetElement: Element) => {
      // Get header height for offset calculations
      const header = document.querySelector(headerSelector);
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const totalOffset = headerHeight + additionalOffset;

      // Calculate target position
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const scrollTarget = targetPosition - totalOffset;

      // If no custom duration is specified, use browser's native smooth scroll
      if (!duration) {
        window.scrollTo({
          top: scrollTarget,
          behavior: "smooth",
        });
        return;
      }

      // Custom smooth scroll with configurable duration
      const startPosition = window.scrollY;
      const distance = scrollTarget - startPosition;
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;

        if (elapsedTime >= duration) {
          window.scrollTo(0, scrollTarget);
          return;
        }

        // Use easeInOutCubic for smooth animation
        const progress = elapsedTime / duration;
        const easeProgress =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * easeProgress);
        requestAnimationFrame(animateScroll);
      };

      requestAnimationFrame(animateScroll);
    };

    // Function to handle link clicks
    const handleLinkClick = (e: MouseEvent) => {
      // Get the clicked element
      const target = e.target as HTMLElement;

      // Find closest anchor tag (handles clicks on child elements within links)
      const link = target.closest("a");

      // Only process if it's a link with a hash
      if (!link || !link.hash) return;

      // Extract the pathname and hash from the link
      const linkPathname = link.pathname;
      const currentPathname = window.location.pathname;
      const hash = link.hash;

      // Skip handling if it's a link to another page
      // Those will be handled after the page loads via initialHash check
      if (linkPathname !== currentPathname) return;

      // Prevent default link behavior
      e.preventDefault();

      // Get the target element from the hash
      const targetElement = document.querySelector(hash);

      if (targetElement) {
        // Perform the smooth scroll
        smoothScrollTo(targetElement);

        // Update URL if needed
        if (updateUrl) {
          window.history.pushState(null, "", hash);
        }
      }
    };

    // Check if URL already has hash on initial load and scroll to it
    const initialHash = window.location.hash;
    if (initialHash) {
      // Use a slightly larger timeout to ensure the DOM is fully loaded and rendered
      setTimeout(() => {
        const targetElement = document.querySelector(initialHash);
        if (targetElement) {
          smoothScrollTo(targetElement);
        }
      }, 300); // Increased timeout for more reliable initial scroll
    }

    // Add click event listener to the document
    document.addEventListener("click", handleLinkClick);

    // Cleanup function
    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [pathname, options]);
}
