'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Clock, Coffee, UserX, Sunset, Scissors, PenLine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { BlockType } from '@/lib/api/ScheduleBlockManager';

interface BlockScheduleModalProps {
  initialDate?: string;
  onSave: (block: { block_date: string; start_time: string; end_time: string; block_type: BlockType; title?: string; notes?: string }) => void;
  onClose: () => void;
}

const BLOCK_TYPES: { key: BlockType; icon: React.ReactNode; color: string }[] = [
  { key: 'lunch', icon: <Coffee className="w-4 h-4" />, color: 'border-amber-400 bg-amber-50 text-amber-700' },
  { key: 'personal', icon: <UserX className="w-4 h-4" />, color: 'border-slate-400 bg-slate-50 text-slate-700' },
  { key: 'walk_in', icon: <Scissors className="w-4 h-4" />, color: 'border-violet-400 bg-violet-50 text-violet-700' },
  { key: 'day_off', icon: <Sunset className="w-4 h-4" />, color: 'border-rose-400 bg-rose-50 text-rose-700' },
  { key: 'custom', icon: <PenLine className="w-4 h-4" />, color: 'border-gray-400 bg-gray-50 text-gray-700' },
];

export default function BlockScheduleModal({ initialDate, onSave, onClose }: BlockScheduleModalProps) {
  const t = useTranslations('calendar');
  const today = new Date().toISOString().split('T')[0];

  const [blockDate, setBlockDate] = useState(initialDate || today);
  const [blockType, setBlockType] = useState<BlockType>('lunch');
  const [allDay, setAllDay] = useState(false);
  const [startTime, setStartTime] = useState('12:00');
  const [endTime, setEndTime] = useState('13:00');
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');

  const handleTypeChange = (type: BlockType) => {
    setBlockType(type);
    if (type === 'day_off') {
      setAllDay(true);
    } else if (type === 'lunch') {
      setAllDay(false);
      setStartTime('12:00');
      setEndTime('13:00');
    } else {
      setAllDay(false);
    }
  };

  const handleSave = () => {
    const finalStart = allDay ? '08:00' : startTime;
    const finalEnd = allDay ? '20:00' : endTime;
    const defaultTitles: Record<BlockType, string> = {
      lunch: t('blockLunch'),
      personal: t('blockPersonal'),
      walk_in: t('blockWalkIn'),
      day_off: t('blockDayOff'),
      custom: title || t('blockCustom'),
    };
    onSave({
      block_date: blockDate,
      start_time: finalStart,
      end_time: finalEnd,
      block_type: blockType,
      title: title || defaultTitles[blockType],
      notes: notes || undefined,
    });
  };

  const isValid = blockDate && (allDay || (startTime && endTime && startTime < endTime));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-[var(--color-bg-card)] rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden border border-[var(--color-border-primary)]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border-primary)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--color-bg-tertiary)] flex items-center justify-center">
              <Clock className="w-5 h-5 text-[var(--color-text-primary)]" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--color-text-primary)]">{t('blockSchedule')}</h3>
              <p className="text-xs text-[var(--color-text-muted)]">{t('blockSubtitle')}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[var(--color-bg-hover)] transition-colors">
            <X className="w-4 h-4 text-[var(--color-text-muted)]" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Block type chips */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] mb-2 block">{t('blockTypeLabel')}</label>
            <div className="flex flex-wrap gap-2">
              {BLOCK_TYPES.map((bt) => (
                <button
                  key={bt.key}
                  onClick={() => handleTypeChange(bt.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                    blockType === bt.key ? bt.color : 'bg-[var(--color-bg-tertiary)] border-[var(--color-border-primary)] text-[var(--color-text-secondary)]'
                  }`}
                >
                  {bt.icon}
                  {t(`blockType_${bt.key}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] mb-1.5 block">{t('blockDate')}</label>
            <input
              type="date"
              value={blockDate}
              onChange={(e) => setBlockDate(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
            />
          </div>

          {/* All day toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div className={`relative w-10 h-5 rounded-full transition-colors ${allDay ? 'bg-[var(--color-primary)]' : 'bg-[var(--color-bg-tertiary)] border border-[var(--color-border-primary)]'}`}
              onClick={() => { if (blockType !== 'day_off') setAllDay(!allDay); }}>
              <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${allDay ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-sm text-[var(--color-text-primary)]">{t('blockAllDay')}</span>
          </label>

          {/* Time range */}
          {!allDay && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-[var(--color-text-muted)] mb-1.5 block">{t('blockStartTime')}</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[var(--color-text-muted)] mb-1.5 block">{t('blockEndTime')}</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
                />
              </div>
            </div>
          )}

          {/* Title (for custom type) */}
          {blockType === 'custom' && (
            <div>
              <label className="text-xs font-medium text-[var(--color-text-muted)] mb-1.5 block">{t('blockTitle')}</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('blockTitlePlaceholder')}
                className="w-full rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
              />
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-muted)] mb-1.5 block">{t('blockNotes')}</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t('blockNotesPlaceholder')}
              rows={2}
              className="w-full rounded-xl border border-[var(--color-border-primary)] bg-[var(--color-bg-primary)] px-3 py-2.5 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]/50">
          <Button variant="outline" onClick={onClose} className="flex-1">{t('blockCancel')}</Button>
          <Button
            onClick={handleSave}
            disabled={!isValid}
            className="flex-1 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white disabled:opacity-40"
          >
            {t('blockSave')}
          </Button>
        </div>
      </div>
    </div>
  );
}
