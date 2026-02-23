"use client";

import { useTranslations, useLocale } from 'next-intl';

interface VendorOverviewProps {
  businessName: string;
}

export default function VendorOverview({ businessName }: VendorOverviewProps) {
  const t = useTranslations('dashboard');
  const locale = useLocale();

  const today = new Date().toLocaleDateString(locale === 'es' ? 'es-DO' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-light)] rounded-[20px] px-6 py-4 text-white">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {t('welcomeName', { name: businessName })}
        </h2>
        <span className="text-sm opacity-80 capitalize">{today}</span>
      </div>
    </div>
  );
}
