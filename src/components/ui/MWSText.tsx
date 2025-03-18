import { twMerge } from "tailwind-merge";

export function MWSText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={twMerge(
        "bg-gradient-to-r from-[#ea580c] via-[#f97316] to-[#fed7aa] bg-clip-text font-heading font-semibold tracking-tight text-transparent",
        className
      )}
    >
      {children}
    </span>
  );
}
