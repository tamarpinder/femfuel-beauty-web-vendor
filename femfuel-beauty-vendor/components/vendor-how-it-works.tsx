import { UserPlus, Plus, Calendar } from "lucide-react"

export function VendorHowItWorks() {
  const steps = [
    {
      number: 1,
      icon: UserPlus,
      title: "Crea tu perfil",
      description: "Completa tu información profesional y sube fotos de tu trabajo",
    },
    {
      number: 2,
      icon: Plus,
      title: "Agrega servicios",
      description: "Define tus servicios, precios y horarios de disponibilidad",
    },
    {
      number: 3,
      icon: Calendar,
      title: "Recibe reservas",
      description: "Los clientes te encuentran y reservan directamente contigo",
    },
  ]

  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Cómo funciona</h2>
          <p className="text-lg text-muted-foreground">Comienza en minutos, crece para siempre</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                <span className="text-primary-foreground font-bold">{step.number}</span>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-border -z-10" />
              )}

              <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-muted-foreground" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
