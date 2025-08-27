'use client'

import { VendorHeroSection } from '@/components/vendor-hero-section'
import { VendorValueProposition } from '@/components/vendor-value-proposition'
import { VendorHowItWorks } from '@/components/vendor-how-it-works'
import { VendorSocialProof } from '@/components/vendor-social-proof'
import { VendorFinalCTA } from '@/components/vendor-final-cta'
import { VendorHeader } from '@/components/vendor-header'
import { VendorMobileHeader } from '@/components/vendor-mobile-header'
import Image from 'next/image'

export default function VendorHomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Headers */}
      <VendorMobileHeader />
      <VendorHeader />

      {/* Hero Section */}
      <VendorHeroSection />

      {/* Value Proposition */}
      <VendorValueProposition />

      {/* How It Works */}
      <VendorHowItWorks />

      {/* Social Proof */}
      <VendorSocialProof />

      {/* Final CTA */}
      <VendorFinalCTA />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Image 
                src="/femfuel-logo.png" 
                alt="FemFuel Beauty" 
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
              <span className="text-xl font-bold">FemFuel Beauty</span>
            </div>
            <p className="text-gray-400">
              © 2024 FemFuel Beauty. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}