'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Building2,
  Headphones,
  MessageCircle,
  Globe,
  Calendar,
  CheckCircle,
  ArrowRight
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    contactType: ""
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactMethods = [
    {
      icon: Phone,
      title: "Llámanos",
      description: "Habla directamente con nuestro equipo",
      info: "+1 (829) 123-4567",
      action: "Llamar",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: Mail,
      title: "Escríbenos",
      description: "Envía tu consulta por email",
      info: "hola@femfuel.com",
      action: "Escribir",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: MessageCircle,
      title: "Chat en Vivo",
      description: "Soporte inmediato en línea",
      info: "Disponible 9AM - 6PM",
      action: "Chatear",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: Calendar,
      title: "Agenda una Reunión",
      description: "Reunión personalizada con nuestro equipo",
      info: "30-60 minutos",
      action: "Agendar",
      color: "from-femfuel-rose to-pink-400"
    }
  ]

  const officeInfo = {
    address: "Av. Winston Churchill 1099, Torre Acropolis, Piso 15",
    city: "Santo Domingo, República Dominicana",
    phone: "+1 (829) 123-4567",
    email: "hola@femfuel.com",
    hours: "Lunes - Viernes: 9:00 AM - 6:00 PM"
  }

  const departments = [
    {
      name: "Ventas",
      email: "ventas@femfuel.com",
      description: "Consultas sobre planes y precios"
    },
    {
      name: "Soporte Técnico", 
      email: "soporte@femfuel.com",
      description: "Ayuda con la plataforma y problemas técnicos"
    },
    {
      name: "Partnership",
      email: "partnerships@femfuel.com", 
      description: "Oportunidades de colaboración y alianzas"
    },
    {
      name: "Prensa y Medios",
      email: "prensa@femfuel.com",
      description: "Consultas de medios y comunicación"
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitted(true)
    console.log('Contact form submitted:', formData)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-green-50/30 to-blue-50/20 flex items-center justify-center px-4">
        <Card className="border-none shadow-2xl max-w-md w-full">
          <CardContent className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-femfuel-dark mb-4">¡Mensaje Enviado!</h2>
            <p className="text-femfuel-medium mb-6">
              Gracias por contactarnos. Nuestro equipo te responderá dentro de las próximas 24 horas.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-femfuel-rose hover:bg-femfuel-rose/90"
            >
              Enviar Otro Mensaje
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-femfuel-rose/5"></div>
        
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded-full mb-6">
            <Headphones className="h-4 w-4 text-blue-600" />
            <span className="text-blue-600 font-medium text-sm">Contáctanos</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Hablemos <span className="text-blue-600">Juntos</span>
          </h1>
          
          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            ¿Tienes una pregunta, sugerencia o quieres conocer más sobre FemFuel? 
            Estamos aquí para ayudarte. Elige la forma que prefieras para contactarnos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glassmorphism-button-lg">
              <Phone className="h-4 w-4" />
              Llamar Ahora
            </button>
            <button className="femfuel-button-lg">
              <Mail className="h-4 w-4" />
              Enviar Email
            </button>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Globe className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Múltiples Formas de Contacto
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Elige el método que más te convenga para comunicarte con nosotros
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-3">{method.title}</h3>
                  <p className="text-femfuel-medium mb-4">{method.description}</p>
                  <div className="text-femfuel-rose font-semibold mb-4">{method.info}</div>
                  <Button variant="outline" className="border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white">
                    {method.action}
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-20 px-4 bg-femfuel-light/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Building2 className="h-12 w-12 text-femfuel-rose mb-6" />
              <h2 className="text-4xl font-bold text-femfuel-dark mb-6">
                Nuestra Oficina
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-femfuel-rose flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-femfuel-dark">{officeInfo.address}</div>
                    <div className="text-femfuel-medium">{officeInfo.city}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-femfuel-rose flex-shrink-0" />
                  <div className="text-femfuel-dark">{officeInfo.phone}</div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-femfuel-rose flex-shrink-0" />
                  <div className="text-femfuel-dark">{officeInfo.email}</div>
                </div>
                
                <div className="flex items-center gap-4">
                  <Clock className="h-6 w-6 text-femfuel-rose flex-shrink-0" />
                  <div className="text-femfuel-dark">{officeInfo.hours}</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-femfuel-rose/10 to-purple-500/10 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-femfuel-dark mb-6">Departamentos Específicos</h3>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-femfuel-dark">{dept.name}</h4>
                        <p className="text-sm text-femfuel-medium mb-2">{dept.description}</p>
                        <div className="text-femfuel-rose text-sm font-medium">{dept.email}</div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-femfuel-rose hover:bg-femfuel-rose/10">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Send className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Envíanos un Mensaje
            </h2>
            <p className="text-lg text-femfuel-medium">
              Completa el formulario y te responderemos en menos de 24 horas
            </p>
          </div>

          <Card className="border-none shadow-2xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-femfuel-dark mb-2">
                      Nombre Completo *
                    </label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="border-2 border-gray-200 focus:border-femfuel-rose"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
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
                  <div>
                    <label className="block text-sm font-medium text-femfuel-dark mb-2">
                      Empresa/Organización
                    </label>
                    <Input
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="border-2 border-gray-200 focus:border-femfuel-rose"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-femfuel-dark mb-2">
                      Tipo de Consulta *
                    </label>
                    <select
                      required
                      value={formData.contactType}
                      onChange={(e) => setFormData({...formData, contactType: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-200 focus:border-femfuel-rose rounded-md"
                    >
                      <option value="">Seleccionar tipo</option>
                      <option value="sales">Consulta de Ventas</option>
                      <option value="support">Soporte Técnico</option>
                      <option value="partnership">Partnership</option>
                      <option value="press">Medios y Prensa</option>
                      <option value="general">Consulta General</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-femfuel-dark mb-2">
                      Asunto *
                    </label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      placeholder="Resumen breve de tu consulta"
                      className="border-2 border-gray-200 focus:border-femfuel-rose"
                    />
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
                    placeholder="Cuéntanos detalladamente cómo podemos ayudarte..."
                    rows={6}
                    className="border-2 border-gray-200 focus:border-femfuel-rose"
                  />
                </div>

                <div className="flex justify-center pt-4">
                  <Button type="submit" className="bg-femfuel-rose hover:bg-femfuel-rose/90 px-8 py-3">
                    <Send className="h-4 w-4 mr-2" />
                    Enviar Mensaje
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