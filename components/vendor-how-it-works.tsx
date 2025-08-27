'use client'

import { UserPlus, Plus, Calendar } from 'lucide-react'

export function VendorHowItWorks() {
  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: "Crea tu perfil",
      description: "Completa tu información profesional y sube fotos de tu trabajo"
    },
    {
      number: 2,
      icon: Plus,
      title: "Agrega servicios",
      description: "Define tus servicios, precios y horarios de disponibilidad"
    },
    {
      number: 3,
      icon: Calendar,
      title: "Recibe reservas",
      description: "Los clientes te encuentran y reservan directamente contigo"
    }
  ]

  return (
    <section className="px-4 py-12 bg-gradient-to-br from-femfuel-light to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-femfuel-dark mb-3">
            Cómo funciona
          </h2>
          <p className="text-femfuel-medium">
            Comienza en minutos, crece para siempre
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="text-center relative">
                {/* Step Number */}
                <div className="w-12 h-12 mx-auto mb-4 bg-femfuel-rose rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{step.number}</span>
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <Icon className="h-8 w-8 text-femfuel-rose" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-femfuel-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-femfuel-medium leading-relaxed">
                  {step.description}
                </p>

                {/* Connecting Line (except for last step) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-femfuel-rose/20" 
                       style={{ transform: 'translateX(50%)' }} />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}