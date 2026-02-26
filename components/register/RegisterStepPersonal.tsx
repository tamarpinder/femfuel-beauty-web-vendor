'use client'

import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export interface PersonalFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

interface RegisterStepPersonalProps {
  data: PersonalFormData
  onChange: (data: PersonalFormData) => void
  error: string
}

export function RegisterStepPersonal({ data, onChange, error }: RegisterStepPersonalProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const update = (field: keyof PersonalFormData, value: string) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-5">
      {error && (
        <div className="p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 text-[var(--color-error)] rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--color-text-primary)]">Nombre *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] h-4 w-4" />
            <input
              type="text"
              placeholder="María"
              value={data.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              className="w-full pl-10 h-12 rounded-xl border border-[var(--color-border-input)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--color-text-primary)]">Apellido *</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] h-4 w-4" />
            <input
              type="text"
              placeholder="García"
              value={data.lastName}
              onChange={(e) => update('lastName', e.target.value)}
              className="w-full pl-10 h-12 rounded-xl border border-[var(--color-border-input)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors"
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--color-text-primary)]">Email profesional *</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] h-4 w-4" />
          <input
            type="email"
            placeholder="maria@negocio.com"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
            className="w-full pl-10 h-12 rounded-xl border border-[var(--color-border-input)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--color-text-primary)]">Telefono *</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] h-4 w-4" />
          <input
            type="tel"
            placeholder="(809) 123-4567"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
            className="w-full pl-10 h-12 rounded-xl border border-[var(--color-border-input)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--color-text-primary)]">Contrasena *</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] h-4 w-4" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Minimo 6 caracteres"
            value={data.password}
            onChange={(e) => update('password', e.target.value)}
            className="w-full pl-10 pr-10 h-12 rounded-xl border border-[var(--color-border-input)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] hover:text-[var(--color-text-primary)]"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--color-text-primary)]">Confirmar Contrasena *</label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] h-4 w-4" />
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder="Repite tu contrasena"
            value={data.confirmPassword}
            onChange={(e) => update('confirmPassword', e.target.value)}
            className="w-full pl-10 pr-10 h-12 rounded-xl border border-[var(--color-border-input)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors"
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] hover:text-[var(--color-text-primary)]"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </div>
  )
}
