'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Star, Target, Lightbulb, Download, Mail } from 'lucide-react';
import { VENDOR_PHRASES } from '@/lib/constants';

export default function EarningsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');

  // Mock earnings data - replace with Supabase data
  const earningsData = {
    week: {
      total: 4200,
      services: 8,
      clients: 6,
      daily: [
        { day: 'Lun', amount: 800, services: 2 },
        { day: 'Mar', amount: 600, services: 1 },
        { day: 'Mié', amount: 1200, services: 2 },
        { day: 'Jue', amount: 0, services: 0 },
        { day: 'Vie', amount: 900, services: 2 },
        { day: 'Sáb', amount: 700, services: 1 },
        { day: 'Dom', amount: 0, services: 0 }
      ]
    },
    month: {
      total: 15750,
      services: 28,
      clients: 18,
      weekly: [
        { week: 'Sem 1', amount: 3200, services: 6 },
        { week: 'Sem 2', amount: 4100, services: 8 },
        { week: 'Sem 3', amount: 4250, services: 7 },
        { week: 'Sem 4', amount: 4200, services: 7 }
      ]
    },
    year: {
      total: 125000,
      services: 240,
      clients: 85,
      monthly: [
        { month: 'Ene', amount: 12500, services: 22 },
        { month: 'Feb', amount: 11200, services: 19 },
        { month: 'Mar', amount: 13800, services: 25 },
        { month: 'Abr', amount: 10900, services: 18 },
        { month: 'May', amount: 14200, services: 26 },
        { month: 'Jun', amount: 15750, services: 28 }
      ]
    }
  };

  const topServices = [
    { name: 'Manicure Completo', bookings: 12, revenue: 9600, percentage: 25 },
    { name: 'Pedicure con Spa', bookings: 8, revenue: 9600, percentage: 25 },
    { name: 'Corte y Peinado', bookings: 6, revenue: 7200, percentage: 18 },
    { name: 'Tratamiento Facial', bookings: 4, revenue: 6000, percentage: 15 },
    { name: 'Tinte de Cejas', bookings: 8, revenue: 3200, percentage: 8 }
  ];

  const currentData = earningsData[selectedPeriod];
  const chartData = selectedPeriod === 'week' ? earningsData.week.daily :
                   selectedPeriod === 'month' ? earningsData.month.weekly :
                   earningsData.year.monthly;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-femfuel-black">
            {VENDOR_PHRASES.earnings}
          </h1>
          <p className="text-gray-600">
            Análisis de tus ingresos y rendimiento
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {[
            { key: 'week', label: 'Semana' },
            { key: 'month', label: 'Mes' },
            { key: 'year', label: 'Año' }
          ].map((period) => (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key as 'week' | 'month' | 'year')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                selectedPeriod === period.key
                  ? 'bg-femfuel-pink text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Ingresos Totales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              RD${currentData.total.toLocaleString()}
            </div>
            <p className="text-xs text-gray-600 capitalize">
              Esta {selectedPeriod === 'week' ? 'semana' : selectedPeriod === 'month' ? 'mes' : 'año'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Servicios Realizados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {currentData.services}
            </div>
            <p className="text-xs text-gray-600">
              Promedio: RD${Math.round(currentData.total / currentData.services).toLocaleString()}/servicio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Clientes Atendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {currentData.clients}
            </div>
            <p className="text-xs text-gray-600">
              Promedio: RD${Math.round(currentData.total / currentData.clients).toLocaleString()}/cliente
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tasa de Ocupación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              85%
            </div>
            <p className="text-xs text-gray-600">
              Horarios ocupados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>
            Ingresos por {selectedPeriod === 'week' ? 'Día' : 
                        selectedPeriod === 'month' ? 'Semana' : 'Mes'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chartData.map((item, index) => {
              const maxAmount = Math.max(...chartData.map(d => d.amount));
              const percentage = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0;
              
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium text-gray-600">
                    {Object.values(item)[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-900">
                        RD${item.amount.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {item.services} servicios
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-femfuel-pink to-femfuel-gold h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Top Services and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Services */}
        <Card>
          <CardHeader>
            <CardTitle>Servicios Más Populares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-gray-900">
                        {service.name}
                      </span>
                      <span className="text-sm text-gray-600">
                        {service.bookings} reservas
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-femfuel-pink h-2 rounded-full"
                          style={{ width: `${service.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        RD${service.revenue.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Business Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Insights del Negocio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">Tendencia Positiva</span>
                </div>
                <p className="text-sm text-green-700">
                  Tus ingresos han aumentado un 15% comparado con el mes anterior.
                </p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Servicio Estrella</span>
                </div>
                <p className="text-sm text-blue-700">
                  El &quot;Manicure Completo&quot; es tu servicio más rentable con 25% de tus ingresos.
                </p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-800">Oportunidad</span>
                </div>
                <p className="text-sm text-purple-700">
                  Los jueves tienes baja ocupación. Considera promociones especiales.
                </p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Recomendación</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Tus clientes prefieren citas entre 2-6 PM. Ajusta tu horario para maximizar ganancias.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Descargar Reporte
        </Button>
        <Button variant="outline">
          <Mail className="h-4 w-4 mr-2" />
          Enviar por Email
        </Button>
        <Button>
          <DollarSign className="h-4 w-4 mr-2" />
          Solicitar Pago
        </Button>
      </div>
    </div>
  );
}