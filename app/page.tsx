'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { DOMINICAN_GREETINGS, VENDOR_PHRASES } from '@/lib/constants';
import { BarChart, DollarSign, Calendar, MessageCircle, Star } from 'lucide-react';

export default function VendorHomePage() {
  const greeting = DOMINICAN_GREETINGS[Math.floor(Math.random() * DOMINICAN_GREETINGS.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-femfuel-rose/5 to-femfuel-gold/5 pt-20 md:pt-24">

      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-femfuel-dark mb-6 leading-tight">
              {greeting}
            </h1>
            <h2 className="text-2xl lg:text-3xl font-medium text-femfuel-medium mb-8">
              Únete a FemFuel Beauty y haz crecer tu negocio
            </h2>
            <p className="text-lg text-femfuel-medium mb-10 max-w-3xl mx-auto leading-relaxed">
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
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-femfuel-rose to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BarChart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-femfuel-dark mb-3">
                {VENDOR_PHRASES.dashboard} Completo
              </h3>
              <p className="text-femfuel-medium leading-relaxed">
                Gestiona todos tus servicios, reservas y ganancias desde una interfaz intuitiva
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-femfuel-gold to-yellow-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-femfuel-dark mb-3">
                Aumenta tus Ingresos
              </h3>
              <p className="text-femfuel-medium leading-relaxed">
                Accede a una base de clientes más amplia y maximiza tus ganancias mensuales
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <BarChart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-femfuel-dark mb-3">
                {VENDOR_PHRASES.analytics}
              </h3>
              <p className="text-femfuel-medium leading-relaxed">
                Obtén insights valiosos sobre tu negocio con reportes detallados
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-femfuel-dark mb-3">
                Gestión de Horarios
              </h3>
              <p className="text-femfuel-medium leading-relaxed">
                Controla tu disponibilidad y acepta reservas según tu conveniencia
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-femfuel-dark mb-3">
                Comunicación Directa
              </h3>
              <p className="text-femfuel-medium leading-relaxed">
                Chatea con tus clientes y brinda un servicio personalizado
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group text-center p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-femfuel-dark mb-3">
                Construye tu Reputación
              </h3>
              <p className="text-femfuel-medium leading-relaxed">
                Recibe reseñas de clientes y construye una reputación sólida
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-femfuel-rose via-pink-600 to-femfuel-gold relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Únete a nuestra comunidad creciente
            </h2>
            <p className="text-xl opacity-90 mb-16">Miles de profesionales ya confían en nosotros</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group">
                <div className="text-5xl md:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-xl opacity-90">Proveedores Activos</div>
                <div className="w-16 h-1 bg-white/30 mx-auto mt-4 group-hover:bg-white/60 transition-colors duration-300"></div>
              </div>
              <div className="group">
                <div className="text-5xl md:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">10,000+</div>
                <div className="text-xl opacity-90">Clientes Satisfechos</div>
                <div className="w-16 h-1 bg-white/30 mx-auto mt-4 group-hover:bg-white/60 transition-colors duration-300"></div>
              </div>
              <div className="group">
                <div className="text-5xl md:text-6xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">RD$50M+</div>
                <div className="text-xl opacity-90">Generados en la Plataforma</div>
                <div className="w-16 h-1 bg-white/30 mx-auto mt-4 group-hover:bg-white/60 transition-colors duration-300"></div>
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
