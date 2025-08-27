'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Check, X, Phone, MessageCircle, Calendar } from 'lucide-react';
import { VENDOR_PHRASES } from '@/lib/constants';

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
  const [activeTab, setActiveTab] = useState<'pending' | 'confirmed' | 'completed' | 'all'>('pending');

  // Mock bookings data - replace with Supabase data
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      clientName: 'María González',
      clientPhone: '(809) 123-4567',
      clientEmail: 'maria@email.com',
      service: 'Manicure Completo',
      date: '2024-01-22',
      time: '2:00 PM',
      status: 'pending',
      price: 800,
      notes: 'Prefiere esmalte rojo',
      createdAt: '2024-01-20T10:00:00Z'
    },
    {
      id: '2',
      clientName: 'Carmen Rodríguez',
      clientPhone: '(829) 987-6543',
      clientEmail: 'carmen@email.com',
      service: 'Corte y Peinado',
      date: '2024-01-22',
      time: '4:00 PM',
      status: 'confirmed',
      price: 1200,
      createdAt: '2024-01-19T15:30:00Z'
    },
    {
      id: '3',
      clientName: 'Ana Pérez',
      clientPhone: '(849) 555-0123',
      clientEmail: 'ana@email.com',
      service: 'Tratamiento Facial',
      date: '2024-01-21',
      time: '10:00 AM',
      status: 'completed',
      price: 1500,
      createdAt: '2024-01-18T09:15:00Z'
    },
    {
      id: '4',
      clientName: 'Sofía Martínez',
      clientPhone: '(809) 777-8888',
      clientEmail: 'sofia@email.com',
      service: 'Pedicure con Spa',
      date: '2024-01-23',
      time: '11:00 AM',
      status: 'pending',
      price: 1200,
      notes: 'Primera vez en el salón',
      createdAt: '2024-01-21T14:20:00Z'
    }
  ]);

  const updateBookingStatus = (bookingId: string, newStatus: 'confirmed' | 'completed' | 'cancelled') => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    ));
  };

  const filteredBookings = activeTab === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === activeTab);

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
    { key: 'pending', label: VENDOR_PHRASES.pending_bookings, count: bookings.filter(b => b.status === 'pending').length },
    { key: 'confirmed', label: VENDOR_PHRASES.confirmed_bookings, count: bookings.filter(b => b.status === 'confirmed').length },
    { key: 'completed', label: VENDOR_PHRASES.completed_bookings, count: bookings.filter(b => b.status === 'completed').length },
    { key: 'all', label: 'Todas', count: bookings.length }
  ] as const;

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
                            <strong>Precio:</strong> RD${booking.price}
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
              RD${bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0).toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Ingresos completados</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              RD${bookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.price, 0).toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Ingresos confirmados</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              RD${bookings.filter(b => b.status === 'pending').reduce((sum, b) => sum + b.price, 0).toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Ingresos pendientes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}