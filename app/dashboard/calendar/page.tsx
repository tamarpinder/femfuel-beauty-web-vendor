'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';

interface CalendarEvent {
  id: string;
  title: string;
  client: string;
  date: string;
  startTime: string;
  endTime: string;
  service: string;
  price: number;
  status: 'confirmed' | 'pending' | 'completed';
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');

  // Mock calendar events
  const events: CalendarEvent[] = [
    {
      id: '1',
      title: 'Manicure Completo',
      client: 'María González',
      date: '2024-01-22',
      startTime: '14:00',
      endTime: '15:00',
      service: 'Manicure Completo',
      price: 800,
      status: 'confirmed'
    },
    {
      id: '2',
      title: 'Corte y Peinado',
      client: 'Carmen Rodríguez',
      date: '2024-01-22',
      startTime: '16:00',
      endTime: '17:15',
      service: 'Corte y Peinado',
      price: 1200,
      status: 'confirmed'
    },
    {
      id: '3',
      title: 'Pedicure con Spa',
      client: 'Ana Pérez',
      date: '2024-01-23',
      startTime: '10:00',
      endTime: '11:30',
      service: 'Pedicure con Spa',
      price: 1200,
      status: 'pending'
    },
    {
      id: '4',
      title: 'Tratamiento Facial',
      client: 'Sofía Martínez',
      date: '2024-01-24',
      startTime: '15:00',
      endTime: '16:30',
      service: 'Tratamiento Facial',
      price: 1500,
      status: 'confirmed'
    }
  ];

  // Generate week days
  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = getWeekDays();
  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8; // Start from 8 AM
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-DO', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-femfuel-black">
            Calendario
          </h1>
          <p className="text-gray-600">
            Gestiona tu horario y disponibilidad
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* View Switcher */}
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {[
              { key: 'day', label: 'Día' },
              { key: 'week', label: 'Semana' },
              { key: 'month', label: 'Mes' }
            ].map((viewOption) => (
              <button
                key={viewOption.key}
                onClick={() => setView(viewOption.key as 'month' | 'week' | 'day')}
                className={`px-3 py-1 text-sm font-medium transition-colors ${
                  view === viewOption.key
                    ? 'bg-femfuel-pink text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {viewOption.label}
              </button>
            ))}
          </div>

          <Button>
            ➕ Bloquear Horario
          </Button>
        </div>
      </div>

      {/* Calendar Navigation */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => navigateWeek('prev')}>
              ← Anterior
            </Button>
            <CardTitle className="text-xl">
              {currentDate.toLocaleDateString('es-DO', { 
                month: 'long', 
                year: 'numeric' 
              })}
            </CardTitle>
            <Button variant="outline" onClick={() => navigateWeek('next')}>
              Siguiente →
            </Button>
          </div>
        </CardHeader>
      </Card>

      {view === 'week' && (
        <Card>
          <CardContent className="p-0">
            {/* Week Calendar */}
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Header Row */}
                <div className="grid grid-cols-8 border-b border-gray-200">
                  <div className="p-4 bg-gray-50 font-medium text-gray-600">
                    Hora
                  </div>
                  {weekDays.map((day, index) => (
                    <div
                      key={index}
                      className={`p-4 text-center font-medium border-l border-gray-200 ${
                        isToday(day) 
                          ? 'bg-femfuel-pink text-white' 
                          : 'bg-gray-50 text-gray-900'
                      }`}
                    >
                      <div className="text-sm">{formatDate(day)}</div>
                      <div className="text-xs mt-1">
                        {getEventsForDate(day).length} citas
                      </div>
                    </div>
                  ))}
                </div>

                {/* Time Slots */}
                {timeSlots.map((time) => (
                  <div key={time} className="grid grid-cols-8 border-b border-gray-100 min-h-[60px]">
                    <div className="p-2 bg-gray-50 text-sm text-gray-600 font-medium border-l border-gray-200">
                      {time}
                    </div>
                    {weekDays.map((day, dayIndex) => {
                      const dayEvents = getEventsForDate(day).filter(event => 
                        event.startTime <= time && event.endTime > time
                      );
                      
                      return (
                        <div key={dayIndex} className="p-1 border-l border-gray-200 relative">
                          {dayEvents.map((event) => (
                            <div
                              key={event.id}
                              className={`p-2 rounded text-xs font-medium cursor-pointer hover:opacity-80 ${
                                event.status === 'confirmed'
                                  ? 'bg-green-100 text-green-800 border-l-4 border-green-500'
                                  : event.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800 border-l-4 border-yellow-500'
                                  : 'bg-blue-100 text-blue-800 border-l-4 border-blue-500'
                              }`}
                            >
                              <div className="font-semibold truncate">
                                {event.client}
                              </div>
                              <div className="truncate">
                                {event.service}
                              </div>
                              <div className="text-xs opacity-75">
                                {event.startTime} - {event.endTime}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Citas de Hoy</CardTitle>
        </CardHeader>
        <CardContent>
          {events.filter(event => {
            const today = new Date().toISOString().split('T')[0];
            return event.date === today;
          }).length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📅</div>
              <p className="text-gray-600">No tienes citas programadas para hoy</p>
            </div>
          ) : (
            <div className="space-y-4">
              {events
                .filter(event => {
                  const today = new Date().toISOString().split('T')[0];
                  return event.date === today;
                })
                .map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl">👤</div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {event.client}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {event.service}
                        </p>
                        <p className="text-xs text-gray-500">
                          {event.startTime} - {event.endTime}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : event.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {event.status === 'confirmed' ? 'Confirmada' : 
                         event.status === 'pending' ? 'Pendiente' : 'Completada'}
                      </span>
                      <span className="font-medium text-gray-900">
                        RD${event.price}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-femfuel-pink">
              {events.filter(e => e.date === new Date().toISOString().split('T')[0]).length}
            </div>
            <p className="text-sm text-gray-600">Citas hoy</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {events.filter(e => e.status === 'confirmed').length}
            </div>
            <p className="text-sm text-gray-600">Confirmadas</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {events.filter(e => e.status === 'pending').length}
            </div>
            <p className="text-sm text-gray-600">Pendientes</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              75%
            </div>
            <p className="text-sm text-gray-600">Ocupación semanal</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}