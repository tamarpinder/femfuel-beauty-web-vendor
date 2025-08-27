"use client"

import type React from "react"
import Image from "next/image"

export function VendorMobileHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 md:hidden">
      <div className="px-4 py-3">
        <div className="flex items-center gap-3">
          <Image 
            src="/femfuel-logo.png" 
            alt="FemFuel Beauty"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <div>
            <span className="text-lg font-bold text-femfuel-dark">FemFuel Beauty</span>
            <p className="text-xs text-femfuel-medium">Portal de Proveedores</p>
          </div>
        </div>
      </div>
    </header>
  )
}