'use client'

import { Card, CardContent } from "@/components/ui/card"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  Shield,
  Lock,
  Server,
  Eye,
  AlertTriangle,
  Clock,
  Download,
  Mail,
  CheckCircle,
  Zap,
  Database,
  Key,
  Globe,
  Users
} from "lucide-react"

export default function DataSecurityPage() {
  const lastUpdated = "15 de enero de 2025"

  const securityLayers = [
    {
      icon: Lock,
      title: "Encriptación de Extremo a Extremo",
      description: "Todos los datos se encriptan usando algoritmos AES-256 tanto en tránsito como en reposo",
      level: "Nivel 1: Protección de Datos"
    },
    {
      icon: Server,
      title: "Infraestructura Segura",
      description: "Servidores alojados en centros de datos certificados con medidas físicas de seguridad",
      level: "Nivel 2: Infraestructura"
    },
    {
      icon: Eye,
      title: "Monitoreo 24/7",
      description: "Sistemas de detección de intrusiones y monitoreo continuo de actividad sospechosa",
      level: "Nivel 3: Vigilancia"
    },
    {
      icon: Users,
      title: "Control de Acceso",
      description: "Autenticación multifactor y control granular de permisos para todo el personal",
      level: "Nivel 4: Acceso"
    }
  ]

  const certifications = [
    {
      name: "ISO 27001",
      description: "Gestión de Seguridad de la Información",
      icon: Shield,
      color: "from-blue-500 to-blue-400"
    },
    {
      name: "SOC 2 Type II",
      description: "Controles de Seguridad y Disponibilidad",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-400"
    },
    {
      name: "GDPR Compliant",
      description: "Regulación General de Protección de Datos",
      icon: Globe,
      color: "from-purple-500 to-purple-400"
    },
    {
      name: "PCI DSS",
      description: "Estándares de Seguridad para Datos de Tarjetas",
      icon: Key,
      color: "from-femfuel-rose to-pink-400"
    }
  ]

  const securityMeasures = [
    {
      category: "Seguridad Técnica",
      measures: [
        "Encriptación SSL/TLS para todas las comunicaciones",
        "Hashing seguro de contraseñas con salt",
        "Firewalls de aplicación web (WAF)",
        "Sistemas de detección y prevención de intrusiones",
        "Backups automáticos cifrados diariamente"
      ]
    },
    {
      category: "Seguridad Operacional",
      measures: [
        "Auditorías de seguridad trimestrales",
        "Pruebas de penetración por terceros",
        "Capacitación continua del personal en seguridad",
        "Políticas estrictas de acceso a datos",
        "Registro y auditoría de todos los accesos"
      ]
    }
  ]

  const incidentResponse = [
    {
      step: "1. Detección",
      description: "Sistemas automatizados detectan anomalías en tiempo real",
      time: "< 5 minutos"
    },
    {
      step: "2. Contención",
      description: "Aislamiento inmediato de sistemas afectados",
      time: "< 15 minutos"
    },
    {
      step: "3. Evaluación",
      description: "Análisis del alcance y impacto del incidente",
      time: "< 1 hora"
    },
    {
      step: "4. Resolución",
      description: "Implementación de medidas correctivas",
      time: "< 4 horas"
    },
    {
      step: "5. Comunicación",
      description: "Notificación a usuarios afectados según regulaciones",
      time: "< 72 horas"
    }
  ]

  const handleDownload = () => {
    console.log('Downloading Data Security Report PDF...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-cyan-50/30 to-blue-50/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-femfuel-rose/5"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-full mb-6">
            <Shield className="h-4 w-4 text-cyan-600" />
            <span className="text-cyan-600 font-medium text-sm">Seguridad de Datos</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Seguridad de <span className="text-cyan-600">Datos</span>
          </h1>
          
          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            La protección de su información es nuestra máxima prioridad. Implementamos múltiples capas 
            de seguridad y cumplimos con los más altos estándares internacionales.
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
              Reporte de Seguridad
            </button>
            <button className="femfuel-button-lg">
              <Mail className="h-4 w-4" />
              Contactar Seguridad
            </button>
          </div>
        </div>
      </section>

      {/* Security Layers */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Lock className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Capas de Protección
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Sistema de seguridad multicapa diseñado para proteger su información en todos los niveles
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {securityLayers.map((layer, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
                      <layer.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-cyan-600 font-medium mb-2">{layer.level}</div>
                      <h3 className="text-xl font-bold text-femfuel-dark mb-3">{layer.title}</h3>
                      <p className="text-femfuel-medium leading-relaxed">{layer.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 px-4 bg-femfuel-light/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <CheckCircle className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Certificaciones y Cumplimiento
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Cumplimos con los estándares internacionales más exigentes de seguridad de datos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${cert.color} flex items-center justify-center mx-auto mb-4`}>
                    <cert.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-femfuel-dark mb-2">{cert.name}</h3>
                  <p className="text-femfuel-medium text-sm">{cert.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Database className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Medidas de Seguridad Implementadas
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {securityMeasures.map((category, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-femfuel-dark mb-6">{category.category}</h3>
                  <ul className="space-y-4">
                    {category.measures.map((measure, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-femfuel-medium">{measure}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Incident Response */}
      <section className="py-16 px-4 bg-femfuel-light/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Zap className="h-12 w-12 text-femfuel-rose mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-femfuel-dark mb-4">
              Plan de Respuesta a Incidentes
            </h2>
            <p className="text-lg text-femfuel-medium max-w-2xl mx-auto">
              Protocolo estructurado para responder rápida y efectivamente a cualquier incidente de seguridad
            </p>
          </div>

          <div className="space-y-6">
            {incidentResponse.map((phase, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-femfuel-rose to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-femfuel-dark">{phase.step}</h3>
                        <span className="text-sm text-femfuel-rose font-medium bg-femfuel-rose/10 px-3 py-1 rounded-full">
                          {phase.time}
                        </span>
                      </div>
                      <p className="text-femfuel-medium">{phase.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-xl bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-l-amber-500">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-3">Reporte de Vulnerabilidades</h3>
                  <p className="text-femfuel-medium mb-4 leading-relaxed">
                    Si descubre una vulnerabilidad de seguridad en nuestros sistemas, le agradecemos que nos contacte 
                    de inmediato de forma responsable. Tenemos un programa de divulgación responsable para 
                    investigadores de seguridad.
                  </p>
                  <p className="text-femfuel-medium leading-relaxed">
                    Contacte nuestro equipo de seguridad en{" "}
                    <span className="text-amber-600 font-medium">seguridad@femfuel.com</span> o 
                    use nuestro formulario seguro de reporte.
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
          <Shield className="h-12 w-12 text-femfuel-rose mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-femfuel-dark mb-4">
            ¿Preguntas sobre Seguridad?
          </h2>
          <p className="text-lg text-femfuel-medium mb-8 max-w-2xl mx-auto">
            Nuestro equipo de seguridad está disponible para responder consultas sobre la protección de sus datos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glassmorphism-button-lg">
              <Mail className="h-4 w-4" />
              Contactar Seguridad
            </button>
            <button className="femfuel-button-lg">
              <AlertTriangle className="h-4 w-4" />
              Reportar Incidente
            </button>
          </div>
        </div>
      </section>

      <VendorFooter />
    </div>
  )
}