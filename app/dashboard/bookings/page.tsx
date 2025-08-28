'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Phone, MessageCircle, Calendar } from 'lucide-react';
import { VENDOR_PHRASES } from '@/lib/constants';
import { useAuth } from '@/contexts/auth-context';
import { bookings } from '@/lib/api';

interface Booking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
  createdAt: string;
}

export default function BookingsPage() {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'pending' | 'confirmed' | 'completed' | 'all'>('pending');
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
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
        bookings.getByVendor(profile.id),
        timeoutPromise
      ]);
      
      if (error) {
        console.error('Error fetching bookings:', {
          error,
          vendorId: profile.id,
          timestamp: new Date().toISOString()
        });
        return;
      }

      if (data) {
        const formattedBookings: Booking[] = data.map(booking => ({
          id: booking.id,
          clientName: booking.profiles?.first_name && booking.profiles?.last_name 
            ? `${booking.profiles.first_name} ${booking.profiles.last_name}` 
            : 'Cliente',
          clientPhone: booking.profiles?.phone || 'N/A',
          clientEmail: booking.profiles?.email || 'N/A',
          service: booking.services?.name || 'Servicio',
          date: new Date(booking.scheduled_date).toISOString().split('T')[0],
          time: new Date(booking.scheduled_date).toLocaleTimeString('es-DO', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
          }),
          status: booking.status as 'pending' | 'confirmed' | 'completed' | 'cancelled',
          price: booking.total_amount || 0,
          notes: booking.notes,
          createdAt: booking.created_at
        }));
        
        setAllBookings(formattedBookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  }, [profile?.id]);

  useEffect(() => {
    if (profile?.id) {
      fetchBookings();
    }
  }, [profile?.id, fetchBookings]);

  const updateBookingStatus = async (bookingId: string, newStatus: 'confirmed' | 'completed' | 'cancelled', cancellationReason?: string) => {
    try {
      const { error } = await bookings.updateStatus(bookingId, newStatus, cancellationReason);
      
      if (error) {
        console.error('Error updating booking status:', error);
        return;
      }

      // Update local state optimistically
      setAllBookings(allBookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const filteredBookings = activeTab === 'all' 
    ? allBookings 
    : allBookings.filter(booking => booking.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmada';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const tabs = [
    { key: 'pending', label: VENDOR_PHRASES.pending_bookings, count: allBookings.filter(b => b.status === 'pending').length },
    { key: 'confirmed', label: VENDOR_PHRASES.confirmed_bookings, count: allBookings.filter(b => b.status === 'confirmed').length },
    { key: 'completed', label: VENDOR_PHRASES.completed_bookings, count: allBookings.filter(b => b.status === 'completed').length },
    { key: 'all', label: 'Todas', count: allBookings.length }
  ] as const;

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Cargando reservaciones...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-femfuel-black">
          {VENDOR_PHRASES.bookings}
        </h1>
        <p className="text-gray-600">
          Gestiona las reservaciones de tus clientes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {tabs.map((tab) => (
          <Card 
            key={tab.key} 
            className={`cursor-pointer transition-all ${
              activeTab === tab.key ? 'ring-2 ring-femfuel-pink' : ''
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-femfuel-black">{tab.count}</div>
              <p className="text-sm text-gray-600">{tab.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{tabs.find(t => t.key === activeTab)?.label}</span>
            <span className="text-sm font-normal text-gray-600">
              {filteredBookings.length} reservaciones
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <Calendar className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay reservaciones {activeTab === 'all' ? '' : tabs.find(t => t.key === activeTab)?.label.toLowerCase()}
              </h3>
              <p className="text-gray-600">
                Las nuevas reservaciones aparecerán aquí
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-femfuel-black">
                          {booking.clientName}
                        </h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">
                            <strong>Servicio:</strong> {booking.service}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Fecha:</strong> {new Date(booking.date).toLocaleDateString('es-DO')}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Hora:</strong> {booking.time}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Precio:</strong> RD${booking.price.toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">
                            <strong>Teléfono:</strong> {booking.clientPhone}
                          </p>
                          <p className="text-sm text-gray-600">
                            <strong>Email:</strong> {booking.clientEmail}
                          </p>
                          {booking.notes && (
                            <p className="text-sm text-gray-600">
                              <strong>Notas:</strong> {booking.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col space-y-2 ml-4">
                      {booking.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="w-24"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Confirmar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="w-24 text-red-600"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancelar
                          </Button>
                        </>
                      )}
                      
                      {booking.status === 'confirmed' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateBookingStatus(booking.id, 'completed')}
                            className="w-24"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Completar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="w-24 text-red-600"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancelar
                          </Button>
                        </>
                      )}

                      {(booking.status === 'completed' || booking.status === 'cancelled') && (
                        <div className="text-xs text-gray-500 text-center">
                          {booking.status === 'completed' ? 'Servicio completado' : 'Reservación cancelada'}
                        </div>
                      )}

                      {/* Contact buttons */}
                      <div className="flex space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          className="px-2"
                          title="Llamar cliente"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="px-2"
                          title="Enviar mensaje"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              RD${allBookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0).toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Ingresos completados</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              RD${allBookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.price, 0).toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Ingresos confirmados</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              RD${allBookings.filter(b => b.status === 'pending').reduce((sum, b) => sum + b.price, 0).toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Ingresos pendientes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}