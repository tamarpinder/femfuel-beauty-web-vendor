'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  Handshake,
  Users,
  Target,
  Crown,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Building2,
  Zap,
  DollarSign,
  Award
} from "lucide-react"

export default function PartnersPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    partnershipType: "",
    message: ""
  })

  const benefits = [
    {
      icon: DollarSign,
      title: "Ingresos Adicionales",
      description: "Genera ingresos pasivos a través de comisiones por referidos y programas de afiliados",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: Users,
      title: "Acceso a Nuestra Red",
      description: "Conecta con miles de proveedores y clientes en toda República Dominicana",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: Sparkles,
      title: "Marketing Conjunto",
      description: "Colabora en campañas de marketing y promociones cruzadas para mayor alcance",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: Award,
      title: "Reconocimiento Premium",
      description: "Destaca como socio oficial de FemFuel con distintivos especiales y prioridad",
      color: "from-femfuel-rose to-pink-400"
    }
  ]

  const partnerTypes = [
    {
      title: "Socios Tecnológicos",
      description: "Integra tu tecnología con nuestra plataforma",
      features: ["APIs personalizadas", "Integraciones técnicas", "Soporte dedicado"]
    },
    {
      title: "Socios Comerciales",
      description: "Expande tu negocio con nuestra red de clientes",
      features: ["Programas de referidos", "Comisiones competitivas", "Marketing conjunto"]
    },
    {
      title: "Socios Educativos",
      description: "Ofrece cursos y certificaciones a nuestra comunidad",
      features: ["Plataforma de aprendizaje", "Certificaciones oficiales", "Alcance masivo"]
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Partnership application:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-rose-50/30 to-purple-50/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-femfuel-rose/5 via-purple-500/5 to-femfuel-gold/5"></div>
        
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-femfuel-rose/10 px-4 py-2 rounded-full mb-6">
            <Handshake className="h-4 w-4 text-femfuel-rose" />
            <span className="text-femfuel-rose font-medium text-sm">Programa de Socios</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Crece con <span className="text-femfuel-rose">FemFuel</span>
          </h1>
          
          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Únete a nuestro programa de socios y accede a oportunidades exclusivas de crecimiento, 
            ingresos adicionales y colaboraciones estratégicas en la industria de la belleza.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glassmorphism-button-lg">
              <Building2 className="h-4 w-4" />
              Aplicar Ahora
            </button>
            <button className="femfuel-button-lg">
              <ArrowRight className="h-4 w-4" />
              Ver Beneficios
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Crown className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Beneficios Exclusivos
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Descubre las ventajas únicas que ofrecemos a nuestros socios estratégicos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-3">{benefit.title}</h3>
                  <p className="text-femfuel-medium leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Types Section */}
      <section className="py-20 px-4 bg-femfuel-light/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Target className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Tipos de Asociación
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Elige el tipo de partnership que mejor se adapte a tu negocio
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {partnerTypes.map((type, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-femfuel-dark mb-4">{type.title}</h3>
                  <p className="text-femfuel-medium mb-6">{type.description}</p>
                  
                  <ul className="space-y-3">
                    {type.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-femfuel-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Zap className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Aplicar al Programa
            </h2>
            <p className="text-lg text-femfuel-medium">
              Completa el formulario y nos pondremos en contacto contigo
            </p>
          </div>

          <Card className="border-none shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-femfuel-dark mb-2">
                      Nombre de la Empresa *
                    </label>
                    <Input
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      className="border-2 border-gray-200 focus:border-femfuel-rose"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-femfuel-dark mb-2">
                      Nombre de Contacto *
                    </label>
                    <Input
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                      className="border-2 border-gray-200 focus:border-femfuel-rose"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-femfuel-dark mb-2">
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="border-2 border-gray-200 focus:border-femfuel-rose"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-femfuel-dark mb-2">
                      Teléfono
                    </label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="border-2 border-gray-200 focus:border-femfuel-rose"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-femfuel-dark mb-2">
                    Tipo de Partnership *
                  </label>
                  <select
                    required
                    value={formData.partnershipType}
                    onChange={(e) => setFormData({...formData, partnershipType: e.target.value})}
                    className="w-full px-3 py-2 border-2 border-gray-200 focus:border-femfuel-rose rounded-md"
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="technology">Socio Tecnológico</option>
                    <option value="commercial">Socio Comercial</option>
                    <option value="educational">Socio Educativo</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-femfuel-dark mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Cuéntanos sobre tu empresa y cómo te gustaría asociarte con FemFuel..."
                    rows={5}
                    className="border-2 border-gray-200 focus:border-femfuel-rose"
                  />
                </div>

                <div className="flex justify-center">
                  <Button type="submit" className="bg-femfuel-rose hover:bg-femfuel-rose/90 px-8 py-3">
                    <Handshake className="h-4 w-4 mr-2" />
                    Enviar Aplicación
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <VendorFooter />
    </div>
  )
}