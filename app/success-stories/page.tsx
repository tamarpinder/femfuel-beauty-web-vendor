'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  Star,
  TrendingUp,
  Users,
  Calendar,
  Heart,
  Sparkles,
  MapPin,
  Filter,
  ChevronRight,
  BarChart3,
  Scissors,
  Palette,
  Zap
} from "lucide-react"

export default function SuccessStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  
  const categories = [
    { id: "all", label: "Todas las Historias", count: 12 },
    { id: "salon", label: "Salones de Belleza", count: 5 },
    { id: "freelance", label: "Freelancers", count: 4 },
    { id: "spa", label: "Spas", count: 2 },
    { id: "barberia", label: "Barberías", count: 1 }
  ]

  const featuredStats = [
    { icon: TrendingUp, value: "250%", label: "Aumento promedio en ingresos" },
    { icon: Users, value: "75,000+", label: "Clientes nuevos conectados" },
    { icon: Calendar, value: "50,000+", label: "Citas completadas exitosamente" },
    { icon: Star, value: "4.9", label: "Calificación promedio de proveedores" }
  ]

  const successStories = [
    {
      id: 1,
      category: "salon",
      featured: true,
      name: "Salon Glamour - María Fernández",
      location: "Santo Domingo",
      businessType: "Salón de Belleza",
      beforeImage: "/success/salon-before.jpg",
      afterImage: "/success/salon-after.jpg",
      avatar: "/success/maria.jpg",
      story: "En solo 8 meses con FemFuel, transformé mi pequeño salón en el hogar en un negocio próspero con 3 empleadas y lista de espera de clientes.",
      metrics: {
        monthlyIncrease: "320%",
        newClients: "450+",
        revenue: "$15,000",
        rating: 4.9
      },
      quote: "FemFuel no solo me dio más clientes, me dio la confianza para soñar en grande. Ahora tengo mi propio local y planes de expansión.",
      services: ["Corte y Color", "Tratamientos Capilares", "Maquillaje", "Manicure"],
      joinedDate: "Marzo 2024",
      tags: ["Crecimiento Rápido", "Expansión", "Equipo"]
    },
    {
      id: 2,
      category: "freelance",
      featured: true,
      name: "Ana Rodríguez - Maquillista Profesional",
      location: "Santiago",
      businessType: "Freelancer",
      beforeImage: "/success/freelance-before.jpg",
      afterImage: "/success/freelance-after.jpg",
      avatar: "/success/ana.jpg",
      story: "Como madre soltera, necesitaba flexibilidad. FemFuel me permitió trabajar desde casa y triplicar mis ingresos mientras cuido a mi hija.",
      metrics: {
        monthlyIncrease: "180%",
        newClients: "200+",
        revenue: "$8,500",
        rating: 5.0
      },
      quote: "La flexibilidad de horarios y la calidad de clientes que encuentro en FemFuel cambió mi vida completamente.",
      services: ["Maquillaje de Novias", "Maquillaje Social", "Cejas y Pestañas"],
      joinedDate: "Enero 2024",
      tags: ["Flexibilidad", "Trabajo desde Casa", "Madre Emprendedora"]
    },
    {
      id: 3,
      category: "spa",
      featured: false,
      name: "Spa Serenity - Carlos & Lucía",
      location: "Punta Cana",
      businessType: "Spa",
      beforeImage: "/success/spa-before.jpg",
      afterImage: "/success/spa-after.jpg",
      avatar: "/success/spa-team.jpg",
      story: "Nuestro spa boutique estaba luchando por llenar citas. FemFuel nos conectó con turistas y locales, llenando nuestra agenda completamente.",
      metrics: {
        monthlyIncrease: "200%",
        newClients: "300+",
        revenue: "$12,000",
        rating: 4.8
      },
      quote: "Los turistas nos encuentran fácilmente y los locales confían en las reseñas. Ahora estamos reservados con semanas de anticipación.",
      services: ["Masajes Relajantes", "Faciales", "Tratamientos Corporales", "Aromaterapia"],
      joinedDate: "Febrero 2024",
      tags: ["Turismo", "Spa Boutique", "Reservas Completas"]
    },
    {
      id: 4,
      category: "freelance",
      featured: false,
      name: "Isabella Cruz - Especialista en Uñas",
      location: "La Romana",
      businessType: "Freelancer",
      beforeImage: "/success/nails-before.jpg",
      afterImage: "/success/nails-after.jpg",
      avatar: "/success/isabella.jpg",
      story: "Empecé haciendo uñas a amigas por hobby. Con FemFuel convertí mi pasión en mi carrera principal, ganando más que en mi trabajo de oficina.",
      metrics: {
        monthlyIncrease: "400%",
        newClients: "180+",
        revenue: "$6,800",
        rating: 4.9
      },
      quote: "Nunca pensé que hacer uñas me daría independencia económica. FemFuel hizo posible que siguiera mi pasión.",
      services: ["Uñas Acrílicas", "Gel Polish", "Nail Art", "Manicure Ruso"],
      joinedDate: "Abril 2024",
      tags: ["Arte en Uñas", "Pasión convertida en Negocio", "Independencia"]
    },
    {
      id: 5,
      category: "barberia",
      featured: false,
      name: "Barbería Clásica - Miguel Santos",
      location: "Santiago",
      businessType: "Barbería",
      beforeImage: "/success/barber-before.jpg",
      afterImage: "/success/barber-after.jpg",
      avatar: "/success/miguel.jpg",
      story: "Mi barbería tradicional necesitaba clientes más jóvenes. FemFuel me conectó con una nueva generación que valora el servicio de calidad.",
      metrics: {
        monthlyIncrease: "150%",
        newClients: "220+",
        revenue: "$7,200",
        rating: 4.7
      },
      quote: "Los clientes jóvenes ahora aprecian el arte del barbero tradicional. FemFuel me ayudó a encontrar mi nueva audiencia.",
      services: ["Corte Clásico", "Afeitado con Navaja", "Arreglo de Barba", "Tratamientos Capilares"],
      joinedDate: "Mayo 2024",
      tags: ["Barbería Tradicional", "Audiencia Joven", "Arte del Barbero"]
    },
    {
      id: 6,
      category: "salon",
      featured: false,
      name: "Studio Bella - Sofía & Equipo",
      location: "Santo Domingo",
      businessType: "Salón de Belleza",
      beforeImage: "/success/studio-before.jpg",
      afterImage: "/success/studio-after.jpg",
      avatar: "/success/sofia.jpg",
      story: "Con 5 estilistas experimentadas, necesitábamos llenar nuestras agendas. FemFuel nos dio la visibilidad que merecíamos.",
      metrics: {
        monthlyIncrease: "190%",
        newClients: "380+",
        revenue: "$18,500",
        rating: 4.8
      },
      quote: "Cada estilista tiene su agenda llena. FemFuel nos posicionó como el salón premium que siempre fuimos.",
      services: ["Colorimetría Avanzada", "Cortes de Tendencia", "Tratamientos", "Styling"],
      joinedDate: "Enero 2024",
      tags: ["Equipo Experto", "Salón Premium", "Colorimetría"]
    }
  ]

  const filteredStories = selectedCategory === "all" 
    ? successStories 
    : successStories.filter(story => story.category === selectedCategory)

  const featuredStories = successStories.filter(story => story.featured)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-femfuel-light via-white to-femfuel-purple overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/5 to-femfuel-gold/5"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <Badge className="mb-6 bg-femfuel-rose text-white hover:bg-femfuel-rose/90">
            Transformaciones Reales
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-femfuel-dark mb-6">
            Historias de
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-femfuel-rose to-femfuel-gold"> Éxito</span>
          </h1>
          <p className="text-xl text-femfuel-medium mb-8 max-w-3xl mx-auto leading-relaxed">
            Descubre cómo cientos de profesionales de belleza han transformado sus negocios 
            y multiplicado sus ingresos con FemFuel Beauty.
          </p>

          {/* Featured Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {featuredStats.map((stat, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <stat.icon className="h-8 w-8 text-femfuel-rose mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-bold text-femfuel-dark mb-1">{stat.value}</div>
                  <div className="text-sm text-femfuel-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Success Stories */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-femfuel-gold text-white hover:bg-femfuel-gold/90">
              Historias Destacadas
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-6">
              Transformaciones extraordinarias
            </h2>
            <p className="text-lg text-femfuel-medium max-w-3xl mx-auto">
              Estas son las historias que más nos enorgullecen. Profesionales que no solo crecieron 
              económicamente, sino que transformaron completamente sus vidas.
            </p>
          </div>

          <div className="space-y-16">
            {featuredStories.map((story, index) => (
              <Card key={story.id} className="border-none shadow-xl overflow-hidden">
                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-0`}>
                  {/* Image Section */}
                  <div className="lg:w-1/2 relative">
                    <div className="aspect-video lg:aspect-square bg-gradient-to-br from-femfuel-rose/10 to-femfuel-gold/10 relative overflow-hidden">
                      <div className="absolute inset-4 bg-white rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <Sparkles className="h-16 w-16 text-femfuel-rose mx-auto mb-4 opacity-20" />
                          <p className="text-femfuel-medium text-sm">Imagen de transformación</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-1/2 p-8 lg:p-12">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.tags.map((tag, tagIndex) => (
                        <Badge key={tagIndex} variant="secondary" className="bg-femfuel-rose/10 text-femfuel-rose">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-femfuel-rose to-femfuel-gold p-1">
                        <div className="w-full h-full rounded-full bg-femfuel-light flex items-center justify-center">
                          <Users className="h-8 w-8 text-femfuel-medium" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-femfuel-dark">{story.name}</h3>
                        <p className="text-femfuel-rose font-medium">{story.businessType}</p>
                        <p className="text-sm text-femfuel-medium flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {story.location}
                        </p>
                      </div>
                    </div>

                    <blockquote className="text-lg text-femfuel-dark font-medium mb-6 leading-relaxed">
                      &ldquo;{story.quote}&rdquo;
                    </blockquote>

                    <p className="text-femfuel-medium mb-6 leading-relaxed">{story.story}</p>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-femfuel-light rounded-lg">
                        <TrendingUp className="h-6 w-6 text-femfuel-rose mx-auto mb-2" />
                        <div className="text-2xl font-bold text-femfuel-dark">{story.metrics.monthlyIncrease}</div>
                        <div className="text-xs text-femfuel-medium">Aumento mensual</div>
                      </div>
                      <div className="text-center p-4 bg-femfuel-light rounded-lg">
                        <Users className="h-6 w-6 text-femfuel-rose mx-auto mb-2" />
                        <div className="text-2xl font-bold text-femfuel-dark">{story.metrics.newClients}</div>
                        <div className="text-xs text-femfuel-medium">Clientes nuevos</div>
                      </div>
                    </div>

                    {/* Services */}
                    <div className="flex flex-wrap gap-2">
                      {story.services.map((service, serviceIndex) => (
                        <Badge key={serviceIndex} variant="outline" className="border-femfuel-rose text-femfuel-rose">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Stories Section */}
      <section className="py-16 bg-femfuel-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-6">
              Más historias inspiradoras
            </h2>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`${
                    selectedCategory === category.id 
                      ? "bg-femfuel-rose hover:bg-femfuel-rose/90 text-white" 
                      : "border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {category.label} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStories.filter(story => !story.featured).map((story) => (
              <Card key={story.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                {/* Image */}
                <div className="aspect-video bg-gradient-to-br from-femfuel-rose/10 to-femfuel-gold/10 relative overflow-hidden">
                  <div className="absolute inset-4 bg-white rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      {story.category === 'salon' && <Scissors className="h-12 w-12 text-femfuel-rose mx-auto mb-2 opacity-20" />}
                      {story.category === 'freelance' && <Palette className="h-12 w-12 text-femfuel-rose mx-auto mb-2 opacity-20" />}
                      {story.category === 'spa' && <Heart className="h-12 w-12 text-femfuel-rose mx-auto mb-2 opacity-20" />}
                      {story.category === 'barberia' && <Scissors className="h-12 w-12 text-femfuel-rose mx-auto mb-2 opacity-20" />}
                      <p className="text-femfuel-medium text-xs">Historia de {story.businessType}</p>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-femfuel-rose to-femfuel-gold p-1">
                      <div className="w-full h-full rounded-full bg-femfuel-light flex items-center justify-center">
                        <Users className="h-6 w-6 text-femfuel-medium" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-femfuel-dark text-sm">{story.name.split(' - ')[1] || story.name}</h3>
                      <p className="text-xs text-femfuel-medium flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {story.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-femfuel-medium mb-4 line-clamp-3">{story.story}</p>

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-femfuel-rose" />
                      <span className="text-sm font-bold text-femfuel-dark">{story.metrics.monthlyIncrease}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-bold text-femfuel-dark">{story.metrics.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {story.services.slice(0, 2).map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-femfuel-rose/10 text-femfuel-rose">
                        {service}
                      </Badge>
                    ))}
                    {story.services.length > 2 && (
                      <Badge variant="secondary" className="text-xs bg-femfuel-medium/10 text-femfuel-medium">
                        +{story.services.length - 2} más
                      </Badge>
                    )}
                  </div>

                  <Button variant="outline" className="w-full border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white group-hover:bg-femfuel-rose group-hover:text-white transition-all">
                    Ver Historia Completa
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-to-r from-femfuel-rose to-femfuel-gold">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <Zap className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tu historia de éxito comienza aquí
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Únete a cientos de profesionales que ya están transformando sus vidas con FemFuel Beauty. 
            ¡Tu éxito está a solo un clic de distancia!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-femfuel-rose hover:bg-white/90 px-8 py-3 font-medium">
              <Sparkles className="h-4 w-4 mr-2" />
              Empezar Mi Transformación
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-femfuel-rose px-8 py-3 font-medium">
              <BarChart3 className="h-4 w-4 mr-2" />
              Ver Más Casos de Éxito
            </Button>
          </div>
        </div>
      </section>
      <VendorFooter />
    </div>
  )
}