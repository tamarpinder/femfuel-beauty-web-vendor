'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, CalendarDays, Trash2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { bookings, scheduleBlocks } from '@/lib/api';
import BookingDetailModal from '@/components/calendar/BookingDetailModal';
import BlockScheduleModal from '@/components/calendar/BlockScheduleModal';
import type { CalendarBooking } from '@/components/calendar/BookingDetailModal';
import type { ScheduleBlock } from '@/lib/api/ScheduleBlockManager';
import type { BlockType } from '@/lib/api/ScheduleBlockManager';

const ROW_HEIGHT = 64;
const START_HOUR = 8;
const END_HOUR = 20;

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + minutes;
  return `${Math.floor(total / 60) % 24}`.padStart(2, '0') + ':' + `${total % 60}`.padStart(2, '0');
}

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function getPositionStyle(startTime: string, endTime: string) {
  const startMin = timeToMinutes(startTime);
  const endMin = timeToMinutes(endTime);
  const gridStartMin = START_HOUR * 60;
  const topPx = ((startMin - gridStartMin) / 60) * ROW_HEIGHT;
  const heightPx = Math.max(((endMin - startMin) / 60) * ROW_HEIGHT, 24);
  return { top: `${topPx}px`, height: `${heightPx}px` };
}

const BLOCK_COLORS: Record<string, string> = {
  lunch: 'border-amber-400 bg-amber-500/10 text-amber-600',
  personal: 'border-slate-400 bg-slate-500/10 text-slate-600',
  walk_in: 'border-violet-400 bg-violet-500/10 text-violet-600',
  day_off: 'border-rose-400 bg-rose-500/10 text-rose-600',
  custom: 'border-gray-400 bg-gray-500/10 text-gray-600',
};

export default function CalendarPage() {
  const { profile } = useAuth();
  const t = useTranslations('calendar');
  const tStatus = useTranslations('bookingStatuses');
  const locale = useLocale();
  const localeTag = locale === 'es' ? 'es-DO' : 'en-US';

  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');
  const [events, setEvents] = useState<CalendarBooking[]>([]);
  const [blocks, setBlocks] = useState<ScheduleBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<CalendarBooking | null>(null);
  const [showBlockModal, setShowBlockModal] = useState(false);

  const fetchData = useCallback(async () => {
    if (!profile?.id) { setLoading(false); return; }
    try {
      setLoading(true);
      const [bookingRes, blockRes] = await Promise.all([
        bookings.getByVendor(),
        scheduleBlocks.getByVendor(),
      ]);

      if (bookingRes.data) {
        setEvents(bookingRes.data
          .filter(b => b.status !== 'cancelled')
          .map(b => {
            const dateStr = new Date(b.scheduled_date).toISOString().split('T')[0];
            const timeStr = b.scheduled_time?.substring(0, 5) || '09:00';
            const duration = b.services?.duration || 60;
            const clientName = b.profiles?.first_name && b.profiles?.last_name
              ? `${b.profiles.first_name} ${b.profiles.last_name}` : 'Cliente';
            return {
              id: b.id, client: clientName,
              clientPhone: b.profiles?.phone || 'N/A', clientEmail: b.profiles?.email || 'N/A',
              date: dateStr, startTime: timeStr, endTime: addMinutes(timeStr, duration),
              service: b.services?.name || 'Servicio', duration,
              price: b.total_amount || 0,
              status: b.status as CalendarBooking['status'],
              notes: b.notes || null,
            };
          }));
      }
      if (blockRes.data) setBlocks(blockRes.data);
    } catch (err) { console.error('Calendar error:', err);
    } finally { setLoading(false); }
  }, [profile?.id]);

  useEffect(() => { if (profile?.id) fetchData(); }, [profile?.id, fetchData]);

  const handleCreateBlock = async (block: { block_date: string; start_time: string; end_time: string; block_type: BlockType; title?: string; notes?: string }) => {
    const { data } = await scheduleBlocks.create(block);
    if (data) setBlocks(prev => [...prev, data]);
    setShowBlockModal(false);
  };

  const handleDeleteBlock = async (blockId: string) => {
    const { error } = await scheduleBlocks.delete(blockId);
    if (!error) setBlocks(prev => prev.filter(b => b.id !== blockId));
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(currentDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };

  const weekDays = getWeekDays();
  const timeSlots = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => `${(i + START_HOUR).toString().padStart(2, '0')}:00`);

  const getEventsForDate = (date: Date) => {
    const ds = date.toISOString().split('T')[0];
    return events.filter(e => e.date === ds);
  };
  const getBlocksForDate = (date: Date) => {
    const ds = date.toISOString().split('T')[0];
    return blocks.filter(b => b.block_date === ds);
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayEvents = events.filter(e => e.date === todayStr);
  const weekEvents = weekDays.flatMap(d => getEventsForDate(d));

  const formatDate = (date: Date) =>
    date.toLocaleDateString(localeTag, { weekday: 'short', month: 'short', day: 'numeric' });
  const isToday = (date: Date) => date.toDateString() === new Date().toDateString();

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const occupancyPct = weekDays.length > 0
    ? Math.round((weekDays.filter(d => getEventsForDate(d).length > 0 || getBlocksForDate(d).length > 0).length / weekDays.length) * 100)
    : 0;

  const statusColor = (s: string) => {
    if (s === 'confirmed') return 'border-[var(--color-success)] bg-[var(--color-success)]/10 text-[var(--color-success)]';
    if (s === 'pending') return 'border-[var(--color-warning)] bg-[var(--color-warning)]/10 text-[var(--color-warning)]';
    return 'border-[var(--color-info)] bg-[var(--color-info)]/10 text-[var(--color-info)]';
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-64">
        <div className="text-lg text-[var(--color-text-muted)]">{t('title')}...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{t('title')}</h1>
          <p className="text-[var(--color-text-muted)]">{t('subtitle')}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex rounded-lg border border-[var(--color-border-primary)] overflow-hidden">
            {[{ key: 'day', label: t('day') }, { key: 'week', label: t('week') }, { key: 'month', label: t('month') }].map((opt) => (
              <button key={opt.key} onClick={() => setView(opt.key as typeof view)}
                className={`px-3 py-1 text-sm font-medium transition-colors ${
                  view === opt.key ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]'
                }`}>{opt.label}</button>
            ))}
          </div>
          <Button onClick={() => setShowBlockModal(true)}>{t('blockSchedule')}</Button>
        </div>
      </div>

      {/* Navigation */}
      <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => navigateWeek('prev')}>{t('previous')}</Button>
            <CardTitle className="text-xl">
              {currentDate.toLocaleDateString(localeTag, { month: 'long', year: 'numeric' })}
            </CardTitle>
            <Button variant="outline" onClick={() => navigateWeek('next')}>{t('next')}</Button>
          </div>
        </CardHeader>
      </Card>

      {/* Week grid */}
      {view === 'week' && (
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* Day headers */}
                <div className="grid grid-cols-8 border-b border-[var(--color-border-primary)]">
                  <div className="p-4 bg-[var(--color-bg-tertiary)] font-medium text-[var(--color-text-muted)]">{t('hour')}</div>
                  {weekDays.map((day, i) => {
                    const isDayOff = getBlocksForDate(day).some(b => b.block_type === 'day_off');
                    return (
                      <div key={i} className={`p-4 text-center font-medium border-l border-[var(--color-border-primary)] ${
                        isDayOff ? 'bg-rose-100 text-rose-600'
                          : isToday(day) ? 'bg-[var(--color-primary)] text-white'
                          : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]'
                      }`}>
                        <div className="text-sm">{formatDate(day)}</div>
                        <div className="text-xs mt-1">
                          {isDayOff ? t('blockType_day_off') : `${getEventsForDate(day).length} ${t('appointments')}`}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Time grid */}
                <div className="relative grid grid-cols-8">
                  <div>
                    {timeSlots.map((time) => (
                      <div key={time} className="bg-[var(--color-bg-tertiary)] text-sm text-[var(--color-text-muted)] font-medium px-2 py-2 border-b border-[var(--color-border-primary)]"
                        style={{ height: `${ROW_HEIGHT}px` }}>{time}</div>
                    ))}
                  </div>

                  {weekDays.map((day, dayIndex) => {
                    const dayEvents = getEventsForDate(day);
                    const dayBlocks = getBlocksForDate(day);
                    const isDayOff = dayBlocks.some(b => b.block_type === 'day_off');

                    return (
                      <div key={dayIndex} className={`relative border-l border-[var(--color-border-primary)] ${isDayOff ? 'bg-rose-50/50' : ''}`}>
                        {timeSlots.map((time) => (
                          <div key={time} className="border-b border-[var(--color-border-primary)]" style={{ height: `${ROW_HEIGHT}px` }} />
                        ))}

                        {/* Schedule blocks */}
                        {dayBlocks.filter(b => b.block_type !== 'day_off').map((block) => {
                          const style = getPositionStyle(block.start_time.substring(0, 5), block.end_time.substring(0, 5));
                          return (
                            <div key={block.id}
                              className={`absolute left-0.5 right-0.5 rounded border-l-4 px-1.5 py-1 z-[5] overflow-hidden group
                                bg-[repeating-linear-gradient(45deg,transparent,transparent_4px,rgba(0,0,0,0.03)_4px,rgba(0,0,0,0.03)_8px)]
                                ${BLOCK_COLORS[block.block_type]}`}
                              style={style}>
                              <div className="flex items-center justify-between">
                                <p className="font-medium text-[10px] truncate">{block.title || block.block_type}</p>
                                <button onClick={() => handleDeleteBlock(block.id)}
                                  className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-black/10 transition-opacity">
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                              <p className="text-[9px] opacity-60">{block.start_time.substring(0, 5)} - {block.end_time.substring(0, 5)}</p>
                            </div>
                          );
                        })}

                        {/* Booking events */}
                        {!isDayOff && dayEvents.map((event) => {
                          const style = getPositionStyle(event.startTime, event.endTime);
                          return (
                            <div key={event.id} onClick={() => setSelectedEvent(event)}
                              className={`absolute left-1 right-1 rounded-lg border-l-4 px-2 py-1 cursor-pointer hover:opacity-80 transition-opacity overflow-hidden z-10 ${statusColor(event.status)}`}
                              style={style}>
                              <p className="font-semibold text-xs truncate">{event.client}</p>
                              <p className="text-xs truncate opacity-80">{event.service}</p>
                              <p className="text-[10px] opacity-60">{event.startTime} - {event.endTime}</p>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Today's appointments */}
      <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
        <CardHeader><CardTitle>{t('todayAppointments')}</CardTitle></CardHeader>
        <CardContent>
          {todayEvents.length === 0 ? (
            <div className="text-center py-8">
              <CalendarDays className="h-12 w-12 text-[var(--color-text-muted)] mx-auto mb-4" />
              <p className="text-[var(--color-text-muted)]">{t('noAppointmentsToday')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayEvents.map((event) => (
                <div key={event.id} onClick={() => setSelectedEvent(event)}
                  className="flex items-center justify-between p-4 border border-[var(--color-border-primary)] rounded-lg hover:bg-[var(--color-bg-hover)] cursor-pointer transition-colors">
                  <div className="flex items-center space-x-4">
                    <User className="h-6 w-6 text-[var(--color-text-muted)]" />
                    <div>
                      <h3 className="font-medium text-[var(--color-text-primary)]">{event.client}</h3>
                      <p className="text-sm text-[var(--color-text-muted)]">{event.service}</p>
                      <p className="text-xs text-[var(--color-text-muted)]">{event.startTime} - {event.endTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'confirmed' ? 'bg-[var(--color-success)]/15 text-[var(--color-success)]'
                        : 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]'
                    }`}>{tStatus(event.status)}</span>
                    <span className="font-medium text-[var(--color-text-primary)]">RD${event.price.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-[var(--color-primary)]">{todayEvents.length}</div>
            <p className="text-sm text-[var(--color-text-muted)]">{t('appointmentsToday')}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-[var(--color-success)]">{weekEvents.filter(e => e.status === 'confirmed').length}</div>
            <p className="text-sm text-[var(--color-text-muted)]">{t('confirmedCount')}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-[var(--color-warning)]">{weekEvents.filter(e => e.status === 'pending').length}</div>
            <p className="text-sm text-[var(--color-text-muted)]">{t('pendingCount')}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-[var(--color-info)]">{occupancyPct}%</div>
            <p className="text-sm text-[var(--color-text-muted)]">{t('weeklyOccupancy')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {selectedEvent && (
        <BookingDetailModal booking={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
      {showBlockModal && (
        <BlockScheduleModal onSave={handleCreateBlock} onClose={() => setShowBlockModal(false)} />
      )}
    </div>
  );
}
