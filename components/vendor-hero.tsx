import { Button } from "@/components/ui/button"
import { Star, TrendingUp } from "lucide-react"

export function VendorHero() {
  return (
    <section className="relative px-4 py-12 md:py-16 bg-gradient-to-b from-white to-femfuel-light">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-32 h-32 md:w-40 md:h-40 mx-auto flex items-center justify-center mb-6">
            <img 
              src="/femfuel-logo.png" 
              alt="FemFuel Beauty" 
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-4">
            Tu negocio de belleza, <span className="text-femfuel-rose">potenciado</span>
          </h1>
          <p className="text-lg text-femfuel-medium mb-6 max-w-2xl mx-auto">
            Conecta con miles de clientes, gestiona tu agenda y haz crecer tus ingresos con la plataforma líder de belleza en República Dominicana
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium text-femfuel-dark">4.9/5</span>
            </div>
            <span className="text-femfuel-medium">•</span>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-femfuel-rose" />
              <span className="text-femfuel-medium">500+ proveedores exitosos</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="px-8 bg-femfuel-rose hover:bg-femfuel-rose/90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              ✨ Comenzar Gratis
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white transition-colors"
            >
              Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
