'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/api'
import { VendorStorageManager } from '@/lib/api/VendorStorageManager'
import { VendorDocumentManager } from '@/lib/api/VendorDocumentManager'
import { RegisterStepper } from '@/components/register/RegisterStepper'
import { RegisterBrandingPanel } from '@/components/register/RegisterBrandingPanel'
import { RegisterStepPersonal, type PersonalFormData } from '@/components/register/RegisterStepPersonal'
import { RegisterStepBusiness, type BusinessFormData } from '@/components/register/RegisterStepBusiness'
import { RegisterStepDocuments, type DocumentFiles } from '@/components/register/RegisterStepDocuments'

const STEPS = ['Tu Informacion', 'Tu Negocio', 'Documentos']

export default function RegisterPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const [personal, setPersonal] = useState<PersonalFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const [business, setBusiness] = useState<BusinessFormData>({
    vendorType: 'salon',
    businessName: '',
    city: 'Santo Domingo',
    sector: '',
    address: '',
    categories: [],
  })

  const [documents, setDocuments] = useState<DocumentFiles>({
    identity: null,
    license: null,
    certification: null,
  })

  const [termsAccepted, setTermsAccepted] = useState(false)

  const validateStep1 = (): boolean => {
    if (!personal.firstName || !personal.lastName || !personal.email || !personal.phone || !personal.password) {
      setError('Completa todos los campos requeridos')
      return false
    }
    if (personal.password.length < 6) {
      setError('La contrasena debe tener al menos 6 caracteres')
      return false
    }
    if (personal.password !== personal.confirmPassword) {
      setError('Las contrasenas no coinciden')
      return false
    }
    return true
  }

  const validateStep2 = (): boolean => {
    if (business.vendorType === 'salon' && !business.businessName) {
      setError('El nombre del negocio es requerido para salones')
      return false
    }
    if (!business.city) {
      setError('Selecciona una ciudad')
      return false
    }
    if (business.vendorType === 'salon' && !business.address) {
      setError('La direccion es requerida para salones')
      return false
    }
    if (business.categories.length === 0) {
      setError('Selecciona al menos una categoria de servicio')
      return false
    }
    return true
  }

  const validateStep3 = (): boolean => {
    if (!documents.identity) {
      setError('La cedula o pasaporte es requerida')
      return false
    }
    if (!termsAccepted) {
      setError('Debes aceptar los terminos de servicio')
      return false
    }
    return true
  }

  const handleNext = () => {
    setError('')
    if (currentStep === 1 && !validateStep1()) return
    if (currentStep === 2 && !validateStep2()) return
    setCurrentStep((s) => Math.min(s + 1, 3))
  }

  const handleBack = () => {
    setError('')
    setCurrentStep((s) => Math.max(s - 1, 1))
  }

  const handleDocumentChange = (key: keyof DocumentFiles, file: File | null) => {
    setDocuments((prev) => ({ ...prev, [key]: file }))
  }

  const handleSubmit = async () => {
    setError('')
    if (!validateStep3()) return

    setIsLoading(true)
    try {
      // 1. Sign up with Supabase auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: personal.email,
        password: personal.password,
      })
      if (authError) throw authError
      if (!authData.user) throw new Error('No se pudo crear el usuario')

      const userId = authData.user.id
      const fullName = `${personal.firstName} ${personal.lastName}`
      const effectiveBusinessName = business.businessName || fullName

      // 2. Create vendor profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: userId,
        full_name: fullName,
        email: personal.email,
        role: 'vendor',
        phone: personal.phone,
        address: business.address || null,
        business_name: effectiveBusinessName,
        service_categories: business.categories,
        city: business.city,
        vendor_type: business.vendorType,
        is_approved: false,
        created_at: new Date().toISOString(),
      })
      if (profileError) throw profileError

      // 3. Upload documents
      const slug = effectiveBusinessName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      const docEntries = Object.entries(documents).filter(([, file]) => file !== null) as [keyof DocumentFiles, File][]

      for (const [docType, file] of docEntries) {
        const fileUrl = await VendorStorageManager.upload(slug, 'documents', file)
        if (fileUrl) {
          await VendorDocumentManager.upload(userId, docType, file.name, fileUrl)
        }
      }

      // 4. Redirect to dashboard
      router.push('/dashboard?welcome=true')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al crear la cuenta')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] relative">
      <div className="relative flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Branding (hidden on mobile, compact header instead) */}
        <RegisterBrandingPanel currentStep={currentStep} />

        {/* Mobile branding header */}
        <div className="lg:hidden bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)] p-4 text-white text-center">
          <h1 className="text-lg font-bold">Registro de Proveedor</h1>
          <p className="text-sm opacity-80">Paso {currentStep} de 3</p>
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 flex-1 flex items-start lg:items-center justify-center p-6 lg:p-12 bg-[var(--color-bg-secondary)] overflow-y-auto">
          <div className="w-full max-w-lg">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
                Crear Cuenta de Proveedor
              </h2>
              <p className="text-sm text-[var(--color-text-muted)]">
                Completa el formulario para enviar tu solicitud
              </p>
            </div>

            <RegisterStepper currentStep={currentStep} steps={STEPS} />

            {/* Step content */}
            {currentStep === 1 && (
              <RegisterStepPersonal data={personal} onChange={setPersonal} error={error} />
            )}
            {currentStep === 2 && (
              <RegisterStepBusiness data={business} onChange={setBusiness} error={error} />
            )}
            {currentStep === 3 && (
              <RegisterStepDocuments
                vendorType={business.vendorType}
                documents={documents}
                onDocumentChange={handleDocumentChange}
                termsAccepted={termsAccepted}
                onTermsChange={setTermsAccepted}
                error={error}
              />
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between mt-8 gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="h-12 px-6 rounded-xl border border-[var(--color-border-input)] text-[var(--color-text-primary)] font-medium hover:bg-[var(--color-bg-hover)] transition-colors"
                >
                  Atras
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="h-12 px-8 rounded-full bg-femfuel-rose hover:bg-femfuel-rose/90 text-white font-semibold shadow-lg active:scale-95 transition-all duration-300 flex items-center gap-2"
                >
                  Siguiente
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="h-12 px-8 rounded-full bg-femfuel-rose hover:bg-femfuel-rose/90 text-white font-semibold shadow-lg active:scale-95 transition-all duration-300 flex items-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    'Enviar Solicitud'
                  )}
                </button>
              )}
            </div>

            {/* Login link */}
            <div className="mt-6 text-center text-sm">
              <span className="text-[var(--color-text-muted)]">Ya tienes cuenta?</span>
              <Link href="/login" className="ml-1 text-[var(--color-primary)] hover:underline font-medium">
                Inicia sesion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
