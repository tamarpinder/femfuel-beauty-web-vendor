'use client'

import { Card, CardContent } from "@/components/ui/card"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  Scale,
  CheckCircle,
  FileText,
  Globe,
  Building2,
  Clock,
  Download,
  Mail,
  AlertCircle,
  Shield,
  Users,
  Award,
  BookOpen,
  Eye
} from "lucide-react"

export default function CompliancePage() {
  const lastUpdated = "15 de enero de 2025"

  const regulations = [
    {
      icon: Globe,
      title: "GDPR - Regulación General de Protección de Datos",
      description: "Cumplimiento completo con las regulaciones europeas de privacidad de datos",
      status: "Certificado",
      color: "from-blue-500 to-blue-400"
    },
    {
      icon: Building2,
      title: "Ley 172-13 de República Dominicana",
      description: "Protección de Datos de Carácter Personal según la legislación local",
      status: "Certificado",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: Shield,
      title: "PCI DSS - Estándares de Seguridad de Datos",
      description: "Cumplimiento con estándares internacionales para manejo de datos de tarjetas",
      status: "Certificado",
      color: "from-purple-500 to-purple-400"
    },
    {
      icon: Scale,
      title: "Ley de Comercio Electrónico 126-02",
      description: "Cumplimiento con regulaciones dominicanas de comercio digital",
      status: "Certificado",
      color: "from-femfuel-rose to-pink-400"
    }
  ]

  const complianceAreas = [
    {
      area: "Protección de Datos Personales",
      requirements: [
        "Consentimiento explícito para recopilación de datos",
        "Derecho al olvido y portabilidad de datos",
        "Notificación de brechas de seguridad en 72 horas",
        "Oficial de Protección de Datos designado"
      ]
    },
    {
      area: "Seguridad Financiera",
      requirements: [
        "Encriptación de datos de tarjetas de crédito",
        "Auditorías trimestrales de seguridad",
        "Segregación de entornos de producción",
        "Monitoreo continuo de transacciones"
      ]
    },
    {
      area: "Regulaciones Laborales",
      requirements: [
        "Cumplimiento con código laboral dominicano",
        "Registro formal de proveedores independientes",
        "Políticas de no discriminación",
        "Procedimientos de resolución de disputas"
      ]
    },
    {
      area: "Normativas de Salud y Seguridad",
      requirements: [
        "Verificación de licencias profesionales",
        "Estándares de higiene y sanidad",
        "Seguros de responsabilidad civil",
        "Protocolos de emergencia sanitaria"
      ]
    }
  ]

  const auditSchedule = [
    {
      type: "Auditoría Interna",
      frequency: "Mensual",
      nextDate: "15 Feb 2025",
      scope: "Procesos operacionales y controles internos"
    },
    {
      type: "Auditoría Externa",
      frequency: "Trimestral",
      nextDate: "15 Mar 2025",
      scope: "Cumplimiento regulatorio y certificaciones"
    },
    {
      type: "Auditoría de Seguridad",
      frequency: "Trimestral",
      nextDate: "30 Mar 2025",
      scope: "Infraestructura y protección de datos"
    },
    {
      type: "Revisión Legal",
      frequency: "Semestral",
      nextDate: "15 Jun 2025",
      scope: "Contratos, términos y políticas legales"
    }
  ]

  const handleDownload = () => {
    console.log('Downloading Compliance Report PDF...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-femfuel-rose/5"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 px-4 py-2 rounded-full mb-6">
            <Scale className="h-4 w-4 text-indigo-600" />
            <span className="text-indigo-600 font-medium text-sm">Regulaciones y Cumplimiento</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            <span className="text-indigo-600">Cumplimiento</span> Regulatorio
          </h1>
          
          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            FemFuel Beauty opera con los más altos estándares de cumplimiento regulatorio, 
            asegurando que nuestras operaciones cumplan con todas las leyes y normativas aplicables.
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
              Reporte de Cumplimiento
            </button>
            <button className="femfuel-button-lg">
              <Mail className="h-4 w-4" />
              Consultas de Cumplimiento
            </button>
          </div>
        </div>
      </section>

      {/* Regulatory Compliance */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Award className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Regulaciones Cumplidas
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Certificaciones y cumplimiento con regulaciones locales e internacionales
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {regulations.map((regulation, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${regulation.color} flex items-center justify-center flex-shrink-0`}>
                      <regulation.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full font-medium">
                          {regulation.status}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-femfuel-dark mb-3">{regulation.title}</h3>
                      <p className="text-femfuel-medium leading-relaxed">{regulation.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Areas */}
      <section className="py-16 px-4 bg-femfuel-light/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <FileText className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Áreas de Cumplimiento
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Requisitos específicos que cumplimos en cada área operacional
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {complianceAreas.map((area, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-femfuel-dark mb-6">{area.area}</h3>
                  <ul className="space-y-4">
                    {area.requirements.map((requirement, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-femfuel-medium">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Schedule */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Eye className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Calendario de Auditorías
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Programa regular de auditorías para mantener el cumplimiento continuo
            </p>
          </div>

          <div className="space-y-6">
            {auditSchedule.map((audit, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-femfuel-dark mb-2">{audit.type}</h3>
                      <p className="text-femfuel-medium mb-2">{audit.scope}</p>
                      <div className="flex items-center gap-4 text-sm text-femfuel-medium">
                        <span>Frecuencia: {audit.frequency}</span>
                        <span>•</span>
                        <span>Próxima: {audit.nextDate}</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Officer */}
      <section className="py-16 px-4 bg-femfuel-light/50">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Users className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
                  Oficial de Cumplimiento
                </h2>
              </div>
              
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-femfuel-medium mb-6 leading-relaxed">
                  FemFuel Beauty cuenta con un Oficial de Cumplimiento dedicado que supervisa todas las 
                  actividades regulatorias y asegura el cumplimiento continuo con todas las normativas aplicables.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div>
                    <h3 className="text-lg font-bold text-femfuel-dark mb-4">Responsabilidades:</h3>
                    <ul className="space-y-2 text-femfuel-medium">
                      <li>• Monitoreo de cambios regulatorios</li>
                      <li>• Coordinación de auditorías</li>
                      <li>• Capacitación del personal</li>
                      <li>• Gestión de reportes de cumplimiento</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-femfuel-dark mb-4">Contacto:</h3>
                    <div className="space-y-2 text-femfuel-medium">
                      <div>📧 cumplimiento@femfuel.com</div>
                      <div>📞 +1 (829) 123-4567 ext. 101</div>
                      <div>⏰ Lunes - Viernes: 9AM - 6PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reporting */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-xl bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-l-amber-500">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-3">Reporte de Violaciones de Cumplimiento</h3>
                  <p className="text-femfuel-medium mb-4 leading-relaxed">
                    Si tiene conocimiento de alguna violación potencial de nuestras políticas de cumplimiento 
                    o regulaciones aplicables, le alentamos a reportarlo de inmediato a través de nuestros 
                    canales seguros y confidenciales.
                  </p>
                  <p className="text-femfuel-medium leading-relaxed">
                    Todos los reportes son investigados de manera confidencial y están protegidos contra represalias. 
                    Contacte a nuestro Oficial de Cumplimiento en{" "}
                    <span className="text-amber-600 font-medium">cumplimiento@femfuel.com</span>
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
          <Scale className="h-12 w-12 text-femfuel-rose mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
            ¿Consultas sobre Cumplimiento?
          </h2>
          <p className="text-lg text-femfuel-medium mb-8 max-w-2xl mx-auto">
            Nuestro equipo de cumplimiento está disponible para responder consultas sobre regulaciones y normativas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glassmorphism-button-lg">
              <Mail className="h-4 w-4" />
              Contactar Cumplimiento
            </button>
            <button className="femfuel-button-lg">
              <AlertCircle className="h-4 w-4" />
              Reportar Incidencia
            </button>
          </div>
        </div>
      </section>

      <VendorFooter />
    </div>
  )
}