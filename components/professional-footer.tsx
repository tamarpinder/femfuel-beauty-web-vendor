"use client"

import { useState } from "react"
import { ChevronDown, Facebook, Instagram, Twitter, Music } from "lucide-react"

interface FooterSection {
  title: string
  links: Array<{
    label: string
    href: string
  }>
}

interface ProfessionalFooterProps {
  sections: FooterSection[]
}

export function ProfessionalFooter({ sections }: ProfessionalFooterProps) {
  const [language, setLanguage] = useState("es")
  const [currency, setCurrency] = useState("RD")

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com/femfuelbeauty", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/femfuelbeauty", label: "X (Twitter)" },
    { icon: Instagram, href: "https://instagram.com/femfuelbeauty", label: "Instagram" },
    { icon: Music, href: "https://tiktok.com/@femfuelbeauty", label: "TikTok" },
  ]

  const legalLinks = [
    { label: "Terms", href: "/terms" },
    { label: "Sitemap", href: "/sitemap" },
    { label: "Privacy", href: "/privacy" },
  ]

  return (
    <footer className="hidden md:block bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Logo and Brand */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src="/femfuel-logo.png" 
              alt="FemFuel Beauty"
              className="w-10 h-10 object-contain hover:scale-105 transition-transform duration-300"
            />
            <span className="text-2xl font-bold">FemFuel Beauty</span>
          </div>
          <p className="text-gray-400 text-lg max-w-md">
            La plataforma líder de belleza en República Dominicana conectando clientes con los mejores profesionales.
          </p>
        </div>

        {/* Footer Sections */}
        <div className="grid grid-cols-5 gap-8 mb-12">
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-femfuel-rose transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Left Side - Copyright and Legal */}
            <div className="flex items-center gap-6">
              <span className="text-gray-400 text-sm">
                © 2025 FemFuel Beauty RD
              </span>
              <div className="flex items-center gap-4">
                {legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right Side - Language, Currency, Social */}
            <div className="flex items-center gap-6">
              {/* Language Toggle */}
              <div className="relative">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  <span className="text-base">🌐</span>
                  {language === "es" ? "Español (DR)" : "English (US)"}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Currency Toggle */}
              <div className="relative">
                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm">
                  <span className="text-base">💰</span>
                  {currency === "RD" ? "RD$" : "USD$"}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-femfuel-rose transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}