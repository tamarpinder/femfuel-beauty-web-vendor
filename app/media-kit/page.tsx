'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  Download,
  Camera,
  Palette,
  FileText,
  Video,
  Newspaper,
  Award,
  TrendingUp,
  Users,
  Target,
  Building2,
  Crown,
  Sparkles
} from "lucide-react"

export default function MediaKitPage() {
  const brandAssets = [
    {
      category: "Logos",
      icon: Crown,
      items: [
        { name: "Logo Principal PNG", size: "2.3 MB", format: "PNG" },
        { name: "Logo Principal SVG", size: "156 KB", format: "SVG" },
        { name: "Logo Horizontal", size: "1.8 MB", format: "PNG" },
        { name: "Logo Vertical", size: "2.1 MB", format: "PNG" },
        { name: "Isotipo", size: "1.2 MB", format: "PNG" }
      ]
    },
    {
      category: "Colores de Marca",
      icon: Palette,
      items: [
        { name: "Paleta Completa", size: "890 KB", format: "ASE" },
        { name: "Códigos Hex", size: "45 KB", format: "TXT" },
        { name: "Swatches Photoshop", size: "234 KB", format: "ACO" },
        { name: "Colores Web", size: "67 KB", format: "CSS" }
      ]
    },
    {
      category: "Fotografías",
      icon: Camera,
      items: [
        { name: "Pack de Fotos Corporativas", size: "45 MB", format: "ZIP" },
        { name: "Fotos de Equipo", size: "28 MB", format: "ZIP" },
        { name: "Fotos de Servicios", size: "67 MB", format: "ZIP" },
        { name: "Lifestyle Photos", size: "52 MB", format: "ZIP" }
      ]
    },
    {
      category: "Videos",
      icon: Video,
      items: [
        { name: "Video Corporativo", size: "125 MB", format: "MP4" },
        { name: "Testimoniales", size: "89 MB", format: "MP4" },
        { name: "Demo de Plataforma", size: "156 MB", format: "MP4" },
        { name: "Animaciones Logo", size: "34 MB", format: "MOV" }
      ]
    }
  ]

  const companyInfo = {
    founded: "2025",
    headquarters: "Santo Domingo, República Dominicana",
    employees: "5",
    users: "1,000+",
    vendors: "10+",
    cities: "32"
  }

  const keyMessages = [
    {
      title: "Misión",
      content: "Democratizar el acceso a servicios de belleza de calidad en República Dominicana, conectando proveedores talentosos con clientes que buscan experiencias excepcionales."
    },
    {
      title: "Visión", 
      content: "Ser la plataforma líder de servicios de belleza en el Caribe, transformando la industria a través de la tecnología y creando oportunidades para miles de profesionales."
    },
    {
      title: "Valores",
      content: "Excelencia, Innovación, Comunidad y Empoderamiento. Creemos en el poder de la belleza para transformar vidas y construir una economía más inclusiva."
    }
  ]

  const achievements = [
    { icon: Users, number: "1,000+", label: "Usuarios Registrados" },
    { icon: TrendingUp, number: "10+", label: "Proveedores Activos" },
    { icon: Award, number: "4.9/5", label: "Calificación Promedio" },
    { icon: Target, number: "32", label: "Provincias Cubiertas" }
  ]

  const handleDownload = (itemName: string) => {
    console.log(`Downloading: ${itemName}`)
    // Implement actual download logic
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-rose-50/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-femfuel-rose/5 to-femfuel-gold/5"></div>
        
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
            <Newspaper className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-medium text-sm">Kit de Medios</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Kit de <span className="text-purple-600">Medios</span>
          </h1>
          
          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Recursos oficiales de marca, información corporativa y materiales de prensa 
            para medios de comunicación, socios y colaboradores.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glassmorphism-button-lg" onClick={() => handleDownload('Kit Completo')}>
              <Download className="h-4 w-4" />
              Descargar Kit Completo
            </button>
            <button className="femfuel-button-lg">
              <FileText className="h-4 w-4" />
              Guía de Uso
            </button>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Building2 className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Información Corporativa
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Datos oficiales sobre FemFuel Beauty para uso en medios y comunicaciones
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-femfuel-rose mb-2">{companyInfo.founded}</div>
                <div className="text-femfuel-medium">Año de Fundación</div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-lg font-bold text-femfuel-dark mb-2">{companyInfo.headquarters}</div>
                <div className="text-femfuel-medium">Sede Principal</div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-femfuel-rose mb-2">{companyInfo.employees}</div>
                <div className="text-femfuel-medium">Empleados</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="border-none shadow-lg text-center">
                <CardContent className="p-6">
                  <achievement.icon className="h-8 w-8 text-femfuel-rose mx-auto mb-3" />
                  <div className="text-2xl font-bold text-femfuel-dark mb-1">{achievement.number}</div>
                  <div className="text-femfuel-medium text-sm">{achievement.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Key Messages */}
      <section className="py-20 px-4 bg-femfuel-light/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Sparkles className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Mensajes Clave
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Nuestra filosofía y valores fundamentales
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {keyMessages.map((message, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-femfuel-dark mb-4">{message.title}</h3>
                  <p className="text-femfuel-medium leading-relaxed">{message.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Assets */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="h-12 w-12 text-femfuel-rose mx-auto mb-4 bg-femfuel-rose/10 rounded-full flex items-center justify-center">
              <span className="text-2xl">🎨</span>
            </div>
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Recursos de Marca
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Descarga logos, colores, fotografías y otros elementos de marca
            </p>
          </div>

          <div className="space-y-12">
            {brandAssets.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-femfuel-rose to-pink-400 rounded-lg flex items-center justify-center">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-femfuel-dark">{category.category}</h3>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h4 className="font-semibold text-femfuel-dark mb-2">{item.name}</h4>
                            <div className="flex items-center gap-3 text-sm text-femfuel-medium">
                              <Badge variant="secondary" className="bg-gray-100">
                                {item.format}
                              </Badge>
                              <span>{item.size}</span>
                            </div>
                          </div>
                        </div>
                        
                        <button 
                          className="glassmorphism-button w-full"
                          onClick={() => handleDownload(item.name)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Descargar
                        </button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="py-20 px-4 bg-femfuel-light/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <FileText className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Guías de Uso
            </h2>
            <p className="text-lg text-femfuel-medium">
              Lineamientos para el uso correcto de nuestra marca
            </p>
          </div>

          <Card className="border-none shadow-xl">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-3">Uso Permitido</h3>
                  <ul className="space-y-2 text-femfuel-medium">
                    <li>• Uso editorial en artículos de prensa y medios</li>
                    <li>• Comunicaciones corporativas y materiales de socios</li>
                    <li>• Presentaciones y eventos relacionados con FemFuel</li>
                    <li>• Materiales educativos y de investigación</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-3">Restricciones</h3>
                  <ul className="space-y-2 text-femfuel-medium">
                    <li>• No modificar los colores oficiales del logo</li>
                    <li>• No alterar las proporciones o elementos del logo</li>
                    <li>• No usar para fines comerciales sin autorización</li>
                    <li>• Mantener espacios mínimos de protección</li>
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm text-femfuel-medium">
                    Para consultas sobre uso de marca o solicitudes especiales, contacta a nuestro equipo de marketing en <span className="text-femfuel-rose font-medium">marketing@femfuel.com</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <VendorFooter />
    </div>
  )
}