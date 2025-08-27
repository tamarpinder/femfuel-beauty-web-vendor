'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button"

export function VendorHeader() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image 
                src="/femfuel-logo.png" 
                alt="FemFuel Beauty"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <div>
                <h1 className="font-semibold text-femfuel-dark">FemFuel Beauty</h1>
                <p className="text-xs text-femfuel-medium">Portal de Proveedores</p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/dashboard" className="text-sm font-medium text-femfuel-medium hover:text-femfuel-dark transition-colors">
                Dashboard
              </Link>
              <Link href="/dashboard/services" className="text-sm font-medium text-femfuel-medium hover:text-femfuel-dark transition-colors">
                Mis Servicios
              </Link>
              <Link href="/dashboard/bookings" className="text-sm font-medium text-femfuel-medium hover:text-femfuel-dark transition-colors">
                Reservas
              </Link>
              <Link href="/dashboard/earnings" className="text-sm font-medium text-femfuel-dark hover:text-femfuel-rose transition-colors">
                Ganancias
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-femfuel-rose hover:bg-[#9f1853] text-white">
                Comenzar Gratis
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}