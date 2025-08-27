import { Button } from "@/components/ui/button"

export function VendorHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">F</span>
              </div>
              <div>
                <h1 className="font-semibold text-foreground">FemFuel Beauty</h1>
                <p className="text-xs text-muted-foreground">Portal de Proveedores</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Mis Servicios
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Reservas
              </a>
              <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Ganancias
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              Iniciar Sesión
            </Button>
            <Button size="sm">Comenzar Gratis</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
