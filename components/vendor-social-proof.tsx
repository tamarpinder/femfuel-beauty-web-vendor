'use client'

export function VendorSocialProof() {
  const stats = [
    {
      number: "500+",
      label: "Proveedores Activos"
    },
    {
      number: "10,000+",
      label: "Clientes Satisfechos"
    },
    {
      number: "RD$50M+",
      label: "Generados en la Plataforma"
    }
  ]

  return (
    <section className="px-4 py-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-femfuel-dark mb-2">
            Únete a nuestra comunidad creciente
          </h2>
          <p className="text-femfuel-medium">
            Miles de profesionales ya confían en nosotros
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-femfuel-dark mb-2">
                {stat.number}
              </div>
              <div className="text-femfuel-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}