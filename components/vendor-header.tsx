"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"

import { Building2 } from "lucide-react"
import { VendorUserMenu } from "@/components/vendor-user-menu"

interface VendorHeaderProps {
  className?: string
}

export function VendorHeader({}: VendorHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 hidden md:block border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <Image 
                src="/femfuel-logo.png" 
                alt="FemFuel Beauty"
                width={48}
                height={48}
                className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300"
              />
              <div>
                <span className="text-xl font-bold text-femfuel-black">FemFuel Beauty</span>
                <p className="text-sm text-gray-600">Portal de Proveedores</p>
              </div>
            </Link>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building2 className="h-4 w-4" />
              <span>Plataforma Profesional</span>
            </div>
          </div>
          
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-gray-700 hover:text-femfuel-pink transition-colors font-medium">
              Dashboard
            </Link>
            <Link href="/dashboard/services" className="text-gray-700 hover:text-femfuel-pink transition-colors">
              Mis Servicios
            </Link>
            <Link href="/dashboard/bookings" className="text-gray-700 hover:text-femfuel-pink transition-colors">
              Reservas
            </Link>
            <Link href="/dashboard/earnings" className="text-gray-700 hover:text-femfuel-pink transition-colors font-medium">
              GANANCIAS
            </Link>
            <Link href="/resources" className="text-gray-700 hover:text-femfuel-pink transition-colors">
              Recursos
            </Link>
            <VendorUserMenu />
          </nav>
        </div>
      </div>
    </header>
  )
}