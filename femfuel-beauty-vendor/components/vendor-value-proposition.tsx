import { Card } from "@/components/ui/card"
import { Users, BarChart3, CreditCard } from "lucide-react"

export function VendorValueProposition() {
  const benefits = [
    {
      icon: Users,
      title: "Más Clientes",
      description: "Accede a miles de usuarios activos buscando servicios de belleza",
    },
    {
      icon: BarChart3,
      title: "Fácil Gestión",
      description: "Dashboard intuitivo para manejar reservas, servicios y horarios",
    },
    {
      icon: CreditCard,
      title: "Pagos Seguros",
      description: "Cobra de forma segura y puntual con nuestro sistema integrado",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">¿Por qué elegir FemFuel Beauty?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La plataforma que impulsa tu crecimiento profesional
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 text-center border-0 shadow-sm">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <benefit.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
