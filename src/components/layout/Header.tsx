import { MainNav } from "@/components/main-nav"

export function Header() {
  return (
    <header className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-white text-corporate-700 rounded-md p-1 w-8 h-8 flex items-center justify-center font-bold">
            S
          </div>
          <span className="text-xl font-bold">SubRise</span>
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#waitlist"
            className="inline-flex items-center justify-center px-4 py-2 bg-corporate-600 hover:bg-corporate-700 text-white rounded-full"
          >
            Plaats mij op de wachtlijst
          </a>
        </div>
      </div>
    </header>
  )
} 