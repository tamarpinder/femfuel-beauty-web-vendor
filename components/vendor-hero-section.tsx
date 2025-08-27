'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function VendorHeroSection() {
  return (
    <section className="relative px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <div className="w-40 h-40 md:w-44 md:h-44 mx-auto flex items-center justify-center mb-6">
            <Image 
              src="/femfuel-logo.png" 
              alt="FemFuel Beauty" 
              width={176}
              height={176}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-femfuel-dark mb-2">
            Haz crecer tu negocio de belleza
          </h1>
          <p className="text-lg text-femfuel-medium mb-6">
            Conecta con miles de clientes en República Dominicana
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-femfuel-medium mb-8">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">4.9/5</span>
            <span>•</span>
            <span>500+ proveedores activos</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="w-full sm:w-auto bg-femfuel-rose hover:bg-[#9f1853]">
              Comenzar Gratis
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Iniciar Sesión
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}