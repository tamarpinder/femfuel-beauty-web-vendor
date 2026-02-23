'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Scissors, Clock, DollarSign, Users } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { bookings, services } from '@/lib/api';
import { formatCurrency } from '@/lib/utils';
import StatCard from '@/components/dashboard/StatCard';
import VendorOverview from '@/components/dashboard/VendorOverview';
import RecentBookings from '@/components/dashboard/RecentBookings';
import QuickActions from '@/components/dashboard/QuickActions';
import PerformanceOverview from '@/components/dashboard/PerformanceOverview';

export default function DashboardPage() {
  const { profile } = useAuth();
  const router = useRouter();
  const t = useTranslations('dashboard');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalServices: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalBookings: 0,
    monthlyEarnings: 0,
    totalClients: 0,
    averageRating: 0,
  });
  const [recentBookings, setRecentBookings] = useState<{
    id: string;
    clientName: string;
    service: string;
    date: string;
    time: string;
    status: string;
    price: number;
  }[]>([]);

  const fetchDashboardData = useCallback(async () => {
    if (!profile?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), 10000)
      );

      const [bookingsResponse, servicesResponse] = await Promise.race([
        Promise.all([
          bookings.getByVendor(),
          services.getByVendor()
        ]),
        timeoutPromise
      ]);

      if (bookingsResponse.error || servicesResponse.error) {
        console.error('Error fetching dashboard data:', {
          bookingsError: bookingsResponse.error,
          servicesError: servicesResponse.error,
        });
        return;
      }

      const allBookings = bookingsResponse.data || [];
      const allServices = servicesResponse.data || [];

      const pendingBookings = allBookings.filter(b => b.status === 'pending').length;
      const completedBookings = allBookings.filter(b => b.status === 'completed').length;
      const totalClients = new Set(allBookings.map(b => b.customer_id)).size;

      const currentMonth = new Date();
      const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const monthlyEarnings = allBookings
        .filter(b => b.status === 'completed' && new Date(b.created_at) >= monthStart)
        .reduce((sum, b) => sum + (b.total_amount || 0), 0);

      setStats({
        totalServices: allServices.length,
        pendingBookings,
        completedBookings,
        totalBookings: allBookings.length,
        monthlyEarnings,
        totalClients,
        averageRating: profile?.rating || 0,
      });

      const recent = allBookings
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 3)
        .map(booking => ({
          id: booking.id,
          clientName: booking.profiles?.first_name && booking.profiles?.last_name
            ? `${booking.profiles.first_name} ${booking.profiles.last_name}`
            : 'Cliente',
          service: booking.services?.name || 'Servicio',
          date: new Date(booking.scheduled_date).toISOString().split('T')[0],
          time: new Date(booking.scheduled_date).toLocaleTimeString('es-DO', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
          }),
          status: booking.status,
          price: booking.total_amount || 0
        }));

      setRecentBookings(recent);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setStats({
        totalServices: 0,
        pendingBookings: 0,
        completedBookings: 0,
        totalBookings: 0,
        monthlyEarnings: 0,
        totalClients: 0,
        averageRating: 0,
      });
      setRecentBookings([]);
    } finally {
      setLoading(false);
    }
  }, [profile?.id, profile?.rating]);

  useEffect(() => {
    if (profile?.id) {
      fetchDashboardData();
    }
  }, [profile?.id, fetchDashboardData]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto mb-4" />
            <div className="text-lg text-[var(--color-text-muted)]">{t('loadingDashboard')}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <VendorOverview businessName={
        profile?.business_name || profile?.full_name || t('welcome')
      } />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={t('totalServices')}
          value={String(stats.totalServices)}
          description={t('activeServices')}
          icon={Scissors}
        />
        <StatCard
          title={t('pendingBookings')}
          value={String(stats.pendingBookings)}
          description={t('requireAttention')}
          icon={Clock}
        />
        <StatCard
          title={t('monthlyEarnings')}
          value={formatCurrency(stats.monthlyEarnings)}
          description={t('thisMonth')}
          icon={DollarSign}
        />
        <StatCard
          title={t('totalClients')}
          value={String(stats.totalClients)}
          description={t('uniqueClients')}
          icon={Users}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-stretch">
        <div className="xl:col-span-2">
          <RecentBookings
            bookings={recentBookings}
            onViewAll={() => router.push('/dashboard/bookings')}
          />
        </div>
        <QuickActions onNavigate={(path) => router.push(path)} />
      </div>

      {/* Performance Overview */}
      <PerformanceOverview
        averageRating={stats.averageRating}
        completedBookings={stats.completedBookings}
        totalBookings={stats.totalBookings}
      />
    </div>
  );
}
