"use client";

import { Calendar, User } from "lucide-react";
import { useTranslations } from 'next-intl';
import { formatCurrency } from "@/lib/utils";

interface Booking {
  id: string;
  clientName: string;
  service: string;
  date: string;
  time: string;
  status: string;
  price: number;
}

interface RecentBookingsProps {
  bookings: Booking[];
  onViewAll: () => void;
}

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-[var(--color-warning)]/15 text-[var(--color-warning)]",
  confirmed: "bg-[var(--color-info)]/15 text-[var(--color-info)]",
  completed: "bg-[var(--color-success)]/15 text-[var(--color-success)]",
  cancelled: "bg-[var(--color-error)]/15 text-[var(--color-error)]",
};

export default function RecentBookings({ bookings, onViewAll }: RecentBookingsProps) {
  const t = useTranslations('dashboard');
  const tStatus = useTranslations('bookingStatuses');

  return (
    <div className="bg-[var(--color-bg-card)] rounded-[20px] border border-[var(--color-border-primary)] p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--color-brand-surface)] rounded-xl flex items-center justify-center">
            <Calendar className="h-5 w-5 text-[var(--color-primary)]" />
          </div>
          <div>
            <h3 className="font-semibold text-[var(--color-text-primary)]">{t('recentBookings')}</h3>
            <p className="text-sm text-[var(--color-text-muted)]">{t('todayActivity')}</p>
          </div>
        </div>
        <button
          onClick={onViewAll}
          className="text-sm text-[var(--color-primary)] hover:underline font-medium"
        >
          {t('viewAll')}
        </button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--color-bg-hover)] transition-colors"
          >
            <div className="w-12 h-12 bg-[var(--color-brand-surface)] rounded-xl flex items-center justify-center flex-shrink-0">
              <User className="h-5 w-5 text-[var(--color-primary)]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">{booking.clientName}</p>
                  <p className="text-sm text-[var(--color-text-secondary)]">{booking.service}</p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    {booking.date} - {booking.time}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end gap-2">
                  <p className="font-semibold text-[var(--color-text-primary)]">
                    {formatCurrency(booking.price)}
                  </p>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      STATUS_STYLES[booking.status] || STATUS_STYLES.pending
                    }`}
                  >
                    {tStatus(booking.status as 'pending' | 'confirmed' | 'completed' | 'cancelled')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <p className="text-center text-[var(--color-text-muted)] py-8">
            {t('noRecentBookings')}
          </p>
        )}
      </div>
    </div>
  );
}
