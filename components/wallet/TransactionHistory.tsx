'use client';

import { useTranslations } from 'next-intl';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartDataPoint {
  label: string;
  amount: number;
  services: number;
}

interface TransactionHistoryProps {
  chartData: ChartDataPoint[];
  selectedPeriod: 'week' | 'month' | 'year';
  onPeriodChange: (period: 'week' | 'month' | 'year') => void;
  totalServices: number;
  totalClients: number;
  totalAmount: number;
}

export default function TransactionHistory({
  chartData,
  selectedPeriod,
  onPeriodChange,
  totalServices,
  totalClients,
  totalAmount,
}: TransactionHistoryProps) {
  const t = useTranslations('wallet');

  const periods = [
    { key: 'week' as const, label: t('weekLabel') },
    { key: 'month' as const, label: t('monthLabel') },
    { key: 'year' as const, label: t('yearLabel') },
  ];

  const periodLabel = selectedPeriod === 'week' ? t('day')
    : selectedPeriod === 'month' ? t('weekLabel') : t('monthLabel');

  const maxAmount = Math.max(...chartData.map(d => d.amount), 1);

  const avgPerService = totalServices > 0 ? Math.round(totalAmount / totalServices) : 0;
  const avgPerClient = totalClients > 0 ? Math.round(totalAmount / totalClients) : 0;

  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-[var(--color-info)]">{totalServices}</div>
            <p className="text-sm text-[var(--color-text-muted)]">{t('servicesCompleted')}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              {t('avgPerService', { amount: avgPerService.toLocaleString() })}
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">{totalClients}</div>
            <p className="text-sm text-[var(--color-text-muted)]">{t('clientsServed')}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              {t('avgPerClient', { amount: avgPerClient.toLocaleString() })}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[var(--color-primary)]" />
              {t('revenueByPeriod', { period: periodLabel })}
            </CardTitle>
            <div className="flex rounded-lg border border-[var(--color-border-primary)] overflow-hidden">
              {periods.map((period) => (
                <button
                  key={period.key}
                  onClick={() => onPeriodChange(period.key)}
                  className={`px-3 py-1 text-sm font-medium transition-colors ${
                    selectedPeriod === period.key
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-bg-card)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {chartData.map((item, index) => {
              const percentage = maxAmount > 0 ? (item.amount / maxAmount) * 100 : 0;
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium text-[var(--color-text-muted)]">
                    {item.label}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-[var(--color-text-primary)]">
                        RD${item.amount.toLocaleString()}
                      </span>
                      <span className="text-xs text-[var(--color-text-muted)]">
                        {item.services} {t('services')}
                      </span>
                    </div>
                    <div className="w-full bg-[var(--color-border-primary)] rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
