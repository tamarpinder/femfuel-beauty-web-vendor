'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { DOMINICAN_GREETINGS, VENDOR_PHRASES } from '@/lib/constants';

export default function VendorHomePage() {
  const greeting = DOMINICAN_GREETINGS[Math.floor(Math.random() * DOMINICAN_GREETINGS.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-femfuel-pink/5 to-femfuel-gold/5 pt-20 md:pt-0">

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-femfuel-black mb-6">
              {greeting}
            </h1>
            <h2 className="text-2xl lg:text-3xl font-medium text-gray-700 mb-8">
              Únete a FemFuel Beauty y haz crecer tu negocio
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
              Conecta con miles de clientes en República Dominicana. 
              Gestiona tus servicios, horarios y ganancias desde una sola plataforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Comenzar Gratis
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Ya tengo cuenta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-center text-femfuel-black mb-12">
            ¿Por qué elegir FemFuel Beauty?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-pink-50 to-purple-50">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold text-femfuel-black mb-3">
                {VENDOR_PHRASES.dashboard} Completo
              </h3>
              <p className="text-gray-600">
                Gestiona todos tus servicios, reservas y ganancias desde una interfaz intuitiva
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-gold-50 to-yellow-50">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold text-femfuel-black mb-3">
                Aumenta tus Ingresos
              </h3>
              <p className="text-gray-600">
                Accede a una base de clientes más amplia y maximiza tus ganancias mensuales
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-femfuel-black mb-3">
                {VENDOR_PHRASES.analytics}
              </h3>
              <p className="text-gray-600">
                Obtén insights valiosos sobre tu negocio con reportes detallados
              </p>
            </div>

            {/* Feature 4 */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold text-femfuel-black mb-3">
                Gestión de Horarios
              </h3>
              <p className="text-gray-600">
                Controla tu disponibilidad y acepta reservas según tu conveniencia
              </p>
            </div>

            {/* Feature 5 */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-purple-50 to-indigo-50">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-femfuel-black mb-3">
                Comunicación Directa
              </h3>
              <p className="text-gray-600">
                Chatea con tus clientes y brinda un servicio personalizado
              </p>
            </div>

            {/* Feature 6 */}
            <div className="text-center p-6 rounded-lg bg-gradient-to-br from-rose-50 to-pink-50">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold text-femfuel-black mb-3">
                Construye tu Reputación
              </h3>
              <p className="text-gray-600">
                Recibe reseñas de clientes y construye una reputación sólida
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-femfuel-pink to-femfuel-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl font-display font-bold mb-12">
              Únete a nuestra comunidad creciente
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-xl">Proveedores Activos</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10,000+</div>
                <div className="text-xl">Clientes Satisfechos</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">RD$50M+</div>
                <div className="text-xl">Generados en la Plataforma</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold text-femfuel-black mb-6">
            ¿Listo para hacer crecer tu negocio?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Únete a FemFuel Beauty hoy y comienza a generar más ingresos
          </p>
          <Link href="/register">
            <Button size="lg">
              Crear mi Cuenta de Proveedor
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Image 
                src="/femfuel-logo.png" 
                alt="FemFuel Beauty" 
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
              <span className="text-xl font-display font-bold">FemFuel Beauty</span>
            </div>
            <p className="text-gray-400">
              © 2024 FemFuel Beauty. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
