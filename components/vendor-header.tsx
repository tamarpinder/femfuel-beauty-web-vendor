"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { User } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { VendorUserMenu } from "@/components/vendor-user-menu"

export function VendorHeader() {
  const pathname = usePathname()
  const { user } = useAuth()

  const navItems = [
    { href: "/how-it-works", label: "Cómo Funciona" },
    { href: "/pricing", label: "Precios" },
    { href: "/support", label: "Soporte" },
  ]

  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/femfuel-logo.png"
              alt="FemFuel Beauty"
              width={48}
              height={48}
              className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
            />
            <div>
              <span className="text-xl font-bold text-femfuel-dark">FemFuel Beauty</span>
              <p className="text-sm text-femfuel-medium">Portal de Proveedores</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative px-2 py-1 text-sm font-medium transition-all duration-300
                  text-femfuel-medium hover:text-femfuel-dark
                  hover:scale-105 group
                  ${pathname === item.href ? 'text-femfuel-rose' : ''}
                `}
              >
                {item.label}
                <span className={`
                  absolute bottom-0 left-0 w-full h-0.5 bg-femfuel-rose transform origin-left
                  transition-transform duration-300 scale-x-0 group-hover:scale-x-100
                  ${pathname === item.href ? 'scale-x-100' : ''}
                `} />
              </Link>
            ))}

            <div className="flex items-center gap-3 ml-4 border-l pl-4 border-gray-200">
              {user ? (
                <VendorUserMenu />
              ) : (
                <Link href="/login" className="glassmorphism-button">
                  <User className="h-4 w-4" />
                  <span>Iniciar Sesión</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
