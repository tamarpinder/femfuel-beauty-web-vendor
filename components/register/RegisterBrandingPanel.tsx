'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface RegisterBrandingPanelProps {
  currentStep: number
}

const STEP_CONTENT = [
  {
    title: 'Crea Tu Cuenta Profesional',
    description: 'Únete a la comunidad de profesionales de belleza más grande de República Dominicana',
    features: [
      'Registro completamente gratuito',
      'Verificación rápida en 24 horas',
      'Acceso a miles de clientes potenciales',
    ],
  },
  {
    title: 'Configura Tu Negocio',
    description: 'Muestra tu trabajo y atrae más clientes con un perfil profesional completo',
    features: [
      'Perfil personalizable con tus servicios',
      'Agenda inteligente de reservas',
      'Solo 8% de comisión cuando ganes',
    ],
  },
  {
    title: 'Verifica Tu Identidad',
    description: 'La verificación genera confianza en los clientes y aumenta tus reservas',
    features: [
      'Proceso de revisión en 24 horas',
      'Badge de verificado en tu perfil',
      'Mayor visibilidad en búsquedas',
    ],
  },
]

export function RegisterBrandingPanel({ currentStep }: RegisterBrandingPanelProps) {
  const content = STEP_CONTENT[currentStep - 1] || STEP_CONTENT[0]

  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)] p-8 lg:p-12 items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32" />

      <div className="relative z-10 text-white text-center lg:text-left max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">
            {content.title}
          </h1>
          <p className="text-lg opacity-90 leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="space-y-4 text-sm">
          {content.features.map((feature) => (
            <div key={feature} className="flex items-center gap-3 opacity-80">
              <div className="w-2 h-2 bg-white/60 rounded-full flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
