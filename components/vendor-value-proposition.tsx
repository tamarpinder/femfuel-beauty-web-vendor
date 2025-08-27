'use client'

import { Users, BarChart3, CreditCard } from 'lucide-react'

export function VendorValueProposition() {
  const benefits = [
    {
      icon: Users,
      title: "Más Clientes",
      description: "Accede a miles de usuarios activos buscando servicios de belleza"
    },
    {
      icon: BarChart3,
      title: "Fácil Gestión",
      description: "Dashboard intuitivo para manejar reservas, servicios y horarios"
    },
    {
      icon: CreditCard,
      title: "Pagos Seguros",
      description: "Cobra de forma segura y puntual con nuestro sistema integrado"
    }
  ]

  return (
    <section className="px-4 py-12 bg-femfuel-purple">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-femfuel-dark mb-3">
            ¿Por qué elegir FemFuel Beauty?
          </h2>
          <p className="text-femfuel-medium">
            La plataforma que impulsa tu crecimiento profesional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-femfuel-rose rounded-2xl flex items-center justify-center">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-femfuel-dark mb-2">
                  {benefit.title}
                </h3>
                <p className="text-femfuel-medium leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}