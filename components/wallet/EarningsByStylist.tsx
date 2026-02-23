'use client';

import { useTranslations } from 'next-intl';
import { Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EmployeeEarning {
  professional_id: string | null;
  professional_name: string;
  total_earnings: number;
  completed_services: number;
}

interface EarningsByStylistProps {
  employees: EmployeeEarning[];
}

export default function EarningsByStylist({ employees }: EarningsByStylistProps) {
  const t = useTranslations('wallet');

  const maxEarnings = Math.max(...employees.map(e => e.total_earnings), 1);

  return (
    <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-[var(--color-primary)]" />
          {t('earningsByStylist')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {employees.length === 0 ? (
            <p className="text-center text-[var(--color-text-muted)] py-4">
              {t('noTransactions')}
            </p>
          ) : (
            employees.map((employee, index) => {
              const percentage = (employee.total_earnings / maxEarnings) * 100;
              const isOwner = employee.professional_name === 'owner';
              const displayName = isOwner ? t('owner') : employee.professional_name;

              return (
                <div key={employee.professional_id || 'owner'} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)]">{displayName}</p>
                        <p className="text-xs text-[var(--color-text-muted)]">
                          {employee.completed_services} {t('services')}
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-[var(--color-text-primary)]">
                      RD${employee.total_earnings.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-[var(--color-border-primary)] rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
