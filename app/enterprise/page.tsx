'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  Building2,
  Shield,
  Zap,
  TrendingUp,
  Globe,
  CheckCircle,
  ArrowRight,
  Crown,
  Settings,
  BarChart3,
  Headphones,
  Lock,
  Smartphone
} from "lucide-react"

export default function EnterprisePage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    companySize: "",
    industry: "",
    message: ""
  })

  const features = [
    {
      icon: Shield,
      title: "Seguridad Avanzada",
      description: "Protección de datos nivel empresarial con encriptación y cumplimiento normativo",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: Settings,
      title: "Personalización Total",
      description: "Configuraciones personalizadas y branding completo para tu organización",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: BarChart3,
      title: "Analytics Avanzados",
      description: "Reportes detallados y métricas empresariales para toma de decisiones",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: Headphones,
      title: "Soporte 24/7",
      description: "Equipo de soporte dedicado disponible las 24 horas para tu empresa",
      color: "from-femfuel-rose to-pink-400"
    },
    {
      icon: Globe,
      title: "Escalabilidad Global",
      description: "Infraestructura robusta que crece con tu negocio sin límites",
      color: "from-orange-500 to-red-400"
    },
    {
      icon: Lock,
      title: "Compliance Total",
      description: "Cumplimiento con normativas internacionales y locales de privacidad",
      color: "from-indigo-500 to-purple-400"
    }
  ]

  const plans = [
    {
      name: "Enterprise Starter",
      price: "$2,500",
      period: "mensual",
      description: "Perfecto para empresas medianas que inician",
      features: [
        "Hasta 500 proveedores",
        "Dashboard personalizado",
        "Soporte por email",
        "Reportes básicos",
        "Integraciones estándar"
      ],
      popular: false
    },
    {
      name: "Enterprise Pro",
      price: "$5,000",
      period: "mensual", 
      description: "La opción más popular para grandes empresas",
      features: [
        "Proveedores ilimitados",
        "Branding completo",
        "Soporte 24/7",
        "Analytics avanzados",
        "APIs personalizadas",
        "Manager dedicado"
      ],
      popular: true
    },
    {
      name: "Enterprise Custom",
      price: "Cotización",
      period: "personalizada",
      description: "Solución completamente personalizada",
      features: [
        "Todo en Enterprise Pro",
        "Desarrollo personalizado",
        "Infraestructura dedicada",
        "SLA garantizado",
        "Consultoría especializada"
      ],
      popular: false
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Enterprise inquiry:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-femfuel-rose/5"></div>
        
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full mb-6">
            <Building2 className="h-4 w-4 text-blue-600" />
            <span className="text-blue-600 font-medium text-sm">Soluciones Empresariales</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Potencia tu <span className="text-blue-600">Empresa</span>
          </h1>
          
          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Soluciones empresariales escalables y personalizadas para organizaciones que buscan 
            transformar su gestión de servicios de belleza y bienestar.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glassmorphism-button-lg">
              <Smartphone className="h-4 w-4" />
              Demo Personalizada
            </button>
            <button className="femfuel-button-lg">
              <ArrowRight className="h-4 w-4" />
              Ver Precios
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Características Empresariales
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Herramientas avanzadas diseñadas para satisfacer las necesidades de tu empresa
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-3">{feature.title}</h3>
                  <p className="text-femfuel-medium leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 px-4 bg-femfuel-light/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Crown className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Planes Empresariales
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Elige el plan que mejor se adapte al tamaño y necesidades de tu empresa
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card key={index} className={`border-none shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                plan.popular ? 'ring-2 ring-femfuel-rose' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-femfuel-rose text-white px-4 py-1">
                      Más Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-femfuel-dark mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-femfuel-rose mb-1">{plan.price}</div>
                    <div className="text-femfuel-medium">{plan.period}</div>
                    <p className="text-femfuel-medium mt-4">{plan.description}</p>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-femfuel-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button className={`w-full ${
                    plan.popular 
                      ? 'bg-femfuel-rose hover:bg-femfuel-rose/90' 
                      : 'bg-gray-600 hover:bg-gray-700'
                  }`}>
                    {plan.price === "Cotización" ? "Contactar Ventas" : "Comenzar Ahora"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <TrendingUp className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Solicitar Demo
            </h2>
            <p className="text-lg text-femfuel-medium">
              Descubre cómo FemFuel puede transformar tu empresa
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

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-femfuel-dark mb-2">
                      Tamaño de la Empresa *
                    </label>
                    <select
                      required
                      value={formData.companySize}
                      onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-200 focus:border-femfuel-rose rounded-md"
                    >
                      <option value="">Seleccionar tamaño</option>
                      <option value="50-100">50-100 empleados</option>
                      <option value="100-500">100-500 empleados</option>
                      <option value="500-1000">500-1000 empleados</option>
                      <option value="1000+">1000+ empleados</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-femfuel-dark mb-2">
                      Industria
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-200 focus:border-femfuel-rose rounded-md"
                    >
                      <option value="">Seleccionar industria</option>
                      <option value="beauty">Belleza y Cosmética</option>
                      <option value="wellness">Bienestar y Salud</option>
                      <option value="hospitality">Hospitalidad</option>
                      <option value="retail">Retail</option>
                      <option value="other">Otra</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-femfuel-dark mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Cuéntanos sobre tus necesidades empresariales y cómo podemos ayudarte..."
                    rows={5}
                    className="border-2 border-gray-200 focus:border-femfuel-rose"
                  />
                </div>

                <div className="flex justify-center">
                  <Button type="submit" className="bg-femfuel-rose hover:bg-femfuel-rose/90 px-8 py-3">
                    <Building2 className="h-4 w-4 mr-2" />
                    Solicitar Demo
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