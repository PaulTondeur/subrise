import { HTMLAttributes } from "react"

interface HighlightProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

export function Highlight({ children, className = "", ...props }: HighlightProps) {
  return (
    <span className={`bg-yellow-100 px-1 rounded ${className}`} {...props}>
      {children}
    </span>
  )
} 
