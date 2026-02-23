'use client';

import { useTranslations } from 'next-intl';
import { DollarSign, Clock, TrendingUp, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BalanceOverviewProps {
  availableBalance: number;
  pendingBalance: number;
  totalEarnings: number;
  totalPaidOut: number;
}

export default function BalanceOverview({
  availableBalance,
  pendingBalance,
  totalEarnings,
  totalPaidOut,
}: BalanceOverviewProps) {
  const t = useTranslations('wallet');

  const cards = [
    {
      title: t('availableBalance'),
      value: availableBalance,
      icon: DollarSign,
      color: 'var(--color-success)',
    },
    {
      title: t('pendingBalance'),
      value: pendingBalance,
      icon: Clock,
      color: 'var(--color-warning)',
    },
    {
      title: t('totalEarnings'),
      value: totalEarnings,
      icon: TrendingUp,
      color: 'var(--color-info)',
    },
    {
      title: t('totalPaidOut'),
      value: totalPaidOut,
      icon: CreditCard,
      color: 'var(--color-primary)',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.title} className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[var(--color-text-muted)] flex items-center gap-2">
              <card.icon className="h-4 w-4" style={{ color: card.color }} />
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" style={{ color: card.color }}>
              RD${card.value.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
