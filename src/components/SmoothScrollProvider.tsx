"use client"

import { ReactNode } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

interface SmoothScrollProviderProps {
  children?: ReactNode
  /**
   * Additional configuration options for smooth scrolling
   */
  options?: {
    /**
     * CSS selector for the fixed header element, if any
     */
    headerSelector?: string
    /**
     * Additional offset in pixels to add to the header height
     */
    additionalOffset?: number
    /**
     * Whether to update the URL after scrolling
     */
    updateUrl?: boolean
    /**
     * Duration of the scroll animation in milliseconds
     * If not provided, the browser's default smooth scroll behavior is used
     */
    duration?: number
  }
}

/**
 * Component that adds smooth scrolling behavior to all internal links with hash fragments.
 * This should be placed high in the component tree to catch all link clicks.
 */
export function SmoothScrollProvider({
  children,
  options = {}
}: SmoothScrollProviderProps) {
  // Use the custom hook to enable smooth scrolling
  useSmoothScroll(options)
  
  // Simply render children, this component only adds behavior
  return <>{children}</>
} 