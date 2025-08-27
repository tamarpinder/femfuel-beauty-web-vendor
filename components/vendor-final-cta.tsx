import { Button } from "@/components/ui/button"

export function VendorFinalCTA() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">¿Listo para hacer crecer tu negocio?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Únete a FemFuel Beauty hoy y comienza a generar más ingresos
        </p>

        <Button size="lg" className="px-8">
          Crear mi Cuenta de Proveedor
        </Button>
      </div>
    </section>
  )
}
