'use client'

import React, { useRef } from 'react'
import { Camera } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { storage, profiles } from '@/lib/api'

interface ProfileHeaderProps {
  businessName: string
  email: string
  isApproved: boolean
  rating: number
  totalReviews: number
  avatarUrl: string | null
  coverImageUrl: string | null
  onAvatarChange: (url: string) => void
  onCoverChange: (url: string) => void
}

export default function ProfileHeader({
  businessName,
  email,
  isApproved,
  rating,
  totalReviews,
  avatarUrl,
  coverImageUrl,
  onAvatarChange,
  onCoverChange,
}: ProfileHeaderProps) {
  const t = useTranslations('profile')
  const coverInputRef = useRef<HTMLInputElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const { data: url } = await storage.upload('cover', file)
    if (url) {
      await profiles.update({ cover_image_url: url })
      onCoverChange(url)
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const { data: url } = await storage.upload('logo', file)
    if (url) {
      await profiles.update({ logo_url: url })
      onAvatarChange(url)
    }
  }

  return (
    <div className="relative rounded-[20px] overflow-hidden bg-[var(--color-bg-card)]">
      {/* Cover */}
      <div
        className="h-40 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] relative cursor-pointer"
        onClick={() => coverInputRef.current?.click()}
        style={coverImageUrl ? { backgroundImage: `url(${coverImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
      >
        <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-sm font-medium flex items-center gap-2">
            <Camera className="w-4 h-4" /> {t('changeCover')}
          </span>
        </div>
        <input ref={coverInputRef} type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
      </div>

      {/* Avatar + Info */}
      <div className="px-6 pb-6 -mt-10 flex items-end gap-4">
        <div
          className="relative w-20 h-20 rounded-full border-4 border-[var(--color-bg-card)] cursor-pointer shrink-0"
          onClick={() => logoInputRef.current?.click()}
        >
          {avatarUrl ? (
            <img src={avatarUrl} alt={businessName} className="w-full h-full rounded-full object-cover" />
          ) : (
            <div className="w-full h-full rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-2xl font-bold">
              {businessName?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="absolute inset-0 rounded-full bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <Camera className="w-4 h-4 text-white" />
          </div>
          <input ref={logoInputRef} type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
        </div>
        <div className="flex-1 pt-12">
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">{businessName}</h2>
          <p className="text-[var(--color-text-muted)]">{email}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isApproved ? 'bg-[var(--color-success)]/15 text-[var(--color-success)]'
                : 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]'
            }`}>{isApproved ? t('accountApproved') : t('pendingApproval')}</span>
            {rating > 0 && (
              <span className="px-3 py-1 bg-[var(--color-info)]/15 text-[var(--color-info)] rounded-full text-xs font-medium">
                {rating.toFixed(1)} ({totalReviews} {t('reviews')})
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
