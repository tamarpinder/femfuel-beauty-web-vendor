"use client"

import { useRouter, usePathname } from "next/navigation"
import { Home, Scissors, Calendar, Wallet, User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export function VendorMobileNav() {
  const router = useRouter()
  const pathname = usePathname()
  const { user } = useAuth()

  const navItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "servicios", icon: Scissors, label: "Servicios", path: user ? "/dashboard/services" : "/login" },
    { id: "reservas", icon: Calendar, label: "Reservas", path: user ? "/dashboard/bookings" : "/login" },
    { id: "billetera", icon: Wallet, label: "Billetera", path: user ? "/dashboard/earnings" : "/login" },
    { id: "perfil", icon: User, label: "Perfil", path: user ? "/dashboard/profile" : "/login" },
  ]

  const handleNavClick = (item: (typeof navItems)[0]) => {
    router.push(item.path)
  }

  const getActiveItem = () => {
    if (pathname === "/") return "home"
    if (pathname.includes("/services")) return "servicios"
    if (pathname.includes("/bookings")) return "reservas"
    if (pathname.includes("/earnings")) return "billetera"
    if (pathname.includes("/profile")) return "perfil"
    return "home"
  }

  const activeItem = getActiveItem()

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2 z-50">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                activeItem === item.id 
                  ? "text-femfuel-rose bg-femfuel-rose/5" 
                  : "text-femfuel-medium hover:text-femfuel-dark"
              }`}
              onClick={() => handleNavClick(item)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      {/* Bottom Padding for Mobile Navigation */}
      <div className="md:hidden h-20"></div>
    </>
  )
}