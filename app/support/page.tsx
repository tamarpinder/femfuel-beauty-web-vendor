'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  MessageCircle,
  Phone,
  Mail,
  Search,
  Clock,
  Users,
  CreditCard,
  Settings,
  ChevronRight,
  Play,
  ExternalLink,
  Send,
  Shield,
  BookOpen,
  Video,
  FileText,
  AlertCircle,
  Star,
  Headphones
} from "lucide-react"

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    priority: "",
    subject: "",
    message: ""
  })

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Respuesta inmediata",
      action: "Escribir ahora",
      link: "https://wa.me/18095551234",
      color: "bg-green-500",
      available: "24/7"
    },
    {
      icon: Mail,
      title: "Email",
      description: "soporte@femfuelbeauty.com",
      action: "Enviar email",
      link: "mailto:soporte@femfuelbeauty.com",
      color: "bg-blue-500",
      available: "Respuesta en 2-4 horas"
    },
    {
      icon: Phone,
      title: "Teléfono",
      description: "+1 (809) 555-1234",
      action: "Llamar ahora",
      link: "tel:+18095551234",
      color: "bg-femfuel-rose",
      available: "Lun-Vie 8AM-6PM"
    }
  ]

  const categories = [
    {
      id: "getting-started",
      icon: Users,
      title: "Primeros Pasos",
      description: "Configuración de cuenta y perfil",
      articles: 8,
      color: "bg-blue-50 text-blue-600"
    },
    {
      id: "bookings",
      icon: BookOpen,
      title: "Reservas y Agenda",
      description: "Gestión de citas y horarios",
      articles: 12,
      color: "bg-green-50 text-green-600"
    },
    {
      id: "payments",
      icon: CreditCard,
      title: "Pagos y Facturación",
      description: "Comisiones, pagos y reportes",
      articles: 15,
      color: "bg-yellow-50 text-yellow-600"
    },
    {
      id: "technical",
      icon: Settings,
      title: "Problemas Técnicos",
      description: "App, notificaciones y errores",
      articles: 10,
      color: "bg-purple-50 text-purple-600"
    },
    {
      id: "account",
      icon: Shield,
      title: "Cuenta y Seguridad",
      description: "Perfil, contraseña y privacidad",
      articles: 6,
      color: "bg-red-50 text-red-600"
    },
    {
      id: "growth",
      icon: Star,
      title: "Crecimiento del Negocio",
      description: "Marketing, reseñas y consejos",
      articles: 9,
      color: "bg-femfuel-rose/10 text-femfuel-rose"
    }
  ]

  const popularArticles = [
    {
      title: "¿Cómo configuro mi perfil por primera vez?",
      category: "Primeros Pasos",
      views: "2.1k vistas",
      readTime: "3 min"
    },
    {
      title: "¿Cuándo y cómo recibo mis pagos?",
      category: "Pagos",
      views: "1.8k vistas", 
      readTime: "5 min"
    },
    {
      title: "¿Cómo gestiono mi calendario y horarios?",
      category: "Reservas",
      views: "1.5k vistas",
      readTime: "4 min"
    },
    {
      title: "¿Qué hacer si un cliente cancela?",
      category: "Reservas",
      views: "1.3k vistas",
      readTime: "2 min"
    },
    {
      title: "¿Cómo subo fotos a mi portfolio?",
      category: "Perfil",
      views: "1.2k vistas",
      readTime: "3 min"
    }
  ]

  const videoTutorials = [
    {
      title: "Configuración inicial de tu cuenta",
      duration: "4:32",
      thumbnail: "/tutorials/setup-account.jpg",
      views: "3.2k"
    },
    {
      title: "Cómo optimizar tu perfil para más clientes",
      duration: "6:15",
      thumbnail: "/tutorials/optimize-profile.jpg", 
      views: "2.8k"
    },
    {
      title: "Gestión eficiente de reservas",
      duration: "5:21",
      thumbnail: "/tutorials/manage-bookings.jpg",
      views: "2.4k"
    },
    {
      title: "Maximiza tus ingresos con estos consejos",
      duration: "7:45",
      thumbnail: "/tutorials/maximize-earnings.jpg",
      views: "2.1k"
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-femfuel-light via-white to-femfuel-purple overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/5 to-femfuel-gold/5"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <Badge className="mb-6 bg-femfuel-rose text-white hover:bg-femfuel-rose/90">
            Soporte 24/7 - Estamos Aquí Para Ti
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-femfuel-dark mb-6 leading-tight max-w-5xl mx-auto">
            Centro de Soporte
          </h1>
          <p className="text-xl text-femfuel-medium mb-8 max-w-3xl mx-auto leading-relaxed">
            ¿Necesitas ayuda? Encuentra respuestas rápidas, tutoriales paso a paso 
            y contacta directamente con nuestro equipo de soporte.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-femfuel-medium" />
              <Input
                type="text"
                placeholder="¿En qué podemos ayudarte? Ej: 'cómo configurar mi perfil'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-femfuel-rose rounded-xl"
              />
              <Button className="absolute right-2 top-2 bg-femfuel-rose hover:bg-femfuel-rose/90">
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              Contáctanos Directamente
            </h2>
            <p className="text-lg text-femfuel-medium">
              Nuestro equipo está disponible para ayudarte cuando lo necesites
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${method.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <method.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-2">{method.title}</h3>
                  <p className="text-femfuel-medium mb-2">{method.description}</p>
                  <p className="text-sm text-femfuel-medium/70 mb-4">{method.available}</p>
                  <Button 
                    className="w-full bg-femfuel-rose hover:bg-femfuel-rose/90"
                    onClick={() => window.open(method.link, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="py-16 bg-femfuel-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              Explora por Categoría
            </h2>
            <p className="text-lg text-femfuel-medium">
              Encuentra respuestas organizadas por temas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <category.icon className="h-6 w-6" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-femfuel-medium group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="text-lg font-bold text-femfuel-dark mb-2">{category.title}</h3>
                  <p className="text-femfuel-medium mb-3">{category.description}</p>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-femfuel-medium" />
                    <span className="text-sm text-femfuel-medium">{category.articles} artículos</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-femfuel-dark mb-2">
                Artículos Populares
              </h2>
              <p className="text-lg text-femfuel-medium">
                Las preguntas más frecuentes de nuestros proveedores
              </p>
            </div>
            <Button variant="outline" className="border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white">
              Ver todos
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="space-y-4">
            {popularArticles.map((article, index) => (
              <Card key={index} className="border-none shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-femfuel-dark mb-2 group-hover:text-femfuel-rose transition-colors">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-femfuel-medium">
                        <Badge variant="secondary" className="bg-femfuel-rose/10 text-femfuel-rose">
                          {article.category}
                        </Badge>
                        <span>{article.views}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-femfuel-medium group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="py-16 bg-femfuel-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Video className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              Tutoriales en Video
            </h2>
            <p className="text-lg text-femfuel-medium">
              Aprende visualmente con nuestros tutoriales paso a paso
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {videoTutorials.map((video, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-femfuel-rose/20 to-femfuel-gold/20 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 text-femfuel-rose ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-femfuel-dark mb-2 line-clamp-2 group-hover:text-femfuel-rose transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-femfuel-medium">{video.views} visualizaciones</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Headphones className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-lg text-femfuel-medium">
              Envíanos un mensaje y te ayudaremos personalmente
            </p>
          </div>

          <Card className="border-none shadow-xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-femfuel-dark mb-2">
                      Nombre completo *
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
                      Categoría *
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-200 focus:border-femfuel-rose rounded-md"
                    >
                      <option value="">Seleccionar categoría</option>
                      <option value="account">Cuenta y Perfil</option>
                      <option value="bookings">Reservas y Agenda</option>
                      <option value="payments">Pagos y Facturación</option>
                      <option value="technical">Problema Técnico</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-femfuel-dark mb-2">
                      Prioridad *
                    </label>
                    <select
                      required
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-3 py-2 border-2 border-gray-200 focus:border-femfuel-rose rounded-md"
                    >
                      <option value="">Seleccionar prioridad</option>
                      <option value="low">Baja - Pregunta general</option>
                      <option value="medium">Media - Necesito ayuda</option>
                      <option value="high">Alta - Problema urgente</option>
                      <option value="critical">Crítica - Emergencia</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-femfuel-dark mb-2">
                    Asunto *
                  </label>
                  <Input
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="Describe brevemente tu consulta"
                    className="border-2 border-gray-200 focus:border-femfuel-rose"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-femfuel-dark mb-2">
                    Mensaje *
                  </label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Explica detalladamente tu consulta o problema..."
                    rows={5}
                    className="border-2 border-gray-200 focus:border-femfuel-rose"
                  />
                </div>

                <div className="flex justify-center">
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

      {/* Emergency Support */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-orange-50 border-t border-red-200">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-800 mb-4">
            ¿Necesitas Ayuda Urgente?
          </h2>
          <p className="text-red-700 mb-6">
            Si tienes un problema crítico que afecta tu capacidad de trabajar, contáctanos inmediatamente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => window.open('https://wa.me/18095551234?text=URGENTE:', '_blank')}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp Urgente
            </Button>
            <Button 
              variant="outline" 
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
              onClick={() => window.open('tel:+18095551234', '_blank')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Llamar Ahora
            </Button>
          </div>
        </div>
      </section>

      <VendorFooter />
    </div>
  )
}