'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export function VendorFinalCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-femfuel-light to-pink-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-4">¿Listo para hacer crecer tu negocio?</h2>
        <p className="text-xl text-femfuel-medium mb-8 max-w-2xl mx-auto">
          Únete a FemFuel Beauty hoy y comienza a generar más ingresos
        </p>

        <Link href="/register">
          <Button size="lg" className="px-8 bg-femfuel-rose hover:bg-[#9f1853] text-white">
            Crear mi Cuenta de Proveedor
          </Button>
        </Link>
      </div>
    </section>
  )
}