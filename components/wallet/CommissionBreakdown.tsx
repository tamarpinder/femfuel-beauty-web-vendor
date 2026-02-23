'use client';

import { useTranslations } from 'next-intl';
import { PieChart, Briefcase, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CommissionBreakdownProps {
  totalRevenue: number;
  commissionRate: number;
  stylistShare: number;
  salonShare: number;
  completedServices: number;
}

export default function CommissionBreakdown({
  totalRevenue,
  commissionRate,
  stylistShare,
  salonShare,
  completedServices,
}: CommissionBreakdownProps) {
  const t = useTranslations('wallet');
  const salonRate = 100 - commissionRate;

  return (
    <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-[var(--color-primary)]" />
          {t('commissionBreakdown')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Total revenue */}
        <div className="text-center">
          <p className="text-sm text-[var(--color-text-muted)]">{t('totalGenerated')}</p>
          <p className="text-3xl font-bold text-[var(--color-text-primary)]">
            RD${totalRevenue.toLocaleString()}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            {completedServices} {t('services')}
          </p>
        </div>

        {/* Visual split bar */}
        <div className="space-y-2">
          <div className="flex rounded-full h-4 overflow-hidden">
            <div
              className="bg-[var(--color-primary)] transition-all duration-500"
              style={{ width: `${commissionRate}%` }}
            />
            <div
              className="bg-[var(--color-text-muted)]/30 transition-all duration-500"
              style={{ width: `${salonRate}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-[var(--color-text-muted)]">
            <span>{t('youLabel')} {commissionRate}%</span>
            <span>{t('salonLabel')} {salonRate}%</span>
          </div>
        </div>

        {/* Two share cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-[var(--color-primary)]/10 text-center">
            <Briefcase className="h-5 w-5 text-[var(--color-primary)] mx-auto mb-2" />
            <p className="text-xs text-[var(--color-text-muted)]">{t('yourShare')}</p>
            <p className="text-xl font-bold text-[var(--color-primary)]">
              RD${stylistShare.toLocaleString()}
            </p>
          </div>
          <div className="p-4 rounded-xl bg-[var(--color-text-muted)]/10 text-center">
            <Building2 className="h-5 w-5 text-[var(--color-text-muted)] mx-auto mb-2" />
            <p className="text-xs text-[var(--color-text-muted)]">{t('salonCut')}</p>
            <p className="text-xl font-bold text-[var(--color-text-secondary)]">
              RD${salonShare.toLocaleString()}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
