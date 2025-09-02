'use client'

import { Card, CardContent } from "@/components/ui/card"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  Handshake,
  DollarSign,
  FileText,
  Users,
  Clock,
  Download,
  Mail,
  AlertTriangle,
  CheckCircle,
  Calendar,
  TrendingUp,
  Shield
} from "lucide-react"

export default function VendorAgreementPage() {
  const lastUpdated = "15 de enero de 2025"

  const commissionStructure = [
    {
      phase: "Fase Actual (0-6 meses)",
      commission: "0%",
      description: "Período de lanzamiento sin comisiones",
      color: "from-green-500 to-emerald-400"
    },
    {
      phase: "Fase de Crecimiento (7-12 meses)", 
      commission: "8%",
      description: "Comisión introductoria reducida",
      color: "from-blue-500 to-cyan-400"
    },
    {
      phase: "Fase Completa (12+ meses)",
      commission: "15%",
      description: "Estructura de comisión estándar",
      color: "from-femfuel-rose to-pink-400"
    }
  ]

  const obligations = [
    {
      icon: CheckCircle,
      title: "Licencias y Certificaciones",
      items: [
        "Mantener licencias profesionales vigentes",
        "Certificados de salud actualizados",
        "Seguros de responsabilidad civil",
        "Cumplimiento normativo local"
      ]
    },
    {
      icon: Shield,
      title: "Calidad de Servicio",
      items: [
        "Mantener estándares profesionales",
        "Higiene y seguridad apropiadas",
        "Puntualidad en las citas",
        "Trato respetuoso con clientes"
      ]
    },
    {
      icon: Users,
      title: "Interacción con Clientes",
      items: [
        "Comunicación profesional",
        "Respuesta oportuna a mensajes",
        "Transparencia en servicios",
        "Resolución constructiva de conflictos"
      ]
    }
  ]

  const handleDownload = () => {
    console.log('Downloading Vendor Agreement PDF...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50/30 to-rose-50/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-femfuel-rose/5 to-orange-500/5"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full mb-6">
            <Handshake className="h-4 w-4 text-purple-600" />
            <span className="text-purple-600 font-medium text-sm">Acuerdo Legal</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Acuerdo de <span className="text-purple-600">Proveedor</span>
          </h1>
          
          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Este acuerdo establece los términos y condiciones para proveedores de servicios 
            de belleza que desean unirse a la plataforma FemFuel Beauty.
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
              Consultas de Proveedores
            </button>
          </div>
        </div>
      </section>

      {/* Commission Structure */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <DollarSign className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Estructura de Comisiones
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Sistema de comisiones progresivo diseñado para apoyar el crecimiento de los proveedores
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {commissionStructure.map((phase, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center mx-auto mb-6`}>
                    <span className="text-2xl font-bold text-white">{phase.commission}</span>
                  </div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-3">{phase.phase}</h3>
                  <p className="text-femfuel-medium">{phase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Provider Obligations */}
      <section className="py-16 px-4 bg-femfuel-light/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <FileText className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Obligaciones del Proveedor
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Compromisos esenciales para mantener la calidad y confianza en la plataforma
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {obligations.map((obligation, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-400 flex items-center justify-center mx-auto mb-6">
                    <obligation.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-4 text-center">{obligation.title}</h3>
                  <ul className="space-y-3">
                    {obligation.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
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

      {/* Terms and Conditions */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Calendar className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
              Términos Específicos del Acuerdo
            </h2>
          </div>

          <div className="space-y-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-femfuel-dark mb-4">1. Pagos y Facturación</h3>
                <ul className="space-y-3 text-femfuel-medium">
                  <li>• Los pagos se procesan automáticamente después de cada servicio completado</li>
                  <li>• Las comisiones se deducen antes de la transferencia al proveedor</li>
                  <li>• Los pagos se realizan semanalmente a la cuenta bancaria registrada</li>
                  <li>• Los proveedores son responsables de sus propias obligaciones fiscales</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-femfuel-dark mb-4">2. Cancelaciones y Reembolsos</h3>
                <ul className="space-y-3 text-femfuel-medium">
                  <li>• Cancelaciones con más de 24 horas: sin penalización</li>
                  <li>• Cancelaciones con menos de 24 horas: penalización del 20%</li>
                  <li>• No-shows del cliente: el proveedor recibe compensación completa</li>
                  <li>• Reembolsos por servicios deficientes pueden ser deducidos de pagos futuros</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-femfuel-dark mb-4">3. Estándares de Calificación</h3>
                <ul className="space-y-3 text-femfuel-medium">
                  <li>• Mantener una calificación promedio mínima de 4.0 estrellas</li>
                  <li>• Proveedores con calificaciones consistentemente bajas pueden ser suspendidos</li>
                  <li>• Programas de mejora disponibles para proveedores que necesiten apoyo</li>
                  <li>• Reconocimientos especiales para proveedores de alto rendimiento</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-femfuel-dark mb-4">4. Terminación del Acuerdo</h3>
                <ul className="space-y-3 text-femfuel-medium">
                  <li>• Cualquier parte puede terminar el acuerdo con 30 días de aviso</li>
                  <li>• FemFuel puede terminar inmediatamente por violaciones graves</li>
                  <li>• Los pagos pendientes se procesan dentro de 30 días de la terminación</li>
                  <li>• Los proveedores pueden reactivar su cuenta siguiendo el proceso de re-aplicación</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 px-4 bg-femfuel-light/50">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-xl bg-gradient-to-br from-purple-50 to-rose-50">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <TrendingUp className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-3">Apoyo para Proveedores</h3>
                  <p className="text-femfuel-medium mb-4 leading-relaxed">
                    FemFuel Beauty está comprometido con el éxito de nuestros proveedores. Ofrecemos capacitación continua, 
                    soporte técnico 24/7, y herramientas de marketing para ayudarle a hacer crecer su negocio.
                  </p>
                  <p className="text-femfuel-medium leading-relaxed">
                    Para consultas específicas sobre este acuerdo o apoyo como proveedor, 
                    contacte nuestro equipo especializado en <span className="text-purple-600 font-medium">proveedores@femfuel.com</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Handshake className="h-12 w-12 text-femfuel-rose mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
            ¿Listo para Unirse como Proveedor?
          </h2>
          <p className="text-lg text-femfuel-medium mb-8 max-w-2xl mx-auto">
            Nuestro equipo está disponible para guiarle a través del proceso de registro y responder cualquier pregunta.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glassmorphism-button-lg">
              <Users className="h-4 w-4" />
              Comenzar Registro
            </button>
            <button className="femfuel-button-lg">
              <Mail className="h-4 w-4" />
              Contactar Soporte
            </button>
          </div>
        </div>
      </section>

      <VendorFooter />
    </div>
  )
}