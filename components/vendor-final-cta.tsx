import { Button } from "@/components/ui/button"

export function VendorFinalCTA() {
  return (
    <section className="py-16 bg-gradient-to-r from-femfuel-rose to-femfuel-gold relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/90 to-femfuel-gold/90"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          ¿Listo para <span className="text-yellow-100">transformar</span> tu negocio?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Únete a FemFuel Beauty hoy y comienza a generar más ingresos con la plataforma de belleza más exitosa de República Dominicana
        </p>

        <Button 
          size="lg" 
          className="px-8 bg-white text-femfuel-rose hover:bg-white/95 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
        >
          ✨ Crear mi Cuenta de Proveedor
        </Button>
        
        <p className="text-white/70 text-sm mt-4">
          Gratis por siempre • Sin comisiones ocultas • Soporte 24/7
        </p>
      </div>
    </section>
  )
}
