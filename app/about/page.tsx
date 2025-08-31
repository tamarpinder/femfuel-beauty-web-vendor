import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Heart, 
  Users, 
  TrendingUp, 
  Award, 
  Sparkles,
  MapPin,
  Calendar,
  Target,
  Zap,
  Star
} from "lucide-react"

export default function AboutPage() {
  const stats = [
    { icon: Users, number: "75,000+", label: "Usuarios Activos" },
    { icon: TrendingUp, number: "500+", label: "Proveedores Exitosos" },
    { icon: Star, number: "4.9", label: "Calificación Promedio" },
    { icon: MapPin, number: "15+", label: "Ciudades en RD" },
  ]

  const values = [
    {
      icon: Heart,
      title: "Pasión por la Belleza",
      description: "Creemos que la belleza es un derecho, no un privilegio. Trabajamos para hacer los servicios de belleza accesibles para todos.",
      color: "from-femfuel-rose to-pink-400"
    },
    {
      icon: Target,
      title: "Excelencia en Servicio",
      description: "Mantenemos los más altos estándares de calidad, conectando solo con los mejores profesionales de belleza del país.",
      color: "from-femfuel-gold to-yellow-400"
    },
    {
      icon: Zap,
      title: "Innovación Constante",
      description: "Revolucionamos la industria de la belleza con tecnología de punta y soluciones digitales intuitivas.",
      color: "from-purple-500 to-purple-400"
    },
    {
      icon: Users,
      title: "Comunidad Unida",
      description: "Construimos una comunidad donde proveedores y clientes crecen juntos, apoyándose mutuamente.",
      color: "from-green-500 to-emerald-400"
    }
  ]

  const timeline = [
    {
      year: "2023",
      title: "El Comienzo",
      description: "FemFuel Beauty nace con la visión de transformar la industria de la belleza en República Dominicana.",
      milestone: "Fundación"
    },
    {
      year: "2024",
      title: "Crecimiento Exponencial",
      description: "Alcanzamos 500+ proveedores y 75,000+ usuarios activos, estableciéndonos como líderes del mercado.",
      milestone: "Expansión"
    },
    {
      year: "2024",
      title: "Reconocimiento Nacional",
      description: "Premiados como la mejor plataforma de belleza digital en los Dominican Tech Awards.",
      milestone: "Reconocimiento"
    },
    {
      year: "2025",
      title: "El Futuro",
      description: "Expandimos a toda Latinoamérica, llevando nuestra visión de belleza accesible a millones de personas.",
      milestone: "Expansión Internacional"
    }
  ]

  const team = [
    {
      name: "María González",
      role: "CEO & Fundadora",
      description: "Visionaria con 10+ años en tech y belleza",
      image: "/team/ceo.jpg"
    },
    {
      name: "Carlos Martínez",
      role: "CTO",
      description: "Experto en plataformas digitales escalables",
      image: "/team/cto.jpg"
    },
    {
      name: "Ana Rodríguez",
      role: "Head of Operations",
      description: "Especialista en experiencia del usuario",
      image: "/team/ops.jpg"
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-femfuel-light via-white to-femfuel-purple overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/5 to-femfuel-gold/5"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <Badge className="mb-6 bg-femfuel-rose text-white hover:bg-femfuel-rose/90">
            La Plataforma Líder de Belleza
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-femfuel-dark mb-6">
            Transformando la 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-femfuel-rose to-femfuel-gold"> belleza </span>
            en República Dominicana
          </h1>
          <p className="text-xl text-femfuel-medium mb-8 max-w-3xl mx-auto leading-relaxed">
            Somos la plataforma que conecta a los mejores profesionales de belleza con miles de clientes, 
            revolucionando la forma en que se experimenta y se accede a los servicios de belleza.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-femfuel-rose mx-auto mb-3" />
                  <div className="text-3xl font-bold text-femfuel-dark mb-1">{stat.number}</div>
                  <div className="text-sm text-femfuel-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-femfuel-gold text-white hover:bg-femfuel-gold/90">
                Nuestra Misión
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-6">
                Democratizar la belleza para todos los dominicanos
              </h2>
              <p className="text-lg text-femfuel-medium mb-6 leading-relaxed">
                Creemos que cada persona merece acceso a servicios de belleza de calidad. 
                Nuestra plataforma elimina las barreras tradicionales, conectando directamente 
                a clientes con los mejores profesionales de su área.
              </p>
              <p className="text-lg text-femfuel-medium mb-8 leading-relaxed">
                Empoderamos a los proveedores con herramientas digitales avanzadas para hacer 
                crecer sus negocios, mientras ofrecemos a los clientes una experiencia excepcional 
                y personalizada.
              </p>
              <Button className="bg-femfuel-rose hover:bg-femfuel-rose/90 text-white px-8 py-3">
                <Heart className="h-4 w-4 mr-2" />
                Únete a Nuestra Misión
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-femfuel-rose to-femfuel-gold p-1">
                <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                  <Image 
                    src="/about/mission.jpg" 
                    alt="Nuestra Misión" 
                    width={400}
                    height={400}
                    className="rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-femfuel-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-femfuel-rose text-white hover:bg-femfuel-rose/90">
              Nuestros Valores
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-6">
              Los principios que nos guían
            </h2>
            <p className="text-lg text-femfuel-medium max-w-3xl mx-auto">
              Estos valores fundamentales definen quiénes somos y cómo trabajamos para crear 
              una experiencia excepcional para toda nuestra comunidad.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-4">{value.title}</h3>
                  <p className="text-femfuel-medium leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-femfuel-gold text-white hover:bg-femfuel-gold/90">
              Nuestra Historia
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-6">
              El viaje de FemFuel Beauty
            </h2>
            <p className="text-lg text-femfuel-medium max-w-3xl mx-auto">
              Desde nuestros humildes comienzos hasta convertirnos en la plataforma líder 
              de belleza en República Dominicana.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-femfuel-rose to-femfuel-gold"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-femfuel-rose rounded-full border-4 border-white shadow-lg z-10"></div>
                  
                  {/* Content card */}
                  <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8 md:text-right' : 'md:ml-8'} md:w-1/2`}>
                    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <Badge className="mb-2 bg-femfuel-gold text-white">
                          {item.milestone}
                        </Badge>
                        <div className="text-2xl font-bold text-femfuel-rose mb-2">{item.year}</div>
                        <h3 className="text-xl font-bold text-femfuel-dark mb-3">{item.title}</h3>
                        <p className="text-femfuel-medium">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-femfuel-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-femfuel-rose text-white hover:bg-femfuel-rose/90">
              Nuestro Equipo
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-6">
              Las mentes brillantes detrás de FemFuel
            </h2>
            <p className="text-lg text-femfuel-medium max-w-3xl mx-auto">
              Un equipo apasionado de profesionales dedicados a revolucionar la industria de la belleza.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-femfuel-rose to-femfuel-gold p-1">
                      <div className="w-full h-full rounded-full bg-femfuel-light flex items-center justify-center">
                        <Users className="h-12 w-12 text-femfuel-medium" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-2">{member.name}</h3>
                  <p className="text-femfuel-rose font-medium mb-3">{member.role}</p>
                  <p className="text-femfuel-medium text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-femfuel-rose to-femfuel-gold">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <Sparkles className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para ser parte de nuestra historia?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Únete a los cientos de proveedores que ya han transformado su negocio con FemFuel Beauty.
          </p>
          <Button className="bg-white text-femfuel-rose hover:bg-white/90 px-8 py-3 font-medium">
            <Award className="h-4 w-4 mr-2" />
            Comenzar Mi Transformación
          </Button>
        </div>
      </section>
    </div>
  )
}