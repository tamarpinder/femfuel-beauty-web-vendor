'use client'

import { useRef } from 'react'
import { Upload, X, FileText, Info, Shield } from 'lucide-react'
import type { VendorType } from './RegisterStepBusiness'

interface DocumentSlot {
  key: string
  label: string
  required: boolean
  description: string
}

export interface DocumentFiles {
  identity: File | null
  license: File | null
  certification: File | null
}

interface RegisterStepDocumentsProps {
  vendorType: VendorType
  documents: DocumentFiles
  onDocumentChange: (key: keyof DocumentFiles, file: File | null) => void
  termsAccepted: boolean
  onTermsChange: (accepted: boolean) => void
  error: string
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPES = ['application/pdf', 'image/jpeg', 'image/png']

function getDocumentSlots(vendorType: VendorType): DocumentSlot[] {
  if (vendorType === 'salon') {
    return [
      { key: 'identity', label: 'Cedula o Pasaporte', required: true, description: 'Documento de identidad del propietario' },
      { key: 'license', label: 'Licencia Comercial', required: false, description: 'Recomendado para mayor confianza' },
      { key: 'certification', label: 'Certificaciones', required: false, description: 'Certificados profesionales (opcional)' },
    ]
  }
  return [
    { key: 'identity', label: 'Cedula o Pasaporte', required: true, description: 'Documento de identidad personal' },
    { key: 'certification', label: 'Certificaciones', required: false, description: 'Certificados profesionales (opcional)' },
  ]
}

function DocumentUploadSlot({
  slot,
  file,
  onFileChange,
}: {
  slot: DocumentSlot
  file: File | null
  onFileChange: (file: File | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (selected: File) => {
    if (!ACCEPTED_TYPES.includes(selected.type)) {
      alert('Solo se aceptan archivos PDF, JPG o PNG')
      return
    }
    if (selected.size > MAX_FILE_SIZE) {
      alert('El archivo no puede superar 5MB')
      return
    }
    onFileChange(selected)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[var(--color-text-primary)]">
          {slot.label} {slot.required ? '*' : ''}
        </label>
        {!slot.required && (
          <span className="text-xs text-[var(--color-text-muted)]">Opcional</span>
        )}
      </div>
      <p className="text-xs text-[var(--color-text-muted)]">{slot.description}</p>

      {file ? (
        <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-input)] border border-[var(--color-border-input)] rounded-xl">
          <FileText className="h-5 w-5 text-[var(--color-primary)] flex-shrink-0" />
          <span className="text-sm text-[var(--color-text-primary)] truncate flex-1">{file.name}</span>
          <button
            type="button"
            onClick={() => onFileChange(null)}
            className="p-1 hover:bg-[var(--color-error)]/10 rounded-lg transition-colors"
          >
            <X className="h-4 w-4 text-[var(--color-error)]" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full p-4 border-2 border-dashed border-[var(--color-border-input)] rounded-xl hover:border-[var(--color-primary)]/40 hover:bg-[var(--color-primary)]/5 transition-all duration-200 flex flex-col items-center gap-2"
        >
          <Upload className="h-5 w-5 text-[var(--color-text-muted)]" />
          <span className="text-sm text-[var(--color-text-muted)]">
            PDF, JPG o PNG (max 5MB)
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(e) => {
          const selected = e.target.files?.[0]
          if (selected) handleFile(selected)
          e.target.value = ''
        }}
      />
    </div>
  )
}

export function RegisterStepDocuments({
  vendorType,
  documents,
  onDocumentChange,
  termsAccepted,
  onTermsChange,
  error,
}: RegisterStepDocumentsProps) {
  const slots = getDocumentSlots(vendorType)

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 text-[var(--color-error)] rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Verification trust badge */}
      <div className="p-4 bg-[var(--color-info)]/10 border border-[var(--color-info)]/20 rounded-xl">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-[var(--color-info)] mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-1">Verificacion Segura</h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Tus documentos son revisados por nuestro equipo y eliminados despues de la verificacion. Nunca compartimos tu informacion.
            </p>
          </div>
        </div>
      </div>

      {/* Document upload slots */}
      <div className="space-y-5">
        {slots.map((slot) => (
          <DocumentUploadSlot
            key={slot.key}
            slot={slot}
            file={documents[slot.key as keyof DocumentFiles]}
            onFileChange={(file) => onDocumentChange(slot.key as keyof DocumentFiles, file)}
          />
        ))}
      </div>

      {/* Independent stylist note */}
      {vendorType === 'independent' && (
        <div className="p-3 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-xl">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
            <p className="text-xs text-[var(--color-text-muted)]">
              Como estilista independiente, no necesitas licencia comercial.
            </p>
          </div>
        </div>
      )}

      {/* Terms checkbox */}
      <div className="pt-4 border-t border-[var(--color-border-input)]">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => onTermsChange(e.target.checked)}
            className="mt-1 rounded border-[var(--color-border-input)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
          />
          <span className="text-sm text-[var(--color-text-muted)]">
            Acepto los{' '}
            <a href="/terms-of-service" target="_blank" className="text-[var(--color-primary)] hover:underline">
              Terminos de Servicio
            </a>
            {' '}y la{' '}
            <a href="/privacy-policy" target="_blank" className="text-[var(--color-primary)] hover:underline">
              Politica de Privacidad
            </a>
            {' '}de FemFuel Beauty
          </span>
        </label>
      </div>
    </div>
  )
}
