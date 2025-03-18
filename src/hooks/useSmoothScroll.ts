import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Custom hook that adds smooth scrolling behavior to all internal links with hash fragments.
 * @param options Configuration options for the smooth scroll behavior
 */
export function useSmoothScroll(options: {
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
} = {}) {
  const pathname = usePathname();
  
  useEffect(() => {
    // Default options
    const {
      headerSelector = 'header',
      additionalOffset = 0,
      updateUrl = true,
    } = options;

    // Function to handle link clicks
    const handleLinkClick = (e: MouseEvent) => {
      // Get the clicked element
      const target = e.target as HTMLElement;
      
      // Find closest anchor tag (handles clicks on child elements within links)
      const link = target.closest('a');
      
      // Only process if it's a link with a hash
      if (!link || !link.hash) return;
      
      // Check if this is an internal link (on the same page or to another page on the same site)
      const linkPathname = link.pathname;
      const currentPathname = window.location.pathname;
      
      // If it's a link to another page with a hash, let the browser handle it normally
      // The hash will be processed after the page loads
      if (linkPathname !== currentPathname) return;
      
      // Prevent default link behavior
      e.preventDefault();
      
      // Get the target element from the hash
      const targetId = link.hash;
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Get header height for offset calculations
        const header = document.querySelector(headerSelector);
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const totalOffset = headerHeight + additionalOffset;
        
        // Calculate target position and scroll smoothly
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        
        // Perform the smooth scroll
        window.scrollTo({
          top: targetPosition - totalOffset,
          behavior: 'smooth',
        });
        
        // Update URL if needed
        if (updateUrl) {
          window.history.pushState(null, '', targetId);
        }
      }
    };
    
    // Check if URL already has hash on initial load and scroll to it
    const initialHash = window.location.hash;
    if (initialHash) {
      setTimeout(() => {
        const targetElement = document.querySelector(initialHash);
        if (targetElement) {
          const header = document.querySelector(headerSelector);
          const headerHeight = header ? header.getBoundingClientRect().height : 0;
          const totalOffset = headerHeight + additionalOffset;
          
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: targetPosition - totalOffset,
            behavior: 'smooth',
          });
        }
      }, 100); // Small timeout to ensure DOM is fully loaded
    }
    
    // Add click event listener to the document
    document.addEventListener('click', handleLinkClick);
    
    // Cleanup function
    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, [pathname, options]);
} 