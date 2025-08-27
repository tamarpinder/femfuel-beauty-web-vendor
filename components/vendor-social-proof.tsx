export function VendorSocialProof() {
  const stats = [
    {
      number: "500+",
      label: "Proveedores Exitosos",
      icon: "👩‍💼"
    },
    {
      number: "75,000+",
      label: "Clientes Conectados",
      icon: "✨"
    },
    {
      number: "RD$50M+",
      label: "Generados en Ingresos",
      icon: "💰"
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-femfuel-light to-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
            Únete a la comunidad de belleza <span className="text-femfuel-rose">más exitosa</span>
          </h2>
          <p className="text-lg text-femfuel-medium">Profesionales de toda República Dominicana confían en FemFuel</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-femfuel-rose mb-2 group-hover:scale-105 transition-transform duration-300">{stat.number}</div>
              <div className="text-lg text-femfuel-medium font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
