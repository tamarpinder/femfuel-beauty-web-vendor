import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  UserPlus, 
  Smartphone,
  Calendar,
  CreditCard,
  BarChart3,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  Award,
  Heart
} from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Regístrate Gratis",
      subtitle: "Proceso de registro en menos de 5 minutos",
      description: "Completa tu perfil profesional, agrega tus servicios y certifica tu experiencia. Nuestro equipo revisará tu aplicación en 24 horas.",
      features: ["Registro completamente gratuito", "Verificación rápida en 24h", "Perfil profesional personalizable", "Certificación de experiencia"],
      color: "from-femfuel-rose to-pink-400",
      bgColor: "bg-femfuel-rose/10"
    },
    {
      number: "02", 
      icon: Smartphone,
      title: "Configura Tu Perfil",
      subtitle: "Muestra tu trabajo y atrae más clientes",
      description: "Sube fotos de tu trabajo, define tus horarios disponibles y establece los precios de tus servicios. Mientras mejor sea tu perfil, más clientes atraerás.",
      features: ["Portfolio visual impactante", "Horarios flexibles", "Precios competitivos", "Descripción detallada de servicios"],
      color: "from-femfuel-gold to-yellow-400",
      bgColor: "bg-femfuel-gold/10"
    },
    {
      number: "03",
      icon: Calendar,
      title: "Recibe Reservas",
      subtitle: "Los clientes te encuentran y reservan automáticamente",
      description: "Apareces en resultados de búsqueda según tu ubicación y especialidad. Los clientes pueden ver tu perfil, revisar tu trabajo y reservar directamente.",
      features: ["Visibilidad automática", "Búsqueda por ubicación", "Reservas en tiempo real", "Sistema de reseñas integrado"],
      color: "from-purple-500 to-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      number: "04",
      icon: CreditCard,
      title: "Cobra Automáticamente",
      subtitle: "Pagos seguros y automáticos sin complicaciones",
      description: "Los clientes pagan por adelantado a través de la plataforma. Tú te enfocas en brindar un servicio excepcional mientras nosotros manejamos los pagos.",
      features: ["Pagos anticipados garantizados", "Múltiples métodos de pago", "Transferencias automáticas", "Sin riesgo de impago"],
      color: "from-green-500 to-emerald-400",
      bgColor: "bg-green-500/10"
    }
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: "Aumenta Tus Ingresos",
      description: "Los proveedores aumentan sus ingresos promedio en un 150% en los primeros 6 meses",
      stat: "+150%"
    },
    {
      icon: Users,
      title: "Más Clientes",
      description: "Acceso a nuestra base de 75,000+ usuarios activos buscando servicios de belleza",
      stat: "75,000+"
    },
    {
      icon: Clock,
      title: "Ahorra Tiempo",
      description: "Automatiza reservas, pagos y recordatorios. Enfócate solo en tu trabajo",
      stat: "5hrs/día"
    },
    {
      icon: Shield,
      title: "Pagos Seguros",
      description: "100% de los pagos garantizados con nuestra tecnología de pagos protegida",
      stat: "100%"
    }
  ]

  const features = [
    {
      category: "Gestión de Reservas",
      items: [
        { icon: Calendar, text: "Calendario inteligente integrado" },
        { icon: Smartphone, text: "Notificaciones push en tiempo real" },
        { icon: CheckCircle, text: "Confirmación automática de citas" },
        { icon: Clock, text: "Recordatorios automáticos para clientes" }
      ]
    },
    {
      category: "Marketing & Crecimiento",
      items: [
        { icon: Star, text: "Sistema de reseñas y calificaciones" },
        { icon: TrendingUp, text: "Análisis de rendimiento detallado" },
        { icon: Award, text: "Certificaciones y badges de calidad" },
        { icon: Heart, text: "Programa de fidelidad para clientes frecuentes" }
      ]
    },
    {
      category: "Pagos & Finanzas",
      items: [
        { icon: CreditCard, text: "Múltiples métodos de pago" },
        { icon: Shield, text: "Protección contra fraudes" },
        { icon: BarChart3, text: "Reportes financieros detallados" },
        { icon: Zap, text: "Transferencias bancarias inmediatas" }
      ]
    }
  ]

  const testimonial = {
    text: "En 6 meses con FemFuel, tripliqué mi clientela y pude abrir mi segundo salón. La plataforma me dio la visibilidad que necesitaba.",
    author: "María Fernández",
    role: "Estilista Profesional",
    location: "Santo Domingo",
    rating: 5,
    avatar: "/testimonials/maria.jpg"
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-femfuel-light via-white to-femfuel-purple overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/5 to-femfuel-gold/5"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <Badge className="mb-6 bg-femfuel-gold text-white hover:bg-femfuel-gold/90">
            Proceso Simple y Efectivo
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-femfuel-dark mb-6">
            Así funciona
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-femfuel-rose to-femfuel-gold"> FemFuel Beauty</span>
          </h1>
          <p className="text-xl text-femfuel-medium mb-8 max-w-3xl mx-auto leading-relaxed">
            Un sistema diseñado para maximizar tus ingresos y simplificar tu trabajo. 
            En solo 4 pasos estarás generando más reservas y creciendo tu negocio.
          </p>
          <Button className="bg-femfuel-rose hover:bg-femfuel-rose/90 text-white px-8 py-3">
            <Zap className="h-4 w-4 mr-2" />
            Empezar Ahora Gratis
          </Button>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={index} className={`relative ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} flex flex-col lg:flex-row items-center gap-12`}>
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-femfuel-medium">PASO {step.number}</div>
                      <h2 className="text-3xl font-bold text-femfuel-dark">{step.title}</h2>
                    </div>
                  </div>
                  
                  <p className="text-lg text-femfuel-rose font-medium">{step.subtitle}</p>
                  <p className="text-lg text-femfuel-medium leading-relaxed">{step.description}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-femfuel-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  <Card className={`${step.bgColor} border-none shadow-lg`}>
                    <CardContent className="p-8">
                      <div className="aspect-video bg-white/50 rounded-lg flex items-center justify-center">
                        <step.icon className={`h-20 w-20 text-femfuel-medium opacity-20`} />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Connection Arrow */}
                {index < steps.length - 1 && (
                  <div className="absolute left-1/2 -bottom-10 transform -translate-x-1/2 lg:hidden">
                    <ArrowRight className="h-6 w-6 text-femfuel-medium rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-femfuel-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-femfuel-rose text-white hover:bg-femfuel-rose/90">
              Beneficios Comprobados
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-6">
              Resultados que puedes esperar
            </h2>
            <p className="text-lg text-femfuel-medium max-w-3xl mx-auto">
              Miles de proveedores ya han transformado sus negocios con FemFuel Beauty. 
              Estos son los resultados que puedes esperar.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group text-center">
                <CardContent className="p-6">
                  <benefit.icon className="h-10 w-10 text-femfuel-rose mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <div className="text-3xl font-bold text-femfuel-dark mb-2">{benefit.stat}</div>
                  <h3 className="font-bold text-femfuel-dark mb-2">{benefit.title}</h3>
                  <p className="text-sm text-femfuel-medium">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-femfuel-gold text-white hover:bg-femfuel-gold/90">
              Herramientas Avanzadas
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-6">
              Todo lo que necesitas para crecer
            </h2>
            <p className="text-lg text-femfuel-medium max-w-3xl mx-auto">
              Herramientas profesionales diseñadas para automatizar tu negocio y maximizar tu tiempo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-femfuel-dark mb-6 pb-2 border-b border-femfuel-rose">
                  {feature.category}
                </h3>
                <div className="space-y-4">
                  {feature.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-3">
                      <item.icon className="h-5 w-5 text-femfuel-rose flex-shrink-0" />
                      <span className="text-femfuel-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-femfuel-light">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Card className="border-none shadow-xl bg-white">
            <CardContent className="p-8 md:p-12">
              <div className="flex justify-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-femfuel-dark font-medium mb-8 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-femfuel-rose to-femfuel-gold p-1">
                  <div className="w-full h-full rounded-full bg-femfuel-light flex items-center justify-center">
                    <Users className="h-8 w-8 text-femfuel-medium" />
                  </div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-femfuel-dark">{testimonial.author}</div>
                  <div className="text-femfuel-medium">{testimonial.role}</div>
                  <div className="text-sm text-femfuel-rose">{testimonial.location}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-femfuel-rose to-femfuel-gold">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <Zap className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Únete a cientos de profesionales que ya están creciendo con FemFuel Beauty. 
            El registro es completamente gratis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-femfuel-rose hover:bg-white/90 px-8 py-3 font-medium">
              <UserPlus className="h-4 w-4 mr-2" />
              Registrarme Gratis
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-femfuel-rose px-8 py-3 font-medium">
              Ver Demo en Vivo
            </Button>
          </div>
        </div>
      </section>
      <VendorFooter />
    </div>
  )
}