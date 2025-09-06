'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Star, Target, Lightbulb, Download, Mail } from 'lucide-react';
import { VENDOR_PHRASES } from '@/lib/constants';
import { useAuth } from '@/contexts/auth-context';
import { bookings } from '@/lib/api';

interface EarningsData {
  week: {
    total: number;
    services: number;
    clients: number;
    daily: { day: string; amount: number; services: number }[];
  };
  month: {
    total: number;
    services: number;
    clients: number;
    weekly: { week: string; amount: number; services: number }[];
  };
  year: {
    total: number;
    services: number;
    clients: number;
    monthly: { month: string; amount: number; services: number }[];
  };
}

interface TopService {
  name: string;
  bookings: number;
  revenue: number;
  percentage: number;
}

interface BookingData {
  id: string;
  created_at: string;
  total_amount?: number;
  customer_id?: string;
  status?: string;
  service?: {
    name?: string;
  };
}

// Helper function outside component to avoid dependency issues
const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day;
  return new Date(d.setDate(diff));
};

export default function EarningsPage() {
  const { profile } = useAuth();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [earningsData, setEarningsData] = useState<EarningsData>({
    week: { total: 0, services: 0, clients: 0, daily: [] },
    month: { total: 0, services: 0, clients: 0, weekly: [] },
    year: { total: 0, services: 0, clients: 0, monthly: [] }
  });
  const [topServices, setTopServices] = useState<TopService[]>([]);
  const [loading, setLoading] = useState(true);

  const calculateEarningsData = useCallback((completedBookings: BookingData[]): EarningsData => {
    const now = new Date();
    const currentWeek = getWeekStart(now);
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const currentYear = new Date(now.getFullYear(), 0, 1);

    // Week data
    const weekBookings = completedBookings.filter(b => {
      const bookingDate = new Date(b.created_at);
      return bookingDate >= currentWeek;
    });

    const weeklyTotal = weekBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);
    const weeklyServices = weekBookings.length;
    const weeklyClients = new Set(weekBookings.map(b => b.customer_id)).size;

    // Generate daily data for current week
    const dailyData = [];
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentWeek);
      day.setDate(currentWeek.getDate() + i);
      const dayBookings = weekBookings.filter(b => {
        const bookingDate = new Date(b.created_at);
        return bookingDate.toDateString() === day.toDateString();
      });
      dailyData.push({
        day: dayNames[day.getDay()],
        amount: dayBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0),
        services: dayBookings.length
      });
    }

    // Month data
    const monthBookings = completedBookings.filter(b => {
      const bookingDate = new Date(b.created_at);
      return bookingDate >= currentMonth;
    });

    const monthlyTotal = monthBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);
    const monthlyServices = monthBookings.length;
    const monthlyClients = new Set(monthBookings.map(b => b.customer_id)).size;

    // Generate weekly data for current month
    const weeklyData = [];
    for (let week = 1; week <= 4; week++) {
      const weekStart = new Date(currentMonth);
      weekStart.setDate((week - 1) * 7 + 1);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      const weekBookings = monthBookings.filter(b => {
        const bookingDate = new Date(b.created_at);
        return bookingDate >= weekStart && bookingDate <= weekEnd;
      });
      
      weeklyData.push({
        week: `Sem ${week}`,
        amount: weekBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0),
        services: weekBookings.length
      });
    }

    // Year data
    const yearBookings = completedBookings.filter(b => {
      const bookingDate = new Date(b.created_at);
      return bookingDate >= currentYear;
    });

    const yearlyTotal = yearBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);
    const yearlyServices = yearBookings.length;
    const yearlyClients = new Set(yearBookings.map(b => b.customer_id)).size;

    // Generate monthly data for current year
    const monthlyData = [];
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    for (let month = 0; month < 12; month++) {
      const monthBookings = yearBookings.filter(b => {
        const bookingDate = new Date(b.created_at);
        return bookingDate.getMonth() === month;
      });
      
      monthlyData.push({
        month: monthNames[month],
        amount: monthBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0),
        services: monthBookings.length
      });
    }

    return {
      week: {
        total: weeklyTotal,
        services: weeklyServices,
        clients: weeklyClients,
        daily: dailyData
      },
      month: {
        total: monthlyTotal,
        services: monthlyServices,
        clients: monthlyClients,
        weekly: weeklyData
      },
      year: {
        total: yearlyTotal,
        services: yearlyServices,
        clients: yearlyClients,
        monthly: monthlyData
      }
    };
  }, []);

  const calculateTopServices = useCallback((completedBookings: BookingData[]): TopService[] => {
    const serviceStats = new Map();
    const totalRevenue = completedBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);

    // Count bookings and revenue per service
    completedBookings.forEach(booking => {
      const serviceName = booking.service?.name || 'Servicio Desconocido';
      const revenue = booking.total_amount || 0;
      
      if (serviceStats.has(serviceName)) {
        const stats = serviceStats.get(serviceName);
        serviceStats.set(serviceName, {
          bookings: stats.bookings + 1,
          revenue: stats.revenue + revenue
        });
      } else {
        serviceStats.set(serviceName, {
          bookings: 1,
          revenue: revenue
        });
      }
    });

    // Convert to array and calculate percentages
    const topServicesArray: TopService[] = Array.from(serviceStats.entries())
      .map(([name, stats]) => ({
        name,
        bookings: stats.bookings,
        revenue: stats.revenue,
        percentage: totalRevenue > 0 ? Math.round((stats.revenue / totalRevenue) * 100) : 0
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    return topServicesArray;
  }, []);

  const fetchEarningsData = useCallback(async () => {
    if (!profile?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      
      const { data, error } = await Promise.race([
        bookings.getByVendor(),
        timeoutPromise
      ]);

      if (error) {
        console.error('Error fetching earnings data:', {
          error,
          vendorId: profile.id,
          timestamp: new Date().toISOString()
        });
        return;
      }

      const allBookings = data || [];
      const completedBookings = allBookings.filter((b: BookingData) => b.status === 'completed');

      // Calculate earnings data
      const calculatedEarnings = calculateEarningsData(completedBookings);
      setEarningsData(calculatedEarnings);

      // Calculate top services
      const calculatedTopServices = calculateTopServices(completedBookings);
      setTopServices(calculatedTopServices);

    } catch (error) {
      console.error('Error fetching earnings data:', error);
    } finally {
      setLoading(false);
    }
  }, [profile?.id, calculateEarningsData, calculateTopServices]);

  useEffect(() => {
    if (profile?.id) {
      fetchEarningsData();
    }
  }, [profile?.id, fetchEarningsData]);

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Cargando análisis de ingresos...</div>
        </div>
      </div>
    );
  }

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
              Promedio: RD${currentData.services > 0 ? Math.round(currentData.total / currentData.services).toLocaleString() : 0}/servicio
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
              Promedio: RD${currentData.clients > 0 ? Math.round(currentData.total / currentData.clients).toLocaleString() : 0}/cliente
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
                  {topServices[0]?.name || "Tu servicio"} es tu servicio más rentable con {topServices[0]?.percentage || 0}% de tus ingresos.
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