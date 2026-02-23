'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context'
import { profiles } from '@/lib/api'
import { SERVICE_CATEGORY_COLORS } from '@/lib/constants'
import { useTranslations } from 'next-intl'
import ProfileHeader from '@/components/profile/ProfileHeader'
import GalleryTab from '@/components/profile/GalleryTab'
import TeamTab from '@/components/profile/TeamTab'

type TabKey = 'info' | 'business' | 'gallery' | 'hours' | 'team'

export default function ProfilePage() {
  const { profile } = useAuth()
  const t = useTranslations('profile')
  const tCat = useTranslations('serviceCategories')
  const tCommon = useTranslations('common')
  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState<TabKey>('info')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    full_name: '',
    business_name: '',
    phone: '',
    address: '',
    description: '',
    instagram: '',
    facebook: '',
    whatsapp: '',
    service_categories: [] as string[],
  })

  const [businessHours, setBusinessHours] = useState({
    monday: { open: '9:00', close: '18:00', closed: false },
    tuesday: { open: '9:00', close: '18:00', closed: false },
    wednesday: { open: '9:00', close: '18:00', closed: false },
    thursday: { open: '9:00', close: '18:00', closed: false },
    friday: { open: '9:00', close: '18:00', closed: false },
    saturday: { open: '9:00', close: '16:00', closed: false },
    sunday: { open: '10:00', close: '14:00', closed: true },
  })

  const loadProfile = useCallback(async () => {
    const { data } = await profiles.getVendor()
    if (!data) return
    setFormData({
      full_name: `${data.first_name} ${data.last_name}`,
      business_name: data.business_name || '',
      phone: data.phone || '',
      address: [data.address, data.district, data.city].filter(Boolean).join(', '),
      description: data.description || '',
      instagram: data.instagram || '',
      facebook: data.facebook || '',
      whatsapp: data.whatsapp || '',
      service_categories: data.service_categories || [],
    })
    setAvatarUrl(data.logo_url || data.avatar_url || null)
    setCoverImageUrl(data.cover_image_url || null)
    if (data.business_hours) {
      setBusinessHours(prev => ({ ...prev, ...data.business_hours as typeof prev }))
    }
  }, [])

  useEffect(() => {
    if (profile?.id) loadProfile()
  }, [profile?.id, loadProfile])

  const handleSave = async () => {
    setSaving(true)
    try {
      const { error } = await profiles.update({
        business_name: formData.business_name,
        phone: formData.phone,
        description: formData.description,
        instagram: formData.instagram,
        facebook: formData.facebook,
        whatsapp: formData.whatsapp,
        service_categories: formData.service_categories,
        business_hours: businessHours,
      })
      if (!error) setIsEditing(false)
    } finally {
      setSaving(false)
    }
  }

  const handleCategoryToggle = (categoryKey: string) => {
    setFormData(prev => ({
      ...prev,
      service_categories: prev.service_categories.includes(categoryKey)
        ? prev.service_categories.filter(c => c !== categoryKey)
        : [...prev.service_categories, categoryKey],
    }))
  }

  const dayKeys = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'info', label: t('tabInfo') },
    { key: 'business', label: t('tabBusiness') },
    { key: 'gallery', label: t('tabGallery') },
    { key: 'hours', label: t('tabHours') },
    { key: 'team', label: t('tabTeam') },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{t('title')}</h1>
          <p className="text-[var(--color-text-muted)]">{t('subtitle')}</p>
        </div>
        <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)} disabled={saving}>
          {saving ? tCommon('loading') : isEditing ? t('save') : t('edit')}
        </Button>
      </div>

      <ProfileHeader
        businessName={profile?.business_name || profile?.full_name || ''}
        email={profile?.email || ''}
        isApproved={profile?.is_approved ?? false}
        rating={profile?.rating || 0}
        totalReviews={profile?.total_reviews || 0}
        avatarUrl={avatarUrl}
        coverImageUrl={coverImageUrl}
        onAvatarChange={setAvatarUrl}
        onCoverChange={setCoverImageUrl}
      />

      {/* Tab navigation */}
      <div className="border-b border-[var(--color-border-primary)]">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
              }`}>{tab.label}</button>
          ))}
        </nav>
      </div>

      {/* Info Tab */}
      {activeTab === 'info' && (
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardHeader><CardTitle>{t('tabInfo')}</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">{t('fullName')}</label>
                <Input value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">{t('phone')}</label>
                <Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} disabled={!isEditing} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">{t('address')}</label>
                <Input value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} disabled={!isEditing} />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Business Tab */}
      {activeTab === 'business' && (
        <div className="space-y-6">
          <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
            <CardHeader><CardTitle>{t('businessInfo')}</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">{t('businessName')}</label>
                <Input value={formData.business_name} onChange={e => setFormData({ ...formData, business_name: e.target.value })} disabled={!isEditing} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">{t('businessDescription')}</label>
                <textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}
                  disabled={!isEditing} rows={4}
                  className="w-full px-3 py-2 border border-[var(--color-border-primary)] rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] disabled:bg-[var(--color-bg-tertiary)] bg-[var(--color-bg-card)] text-[var(--color-text-primary)]"
                  placeholder={t('businessDescriptionPlaceholder')} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">{t('instagram')}</label>
                  <Input value={formData.instagram} onChange={e => setFormData({ ...formData, instagram: e.target.value })} disabled={!isEditing} placeholder={t('instagramPlaceholder')} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">{t('facebook')}</label>
                  <Input value={formData.facebook} onChange={e => setFormData({ ...formData, facebook: e.target.value })} disabled={!isEditing} placeholder={t('facebookPlaceholder')} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">{t('whatsapp')}</label>
                  <Input value={formData.whatsapp} onChange={e => setFormData({ ...formData, whatsapp: e.target.value })} disabled={!isEditing} placeholder={t('whatsappPlaceholder')} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
            <CardHeader><CardTitle>{t('serviceCategories')}</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.keys(SERVICE_CATEGORY_COLORS).map((key) => (
                  <label key={key} className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                    formData.service_categories.includes(key) ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                      : 'border-[var(--color-border-primary)] hover:bg-[var(--color-bg-hover)]'
                  } ${!isEditing ? 'cursor-not-allowed opacity-60' : ''}`}>
                    <input type="checkbox" checked={formData.service_categories.includes(key)}
                      onChange={() => handleCategoryToggle(key)} disabled={!isEditing}
                      className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                    <span className="text-sm font-medium">{tCat(key)}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Gallery Tab */}
      {activeTab === 'gallery' && (
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardHeader><CardTitle>{t('gallery')}</CardTitle></CardHeader>
          <CardContent>
            <GalleryTab />
          </CardContent>
        </Card>
      )}

      {/* Hours Tab */}
      {activeTab === 'hours' && (
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardHeader><CardTitle>{t('businessHours')}</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dayKeys.map((day) => {
                const hours = businessHours[day]
                return (
                  <div key={day} className="flex items-center justify-between p-4 border border-[var(--color-border-primary)] rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-24"><span className="font-medium text-[var(--color-text-primary)]">{t(day)}</span></div>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" checked={!hours.closed}
                          onChange={e => { if (isEditing) setBusinessHours({ ...businessHours, [day]: { ...hours, closed: !e.target.checked } }) }}
                          disabled={!isEditing} className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                        <span className="text-sm text-[var(--color-text-muted)]">{tCommon('open')}</span>
                      </label>
                    </div>
                    {!hours.closed ? (
                      <div className="flex items-center space-x-2">
                        <Input type="time" value={hours.open}
                          onChange={e => { if (isEditing) setBusinessHours({ ...businessHours, [day]: { ...hours, open: e.target.value } }) }}
                          disabled={!isEditing} className="w-24" />
                        <span className="text-[var(--color-text-muted)]">-</span>
                        <Input type="time" value={hours.close}
                          onChange={e => { if (isEditing) setBusinessHours({ ...businessHours, [day]: { ...hours, close: e.target.value } }) }}
                          disabled={!isEditing} className="w-24" />
                      </div>
                    ) : (
                      <span className="text-[var(--color-text-muted)] italic">{tCommon('closed')}</span>
                    )}
                  </div>
                )
              })}
            </div>
            <p className="text-sm text-[var(--color-text-muted)] mt-4">{t('businessHoursHint')}</p>
          </CardContent>
        </Card>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && <TeamTab />}
    </div>
  )
}
