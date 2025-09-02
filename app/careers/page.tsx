'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  Briefcase,
  Users,
  Heart,
  Coffee,
  TrendingUp,
  MapPin,
  Clock,
  DollarSign,
  Sparkles,
  Send,
  Building2,
  Rocket,
  Target,
  Globe,
  Award
} from "lucide-react"

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<string | null>(null)
  const [applicationData, setApplicationData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    message: "",
    resume: null as File | null
  })

  const values = [
    {
      icon: Heart,
      title: "Pasión por la Belleza",
      description: "Creemos que la belleza transforma vidas y construye confianza",
      color: "from-femfuel-rose to-pink-400"
    },
    {
      icon: Rocket,
      title: "Innovación Constante",
      description: "Siempre buscamos formas nuevas y mejores de hacer las cosas",
      color: "from-purple-500 to-indigo-400"
    },
    {
      icon: Users,
      title: "Trabajo en Equipo",
      description: "Juntos logramos más de lo que podríamos hacer individualmente",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: Target,
      title: "Orientación a Resultados",
      description: "Nos enfocamos en entregar valor real a nuestros usuarios",
      color: "from-green-500 to-emerald-400"
    }
  ]

  const benefits = [
    {
      icon: DollarSign,
      title: "Salario Competitivo",
      description: "Compensación justa y revisiones salariales regulares"
    },
    {
      icon: Coffee,
      title: "Ambiente Flexible",
      description: "Trabajo remoto y horarios flexibles para balance vida-trabajo"
    },
    {
      icon: TrendingUp,
      title: "Crecimiento Profesional",
      description: "Oportunidades de desarrollo y capacitaciones constantes"
    },
    {
      icon: Heart,
      title: "Seguro Médico",
      description: "Cobertura médica completa para ti y tu familia"
    },
    {
      icon: Globe,
      title: "Vacaciones Pagadas",
      description: "Días de descanso generosos y flexibilidad para viajar"
    },
    {
      icon: Sparkles,
      title: "Bonos por Performance",
      description: "Reconocimiento económico por resultados excepcionales"
    }
  ]

  const openPositions = [
    {
      id: "frontend-dev",
      title: "Desarrollador Frontend Senior",
      department: "Tecnología",
      location: "Santo Domingo / Remoto",
      type: "Tiempo Completo",
      experience: "3+ años",
      salary: "RD$ 80,000 - 120,000",
      description: "Buscamos un desarrollador frontend apasionado para crear experiencias de usuario excepcionales en nuestra plataforma.",
      requirements: [
        "3+ años de experiencia en React/Next.js",
        "Dominio de TypeScript y JavaScript ES6+",
        "Experiencia con Tailwind CSS y componentes UI",
        "Conocimiento en Git y metodologías ágiles",
        "Inglés conversacional"
      ]
    },
    {
      id: "product-manager",
      title: "Product Manager",
      department: "Producto",
      location: "Santo Domingo",
      type: "Tiempo Completo", 
      experience: "4+ años",
      salary: "RD$ 100,000 - 150,000",
      description: "Liderar la estrategia de producto y trabajar con equipos multidisciplinarios para entregar soluciones innovadoras.",
      requirements: [
        "4+ años de experiencia como Product Manager",
        "Experiencia en productos digitales/tech",
        "Conocimiento de metodologías ágiles",
        "Habilidades analíticas fuertes",
        "MBA o carrera afín (preferible)"
      ]
    },
    {
      id: "marketing-digital",
      title: "Especialista en Marketing Digital",
      department: "Marketing",
      location: "Santo Domingo / Híbrido",
      type: "Tiempo Completo",
      experience: "2+ años",
      salary: "RD$ 60,000 - 90,000",
      description: "Crear y ejecutar estrategias de marketing digital para aumentar la adquisición de usuarios y engagement.",
      requirements: [
        "2+ años en marketing digital",
        "Experiencia con Google Ads, Facebook Ads",
        "Conocimiento de SEO/SEM",
        "Analytics y métricas de performance",
        "Creatividad y pensamiento estratégico"
      ]
    },
    {
      id: "customer-success",
      title: "Customer Success Manager",
      department: "Customer Experience",
      location: "Santo Domingo",
      type: "Tiempo Completo",
      experience: "2+ años",
      salary: "RD$ 55,000 - 80,000", 
      description: "Asegurar el éxito y satisfacción de nuestros proveedores, siendo su principal punto de contacto.",
      requirements: [
        "2+ años en customer success o account management",
        "Excelentes habilidades de comunicación",
        "Experiencia con CRM systems",
        "Orientado a resultados y métricas",
        "Empatía y resolución de problemas"
      ]
    }
  ]

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(selectedJob === jobId ? null : jobId)
  }

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Job application:', applicationData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-femfuel-rose/5 to-blue-500/5"></div>
        
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
            <Briefcase className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-medium text-sm">Únete al Equipo</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Construye el <span className="text-purple-600">Futuro</span> con Nosotros
          </h1>
          
          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Únete a un equipo apasionado que está transformando la industria de la belleza en República Dominicana. 
            Crecemos juntos, innovamos juntos, triunfamos juntos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glassmorphism-button-lg" onClick={() => document.getElementById('positions')?.scrollIntoView({ behavior: 'smooth' })}>
              <Briefcase className="h-4 w-4" />
              Ver Posiciones
            </button>
            <button className="femfuel-button-lg">
              <Users className="h-4 w-4" />
              Conoce al Equipo
            </button>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Award className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Nuestros Valores
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Los principios que guían nuestro trabajo y definen nuestra cultura
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-3">{value.title}</h3>
                  <p className="text-femfuel-medium leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-femfuel-light/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Sparkles className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Beneficios y Ventajas
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Cuidamos de nuestro equipo con beneficios que realmente importan
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-femfuel-rose to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-femfuel-dark mb-2">{benefit.title}</h3>
                      <p className="text-femfuel-medium">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Building2 className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Posiciones Abiertas
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Encuentra la oportunidad perfecta para hacer crecer tu carrera
            </p>
          </div>

          <div className="space-y-6">
            {openPositions.map((job) => (
              <Card key={job.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="cursor-pointer" onClick={() => handleJobSelect(job.id)}>
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-femfuel-dark mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-3">
                          <Badge variant="secondary" className="bg-femfuel-rose/10 text-femfuel-rose">
                            {job.department}
                          </Badge>
                          <div className="flex items-center gap-1 text-femfuel-medium">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1 text-femfuel-medium">
                            <Clock className="h-4 w-4" />
                            {job.type}
                          </div>
                          <div className="flex items-center gap-1 text-femfuel-medium">
                            <TrendingUp className="h-4 w-4" />
                            {job.experience}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-femfuel-rose">{job.salary}</div>
                        <div className="text-femfuel-medium">mensual</div>
                      </div>
                    </div>
                    
                    <p className="text-femfuel-medium mb-4">{job.description}</p>
                  </div>

                  {selectedJob === job.id && (
                    <div className="border-t pt-6 mt-6">
                      <h4 className="text-lg font-bold text-femfuel-dark mb-4">Requisitos:</h4>
                      <ul className="space-y-2 mb-6">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-femfuel-rose rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-femfuel-medium">{req}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className="bg-femfuel-rose hover:bg-femfuel-rose/90"
                        onClick={() => setApplicationData({...applicationData, position: job.title})}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Aplicar a esta Posición
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      {applicationData.position && (
        <section className="py-20 px-4 bg-femfuel-light/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Send className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
                Aplicar: {applicationData.position}
              </h2>
              <p className="text-lg text-femfuel-medium">
                Completa el formulario y únete a nuestro equipo
              </p>
            </div>

            <Card className="border-none shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={handleApplicationSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Nombre Completo *
                      </label>
                      <Input
                        required
                        value={applicationData.name}
                        onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                        className="border-2 border-gray-200 focus:border-femfuel-rose"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        required
                        value={applicationData.email}
                        onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                        className="border-2 border-gray-200 focus:border-femfuel-rose"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Teléfono *
                      </label>
                      <Input
                        required
                        value={applicationData.phone}
                        onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                        className="border-2 border-gray-200 focus:border-femfuel-rose"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-femfuel-dark mb-2">
                        Años de Experiencia *
                      </label>
                      <select
                        required
                        value={applicationData.experience}
                        onChange={(e) => setApplicationData({...applicationData, experience: e.target.value})}
                        className="w-full px-3 py-2 border-2 border-gray-200 focus:border-femfuel-rose rounded-md"
                      >
                        <option value="">Seleccionar experiencia</option>
                        <option value="0-1">0-1 años</option>
                        <option value="1-3">1-3 años</option>
                        <option value="3-5">3-5 años</option>
                        <option value="5+">5+ años</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-femfuel-dark mb-2">
                      ¿Por qué quieres trabajar con nosotros? *
                    </label>
                    <Textarea
                      required
                      value={applicationData.message}
                      onChange={(e) => setApplicationData({...applicationData, message: e.target.value})}
                      placeholder="Cuéntanos qué te motiva y por qué eres el candidato ideal..."
                      rows={5}
                      className="border-2 border-gray-200 focus:border-femfuel-rose"
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button type="submit" className="bg-femfuel-rose hover:bg-femfuel-rose/90 px-8 py-3">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Aplicación
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <VendorFooter />
    </div>
  )
}