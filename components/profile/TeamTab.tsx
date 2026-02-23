'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Plus, Pencil, Trash2, X, Camera } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { employees, storage } from '@/lib/api'
import type { EmployeeRow } from '@/lib/api/VendorEmployeeManager'

interface EmployeeFormData {
  name: string
  position: string
  specialties: string
  phone: string
  email: string
  bio: string
  commission_rate: string
}

const EMPTY_FORM: EmployeeFormData = {
  name: '', position: '', specialties: '', phone: '', email: '', bio: '', commission_rate: '70',
}

export default function TeamTab() {
  const t = useTranslations('profile')
  const tCommon = useTranslations('common')
  const [team, setTeam] = useState<EmployeeRow[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<EmployeeFormData>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const avatarInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { loadTeam() }, [])

  const loadTeam = async () => {
    const { data } = await employees.getByVendor()
    setTeam(data || [])
  }

  const openAdd = () => {
    setEditingId(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (emp: EmployeeRow) => {
    setEditingId(emp.id)
    setForm({
      name: emp.name || '',
      position: emp.position || '',
      specialties: (emp.specialties || []).join(', '),
      phone: emp.phone || '',
      email: emp.email || '',
      bio: emp.bio || '',
      commission_rate: String(emp.commission_rate ?? 70),
    })
    setShowForm(true)
  }

  const handleSave = async () => {
    if (!form.name.trim()) return
    setSaving(true)
    try {
      const payload = {
        name: form.name,
        position: form.position || null,
        specialties: form.specialties ? form.specialties.split(',').map(s => s.trim()).filter(Boolean) : null,
        phone: form.phone || null,
        email: form.email || null,
        bio: form.bio || null,
        commission_rate: Math.min(100, Math.max(0, Number(form.commission_rate) || 70)),
      }
      if (editingId) {
        const { data } = await employees.update(editingId, payload)
        if (data) setTeam(prev => prev.map(e => e.id === editingId ? data : e))
      } else {
        const { data } = await employees.create(payload)
        if (data) setTeam(prev => [...prev, data])
      }
      setShowForm(false)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    const { error } = await employees.delete(id)
    if (!error) setTeam(prev => prev.filter(e => e.id !== id))
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>, empId: string) => {
    const file = e.target.files?.[0]
    if (!file) return
    const { data: url } = await storage.upload('team', file)
    if (url) {
      const { data } = await employees.update(empId, { avatar_url: url })
      if (data) setTeam(prev => prev.map(emp => emp.id === empId ? data : emp))
    }
  }

  const updateField = (key: keyof EmployeeFormData, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{t('tabTeam')}</h3>
        <Button size="sm" onClick={openAdd}>
          <Plus className="w-4 h-4 mr-1" /> {t('addEmployee')}
        </Button>
      </div>

      {/* Employee Form Modal */}
      {showForm && (
        <Card className="rounded-[20px] bg-[var(--color-bg-card)] border-[var(--color-primary)]">
          <CardContent className="pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{editingId ? t('editEmployee') : t('addEmployee')}</h4>
              <button onClick={() => setShowForm(false)}><X className="w-5 h-5 text-[var(--color-text-muted)]" /></button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">{t('employeeName')}</label>
                <Input value={form.name} onChange={e => updateField('name', e.target.value)} placeholder="Alejandra Santos" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">{t('employeePosition')}</label>
                <Input value={form.position} onChange={e => updateField('position', e.target.value)} placeholder="Estilista Senior" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">{t('employeeSpecialties')}</label>
                <Input value={form.specialties} onChange={e => updateField('specialties', e.target.value)} placeholder="Maquillaje, Cejas" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">{t('phone')}</label>
                <Input value={form.phone} onChange={e => updateField('phone', e.target.value)} placeholder="(809) 555-1234" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">Email</label>
                <Input value={form.email} onChange={e => updateField('email', e.target.value)} placeholder="email@salon.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">{t('commissionRate')}</label>
                <Input type="number" min={0} max={100} value={form.commission_rate} onChange={e => updateField('commission_rate', e.target.value)} placeholder="70" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-1">{t('employeeBio')}</label>
              <textarea
                value={form.bio}
                onChange={e => updateField('bio', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-[var(--color-border-primary)] rounded-lg bg-[var(--color-bg-card)] text-[var(--color-text-primary)] focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowForm(false)}>{tCommon('cancel')}</Button>
              <Button onClick={handleSave} disabled={saving || !form.name.trim()}>
                {saving ? tCommon('loading') : (editingId ? tCommon('update') : tCommon('add'))}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team list */}
      {team.length === 0 && !showForm && (
        <p className="text-center text-[var(--color-text-muted)] py-8">{t('noEmployees')}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {team.map((emp) => (
          <Card key={emp.id} className="rounded-[20px] bg-[var(--color-bg-card)]">
            <CardContent className="pt-4 flex gap-4">
              <div className="relative shrink-0">
                {emp.avatar_url ? (
                  <img src={emp.avatar_url} alt={emp.name} className="w-14 h-14 rounded-full object-cover" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold text-lg">
                    {emp.name?.charAt(0)}
                  </div>
                )}
                <button
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border-primary)] flex items-center justify-center"
                  onClick={() => { avatarInputRef.current?.setAttribute('data-emp-id', emp.id); avatarInputRef.current?.click() }}
                >
                  <Camera className="w-3 h-3 text-[var(--color-text-muted)]" />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-[var(--color-text-primary)]">{emp.name}</h4>
                      <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-[var(--color-primary)]/15 text-[var(--color-primary)] rounded-full">
                        {emp.commission_rate ?? 70}%
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)]">{emp.position}</p>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(emp)} className="p-1.5 hover:bg-[var(--color-bg-hover)] rounded-lg">
                      <Pencil className="w-4 h-4 text-[var(--color-text-muted)]" />
                    </button>
                    <button onClick={() => handleDelete(emp.id)} className="p-1.5 hover:bg-[var(--color-error)]/10 rounded-lg">
                      <Trash2 className="w-4 h-4 text-[var(--color-error)]" />
                    </button>
                  </div>
                </div>
                {emp.specialties && emp.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {emp.specialties.map((s) => (
                      <span key={s} className="px-2 py-0.5 text-xs bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full">{s}</span>
                    ))}
                  </div>
                )}
                {emp.rating && (
                  <p className="text-sm text-[var(--color-text-muted)] mt-1">
                    {'★'.repeat(Math.round(emp.rating))} {emp.rating.toFixed(1)}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hidden file input for avatar uploads */}
      <input
        ref={avatarInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const empId = avatarInputRef.current?.getAttribute('data-emp-id')
          if (empId) handleAvatarUpload(e, empId)
        }}
      />
    </div>
  )
}
