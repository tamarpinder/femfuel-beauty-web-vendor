"use client"

import { useRouter, usePathname } from "next/navigation"
import { LayoutDashboard, Scissors, Calendar, DollarSign, User } from "lucide-react"
import { Button } from "@/components/ui/Button"

interface DashboardMobileNavigationProps {
  className?: string
}

export function DashboardMobileNavigation({ className }: DashboardMobileNavigationProps) {
  const router = useRouter()
  const pathname = usePathname()

  const tabs = [
    { id: "dashboard", icon: LayoutDashboard, label: "Inicio", path: "/dashboard" },
    { id: "services", icon: Scissors, label: "Servicios", path: "/dashboard/services" },
    { id: "bookings", icon: Calendar, label: "Reservas", path: "/dashboard/bookings" },
    { id: "earnings", icon: DollarSign, label: "Ganancias", path: "/dashboard/earnings" },
    { id: "profile", icon: User, label: "Perfil", path: "/dashboard/profile" },
  ]

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    router.push(tab.path)
  }

  const getActiveTab = () => {
    const currentTab = tabs.find(tab => pathname === tab.path)
    return currentTab?.id || "dashboard"
  }

  const activeTab = getActiveTab()

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-2 z-50">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-1 ${
                activeTab === tab.id ? "text-femfuel-rose" : "text-femfuel-medium"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-xs">{tab.label}</span>
            </Button>
          ))}
        </div>
      </nav>
      {/* Bottom Padding for Mobile Navigation */}
      <div className="md:hidden h-24"></div>
    </>
  )
}