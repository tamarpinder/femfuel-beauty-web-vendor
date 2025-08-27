export function VendorSocialProof() {
  const stats = [
    {
      number: "500+",
      label: "Proveedores Activos",
    },
    {
      number: "10,000+",
      label: "Clientes Satisfechos",
    },
    {
      number: "RD$50M+",
      label: "Generados en la Plataforma",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Únete a nuestra comunidad creciente</h2>
          <p className="text-lg text-muted-foreground">Miles de profesionales ya confían en nosotros</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-lg text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
