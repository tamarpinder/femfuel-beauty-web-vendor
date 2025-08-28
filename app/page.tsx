'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { MarketingHomepage } from '@/components/marketing-homepage'

export default function VendorHomePage() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()

  useEffect(() => {
    // If user is authenticated and has vendor profile, redirect to dashboard
    if (!loading && user && profile) {
      router.push('/dashboard')
    }
  }, [user, profile, loading, router])

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-femfuel-rose border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-femfuel-medium">Cargando...</p>
        </div>
      </div>
    )
  }

  // If user is authenticated, don't show marketing content (redirect will happen)
  if (user && profile) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-femfuel-rose border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-femfuel-medium">Redirigiendo a tu dashboard...</p>
        </div>
      </div>
    )
  }

  // Show marketing homepage for non-authenticated users
  return <MarketingHomepage />
}