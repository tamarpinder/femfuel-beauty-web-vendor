'use client'

import { VendorHero } from '@/components/vendor-hero'
import { VendorValueProposition } from '@/components/vendor-value-proposition'
import { VendorHowItWorks } from '@/components/vendor-how-it-works'
import { VendorSocialProof } from '@/components/vendor-social-proof'
import { VendorFinalCTA } from '@/components/vendor-final-cta'
import { VendorFooter } from '@/components/vendor-footer'

export default function VendorHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <VendorHero />
        <VendorValueProposition />
        <VendorHowItWorks />
        <VendorSocialProof />
        <VendorFinalCTA />
      </main>
      <VendorFooter />
    </div>
  )
}