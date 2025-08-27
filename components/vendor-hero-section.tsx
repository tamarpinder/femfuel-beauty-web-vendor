'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function VendorHeroSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
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

          <h1 className="text-4xl md:text-5xl font-bold text-femfuel-dark mb-4">
            Haz crecer tu negocio de belleza
          </h1>

          <p className="text-xl text-femfuel-medium mb-6 max-w-2xl mx-auto">
            Conecta con miles de clientes en República Dominicana y gestiona tu negocio de forma profesional
          </p>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="text-sm font-medium text-femfuel-dark ml-2">4.9/5</span>
            </div>
            <div className="w-1 h-1 bg-femfuel-medium rounded-full" />
            <span className="text-sm text-femfuel-medium">500+ proveedores activos</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="px-8 bg-femfuel-rose hover:bg-[#9f1853] text-white">
                Comenzar Gratis
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg" className="px-8 border-femfuel-rose text-femfuel-rose hover:bg-femfuel-rose hover:text-white">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}