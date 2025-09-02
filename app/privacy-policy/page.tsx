'use client'

import { Card, CardContent } from "@/components/ui/card"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  Shield,
  Eye,
  Lock,
  Database,
  Users,
  Clock,
  Download,
  Mail,
  AlertCircle,
  CheckCircle
} from "lucide-react"

export default function PrivacyPolicyPage() {
  const lastUpdated = "15 de enero de 2025"

  const dataTypes = [
    {
      icon: Users,
      title: "Información Personal",
      items: ["Nombre y apellidos", "Dirección de correo electrónico", "Número de teléfono", "Fecha de nacimiento"]
    },
    {
      icon: Database,
      title: "Información de Uso",
      items: ["Historial de servicios", "Preferencias de usuario", "Datos de navegación", "Interacciones en la plataforma"]
    },
    {
      icon: Lock,
      title: "Información Financiera",
      items: ["Datos de tarjetas (encriptados)", "Historial de transacciones", "Información de facturación", "Métodos de pago preferidos"]
    }
  ]

  const rights = [
    "Derecho de acceso a sus datos personales",
    "Derecho de rectificación de información incorrecta",
    "Derecho de eliminación de datos (derecho al olvido)",
    "Derecho de portabilidad de datos",
    "Derecho de oposición al procesamiento",
    "Derecho de limitación del tratamiento"
  ]

  const handleDownload = () => {
    console.log('Downloading Privacy Policy PDF...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-blue-50/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-femfuel-rose/5"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full mb-6">
            <Shield className="h-4 w-4 text-emerald-600" />
            <span className="text-emerald-600 font-medium text-sm">Privacidad y Datos</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Política de <span className="text-emerald-600">Privacidad</span>
          </h1>
          
          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Su privacidad es fundamental para nosotros. Esta política explica cómo recopilamos, 
            utilizamos y protegemos su información personal en FemFuel Beauty.
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm text-femfuel-medium mb-8">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Última actualización: {lastUpdated}</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glassmorphism-button-lg" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              Descargar PDF
            </button>
            <button className="femfuel-button-lg">
              <Mail className="h-4 w-4" />
              Consultas sobre Privacidad
            </button>
          </div>
        </div>
      </section>

      {/* Data Collection */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Database className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Información que Recopilamos
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Recopilamos diferentes tipos de información para brindarle la mejor experiencia posible
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {dataTypes.map((type, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center mx-auto mb-6">
                    <type.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-4 text-center">{type.title}</h3>
                  <ul className="space-y-3">
                    {type.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-femfuel-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Use Data */}
      <section className="py-16 px-4 bg-femfuel-light/50">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Eye className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
                  Cómo Utilizamos su Información
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-4">Servicios Principales</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-femfuel-rose rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-femfuel-medium">Facilitar reservas de servicios de belleza</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-femfuel-rose rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-femfuel-medium">Procesar pagos y transacciones</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-femfuel-rose rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-femfuel-medium">Conectar clientes con proveedores</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-femfuel-rose rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-femfuel-medium">Brindar soporte al cliente</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-4">Mejoras y Comunicación</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-femfuel-medium">Personalizar su experiencia</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-femfuel-medium">Mejorar nuestros servicios</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-femfuel-medium">Enviar notificaciones importantes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-femfuel-medium">Prevenir fraudes y abusos</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Data Protection */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Lock className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              Protección de Datos
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Implementamos múltiples capas de seguridad para proteger su información
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-femfuel-dark mb-6">Medidas Técnicas</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-400 rounded-full flex items-center justify-center">
                      <Lock className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-femfuel-medium">Encriptación SSL/TLS</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-400 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-femfuel-medium">Firewalls avanzados</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-400 rounded-full flex items-center justify-center">
                      <Database className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-femfuel-medium">Bases de datos seguras</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-femfuel-dark mb-6">Medidas Organizacionales</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-femfuel-rose to-pink-400 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-femfuel-medium">Acceso limitado al personal</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-400 rounded-full flex items-center justify-center">
                      <Eye className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-femfuel-medium">Monitoreo continuo</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-indigo-400 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-femfuel-medium">Auditorías regulares</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* User Rights */}
      <section className="py-16 px-4 bg-femfuel-light/50">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
                  Sus Derechos de Privacidad
                </h2>
                <p className="text-lg text-femfuel-medium">
                  Usted tiene control total sobre sus datos personales
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {rights.map((right, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                    <span className="text-femfuel-medium">{right}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg">
                <p className="text-femfuel-medium text-center">
                  Para ejercer cualquiera de estos derechos, contáctenos en{" "}
                  <span className="text-emerald-600 font-medium">privacidad@femfuel.com</span> o
                  a través de la configuración de su cuenta.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Mail className="h-12 w-12 text-femfuel-rose mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
            ¿Preguntas sobre Privacidad?
          </h2>
          <p className="text-lg text-femfuel-medium mb-8 max-w-2xl mx-auto">
            Nuestro equipo de privacidad está disponible para responder cualquier consulta sobre el manejo de sus datos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glassmorphism-button-lg">
              <Mail className="h-4 w-4" />
              Contactar Privacidad
            </button>
            <button className="femfuel-button-lg">
              <Users className="h-4 w-4" />
              Centro de Ayuda
            </button>
          </div>
        </div>
      </section>

      <VendorFooter />
    </div>
  )
}