'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { VendorFooter } from "@/components/vendor-footer"
import {
  Check,
  TrendingUp,
  Users,
  Zap,
  Calculator,
  Target,
  DollarSign,
  Percent,
  Camera,
  Info,
  ChevronDown
} from "lucide-react"

export default function PricingPage() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000)
  const [expandedPlan, setExpandedPlan] = useState<number | null>(null)

  const COMMISSION_RATE = 8

  const subscriptionPlans = [
    {
      name: "Gratis",
      price: 0,
      period: "Gratis para siempre",
      description: "Zero barrera de entrada — empieza hoy",
      features: [
        "Hasta 5 servicios listados",
        "Perfil básico (nombre, foto, servicios, ubicación)",
        "Sistema completo de reservas",
        "Posición normal en búsquedas",
        "Analíticas básicas (ingresos y reservas del mes)",
        "Soporte por email (24-48h)"
      ],
      color: "border-gray-200",
      buttonColor: "bg-gray-600 hover:bg-gray-700",
      popular: false
    },
    {
      name: "Pro",
      price: 1682,
      usdPrice: 29,
      period: "mensual",
      description: "Para profesionales en crecimiento que quieren más visibilidad",
      features: [
        "Servicios ilimitados",
        "Badge \"Verificado\" (genera confianza)",
        "Prioridad en búsquedas (apareces antes que perfiles Gratis)",
        "Analíticas avanzadas (horarios pico, servicios populares, tendencias)",
        "Horarios personalizables por día",
        "Galería portfolio (hasta 20 fotos antes/después)",
        "Soporte chat prioritario (respuesta en 4h)",
        "Perfil compartido en redes de FemFuel 1x al mes"
      ],
      color: "border-femfuel-rose",
      buttonColor: "bg-femfuel-rose hover:bg-femfuel-rose/90",
      popular: false
    },
    {
      name: "Elite",
      price: 2842,
      usdPrice: 49,
      period: "mensual",
      description: "Para profesionales establecidos que quieren máxima exposición",
      features: [
        "Todo lo de Pro incluido",
        "Badge \"Elite\" (posicionamiento premium)",
        "Top en resultados de búsqueda",
        "Analíticas del mercado, retención de clientes, proyecciones",
        "Galería ilimitada + video clips de servicios",
        "1 sesión fotográfica profesional gratis cada 6 meses",
        "Salón recomendado a clientes del FemFuel Shop",
        "Elegible para \"Proveedor del Mes\" (featured en redes y homepage)",
        "2 listados patrocinados gratis por mes",
        "WhatsApp directo con equipo FemFuel (respuesta en 1h)",
        "Acceso anticipado a nuevas funciones"
      ],
      color: "border-femfuel-gold",
      buttonColor: "bg-femfuel-gold hover:bg-femfuel-gold/90",
      popular: true
    }
  ]

  const additionalServices = [
    {
      icon: Camera,
      name: "Fotografía Profesional",
      price: "RD$12,500",
      description: "Sesión completa para tu portfolio (gratis 2x/año para Elite)"
    },
    {
      icon: Target,
      name: "Listado Patrocinado",
      price: "RD$580/sem",
      description: "Posición destacada en búsquedas (Elite recibe 2 gratis/mes)"
    }
  ]

  const faqs = [
    {
      question: "¿Cuánto cuesta?",
      answer: "8% de comisión por cada reserva completada. Sin costos fijos en el plan Gratis. Los planes Pro y Elite agregan herramientas y visibilidad por una cuota mensual."
    },
    {
      question: "¿Por qué 8%?",
      answer: "Es una de las comisiones más bajas del mercado. Plataformas similares cobran entre 20-30%. Queremos que crezcas con nosotros, no que pagues más de lo necesario."
    },
    {
      question: "¿Qué es el Vendor Spotlight?",
      answer: "Cada mes, el proveedor Elite con mejores reseñas o más reservas es destacado en nuestras redes sociales, homepage y push notifications. Solo 1 vendor Elite gana cada mes — se basa en rendimiento real."
    },
    {
      question: "¿Puedo cambiar de plan?",
      answer: "Sí, puedes actualizar o cambiar tu plan en cualquier momento desde tu dashboard. Los cambios se aplican inmediatamente."
    },
    {
      question: "¿Cómo se compara con alquilar silla en salón?",
      answer: "El alquiler de silla promedio es RD$15,000-25,000/mes fijo. Con FemFuel, pagas solo cuando ganas — solo el 8% de tus ingresos. Sin costos fijos."
    },
    {
      question: "¿Hay costos ocultos?",
      answer: "No. Solo cobramos la comisión del 8% indicada y la cuota mensual del plan que elijas. Todo está claramente explicado."
    }
  ]

  const commissionAmount = monthlyRevenue * (COMMISSION_RATE / 100)
  const netEarnings = monthlyRevenue - commissionAmount

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-femfuel-light via-white to-femfuel-purple overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/5 to-femfuel-gold/5"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-femfuel-rose/15 border border-femfuel-rose/30 px-4 py-2 rounded-full mb-6">
            <span className="text-femfuel-rose font-bold text-sm">8% Comisión Transparente — Comienza Gratis</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-femfuel-dark mb-6 leading-tight max-w-5xl mx-auto">
            Precios Transparentes
          </h1>
          <p className="text-xl text-femfuel-medium mb-8 max-w-3xl mx-auto leading-relaxed">
            Sin sorpresas, sin costos ocultos. Solo el 8% de comisión por reserva completada.
            Nuestro éxito depende del tuyo.
          </p>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto border border-white/20 shadow-lg">
            <div className="text-center">
              <div className="text-5xl font-bold text-femfuel-rose mb-2">8%</div>
              <div className="text-lg text-femfuel-dark font-medium">Comisión por reserva completada</div>
              <p className="text-femfuel-medium mt-2">Igual para todos los planes. Sin fases, sin escalas.</p>
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
                    RD${netEarnings.toLocaleString()}
                  </div>
                  <div className="text-sm text-femfuel-medium">Tus Ganancias Netas</div>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Percent className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-600">
                    RD${commissionAmount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Comisión FemFuel (8%)</div>
                </div>

                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    {monthlyRevenue > 0 ? ((netEarnings / monthlyRevenue) * 100).toFixed(1) : '0.0'}%
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
            <div className="inline-flex items-center bg-femfuel-rose/15 border border-femfuel-rose/30 px-4 py-2 rounded-full mb-4">
              <span className="text-femfuel-rose font-bold text-sm">Planes de Suscripción</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-6">
              Elige el plan perfecto para tu negocio
            </h2>
            <p className="text-lg text-femfuel-medium max-w-3xl mx-auto">
              La comisión es 8% en todos los planes. La suscripción agrega herramientas, visibilidad y marketing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">
            {subscriptionPlans.map((plan, index) => {
              const isExpanded = expandedPlan === index

              return (
                <Card
                  key={index}
                  onClick={() => setExpandedPlan(isExpanded ? null : index)}
                  className={`relative border-2 ${plan.color} cursor-pointer select-none
                    ${plan.popular ? 'shadow-xl' : 'shadow-lg'}
                    ${isExpanded ? 'shadow-2xl ring-2 ring-femfuel-rose/30' : ''}
                    hover:shadow-xl transition-all duration-300`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-femfuel-gold text-white px-4 py-1">
                        Recomendado
                      </Badge>
                    </div>
                  )}

                  <CardContent className="p-8 text-center flex flex-col">
                    {/* Zone 1: Name */}
                    <h3 className="text-2xl font-bold text-femfuel-dark mb-2">{plan.name}</h3>

                    {/* Zone 2: Description (fixed height for alignment) */}
                    <p className="text-femfuel-medium text-sm h-10 flex items-center justify-center">{plan.description}</p>

                    {/* Zone 3: Price (fixed height so Gratis aligns with RD$ prices) */}
                    <div className="h-[72px] flex flex-col items-center justify-center mb-2">
                      <div className="text-4xl font-bold text-femfuel-dark">
                        {plan.price === 0 ? 'Gratis' : `RD$${plan.price.toLocaleString()}`}
                      </div>
                      <div className="text-sm text-femfuel-medium h-5">
                        {plan.price > 0
                          ? `por mes (~$${(plan as { usdPrice?: number }).usdPrice} USD)`
                          : '\u00A0'}
                      </div>
                    </div>

                    {/* Zone 4: Commission badge */}
                    <div className="text-xs text-femfuel-medium mb-6 bg-gray-50 rounded-lg py-2 px-3">
                      8% comisión en todos los planes
                    </div>

                    {/* Zone 5: Button */}
                    <Link
                      href="/register"
                      className={`w-full mb-4 ${plan.buttonColor} text-white inline-flex items-center justify-center h-10 rounded-md text-sm font-medium transition-colors`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {plan.price === 0 ? 'Comenzar Gratis' : 'Elegir Plan'}
                    </Link>

                    {/* Zone 6: Expand hint */}
                    <div className="flex items-center justify-center gap-1 text-xs text-femfuel-medium/60">
                      <span>{isExpanded ? 'Ocultar beneficios' : 'Ver beneficios'}</span>
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Expandable feature list */}
                    <div
                      className={`grid transition-[grid-template-rows] duration-400 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                    >
                      <div className="overflow-hidden">
                        <ul className="space-y-3 text-left pt-6 border-t border-gray-100 mt-4">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2">
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-femfuel-medium">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-6">
              Servicios Adicionales
            </h2>
            <p className="text-lg text-femfuel-medium max-w-3xl mx-auto">
              Impulsa tu negocio con servicios premium opcionales — disponibles para todos los planes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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
                    Sin sistema de reservas
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
                  <Image src="/femfuel-logo.png" alt="FemFuel Beauty" width={48} height={48} />
                </div>
                <h3 className="text-xl font-bold text-femfuel-dark mb-4">FemFuel Beauty</h3>
                <ul className="space-y-2 text-left text-femfuel-medium">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Pagas solo cuando ganas (8%)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-500" />
                    Acceso a miles de clientes potenciales
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
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
            ¿Listo para comenzar gratis?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-black/80">
            Únete a FemFuel Beauty hoy. Sin costos iniciales, sin compromisos a largo plazo.
            Solo el 8% de comisión cuando ganes.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-femfuel-rose to-pink-600 hover:from-femfuel-rose/90 hover:to-pink-600/90 text-white font-semibold rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 px-8 py-3"
          >
            <Users className="h-5 w-5" />
            Comenzar Gratis
          </Link>
        </div>
      </section>

      <VendorFooter />
    </div>
  )
}