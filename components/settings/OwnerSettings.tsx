'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/contexts/auth-context'
import { Bell, Shield, User, Building, Landmark, Trash2, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { bankAccounts } from '@/lib/api'
import type { BankAccount } from '@/lib/api/BankAccountManager'

export default function OwnerSettings() {
  const { profile } = useAuth()
  const t = useTranslations('settings')
  const tCommon = useTranslations('common')

  const [notifications, setNotifications] = useState({
    email: true, sms: true, bookings: true, marketing: false,
  })
  const [accounts, setAccounts] = useState<BankAccount[]>([])
  const [showBankForm, setShowBankForm] = useState(false)
  const [bankForm, setBankForm] = useState({ bank_name: '', account_holder: '', account_number_last4: '', account_type: 'checking' })
  const [savingBank, setSavingBank] = useState(false)

  useEffect(() => {
    bankAccounts.getByProfile().then(res => setAccounts(res.data || []))
  }, [])

  const handleAddBank = async () => {
    if (!bankForm.bank_name || !bankForm.account_holder || !bankForm.account_number_last4) return
    setSavingBank(true)
    try {
      const { data } = await bankAccounts.create({ ...bankForm, is_default: accounts.length === 0 })
      if (data) {
        setAccounts(prev => [...prev, data])
        setBankForm({ bank_name: '', account_holder: '', account_number_last4: '', account_type: 'checking' })
        setShowBankForm(false)
      }
    } finally { setSavingBank(false) }
  }

  const handleDeleteBank = async (id: string) => {
    const { error } = await bankAccounts.delete(id)
    if (!error) setAccounts(prev => prev.filter(a => a.id !== id))
  }

  const handleSetDefault = async (id: string) => {
    const { error } = await bankAccounts.setDefault(id)
    if (!error) setAccounts(prev => prev.map(a => ({ ...a, is_default: a.id === id })))
  }

  if (!profile) return <div>{tCommon('loading')}</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)]">{t('title')}</h1>
        <p className="text-[var(--color-text-muted)]">{t('subtitle')}</p>
      </div>

      <div className="grid gap-6">
        {/* Account Info */}
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><User className="h-5 w-5" />{t('accountInfo')}</CardTitle>
            <CardDescription>{t('accountInfoDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label htmlFor="full_name">{t('fullName')}</Label><Input id="full_name" defaultValue={profile.full_name} /></div>
              <div className="space-y-2"><Label htmlFor="email">{t('email')}</Label><Input id="email" type="email" defaultValue={profile.email} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label htmlFor="phone">{t('phone')}</Label><Input id="phone" defaultValue={profile.phone || ''} /></div>
              <div className="space-y-2"><Label htmlFor="address">{t('address')}</Label><Input id="address" defaultValue={profile.address || ''} /></div>
            </div>
          </CardContent>
        </Card>

        {/* Business Info */}
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Building className="h-5 w-5" />{t('businessInfo')}</CardTitle>
            <CardDescription>{t('businessInfoDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label htmlFor="business_name">{t('businessName')}</Label><Input id="business_name" defaultValue={profile.business_name || ''} /></div>
            <div className="space-y-2"><Label htmlFor="business_description">{t('businessDescription')}</Label><Textarea id="business_description" placeholder={t('businessDescriptionPlaceholder')} rows={3} /></div>
            <Button>{t('saveChanges')}</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" />{t('notifications')}</CardTitle>
            <CardDescription>{t('notificationsDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5"><Label>{t('emailNotifications')}</Label><p className="text-sm text-[var(--color-text-muted)]">{t('emailNotificationsDesc')}</p></div>
              <Switch checked={notifications.email} onCheckedChange={v => setNotifications(p => ({ ...p, email: v }))} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5"><Label>{t('smsNotifications')}</Label><p className="text-sm text-[var(--color-text-muted)]">{t('smsNotificationsDesc')}</p></div>
              <Switch checked={notifications.sms} onCheckedChange={v => setNotifications(p => ({ ...p, sms: v }))} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5"><Label>{t('bookingNotifications')}</Label><p className="text-sm text-[var(--color-text-muted)]">{t('bookingNotificationsDesc')}</p></div>
              <Switch checked={notifications.bookings} onCheckedChange={v => setNotifications(p => ({ ...p, bookings: v }))} />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5"><Label>{t('marketingNotifications')}</Label><p className="text-sm text-[var(--color-text-muted)]">{t('marketingNotificationsDesc')}</p></div>
              <Switch checked={notifications.marketing} onCheckedChange={v => setNotifications(p => ({ ...p, marketing: v }))} />
            </div>
          </CardContent>
        </Card>

        {/* Bank Accounts */}
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2"><Landmark className="h-5 w-5" />{t('bankAccounts')}</CardTitle>
              <Button size="sm" onClick={() => setShowBankForm(!showBankForm)}>{t('addBank')}</Button>
            </div>
            <CardDescription>{t('bankAccountsDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {showBankForm && (
              <div className="p-4 border border-[var(--color-border-primary)] rounded-xl space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1"><Label>{t('bankNameLabel')}</Label><Input value={bankForm.bank_name} onChange={e => setBankForm(p => ({ ...p, bank_name: e.target.value }))} placeholder="Banreservas" /></div>
                  <div className="space-y-1"><Label>{t('accountHolder')}</Label><Input value={bankForm.account_holder} onChange={e => setBankForm(p => ({ ...p, account_holder: e.target.value }))} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1"><Label>{t('accountLast4')}</Label><Input value={bankForm.account_number_last4} onChange={e => setBankForm(p => ({ ...p, account_number_last4: e.target.value }))} maxLength={4} placeholder="8932" /></div>
                  <div className="space-y-1">
                    <Label>{t('accountType')}</Label>
                    <select value={bankForm.account_type} onChange={e => setBankForm(p => ({ ...p, account_type: e.target.value }))} className="w-full h-10 px-3 border border-[var(--color-border-primary)] rounded-lg bg-[var(--color-bg-card)] text-[var(--color-text-primary)]">
                      <option value="checking">{t('checking')}</option>
                      <option value="savings">{t('savings')}</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setShowBankForm(false)}>{tCommon('cancel')}</Button>
                  <Button onClick={handleAddBank} disabled={savingBank}>{savingBank ? tCommon('loading') : tCommon('add')}</Button>
                </div>
              </div>
            )}

            {accounts.length === 0 && !showBankForm && (
              <p className="text-center text-[var(--color-text-muted)] py-4">{t('noBankAccounts')}</p>
            )}

            {accounts.map(acc => (
              <div key={acc.id} className="flex items-center justify-between p-3 border border-[var(--color-border-primary)] rounded-xl">
                <div>
                  <p className="font-medium text-[var(--color-text-primary)]">{acc.bank_name} ****{acc.account_number_last4}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{acc.account_holder} · {acc.account_type}</p>
                </div>
                <div className="flex items-center gap-2">
                  {acc.is_default ? (
                    <span className="px-2 py-0.5 text-xs bg-[var(--color-success)]/15 text-[var(--color-success)] rounded-full font-medium">
                      <Star className="w-3 h-3 inline mr-1" />{t('defaultLabel')}
                    </span>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => handleSetDefault(acc.id)}>{t('setDefault')}</Button>
                  )}
                  <button onClick={() => handleDeleteBank(acc.id)} className="p-1.5 hover:bg-[var(--color-error)]/10 rounded-lg">
                    <Trash2 className="w-4 h-4 text-[var(--color-error)]" />
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5" />{t('security')}</CardTitle>
            <CardDescription>{t('securityDesc')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">{t('changePassword')}</Button>
            <Button variant="outline" className="w-full">{t('enable2FA')}</Button>
            <Separator />
            <div className="pt-4">
              <Button variant="destructive" className="w-full">{t('deactivateAccount')}</Button>
              <p className="text-xs text-[var(--color-text-muted)] mt-2 text-center">{t('deactivateAccountDesc')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
