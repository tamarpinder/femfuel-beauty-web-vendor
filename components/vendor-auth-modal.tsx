"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Lock, User, Phone, Eye, EyeOff, Building2, MapPin, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface VendorUser {
  id: string
  name: string
  email: string
  phone: string
  businessName: string
  businessType: string
  city: string
  avatar: string
}

interface VendorAuthModalProps {
  isOpen: boolean
  onClose: () => void
  onAuthSuccess?: (user: VendorUser) => void
  initialMode?: "login" | "signup"
}

export function VendorAuthModal({ isOpen, onClose, onAuthSuccess, initialMode = "login" }: VendorAuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    businessName: "",
    businessType: "",
    city: "Santo Domingo",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock authentication - in real app this would call your auth API
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      const mockUser = {
        id: "1",
        name: mode === "signup" ? formData.name : "Proveedor Demo",
        email: formData.email,
        phone: mode === "signup" ? formData.phone : "+1 809 555 0123",
        businessName: mode === "signup" ? formData.businessName : "Beauty Studio Demo",
        businessType: mode === "signup" ? formData.businessType : "Salón de Belleza",
        city: formData.city,
        avatar: "/placeholder.svg",
      }

      onAuthSuccess?.(mockUser)
      onClose()
    } catch (error) {
      console.error("Auth error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const mockUser = {
        id: "1",
        name: `Proveedor ${provider === "google" ? "Google" : "Facebook"}`,
        email: `proveedor@${provider}.com`,
        phone: "+1 809 555 0123",
        businessName: `Beauty Studio ${provider}`,
        businessType: "Salón de Belleza",
        city: "Santo Domingo",
        avatar: "/placeholder.svg",
      }

      onAuthSuccess?.(mockUser)
      onClose()
    } catch (error) {
      console.error("Social login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({ 
      email: "", 
      password: "", 
      name: "", 
      phone: "", 
      businessName: "", 
      businessType: "",
      city: "Santo Domingo" 
    })
    setShowPassword(false)
  }

  const switchMode = (newMode: "login" | "signup") => {
    setMode(newMode)
    resetForm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-femfuel-dark">
            {mode === "login" ? "Portal de Proveedores" : "Únete como Proveedor"}
          </DialogTitle>
          <DialogDescription className="text-center text-femfuel-medium">
            {mode === "login"
              ? "Accede a tu panel de gestión profesional"
              : "Comienza a hacer crecer tu negocio de belleza hoy"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 border-gray-200 hover:bg-gray-50 hover:border-femfuel-rose transition-all duration-300"
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar con Google
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 border-gray-200 hover:bg-gray-50 hover:border-femfuel-rose transition-all duration-300"
              onClick={() => handleSocialLogin("facebook")}
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Continuar con Facebook
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-femfuel-medium">O continúa con email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-femfuel-dark">
                    Nombre completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre completo"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-femfuel-rose focus:ring-femfuel-rose"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessName" className="text-femfuel-dark">
                    Nombre del negocio
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="businessName"
                      type="text"
                      placeholder="Ej: Beauty Studio María"
                      value={formData.businessName}
                      onChange={(e) => handleInputChange("businessName", e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-femfuel-rose focus:ring-femfuel-rose"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessType" className="text-femfuel-dark">
                    Tipo de servicio
                  </Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                      id="businessType"
                      value={formData.businessType}
                      onChange={(e) => handleInputChange("businessType", e.target.value)}
                      className="w-full pl-10 pr-3 h-12 border border-gray-200 rounded-md focus:border-femfuel-rose focus:ring-femfuel-rose appearance-none bg-white"
                      required
                    >
                      <option value="">Selecciona tipo de servicio</option>
                      <option value="salon">Salón de Belleza</option>
                      <option value="barberia">Barbería</option>
                      <option value="spa">Spa</option>
                      <option value="unas">Uñas</option>
                      <option value="maquillaje">Maquillaje</option>
                      <option value="masajes">Masajes</option>
                      <option value="estetica">Estética</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-femfuel-dark">
                Email profesional
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@negocio.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-femfuel-rose focus:ring-femfuel-rose"
                  required
                />
              </div>
            </div>

            {mode === "signup" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-femfuel-dark">
                    Teléfono de contacto
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 809 555 0123"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-femfuel-rose focus:ring-femfuel-rose"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" className="text-femfuel-dark">
                    Ciudad principal de servicio
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <select
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="w-full pl-10 pr-3 h-12 border border-gray-200 rounded-md focus:border-femfuel-rose focus:ring-femfuel-rose appearance-none bg-white"
                      required
                    >
                      <option value="Santo Domingo">Santo Domingo</option>
                      <option value="Santiago">Santiago</option>
                      <option value="La Romana">La Romana</option>
                      <option value="Puerto Plata">Puerto Plata</option>
                      <option value="Punta Cana">Punta Cana</option>
                      <option value="San Pedro de Macorís">San Pedro de Macorís</option>
                      <option value="La Vega">La Vega</option>
                      <option value="San Francisco de Macorís">San Francisco de Macorís</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-femfuel-dark">
                Contraseña
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="pl-10 pr-10 h-12 border-gray-200 focus:border-femfuel-rose focus:ring-femfuel-rose"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-femfuel-rose hover:bg-femfuel-rose/90 text-white transition-all duration-300 shadow-md hover:shadow-lg"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : mode === "login" ? "Acceder al Portal" : "Crear Cuenta de Proveedor"}
            </Button>
          </form>

          {/* Switch Mode */}
          <div className="text-center text-sm">
            <span className="text-femfuel-medium">
              {mode === "login" ? "¿Nuevo proveedor?" : "¿Ya tienes cuenta?"}
            </span>
            <button
              type="button"
              className="ml-1 text-femfuel-rose hover:underline font-medium"
              onClick={() => switchMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Regístrate aquí" : "Inicia sesión"}
            </button>
          </div>

          {mode === "login" && (
            <div className="text-center">
              <button type="button" className="text-sm text-femfuel-rose hover:underline">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          )}

          {mode === "signup" && (
            <div className="text-xs text-center text-femfuel-medium mt-4">
              Al registrarte, aceptas nuestros{" "}
              <a href="#" className="text-femfuel-rose hover:underline">Términos de Servicio</a>
              {" "}y{" "}
              <a href="#" className="text-femfuel-rose hover:underline">Políticas de Privacidad</a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}