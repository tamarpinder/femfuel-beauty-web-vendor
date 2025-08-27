import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function VendorHeader() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <img 
                src="/femfuel-logo.png" 
                alt="FemFuel Beauty"
                className="w-12 h-12 object-contain hover:scale-110 transition-transform duration-300"
              />
              <div>
                <span className="text-xl font-bold text-femfuel-dark">FemFuel Beauty</span>
                <p className="text-sm text-femfuel-medium">Portal de Proveedores</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-femfuel-medium">
              <MapPin className="h-4 w-4" />
              <span>República Dominicana</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-femfuel-medium hover:text-femfuel-dark transition-colors">
              Dashboard
            </Link>
            <Link href="/services" className="text-femfuel-medium hover:text-femfuel-dark transition-colors">
              Mis Servicios
            </Link>
            <Link href="/bookings" className="text-femfuel-medium hover:text-femfuel-dark transition-colors">
              Reservas
            </Link>
            <Link href="/earnings" className="text-femfuel-dark font-bold hover:text-femfuel-rose transition-colors">
              GANANCIAS
            </Link>
            <div className="flex items-center gap-3 ml-4">
              <Button 
                variant="outline" 
                size="sm"
                className="border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white transition-colors"
              >
                Iniciar Sesión
              </Button>
              <Button 
                size="sm"
                className="bg-femfuel-rose hover:bg-femfuel-rose/90 text-white transition-colors"
              >
                Comenzar Gratis
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
