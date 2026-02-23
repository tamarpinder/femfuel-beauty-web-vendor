'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Phone, MessageCircle, Clock, DollarSign, User, Calendar, FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';

export interface CalendarBooking {
  id: string;
  client: string;
  clientPhone: string;
  clientEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  service: string;
  duration: number;
  price: number;
  status: 'confirmed' | 'pending' | 'completed';
  notes: string | null;
}

interface BookingDetailModalProps {
  booking: CalendarBooking;
  onClose: () => void;
}

const STATUS_STYLES: Record<string, string> = {
  confirmed: 'bg-[var(--color-success)]/15 text-[var(--color-success)]',
  pending: 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]',
  completed: 'bg-[var(--color-info)]/15 text-[var(--color-info)]',
};

export default function BookingDetailModal({ booking, onClose }: BookingDetailModalProps) {
  const t = useTranslations('calendar');
  const tStatus = useTranslations('bookingStatuses');
  const tBookings = useTranslations('bookings');

  const formattedDate = new Date(booking.date).toLocaleDateString('es-DO', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[var(--color-bg-card)] rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-[var(--color-border-primary)]">
        {/* Colored status bar */}
        <div className={`h-1.5 ${
          booking.status === 'confirmed' ? 'bg-[var(--color-success)]'
            : booking.status === 'pending' ? 'bg-[var(--color-warning)]'
            : 'bg-[var(--color-info)]'
        }`} />

        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-3">
          <div>
            <h3 className="font-bold text-lg text-[var(--color-text-primary)]">{booking.service}</h3>
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${STATUS_STYLES[booking.status]}`}>
              {tStatus(booking.status)}
            </span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
            <X className="w-4 h-4 text-[var(--color-text-muted)]" />
          </button>
        </div>

        {/* Client info */}
        <div className="px-5 pb-4">
          <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-tertiary)] rounded-xl">
            <div className="w-10 h-10 rounded-full bg-[var(--color-brand-surface)] flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[var(--color-text-primary)] truncate">{booking.client}</p>
              <p className="text-xs text-[var(--color-text-muted)] truncate">{booking.clientEmail}</p>
            </div>
            <div className="flex gap-1.5">
              <a href={`tel:${booking.clientPhone}`}
                className="p-2 rounded-lg bg-[var(--color-success)]/10 hover:bg-[var(--color-success)]/20 transition-colors">
                <Phone className="w-4 h-4 text-[var(--color-success)]" />
              </a>
              <a href={`https://wa.me/${booking.clientPhone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--color-success)]/10 hover:bg-[var(--color-success)]/20 transition-colors">
                <MessageCircle className="w-4 h-4 text-[var(--color-success)]" />
              </a>
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="px-5 pb-4 grid grid-cols-2 gap-3">
          <DetailItem icon={<Calendar className="w-4 h-4" />} label={tBookings('dateLabel').replace(':', '')} value={formattedDate} />
          <DetailItem icon={<Clock className="w-4 h-4" />} label={tBookings('timeLabel').replace(':', '')} value={`${booking.startTime} - ${booking.endTime}`} />
          <DetailItem icon={<Clock className="w-4 h-4" />} label={t('duration')} value={`${booking.duration} min`} />
          <DetailItem icon={<DollarSign className="w-4 h-4" />} label={tBookings('priceLabel').replace(':', '')} value={`RD$${booking.price.toLocaleString()}`} />
          <DetailItem icon={<Phone className="w-4 h-4" />} label={tBookings('phoneLabel').replace(':', '')} value={booking.clientPhone} />
        </div>

        {/* Notes */}
        {booking.notes && (
          <div className="px-5 pb-4">
            <div className="flex items-start gap-2 p-3 bg-[var(--color-warning)]/5 rounded-xl border border-[var(--color-warning)]/20">
              <FileText className="w-4 h-4 text-[var(--color-warning)] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-[var(--color-warning)] mb-0.5">{tBookings('notesLabel').replace(':', '')}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{booking.notes}</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-5 pt-2 border-t border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]/50">
          <Button variant="outline" onClick={onClose} className="w-full">
            {t('closeDetail')}
          </Button>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-[var(--color-text-muted)] mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-[var(--color-text-muted)]">{label}</p>
        <p className="text-sm font-medium text-[var(--color-text-primary)]">{value}</p>
      </div>
    </div>
  );
}
