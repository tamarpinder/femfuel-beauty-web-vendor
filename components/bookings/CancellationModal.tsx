'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, AlertTriangle } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface CancellationModalProps {
  bookingId: string;
  clientName: string;
  serviceName: string;
  onConfirm: (bookingId: string, reason: string) => void;
  onClose: () => void;
}

const PRESET_REASONS_ES = [
  'Conflicto de horario',
  'Estilista no disponible',
  'Cliente no respondió a confirmación',
  'Producto o material no disponible',
];

const PRESET_REASONS_EN = [
  'Schedule conflict',
  'Stylist unavailable',
  'Client did not respond to confirmation',
  'Product or material unavailable',
];

export default function CancellationModal({
  bookingId,
  clientName,
  serviceName,
  onConfirm,
  onClose,
}: CancellationModalProps) {
  const t = useTranslations('bookings');
  const locale = useLocale();
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState('');

  const presets = locale === 'en' ? PRESET_REASONS_EN : PRESET_REASONS_ES;
  const finalReason = selectedPreset || customReason.trim();

  const handlePresetClick = (preset: string) => {
    setSelectedPreset(selectedPreset === preset ? null : preset);
    if (selectedPreset !== preset) setCustomReason('');
  };

  const handleCustomChange = (value: string) => {
    setCustomReason(value);
    setSelectedPreset(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-[var(--color-bg-card)] rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-[var(--color-border-primary)]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border-primary)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-error)]/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[var(--color-error)]" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text-primary)]">{t('cancelBookingTitle')}</h3>
              <p className="text-xs text-[var(--color-text-muted)]">{clientName} — {serviceName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
            <X className="w-4 h-4 text-[var(--color-text-muted)]" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <p className="text-sm text-[var(--color-text-secondary)]">
            {t('cancelReasonPrompt')}
          </p>

          {/* Preset reason chips */}
          <div className="flex flex-wrap gap-2">
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => handlePresetClick(preset)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                  selectedPreset === preset
                    ? 'bg-[var(--color-error)]/10 border-[var(--color-error)] text-[var(--color-error)]'
                    : 'bg-[var(--color-bg-tertiary)] border-[var(--color-border-primary)] text-[var(--color-text-secondary)] hover:border-[var(--color-error)]/50'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Custom reason textarea */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] mb-1.5 block">
              {t('cancelReasonCustom')}
            </label>
            <textarea
              value={customReason}
              onChange={(e) => handleCustomChange(e.target.value)}
              placeholder={t('cancelReasonPlaceholder')}
              rows={3}
              className="w-full rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-error)]/30 focus:border-[var(--color-error)] resize-none transition-all"
            />
          </div>

          {/* Info note */}
          <p className="text-xs text-[var(--color-text-muted)] italic">
            {t('cancelReasonNote')}
          </p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]/50">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            {t('cancelModalBack')}
          </Button>
          <Button
            onClick={() => onConfirm(bookingId, finalReason)}
            disabled={!finalReason}
            className="flex-1 bg-[var(--color-error)] hover:bg-[var(--color-error)]/90 text-white disabled:opacity-40"
          >
            {t('cancelModalConfirm')}
          </Button>
        </div>
      </div>
    </div>
  );
}
