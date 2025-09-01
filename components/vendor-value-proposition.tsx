import { Card } from "@/components/ui/card"
import { Users, BarChart3, CreditCard } from "lucide-react"

export function VendorValueProposition() {
  const benefits = [
    {
      icon: Users,
      title: "Más Clientes, Más Ingresos",
      description: "Conecta con +75,000 usuarios activos que buscan servicios de belleza diariamente",
      color: "bg-gradient-to-br from-femfuel-rose to-pink-400"
    },
    {
      icon: BarChart3,
      title: "Gestión Profesional",
      description: "Dashboard intuitivo que simplifica tu agenda, reservas y métricas de crecimiento",
      color: "bg-gradient-to-br from-femfuel-gold to-yellow-400"
    },
    {
      icon: CreditCard,
      title: "Pagos Garantizados",
      description: "Recibe pagos automáticos y seguros. Comienza gratis, paga solo cuando ganes",
      color: "bg-gradient-to-br from-green-500 to-emerald-400"
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
            ¿Por qué los mejores profesionales eligen <span className="text-femfuel-rose">FemFuel</span>?
          </h2>
          <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
            La plataforma que transforma profesionales de belleza en empresarios exitosos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="p-6 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 bg-gradient-to-b from-white to-gray-50">
              <div className={`w-16 h-16 ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <benefit.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-femfuel-dark mb-3">{benefit.title}</h3>
              <p className="text-femfuel-medium leading-relaxed">{benefit.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
