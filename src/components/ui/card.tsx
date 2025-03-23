import { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return <div className={`bg-white rounded-lg shadow-sm ${className || ""}`} {...props} />;
}
