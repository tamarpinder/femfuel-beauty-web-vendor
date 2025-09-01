'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VendorFooter } from "@/components/vendor-footer"
import { 
  Check,
  TrendingUp,
  Users,
  Zap,
  Calculator,
  Target,
  Sparkles,
  DollarSign,
  Camera,
  Crown,
  Rocket,
  ChevronRight,
  Info
} from "lucide-react"

export default function PricingPage() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000)
  const [selectedPhase, setSelectedPhase] = useState("current")
  
  const phases = [
    {
      id: "current",
      title: "Fase Actual",
      subtitle: "Primeros 6 meses",
      commission: 0,
      description: "Comienza gratis mientras construimos juntos la comunidad"
    },
    {
      id: "growth",
      title: "Fase de Crecimiento", 
      subtitle: "Meses 7-12",
      commission: 8,
      description: "Comisión introducida gradualmente"
    },
    {
      id: "full",
      title: "Fase Completa",
      subtitle: "Año 2 en adelante",
      commission: 15,
      description: "Modelo completo con todas las características"
    }
  ]

  const subscriptionPlans = [
    {
      name: "Básico",
      price: 0,
      period: "Gratis",
      description: "Perfecto para empezar tu negocio",
      features: [
        "5 servicios listados",
        "Perfil básico",
        "Sistema de reservas",
        "Pagos seguros",
        "Soporte por email",
        "App móvil"
      ],
      color: "border-gray-200",
      buttonColor: "bg-gray-600 hover:bg-gray-700",
      popular: false
    },
    {
      name: "Pro", 
      price: 899,
      period: "mensual",
      description: "Para profesionales en crecimiento",
      features: [
        "Servicios ilimitados",
        "Prioridad en búsquedas",
        "Analíticas básicas",
        "Horarios personalizados",
        "Soporte prioritario",
        "Badge 'Verificado'"
      ],
      color: "border-femfuel-rose",
      buttonColor: "bg-femfuel-rose hover:bg-femfuel-rose/90",
      popular: true
    },
    {
      name: "Premium",
      price: 1499,
      period: "mensual", 
      description: "Para profesionales establecidos",
      features: [
        "Todo lo de Pro",
        "Badge 'Premium'",
        "Analíticas avanzadas",
        "Herramientas de marketing",
        "Soporte 24/7",
        "Consultor dedicado"
      ],
      color: "border-femfuel-gold",
      buttonColor: "bg-femfuel-gold hover:bg-femfuel-gold/90",
      popular: false
    }
  ]

  const additionalServices = [
    {
      icon: Camera,
      name: "Fotografía Profesional",
      price: "RD$2,500",
      description: "Sesión completa para tu portfolio"
    },
    {
      icon: Target,
      name: "Listado Patrocinado",
      price: "RD$50-200",
      description: "Por semana en posición destacada"
    },
    {
      icon: Crown,
      name: "Badge Destacado",
      price: "RD$299",
      description: "Por mes, mayor visibilidad"
    },
    {
      icon: Rocket,
      name: "Perfil Impulsado",
      price: "RD$150",
      description: "Por semana, 3x más visibilidad"
    }
  ]

  const faqs = [
    {
      question: "¿Por qué es gratis ahora?",
      answer: "Estamos en fase de lanzamiento construyendo nuestra comunidad. Durante los primeros 6 meses, no cobramos comisiones para que puedas comenzar sin riesgo."
    },
    {
      question: "¿Cuándo cambiarán las tarifas?",
      answer: "Las tarifas se introducirán gradualmente: 8% en meses 7-12, luego 15% máximo. Siempre con aviso previo de 30 días."
    },
    {
      question: "¿Cómo se compara con alquilar silla en salón?",
      answer: "El alquiler de silla promedio es RD$15,000-25,000/mes fijo. Con FemFuel, pagas solo cuando ganas, típicamente menos del 15% de tus ingresos."
    },
    {
      question: "¿Hay costos ocultos?",
      answer: "No. Solo cobramos la comisión indicada y 2.9% por procesamiento de pagos (estándar en la industria). Todo está claramente explicado."
    },
    {
      question: "¿Puedo cambiar de plan?",
      answer: "Sí, puedes actualizar o cambiar tu plan en cualquier momento desde tu dashboard. Los cambios se aplican inmediatamente."
    },
    {
      question: "¿Qué incluye el soporte?",
      answer: "Básico incluye email, Pro incluye chat prioritario, Premium incluye soporte 24/7 y consultor dedicado."
    }
  ]

  const calculateEarnings = (revenue: number, phase: string) => {
    const commission = phases.find(p => p.id === phase)?.commission || 0
    const commissionAmount = revenue * (commission / 100)
    const netEarnings = revenue - commissionAmount
    return { commissionAmount, netEarnings, commission }
  }

  const currentEarnings = calculateEarnings(monthlyRevenue, selectedPhase)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-femfuel-light via-white to-femfuel-purple overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/5 to-femfuel-gold/5"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <Badge className="mb-6 bg-femfuel-gold text-white hover:bg-femfuel-gold/90">
            Comienza Gratis - Paga Solo Cuando Ganes
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-femfuel-dark mb-6 leading-tight max-w-5xl mx-auto">
            Precios Transparentes
          </h1>
          <p className="text-xl text-femfuel-medium mb-8 max-w-3xl mx-auto leading-relaxed">
            Sin sorpresas, sin costos ocultos. Comienza gratis y crece con nosotros. 
            Nuestro éxito depende del tuyo.
          </p>
          
          {/* Phase Selector */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {phases.map((phase) => (
              <button
                key={phase.id}
                onClick={() => setSelectedPhase(phase.id)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  selectedPhase === phase.id
                    ? 'bg-femfuel-rose text-white shadow-lg'
                    : 'bg-white text-femfuel-medium border border-gray-200 hover:border-femfuel-rose'
                }`}
              >
                <div className="text-left">
                  <div className="font-bold">{phase.title}</div>
                  <div className="text-xs opacity-80">{phase.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20 shadow-lg">
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-femfuel-dark">{currentEarnings.commission}% Comisión</div>
              <p className="text-femfuel-medium">{phases.find(p => p.id === selectedPhase)?.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Calculator className="h-6 w-6 text-femfuel-rose" />
            <h2 className="text-3xl font-bold text-femfuel-dark">Calculadora de Ganancias</h2>
          </div>
          
          <Card className="border-none shadow-xl">
            <CardContent className="p-8">
              <div className="mb-6">
                <label className="block text-sm font-medium text-femfuel-dark mb-2">
                  Ingresos mensuales estimados (RD$)
                </label>
                <Input
                  type="number"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="text-center text-lg font-semibold h-12"
                  step="1000"
                  min="0"
                />
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-femfuel-light rounded-lg">
                  <DollarSign className="h-8 w-8 text-femfuel-rose mx-auto mb-2" />
                  <div className="text-2xl font-bold text-femfuel-dark">
                    RD${currentEarnings.netEarnings.toLocaleString()}
                  </div>
                  <div className="text-sm text-femfuel-medium">Tus Ganancias Netas</div>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-600">
                    RD${currentEarnings.commissionAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Comisión FemFuel ({currentEarnings.commission}%)</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    {((currentEarnings.netEarnings / monthlyRevenue) * 100).toFixed(1)}%
                  </div>
                  <div className="text-sm text-green-700">Tu Porcentaje</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Subscription Plans */}
      <section className="py-16 bg-femfuel-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-femfuel-rose text-white hover:bg-femfuel-rose/90">
              Planes de Suscripción
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-6">
              Elige el plan perfecto para tu negocio
            </h2>
            <p className="text-lg text-femfuel-medium max-w-3xl mx-auto">
              Comienza gratis y actualiza cuando estés listo para más funciones y herramientas avanzadas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan, index) => (
              <Card key={index} className={`relative border-2 ${plan.color} ${plan.popular ? 'scale-105 shadow-xl' : 'shadow-lg'} hover:shadow-xl transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-femfuel-rose text-white px-4 py-1">
                      Más Popular
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-femfuel-dark mb-2">{plan.name}</h3>
                  <p className="text-femfuel-medium mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-femfuel-dark">
                      {plan.price === 0 ? 'Gratis' : `RD$${plan.price.toLocaleString()}`}
                    </div>
                    {plan.price > 0 && (
                      <div className="text-sm text-femfuel-medium">por mes</div>
                    )}
                  </div>
                  
                  <Button className={`w-full mb-6 ${plan.buttonColor} text-white`}>
                    {plan.price === 0 ? 'Comenzar Gratis' : 'Elegir Plan'}
                  </Button>
                  
                  <ul className="space-y-3 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-femfuel-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-6">
              Servicios Adicionales
            </h2>
            <p className="text-lg text-femfuel-medium max-w-3xl mx-auto">
              Impulsa tu negocio con nuestros servicios premium opcionales
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <service.icon className="h-12 w-12 text-femfuel-rose mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-femfuel-dark mb-2">{service.name}</h3>
                  <div className="text-2xl font-bold text-femfuel-rose mb-2">{service.price}</div>
                  <p className="text-sm text-femfuel-medium">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-16 bg-femfuel-light">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-6">
              ¿Por qué FemFuel es mejor?
            </h2>
            <p className="text-lg text-femfuel-medium max-w-3xl mx-auto">
              Comparación con métodos tradicionales de trabajo en belleza
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-femfuel-dark mb-4">Alquiler de Silla</h3>
                <ul className="space-y-2 text-left text-femfuel-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Costo fijo RD$15,000-25,000/mes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Pagas sin importar ingresos
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Horarios limitados del salón
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                    Sin marketing digital
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold text-femfuel-dark mb-4">Trabajo Independiente</h3>
                <ul className="space-y-2 text-left text-femfuel-medium">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Difícil conseguir clientes
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Sin sistema de pagos seguro
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Sin respaldo profesional
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                    Marketing costoso
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl border-2 border-femfuel-rose">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-femfuel-rose/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-femfuel-rose" />
                </div>
                <h3 className="text-xl font-bold text-femfuel-dark mb-4">FemFuel Beauty</h3>
                <ul className="space-y-2 text-left text-femfuel-medium">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Pagas solo cuando ganas (15% máx)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Clientes garantizados
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Horarios 100% flexibles
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Marketing y herramientas incluidas
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-6">
              Preguntas Frecuentes
            </h2>
            <p className="text-lg text-femfuel-medium">
              Todo lo que necesitas saber sobre nuestros precios y planes
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Info className="h-5 w-5 text-femfuel-rose mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-femfuel-dark mb-2">{faq.question}</h3>
                      <p className="text-femfuel-medium leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-femfuel-rose to-femfuel-gold">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <Rocket className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para comenzar gratis?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Únete a FemFuel Beauty hoy. Sin costos iniciales, sin compromisos a largo plazo. 
            Comienza a generar ingresos desde el día uno.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-white text-femfuel-rose hover:bg-white/90 px-8 py-3 font-medium">
              <Users className="h-4 w-4 mr-2" />
              Comenzar Gratis
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-femfuel-rose px-8 py-3 font-medium">
              <ChevronRight className="h-4 w-4 mr-2" />
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      <VendorFooter />
    </div>
  )
}