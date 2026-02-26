'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { bookings, wallet } from '@/lib/api';
import BalanceOverview from '@/components/wallet/BalanceOverview';
import EarningsByStylist from '@/components/wallet/EarningsByStylist';
import TransactionHistory from '@/components/wallet/TransactionHistory';
import PayoutSection from '@/components/wallet/PayoutSection';
import type { Payout, EmployeeEarnings } from '@/lib/api/VendorWalletManager';

interface BookingData {
  id: string;
  created_at: string;
  total_amount?: number;
  customer_id?: string;
  status?: string;
}

interface ChartDataPoint {
  label: string;
  amount: number;
  services: number;
}

const getWeekStart = (date: Date): Date => {
  const d = new Date(date);
  const day = d.getDay();
  return new Date(d.setDate(d.getDate() - day));
};

export default function WalletPage() {
  const { profile } = useAuth();
  const t = useTranslations('wallet');
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [loading, setLoading] = useState(true);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [employees, setEmployees] = useState<EmployeeEarnings[]>([]);
  const [completedBookings, setCompletedBookings] = useState<BookingData[]>([]);
  const [confirmedBookings, setConfirmedBookings] = useState<BookingData[]>([]);

  const fetchData = useCallback(async () => {
    if (!profile?.id) { setLoading(false); return; }
    try {
      setLoading(true);
      const [bookingsRes, payoutsRes, employeesRes] = await Promise.all([
        bookings.getByVendor(),
        wallet.getPayouts(),
        wallet.getEarningsByEmployee(),
      ]);

      const allBookings = bookingsRes.data || [];
      setCompletedBookings(allBookings.filter((b: BookingData) => b.status === 'completed'));
      setConfirmedBookings(allBookings.filter((b: BookingData) => b.status === 'confirmed'));
      setPayouts(payoutsRes.data || []);
      setEmployees(employeesRes.data || []);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
    } finally {
      setLoading(false);
    }
  }, [profile?.id]);

  useEffect(() => { if (profile?.id) fetchData(); }, [profile?.id, fetchData]);

  const completedTotal = completedBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);
  const confirmedTotal = confirmedBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0);
  const paidOutTotal = payouts
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);
  const availableBalance = completedTotal - paidOutTotal;

  const buildChartData = (): { data: ChartDataPoint[]; services: number; clients: number; total: number } => {
    const now = new Date();
    let filtered: BookingData[];
    const points: ChartDataPoint[] = [];

    if (selectedPeriod === 'week') {
      const weekStart = getWeekStart(now);
      filtered = completedBookings.filter(b => new Date(b.created_at) >= weekStart);
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      for (let i = 0; i < 7; i++) {
        const day = new Date(weekStart);
        day.setDate(weekStart.getDate() + i);
        const dayBookings = filtered.filter(b => new Date(b.created_at).toDateString() === day.toDateString());
        points.push({
          label: dayNames[day.getDay()],
          amount: dayBookings.reduce((s, b) => s + (b.total_amount || 0), 0),
          services: dayBookings.length,
        });
      }
    } else if (selectedPeriod === 'month') {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      filtered = completedBookings.filter(b => new Date(b.created_at) >= monthStart);
      for (let w = 1; w <= 4; w++) {
        const wStart = new Date(monthStart);
        wStart.setDate((w - 1) * 7 + 1);
        const wEnd = new Date(wStart);
        wEnd.setDate(wStart.getDate() + 6);
        const wBookings = filtered.filter(b => {
          const d = new Date(b.created_at);
          return d >= wStart && d <= wEnd;
        });
        points.push({
          label: `W${w}`,
          amount: wBookings.reduce((s, b) => s + (b.total_amount || 0), 0),
          services: wBookings.length,
        });
      }
    } else {
      const yearStart = new Date(now.getFullYear(), 0, 1);
      filtered = completedBookings.filter(b => new Date(b.created_at) >= yearStart);
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      for (let m = 0; m < 12; m++) {
        const mBookings = filtered.filter(b => new Date(b.created_at).getMonth() === m);
        points.push({
          label: monthNames[m],
          amount: mBookings.reduce((s, b) => s + (b.total_amount || 0), 0),
          services: mBookings.length,
        });
      }
    }

    const total = filtered!.reduce((s, b) => s + (b.total_amount || 0), 0);
    const clients = new Set(filtered!.map(b => b.customer_id)).size;
    return { data: points, services: filtered!.length, clients, total };
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-[var(--color-text-muted)]">{t('loadingWallet')}</div>
        </div>
      </div>
    );
  }

  const chart = buildChartData();

  const handleRequestPayout = async (amount: number, bankAccountId?: string) => {
    const { data } = await wallet.requestPayout(amount, bankAccountId);
    if (data) {
      setPayouts([data, ...payouts]);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{t('title')}</h1>
        <p className="text-[var(--color-text-muted)]">{t('subtitle')}</p>
      </div>

      <BalanceOverview
        availableBalance={availableBalance}
        pendingBalance={confirmedTotal}
        totalEarnings={completedTotal}
        totalPaidOut={paidOutTotal}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EarningsByStylist employees={employees} />
        <PayoutSection
          payouts={payouts}
          availableBalance={availableBalance}
          onRequestPayout={handleRequestPayout}
        />
      </div>

      <TransactionHistory
        chartData={chart.data}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        totalServices={chart.services}
        totalClients={chart.clients}
        totalAmount={chart.total}
      />
    </div>
  );
}
