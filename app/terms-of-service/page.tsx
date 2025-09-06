'use client'

import { Card, CardContent } from "@/components/ui/card"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  Scale,
  FileText,
  AlertTriangle,
  Shield,
  Users,
  Clock,
  Download,
  Mail
} from "lucide-react"

export default function TermsOfServicePage() {
  const lastUpdated = "15 de enero de 2025"

  const sections = [
    {
      id: "acceptance",
      title: "1. Aceptación de los Términos",
      content: [
        "Al acceder y utilizar la plataforma FemFuel Beauty, usted acepta estar sujeto a estos Términos de Servicio y todas las leyes y regulaciones aplicables.",
        "Si no está de acuerdo con alguno de estos términos, le prohibimos usar o acceder a este sitio.",
        "Nos reservamos el derecho de actualizar estos términos en cualquier momento sin previo aviso."
      ]
    },
    {
      id: "definitions",
      title: "2. Definiciones",
      content: [
        "\"Plataforma\" se refiere a la aplicación web y móvil FemFuel Beauty y todos los servicios relacionados.",
        "\"Usuario\" incluye tanto clientes como proveedores de servicios registrados en la plataforma.",
        "\"Proveedor\" se refiere a profesionales de belleza que ofrecen servicios a través de nuestra plataforma.",
        "\"Cliente\" se refiere a personas que reservan y utilizan servicios de belleza a través de la plataforma."
      ]
    },
    {
      id: "services",
      title: "3. Descripción de Servicios",
      content: [
        "FemFuel Beauty es una plataforma digital que conecta clientes con proveedores de servicios de belleza en República Dominicana.",
        "Facilitamos la búsqueda, reserva y pago de servicios de belleza, pero no somos proveedores directos de estos servicios.",
        "Los servicios reales son proporcionados por profesionales independientes registrados en nuestra plataforma."
      ]
    },
    {
      id: "registration",
      title: "4. Registro y Cuentas de Usuario",
      content: [
        "Para utilizar ciertos servicios, debe crear una cuenta proporcionando información precisa y completa.",
        "Es responsable de mantener la confidencialidad de su cuenta y contraseña.",
        "Debe notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta.",
        "Nos reservamos el derecho de terminar cuentas que violen estos términos."
      ]
    },
    {
      id: "provider-terms",
      title: "5. Términos Específicos para Proveedores",
      content: [
        "Los proveedores deben cumplir con todas las licencias y certificaciones requeridas por la ley dominicana.",
        "Deben proporcionar servicios de calidad profesional y mantener estándares de higiene apropiados.",
        "Las comisiones de la plataforma se deducen automáticamente de los pagos recibidos.",
        "Los proveedores son responsables de sus propios impuestos y obligaciones fiscales."
      ]
    },
    {
      id: "payments",
      title: "6. Pagos y Facturación",
      content: [
        "Los pagos se procesan a través de proveedores de pago seguros y confiables.",
        "Las tarifas de servicio y comisiones están claramente indicadas antes de la confirmación.",
        "Los reembolsos están sujetos a nuestra política de cancelación específica.",
        "Nos reservamos el derecho de modificar las estructuras de precios con previo aviso."
      ]
    },
    {
      id: "conduct",
      title: "7. Conducta del Usuario",
      content: [
        "Los usuarios deben comportarse de manera respetuosa y profesional en todas las interacciones.",
        "Está prohibido el uso de la plataforma para actividades ilegales o fraudulentas.",
        "No se permite el contenido ofensivo, discriminatorio o inapropiado.",
        "Los usuarios que violen estas normas pueden ser suspendidos o expulsados de la plataforma."
      ]
    },
    {
      id: "liability",
      title: "8. Limitación de Responsabilidad",
      content: [
        "FemFuel Beauty actúa como intermediario y no es responsable de la calidad de los servicios proporcionados por terceros.",
        "No garantizamos la disponibilidad continua e ininterrumpida de la plataforma.",
        "Nuestra responsabilidad se limita al monto pagado por los servicios en cuestión.",
        "No somos responsables de daños indirectos, incidentales o consecuenciales."
      ]
    },
    {
      id: "termination",
      title: "9. Terminación",
      content: [
        "Puede terminar su cuenta en cualquier momento contactándonos directamente.",
        "Nos reservamos el derecho de suspender o terminar cuentas que violen estos términos.",
        "Al terminar su cuenta, cierta información puede conservarse según nuestras políticas de retención de datos."
      ]
    },
    {
      id: "governing-law",
      title: "10. Ley Aplicable",
      content: [
        "Estos términos se rigen por las leyes de la República Dominicana.",
        "Cualquier disputa será resuelta en los tribunales competentes de Santo Domingo.",
        "Si alguna disposición de estos términos es inválida, las disposiciones restantes permanecerán en vigor."
      ]
    }
  ]

  const handleDownload = () => {
    console.log('Downloading Terms of Service PDF...')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/30 to-blue-50/20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 via-blue-500/5 to-femfuel-rose/5"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-slate-500/10 px-4 py-2 rounded-full mb-6">
            <Scale className="h-4 w-4 text-slate-600" />
            <span className="text-slate-600 font-medium text-sm">Términos Legales</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
            Términos de <span className="text-slate-600">Servicio</span>
          </h1>
          
          <p className="text-xl text-femfuel-medium max-w-3xl mx-auto mb-8 leading-relaxed">
            Estos términos rigen el uso de la plataforma FemFuel Beauty. 
            Le recomendamos leer cuidadosamente antes de utilizar nuestros servicios.
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
              Consultas Legales
            </button>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {sections.map((section) => (
              <Card key={section.id} className="border-none shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-femfuel-dark mb-6 flex items-center gap-3">
                    <FileText className="h-6 w-6 text-slate-600" />
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    {section.content.map((paragraph, idx) => (
                      <p key={idx} className="text-femfuel-medium leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-16 px-4 bg-femfuel-light/50">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-xl bg-gradient-to-br from-amber-50 to-orange-50 border-l-4 border-l-amber-500">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-femfuel-dark mb-3">Aviso Importante</h3>
                  <p className="text-femfuel-medium mb-4 leading-relaxed">
                    Estos términos de servicio constituyen un acuerdo legal vinculante entre usted y FemFuel Beauty. 
                    Al utilizar nuestra plataforma, usted acepta cumplir con todos los términos y condiciones establecidos.
                  </p>
                  <p className="text-femfuel-medium leading-relaxed">
                    Para consultas específicas sobre estos términos o asuntos legales, 
                    puede contactar nuestro equipo legal en <span className="text-femfuel-rose font-medium">legal@femfuel.com</span>
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
            ¿Preguntas sobre nuestros términos?
          </h2>
          <p className="text-lg text-femfuel-medium mb-8 max-w-2xl mx-auto">
            Nuestro equipo legal está disponible para aclarar cualquier duda sobre estos términos de servicio.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="glassmorphism-button-lg">
              <Mail className="h-4 w-4" />
              Contactar Equipo Legal
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