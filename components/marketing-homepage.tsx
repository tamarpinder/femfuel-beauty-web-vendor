'use client'

import { useState } from 'react'
import { VendorHero } from '@/components/vendor-hero'
import { VendorValueProposition } from '@/components/vendor-value-proposition'
import { VendorHowItWorks } from '@/components/vendor-how-it-works'
import { VendorSocialProof } from '@/components/vendor-social-proof'
import { VendorFinalCTA } from '@/components/vendor-final-cta'
import { VendorFooter } from '@/components/vendor-footer'
import { VendorMobileNav } from '@/components/vendor-mobile-nav'
import { VendorAuthModal } from '@/components/vendor-auth-modal'

export function MarketingHomepage() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup")

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }
  return (
    <div className="min-h-screen bg-white">
      <main>
        <VendorHero onAuthClick={handleAuthClick} />
        <VendorValueProposition />
        <VendorHowItWorks />
        <VendorSocialProof />
        <VendorFinalCTA onAuthClick={handleAuthClick} />
      </main>
      <VendorFooter />
      <VendorMobileNav />
      
      <VendorAuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={() => {
          window.location.href = '/dashboard'
        }}
        initialMode={authMode}
      />
    </div>
  )
}