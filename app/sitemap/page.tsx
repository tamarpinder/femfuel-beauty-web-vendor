'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  Map,
  Search,
  ExternalLink,
  Home,
  Building2,
  Scale,
  Users,
  LayoutDashboard,
  Clock,
  Globe,
  ArrowRight
} from "lucide-react"

export default function SitemapPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const lastUpdated = "15 de enero de 2025"

  const sitePages = [
    {
      category: "Páginas Principales",
      icon: Home,
      color: "from-femfuel-rose to-pink-400",
      pages: [
        { name: "Inicio", href: "/", description: "Página principal de FemFuel Beauty" },
        { name: "Acerca de Nosotros", href: "/about", description: "Historia y misión de la empresa" },
        { name: "Cómo Funciona", href: "/how-it-works", description: "Guía paso a paso de la plataforma" },
        { name: "Historias de Éxito", href: "/success-stories", description: "Testimonios de usuarios y proveedores" },
        { name: "Blog", href: "/blog", description: "Artículos y recursos de belleza" },
        { name: "Precios", href: "/pricing", description: "Planes y estructura de comisiones" },
        { name: "Centro de Soporte", href: "/support", description: "Ayuda y preguntas frecuentes" }
      ]
    },
    {
      category: "Páginas de Negocio",
      icon: Building2,
      color: "from-blue-500 to-cyan-400",
      pages: [
        { name: "Programa de Socios", href: "/partners", description: "Oportunidades de asociación estratégica" },
        { name: "Soluciones Empresariales", href: "/enterprise", description: "Servicios para grandes organizaciones" },
        { name: "Kit de Medios", href: "/media-kit", description: "Recursos de marca y materiales de prensa" },
        { name: "Carreras", href: "/careers", description: "Oportunidades laborales en FemFuel" },
        { name: "Contáctanos", href: "/contact", description: "Información de contacto y formularios" }
      ]
    },
    {
      category: "Páginas Legales",
      icon: Scale,
      color: "from-purple-500 to-indigo-400",
      pages: [
        { name: "Términos de Servicio", href: "/terms-of-service", description: "Condiciones de uso de la plataforma" },
        { name: "Política de Privacidad", href: "/privacy-policy", description: "Manejo y protección de datos personales" },
        { name: "Acuerdo de Proveedor", href: "/vendor-agreement", description: "Términos específicos para proveedores" },
        { name: "Seguridad de Datos", href: "/data-security", description: "Medidas de protección y seguridad" },
        { name: "Cumplimiento", href: "/compliance", description: "Adherencia regulatoria y certificaciones" }
      ]
    },
    {
      category: "Páginas de Usuario",
      icon: Users,
      color: "from-green-500 to-emerald-400",
      pages: [
        { name: "Iniciar Sesión", href: "/login", description: "Acceso para usuarios registrados" },
        { name: "Registrarse", href: "/register", description: "Crear nueva cuenta de usuario" }
      ]
    },
    {
      category: "Dashboard (Requiere Login)",
      icon: LayoutDashboard,
      color: "from-orange-500 to-amber-400",
      pages: [
        { name: "Dashboard Principal", href: "/dashboard", description: "Panel principal del proveedor" },
        { name: "Reservas", href: "/dashboard/bookings", description: "Gestión de citas y reservas" },
        { name: "Calendario", href: "/dashboard/calendar", description: "Vista de calendario de citas" },
        { name: "Chat", href: "/dashboard/chat", description: "Mensajería con clientes" },
        { name: "Ganancias", href: "/dashboard/earnings", description: "Reportes financieros y pagos" },
        { name: "Perfil", href: "/dashboard/profile", description: "Información personal del proveedor" },
        { name: "Servicios", href: "/dashboard/services", description: "Gestión de servicios ofrecidos" },
        { name: "Configuración", href: "/dashboard/settings", description: "Ajustes de cuenta y preferencias" }
      ]
    }
  ]

  const filteredPages = sitePages.map(category => ({
    ...category,
    pages: category.pages.filter(page =>
      page.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.pages.length > 0)

  const totalPages = sitePages.reduce((sum, category) => sum + category.pages.length, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/30 to-purple-50/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 via-purple-500/5 to-femfuel-rose/5"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-slate-500/10 px-4 py-2 rounded-full mb-6">
            <Map className="h-4 w-4 text-slate-600" />
            <span className="text-slate-600 font-medium text-sm">Navegación del Sitio</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Mapa del <span className="text-slate-600">Sitio</span>
          </h1>
          
          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Encuentra fácilmente cualquier página de FemFuel Beauty. Explora todas nuestras secciones 
            y descubre todo lo que nuestra plataforma tiene para ofrecer.
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-femfuel-medium mb-8">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Última actualización: {lastUpdated}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{totalPages} páginas disponibles</span>
            </div>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar páginas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-gray-200 focus:border-femfuel-rose h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Sitemap Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-12">
            {filteredPages.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-femfuel-dark">{category.category}</h2>
                    <p className="text-femfuel-medium">{category.pages.length} páginas disponibles</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.pages.map((page, pageIndex) => (
                    <Card key={pageIndex} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-bold text-femfuel-dark group-hover:text-femfuel-rose transition-colors">
                            {page.name}
                          </h3>
                          <ExternalLink className="h-4 w-4 text-femfuel-medium group-hover:text-femfuel-rose transition-colors" />
                        </div>
                        <p className="text-femfuel-medium text-sm mb-4 leading-relaxed">
                          {page.description}
                        </p>
                        <a
                          href={page.href}
                          className="inline-flex items-center gap-2 text-femfuel-rose hover:text-femfuel-rose/80 transition-colors text-sm font-medium"
                        >
                          Visitar página
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {searchTerm && filteredPages.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-femfuel-dark mb-2">
                No se encontraron resultados
              </h3>
              <p className="text-femfuel-medium">
                Intenta con un término de búsqueda diferente
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-16 px-4 bg-femfuel-light/50">
        <div className="max-w-4xl mx-auto text-center">
          <Map className="h-12 w-12 text-femfuel-rose mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
            Navegación Rápida
          </h2>
          <p className="text-lg text-femfuel-medium mb-8 max-w-2xl mx-auto">
            Accesos directos a las páginas más importantes de FemFuel Beauty
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="glassmorphism-button">
              <Home className="h-4 w-4" />
              Inicio
            </button>
            <button className="glassmorphism-button">
              <Users className="h-4 w-4" />
              Registrarse
            </button>
            <button className="glassmorphism-button">
              <Building2 className="h-4 w-4" />
              Proveedores
            </button>
            <button className="glassmorphism-button">
              <Scale className="h-4 w-4" />
              Soporte
            </button>
          </div>
        </div>
      </section>

      {/* Information */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-xl bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-8 text-center">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-femfuel-dark mb-4">
                Acerca de este Sitemap
              </h3>
              <p className="text-femfuel-medium leading-relaxed mb-4">
                Este mapa del sitio se actualiza automáticamente para reflejar todas las páginas 
                disponibles en FemFuel Beauty. Incluye {totalPages} páginas organizadas en 5 categorías principales 
                para facilitar su navegación.
              </p>
              <p className="text-femfuel-medium leading-relaxed">
                Si tiene dificultades para encontrar algo específico, puede usar la función de búsqueda 
                arriba o contactarnos directamente para obtener ayuda.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <VendorFooter />
    </div>
  )
}