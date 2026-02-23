'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { gallery, storage } from '@/lib/api'
import type { GalleryRow } from '@/lib/api/VendorGalleryManager'

export default function GalleryTab() {
  const t = useTranslations('profile')
  const tCommon = useTranslations('common')
  const [items, setItems] = useState<GalleryRow[]>([])
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    loadGallery()
  }, [])

  const loadGallery = async () => {
    const { data } = await gallery.getByVendor()
    setItems(data || [])
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const { data: url } = await storage.upload('gallery', file)
      if (url) {
        const { data: item } = await gallery.add(url)
        if (item) setItems(prev => [...prev, item])
      }
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDelete = async (item: GalleryRow) => {
    await storage.delete(item.image_url)
    const { error } = await gallery.delete(item.id)
    if (!error) {
      setItems(prev => prev.filter(g => g.id !== item.id))
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Upload trigger */}
        <div
          className="aspect-square border-2 border-dashed border-[var(--color-border-primary)] rounded-lg flex items-center justify-center hover:border-[var(--color-primary)] transition-colors cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="text-center">
            <span className="text-2xl text-[var(--color-text-muted)]">+</span>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              {uploading ? tCommon('loading') : t('uploadPhoto')}
            </p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
        </div>

        {/* Gallery items */}
        {items.map((item) => (
          <div key={item.id} className="aspect-square rounded-lg overflow-hidden relative group">
            <img
              src={item.image_url}
              alt={item.caption || ''}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                size="sm"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-black"
                onClick={() => handleDelete(item)}
              >
                <Trash2 className="w-4 h-4 mr-1" />
                {tCommon('delete')}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-muted)]">{t('galleryHint')}</p>
    </div>
  )
}
