import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

export function VendorHero() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-primary-foreground font-bold text-2xl">F</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Haz crecer tu negocio de belleza
          </h1>

          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto text-pretty">
            Conecta con miles de clientes en República Dominicana y gestiona tu negocio de forma profesional
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
              ))}
              <span className="text-sm font-medium text-foreground ml-2">4.9/5</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full" />
            <span className="text-sm text-muted-foreground">500+ proveedores activos</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="px-8">
              Comenzar Gratis
            </Button>
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
