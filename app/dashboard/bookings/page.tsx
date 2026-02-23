'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Phone, MessageCircle, Calendar, Ban } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { bookings } from '@/lib/api';
import CancellationModal from '@/components/bookings/CancellationModal';

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
  notes?: string | null;
  cancellationReason?: string | null;
  createdAt: string;
}

export default function BookingsPage() {
  const { profile } = useAuth();
  const t = useTranslations('bookings');
  const tStatus = useTranslations('bookingStatuses');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<'pending' | 'confirmed' | 'completed' | 'all'>('pending');
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelTarget, setCancelTarget] = useState<Booking | null>(null);

  const localeTag = locale === 'es' ? 'es-DO' : 'en-US';

  const fetchBookings = useCallback(async () => {
    if (!profile?.id) { setLoading(false); return; }
    try {
      setLoading(true);
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );
      const { data, error } = await Promise.race([bookings.getByVendor(), timeoutPromise]);
      if (error) { console.error('Error fetching bookings:', error); return; }
      if (data) {
        setAllBookings(data.map(booking => ({
          id: booking.id,
          clientName: booking.profiles?.first_name && booking.profiles?.last_name
            ? `${booking.profiles.first_name} ${booking.profiles.last_name}` : tCommon('client'),
          clientPhone: booking.profiles?.phone || tCommon('na'),
          clientEmail: booking.profiles?.email || tCommon('na'),
          service: booking.services?.name || tCommon('service'),
          date: new Date(booking.scheduled_date).toISOString().split('T')[0],
          time: new Date(booking.scheduled_date).toLocaleTimeString(localeTag, {
            hour: 'numeric', minute: '2-digit', hour12: true
          }),
          status: booking.status as Booking['status'],
          price: booking.total_amount || 0,
          notes: booking.notes,
          cancellationReason: booking.cancellation_reason,
          createdAt: booking.created_at
        })));
      }
    } catch (error) { console.error('Error fetching bookings:', error);
    } finally { setLoading(false); }
  }, [profile?.id, tCommon, localeTag]);

  useEffect(() => { if (profile?.id) fetchBookings(); }, [profile?.id, fetchBookings]);

  const updateBookingStatus = async (bookingId: string, newStatus: 'confirmed' | 'completed' | 'cancelled', cancellationReason?: string) => {
    try {
      const { error } = await bookings.updateStatus(bookingId, newStatus, cancellationReason);
      if (error) { console.error('Error updating booking status:', error); return; }
      setAllBookings(allBookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: newStatus, ...(cancellationReason && { cancellationReason }) }
          : booking
      ));
    } catch (error) { console.error('Error updating booking status:', error); }
  };

  const handleCancelConfirm = (bookingId: string, reason: string) => {
    updateBookingStatus(bookingId, 'cancelled', reason);
    setCancelTarget(null);
  };

  const filteredBookings = activeTab === 'all'
    ? allBookings : allBookings.filter(booking => booking.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]';
      case 'confirmed': return 'bg-[var(--color-info)]/15 text-[var(--color-info)]';
      case 'completed': return 'bg-[var(--color-success)]/15 text-[var(--color-success)]';
      case 'cancelled': return 'bg-[var(--color-error)]/15 text-[var(--color-error)]';
      default: return 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]';
    }
  };

  const tabs = [
    { key: 'pending', label: t('pendingBookings'), count: allBookings.filter(b => b.status === 'pending').length },
    { key: 'confirmed', label: t('confirmedBookings'), count: allBookings.filter(b => b.status === 'confirmed').length },
    { key: 'completed', label: t('completedBookings'), count: allBookings.filter(b => b.status === 'completed').length },
    { key: 'all', label: t('allBookings'), count: allBookings.length }
  ] as const;

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-[var(--color-text-muted)]">{t('loadingBookings')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{t('title')}</h1>
        <p className="text-[var(--color-text-muted)]">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {tabs.map((tab) => (
          <Card key={tab.key} className={`cursor-pointer transition-all rounded-[20px] bg-[var(--color-bg-card)] ${
            activeTab === tab.key ? 'ring-2 ring-[var(--color-primary)]' : ''
          }`} onClick={() => setActiveTab(tab.key)}>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-[var(--color-text-primary)]">{tab.count}</div>
              <p className="text-sm text-[var(--color-text-muted)]">{tab.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{tabs.find(t => t.key === activeTab)?.label}</span>
            <span className="text-sm font-normal text-[var(--color-text-muted)]">
              {filteredBookings.length} {t('bookingsCount', { count: filteredBookings.length }).split(' ').slice(1).join(' ')}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <Calendar className="h-16 w-16 text-[var(--color-text-muted)]" />
              </div>
              <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">{t('noBookings')}</h3>
              <p className="text-[var(--color-text-muted)]">{t('noBookingsHint')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div key={booking.id} className="border border-[var(--color-border-primary)] rounded-lg p-4 hover:bg-[var(--color-bg-hover)] transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-[var(--color-text-primary)]">{booking.clientName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {tStatus(booking.status)}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-[var(--color-text-muted)]"><strong>{t('serviceLabel')}</strong> {booking.service}</p>
                          <p className="text-sm text-[var(--color-text-muted)]"><strong>{t('dateLabel')}</strong> {new Date(booking.date).toLocaleDateString(localeTag)}</p>
                          <p className="text-sm text-[var(--color-text-muted)]"><strong>{t('timeLabel')}</strong> {booking.time}</p>
                          <p className="text-sm text-[var(--color-text-muted)]"><strong>{t('priceLabel')}</strong> RD${booking.price.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-[var(--color-text-muted)]"><strong>{t('phoneLabel')}</strong> {booking.clientPhone}</p>
                          <p className="text-sm text-[var(--color-text-muted)]"><strong>{t('emailLabel')}</strong> {booking.clientEmail}</p>
                          {booking.notes && (
                            <p className="text-sm text-[var(--color-text-muted)]"><strong>{t('notesLabel')}</strong> {booking.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      {booking.status === 'pending' && (
                        <>
                          <Button size="sm" onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            className="w-24 bg-[var(--color-success)] hover:bg-[var(--color-success)]/90 text-white">
                            <Check className="h-4 w-4 mr-1" />{tCommon('confirm')}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setCancelTarget(booking)}
                            className="w-24 text-[var(--color-error)] hover:bg-[var(--color-error)]/10">
                            <X className="h-4 w-4 mr-1" />{tCommon('cancel')}
                          </Button>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <>
                          <Button size="sm" onClick={() => updateBookingStatus(booking.id, 'completed')}
                            className="w-24 bg-[var(--color-success)] hover:bg-[var(--color-success)]/90 text-white">
                            <Check className="h-4 w-4 mr-1" />{tCommon('complete')}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => setCancelTarget(booking)}
                            className="w-24 text-[var(--color-error)] hover:bg-[var(--color-error)]/10">
                            <X className="h-4 w-4 mr-1" />{tCommon('cancel')}
                          </Button>
                        </>
                      )}
                      {booking.status === 'completed' && (
                        <div className="text-xs text-[var(--color-text-muted)] text-center">
                          {t('serviceCompleted')}
                        </div>
                      )}
                      {booking.status === 'cancelled' && (
                        <div className="space-y-1">
                          <div className="text-xs text-[var(--color-text-muted)] text-center">
                            {t('bookingCancelled')}
                          </div>
                          {booking.cancellationReason && (
                            <div className="flex items-start gap-1.5 px-2 py-1.5 bg-[var(--color-error)]/5 rounded-lg">
                              <Ban className="w-3 h-3 text-[var(--color-error)] mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-[var(--color-error)]">{booking.cancellationReason}</p>
                            </div>
                          )}
                        </div>
                      )}
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" className="px-2" title={t('callClient')}>
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="px-2" title={t('sendMessage')}>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-[var(--color-success)]">
              RD${allBookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.price, 0).toLocaleString()}
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">{t('completedEarnings')}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-[var(--color-info)]">
              RD${allBookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.price, 0).toLocaleString()}
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">{t('confirmedEarnings')}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-[var(--color-warning)]">
              RD${allBookings.filter(b => b.status === 'pending').reduce((sum, b) => sum + b.price, 0).toLocaleString()}
            </div>
            <p className="text-sm text-[var(--color-text-muted)]">{t('pendingEarnings')}</p>
          </CardContent>
        </Card>
      </div>

      {cancelTarget && (
        <CancellationModal
          bookingId={cancelTarget.id}
          clientName={cancelTarget.clientName}
          serviceName={cancelTarget.service}
          onConfirm={handleCancelConfirm}
          onClose={() => setCancelTarget(null)}
        />
      )}
    </div>
  );
}
