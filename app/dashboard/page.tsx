'use client';

import React from 'react';
// Removed unused Card components - now using custom modern cards
import { Button } from '@/components/ui/Button';
import { Star, Scissors, TrendingUp, Plus, Calendar, MessageCircle, BarChart, DollarSign, User, Clock } from 'lucide-react';
import { VENDOR_PHRASES } from '@/lib/constants';
import { useAuth } from '@/contexts/auth-context';

export default function DashboardPage() {
  const { profile } = useAuth();

  // Mock data - replace with real data from Supabase
  const stats = {
    totalServices: 8,
    pendingBookings: 5,
    completedBookings: 24,
    monthlyEarnings: 15750,
    totalClients: 18,
    averageRating: 4.8
  };

  const recentBookings = [
    {
      id: '1',
      clientName: 'María González',
      service: 'Manicure Completo',
      date: '2024-01-20',
      time: '2:00 PM',
      status: 'pending',
      price: 800
    },
    {
      id: '2',
      clientName: 'Carmen Rodríguez',
      service: 'Corte y Peinado',
      date: '2024-01-20',
      time: '4:00 PM',
      status: 'confirmed',
      price: 1200
    },
    {
      id: '3',
      clientName: 'Ana Pérez',
      service: 'Tratamiento Facial',
      date: '2024-01-21',
      time: '10:00 AM',
      status: 'pending',
      price: 1500
    }
  ];

  return (
    <div className="p-4 md:p-6 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Message */}
      <div className="relative bg-gradient-to-br from-femfuel-rose via-pink-600 to-femfuel-gold rounded-2xl p-8 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <BarChart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">
                ¡Bienvenido de vuelta, {profile?.business_name || 'Proveedor'}!
              </h2>
              <p className="opacity-90">
                Aquí tienes un resumen de tu actividad reciente
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Scissors className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-femfuel-dark">{stats.totalServices}</div>
              <p className="text-sm text-femfuel-medium">Servicios</p>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-femfuel-dark">{VENDOR_PHRASES.total_services}</h3>
            <p className="text-sm text-femfuel-medium">Servicios activos</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-femfuel-rose">{stats.pendingBookings}</div>
              <p className="text-sm text-femfuel-medium">Pendientes</p>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-femfuel-dark">Reservas Pendientes</h3>
            <p className="text-sm text-femfuel-medium">Requieren atención</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-emerald-600">
                RD${stats.monthlyEarnings.toLocaleString()}
              </div>
              <p className="text-sm text-femfuel-medium">Este mes</p>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-femfuel-dark">{VENDOR_PHRASES.monthly_earnings}</h3>
            <p className="text-sm text-femfuel-medium">Ingresos mensuales</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        <div className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <User className="h-6 w-6 text-white" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{stats.totalClients}</div>
              <p className="text-sm text-femfuel-medium">Clientes</p>
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-femfuel-dark">{VENDOR_PHRASES.total_clients}</h3>
            <p className="text-sm text-femfuel-medium">Clientes únicos</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-violet-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="xl:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-femfuel-rose to-pink-600 rounded-xl flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-femfuel-dark">Reservas Recientes</h3>
                  <p className="text-sm text-femfuel-medium">Actividad de hoy</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Ver todas</Button>
            </div>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="group flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-femfuel-dark">{booking.clientName}</p>
                        <p className="text-sm text-femfuel-medium">{booking.service}</p>
                        <p className="text-xs text-femfuel-light mt-1">
                          {booking.date} - {booking.time}
                        </p>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <p className="font-semibold text-femfuel-dark">RD${booking.price}</p>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'pending'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {booking.status === 'pending' ? 'Pendiente' : 'Confirmada'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-femfuel-gold to-yellow-600 rounded-xl flex items-center justify-center">
              <Plus className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-femfuel-dark">Acciones Rápidas</h3>
              <p className="text-sm text-femfuel-medium">Gestiona tu negocio</p>
            </div>
          </div>
          <div className="space-y-3">
            <Button className="w-full justify-start h-12 bg-femfuel-rose hover:bg-[#9f1853]">
              <Plus className="mr-3 h-5 w-5" />
              {VENDOR_PHRASES.add_service}
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 hover:bg-gray-50">
              <Calendar className="mr-3 h-5 w-5" />
              Ver Calendario
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 hover:bg-gray-50">
              <MessageCircle className="mr-3 h-5 w-5" />
              Mensajes
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 hover:bg-gray-50">
              <BarChart className="mr-3 h-5 w-5" />
              {VENDOR_PHRASES.analytics}
            </Button>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-femfuel-dark">Resumen de Rendimiento</h3>
            <p className="text-sm text-femfuel-medium">Tu desempeño este mes</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Star className="h-8 w-8 text-amber-600" />
            </div>
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {stats.averageRating}
            </div>
            <p className="text-sm text-femfuel-medium">
              Calificación Promedio
            </p>
          </div>
          <div className="group text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Scissors className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {stats.completedBookings}
            </div>
            <p className="text-sm text-femfuel-medium">
              Servicios Completados
            </p>
          </div>
          <div className="group text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              95%
            </div>
            <p className="text-sm text-femfuel-medium">
              Tasa de Satisfacción
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}