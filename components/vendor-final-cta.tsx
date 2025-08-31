"use client"

import { useState } from "react"
import { UserPlus } from "lucide-react"
import { VendorAuthModal } from "@/components/vendor-auth-modal"

export function VendorFinalCTA() {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("signup")

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }
  return (
    <section className="py-16 bg-gradient-to-r from-femfuel-rose to-femfuel-gold relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-femfuel-rose/90 to-femfuel-gold/90"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
          <span className="text-femfuel-rose">transformar</span> tu negocio?
        </h2>
        <p className="text-xl text-black mb-8 max-w-2xl mx-auto">
          Únete a FemFuel Beauty hoy y comienza a generar más ingresos con la plataforma de belleza más exitosa de República Dominicana
        </p>

        <button
          onClick={() => handleAuthClick("signup")}
          className="
            inline-flex items-center justify-center gap-2
            h-11 px-8 rounded-md text-sm font-medium
            bg-femfuel-rose text-white
            hover:bg-femfuel-rose/90 hover:scale-105 hover:shadow-lg
            hover:-translate-y-0.5
            transition-all duration-300 shadow-md
            cursor-pointer focus-visible:outline-none focus-visible:ring-2 
            focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-femfuel-rose
          "
        >
          <UserPlus className="h-4 w-4" />
          <span>Comenzar</span>
        </button>
        
        <p className="text-white/70 text-sm mt-4">
          Gratis por siempre • Sin comisiones ocultas • Soporte 24/7
        </p>
      </div>

      <VendorAuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={() => {
          window.location.href = '/dashboard'
        }}
        initialMode={authMode}
      />
    </section>
  )
}
