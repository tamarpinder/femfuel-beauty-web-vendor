'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Wallet, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { bankAccounts as bankAccountsApi } from '@/lib/api';
import type { BankAccount } from '@/lib/api/BankAccountManager';

interface Payout {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  bank_name: string | null;
  bank_account_last4: string | null;
  requested_at: string;
}

interface PayoutSectionProps {
  payouts: Payout[];
  availableBalance: number;
  onRequestPayout: (amount: number, bankAccountId?: string) => Promise<void>;
}

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]',
  processing: 'bg-[var(--color-info)]/15 text-[var(--color-info)]',
  completed: 'bg-[var(--color-success)]/15 text-[var(--color-success)]',
  failed: 'bg-[var(--color-error)]/15 text-[var(--color-error)]',
};

export default function PayoutSection({
  payouts,
  availableBalance,
  onRequestPayout,
}: PayoutSectionProps) {
  const t = useTranslations('wallet');
  const [showForm, setShowForm] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [savedAccounts, setSavedAccounts] = useState<BankAccount[]>([]);

  useEffect(() => {
    bankAccountsApi.getByProfile().then(res => {
      const accs = res.data || [];
      setSavedAccounts(accs);
      const defaultAcc = accs.find(a => a.is_default);
      if (defaultAcc) setSelectedAccountId(defaultAcc.id);
    });
  }, []);

  const handleSubmit = async () => {
    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0 || numAmount > availableBalance) return;

    const selected = savedAccounts.find(a => a.id === selectedAccountId);
    setSubmitting(true);
    try {
      await onRequestPayout(numAmount, selectedAccountId || undefined);
      setAmount('');
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  };

  const statusLabel = (status: string) => {
    const map: Record<string, string> = {
      pending: t('payoutPending'),
      processing: t('payoutProcessing'),
      completed: t('payoutCompleted'),
      failed: t('payoutFailed'),
    };
    return map[status] || status;
  };

  return (
    <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-[var(--color-primary)]" />
            {t('payouts')}
          </CardTitle>
          <Button onClick={() => setShowForm(!showForm)} disabled={availableBalance <= 0}>
            <DollarSign className="h-4 w-4 mr-2" />
            {t('requestPayout')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showForm && (
          <div className="mb-6 p-4 border border-[var(--color-border-primary)] rounded-xl space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                {t('payoutAmount')}
              </label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Max: RD$${availableBalance.toLocaleString()}`}
                max={availableBalance}
              />
            </div>

            {savedAccounts.length > 0 ? (
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">
                  {t('selectBankAccount')}
                </label>
                <select
                  value={selectedAccountId}
                  onChange={e => setSelectedAccountId(e.target.value)}
                  className="w-full h-10 px-3 border border-[var(--color-border-primary)] rounded-lg bg-[var(--color-bg-card)] text-[var(--color-text-primary)]"
                >
                  {savedAccounts.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.bank_name} ****{acc.account_number_last4} ({acc.account_holder})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p className="text-sm text-[var(--color-text-muted)]">{t('noBankAccountsHint')}</p>
            )}

            <Button onClick={handleSubmit} disabled={submitting || !amount || Number(amount) <= 0}>
              {t('requestPayoutButton')}
            </Button>
          </div>
        )}

        {payouts.length === 0 ? (
          <div className="text-center py-8">
            <Wallet className="h-12 w-12 text-[var(--color-text-muted)] mx-auto mb-4" />
            <p className="text-[var(--color-text-muted)]">{t('noPayouts')}</p>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">{t('noPayoutsHint')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {payouts.map((payout) => (
              <div key={payout.id} className="flex items-center justify-between p-4 border border-[var(--color-border-primary)] rounded-xl">
                <div>
                  <p className="font-semibold text-[var(--color-text-primary)]">
                    RD${payout.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {new Date(payout.requested_at).toLocaleDateString()}
                    {payout.bank_name && ` · ${payout.bank_name}`}
                    {payout.bank_account_last4 && ` ****${payout.bank_account_last4}`}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[payout.status]}`}>
                  {statusLabel(payout.status)}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
