'use client'

import { Building2, User, MapPin } from 'lucide-react'
import { SERVICE_CATEGORY_COLORS } from '@/lib/constants'

export type VendorType = 'salon' | 'independent'

const CATEGORY_NAMES: Record<string, string> = {
  nail_care: 'Cuidado de Unas',
  makeup: 'Maquillaje',
  skin_treatment: 'Tratamientos de Piel',
  spa_relaxation: 'Spa y Relajacion',
  hair_removal: 'Depilacion',
  teeth_whitening: 'Blanqueamiento Dental',
  micropigmentation: 'Micropigmentacion',
  hair_styling: 'Peinados y Cortes',
  hair_coloring: 'Tintes de Cabello',
  eyelash_extensions: 'Extensiones de Pestanas',
  botox_fillers: 'Botox y Rellenos',
  skin_consultation: 'Consultas de Piel',
  eyebrow_tinting: 'Tinte de Cejas',
}

const CITIES = [
  'Santo Domingo',
  'Santiago',
  'La Romana',
  'Puerto Plata',
  'Punta Cana',
  'San Pedro de Macoris',
  'La Vega',
  'San Francisco de Macoris',
]

export interface BusinessFormData {
  vendorType: VendorType
  businessName: string
  city: string
  sector: string
  address: string
  categories: string[]
}

interface RegisterStepBusinessProps {
  data: BusinessFormData
  onChange: (data: BusinessFormData) => void
  error: string
}

export function RegisterStepBusiness({ data, onChange, error }: RegisterStepBusinessProps) {
  const update = (field: keyof BusinessFormData, value: string | string[] | VendorType) => {
    onChange({ ...data, [field]: value })
  }

  const toggleCategory = (key: string) => {
    const next = data.categories.includes(key)
      ? data.categories.filter((c) => c !== key)
      : [...data.categories, key]
    update('categories', next)
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 text-[var(--color-error)] rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Vendor Type Toggle */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--color-text-primary)]">Tipo de Proveedor *</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => update('vendorType', 'salon')}
            className={`
              p-4 rounded-xl border-2 text-left transition-all duration-200
              ${data.vendorType === 'salon'
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                : 'border-[var(--color-border-input)] hover:border-[var(--color-primary)]/40'
              }
            `}
          >
            <Building2 className={`h-6 w-6 mb-2 ${data.vendorType === 'salon' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`} />
            <div className="text-sm font-semibold text-[var(--color-text-primary)]">Salon / Negocio</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Tengo un salon o negocio establecido</div>
          </button>

          <button
            type="button"
            onClick={() => update('vendorType', 'independent')}
            className={`
              p-4 rounded-xl border-2 text-left transition-all duration-200
              ${data.vendorType === 'independent'
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5'
                : 'border-[var(--color-border-input)] hover:border-[var(--color-primary)]/40'
              }
            `}
          >
            <User className={`h-6 w-6 mb-2 ${data.vendorType === 'independent' ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`} />
            <div className="text-sm font-semibold text-[var(--color-text-primary)]">Estilista Independiente</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Trabajo por cuenta propia</div>
          </button>
        </div>
      </div>

      {/* Business Name - required for salon, optional for independent */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--color-text-primary)]">
          Nombre del Negocio {data.vendorType === 'salon' ? '*' : '(opcional)'}
        </label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] h-4 w-4" />
          <input
            type="text"
            placeholder={data.vendorType === 'salon' ? 'Salon de Belleza Maria' : 'Ej: Maria Beauty (opcional)'}
            value={data.businessName}
            onChange={(e) => update('businessName', e.target.value)}
            className="w-full pl-10 h-12 rounded-xl border border-[var(--color-border-input)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors"
            required={data.vendorType === 'salon'}
          />
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--color-text-primary)]">Ciudad *</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] h-4 w-4" />
          <select
            value={data.city}
            onChange={(e) => update('city', e.target.value)}
            className="w-full pl-10 pr-3 h-12 rounded-xl border border-[var(--color-border-input)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors appearance-none"
            required
          >
            {CITIES.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--color-text-primary)]">Sector / Distrito (opcional)</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] h-4 w-4" />
          <input
            type="text"
            placeholder="Ej: Piantini, Naco, Gazcue"
            value={data.sector}
            onChange={(e) => update('sector', e.target.value)}
            className="w-full pl-10 h-12 rounded-xl border border-[var(--color-border-input)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors"
          />
        </div>
      </div>

      {/* Address - required for salon only */}
      {data.vendorType === 'salon' && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-[var(--color-text-primary)]">Direccion *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-placeholder)] h-4 w-4" />
            <input
              type="text"
              placeholder="Calle, numero, edificio"
              value={data.address}
              onChange={(e) => update('address', e.target.value)}
              className="w-full pl-10 h-12 rounded-xl border border-[var(--color-border-input)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors"
              required
            />
          </div>
        </div>
      )}

      {/* Service Categories */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-[var(--color-text-primary)]">
          Categorias de Servicios * (min. 1)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {Object.keys(SERVICE_CATEGORY_COLORS).map((key) => {
            const selected = data.categories.includes(key)
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggleCategory(key)}
                className={`
                  flex items-center gap-2 p-3 rounded-xl border text-left text-sm transition-all duration-200
                  ${selected
                    ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-text-primary)] font-medium'
                    : 'border-[var(--color-border-input)] text-[var(--color-text-muted)] hover:border-[var(--color-primary)]/40'
                  }
                `}
              >
                <div className={`w-3 h-3 rounded-sm flex-shrink-0 ${selected ? 'bg-[var(--color-primary)]' : 'bg-gray-200'}`} />
                {CATEGORY_NAMES[key] || key}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
