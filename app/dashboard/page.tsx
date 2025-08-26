'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
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
    <div className="p-6 space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-femfuel-pink to-femfuel-gold rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          ¡Bienvenido de vuelta, {profile?.business_name}!
        </h2>
        <p className="text-femfuel-light">
          Aquí tienes un resumen de tu actividad reciente
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {VENDOR_PHRASES.total_services}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-femfuel-black">{stats.totalServices}</div>
            <p className="text-xs text-gray-600">Servicios activos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Reservas Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-femfuel-pink">{stats.pendingBookings}</div>
            <p className="text-xs text-gray-600">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {VENDOR_PHRASES.monthly_earnings}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              RD${stats.monthlyEarnings.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600">Este mes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {VENDOR_PHRASES.total_clients}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalClients}</div>
            <p className="text-xs text-gray-600">Clientes únicos</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Reservas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{booking.clientName}</p>
                    <p className="text-sm text-gray-600">{booking.service}</p>
                    <p className="text-xs text-gray-500">
                      {booking.date} - {booking.time}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">RD${booking.price}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {booking.status === 'pending' ? 'Pendiente' : 'Confirmada'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              Ver Todas las Reservas
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              <Button className="justify-start h-12">
                <span className="mr-3 text-lg">➕</span>
                {VENDOR_PHRASES.add_service}
              </Button>
              <Button variant="outline" className="justify-start h-12">
                <span className="mr-3 text-lg">📅</span>
                Ver Calendario
              </Button>
              <Button variant="outline" className="justify-start h-12">
                <span className="mr-3 text-lg">💬</span>
                Mensajes de Clientes
              </Button>
              <Button variant="outline" className="justify-start h-12">
                <span className="mr-3 text-lg">📊</span>
                Ver {VENDOR_PHRASES.analytics}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Resumen de Rendimiento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-femfuel-pink mb-2">
                {stats.averageRating}
              </div>
              <p className="text-sm text-gray-600">
                ⭐ Calificación Promedio
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {stats.completedBookings}
              </div>
              <p className="text-sm text-gray-600">
                ✅ Servicios Completados
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                95%
              </div>
              <p className="text-sm text-gray-600">
                📈 Tasa de Satisfacción
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}