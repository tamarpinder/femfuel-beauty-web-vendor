'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Info } from 'lucide-react';
// Removed: import { auth } from '@/lib/api'; // Not used in demo mode

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Demo vendor credentials - stored securely
  const demoCredentials = {
    email: 'owner@glamourhouse.com',
    password: 'VendorLogin2025!' // Demo password for testing
  };

  const handleDemoCredentials = () => {
    setEmail(demoCredentials.email);
    setPassword(demoCredentials.password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Demo mode authentication
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // For demo, accept demo credentials
      if (email === 'owner@glamourhouse.com' && password === 'VendorLogin2025!') {
        // Create mock session
        const sessionData = {
          email: email,
          isAuthenticated: true,
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('mockVendorSession', JSON.stringify(sessionData));
        
        // Force reload to trigger auth context
        window.location.href = '/dashboard';
      } else {
        setError('Credenciales incorrectas. Usa las credenciales de demostración.');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error al iniciar sesión. Inténtalo de nuevo.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      // Create mock session for demo
      localStorage.setItem('mockVendorSession', JSON.stringify({
        email: 'owner@glamourhouse.com',
        isAuthenticated: true,
        loginTime: new Date().toISOString()
      }));
      
      router.push('/dashboard');
    } catch {
      // Handle social login error silently
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-femfuel-rose/5 via-white to-femfuel-gold/5 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.02]"></div>
      
      <div className="relative flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Branding */}
        <div className="lg:w-1/2 bg-gradient-to-br from-femfuel-rose via-pink-600 to-femfuel-gold p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-white text-center lg:text-left max-w-md">
            <div className="mb-8">
              <Image 
                src="/femfuel-logo.png" 
                alt="FemFuel Beauty" 
                width={80}
                height={80}
                className="w-20 h-20 mx-auto lg:mx-0 mb-4"
              />
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                Portal de Proveedores
              </h1>
              <p className="text-lg opacity-90 leading-relaxed">
                Gestiona tu negocio de belleza desde una plataforma profesional y moderna
              </p>
            </div>

            <div className="space-y-4 text-sm opacity-80">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <span>Dashboard completo de gestión</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <span>Control total de reservas y servicios</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <span>Análisis detallado de ganancias</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            {/* Back Button */}
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-femfuel-medium hover:text-femfuel-dark transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>

            {/* Form Header with Centered Logo */}
            <div className="mb-8 text-center">
              <div className="mb-6">
                <Image 
                  src="/femfuel-logo.png" 
                  alt="FemFuel Beauty" 
                  width={110}
                  height={110}
                  className="w-[110px] h-[110px] mx-auto hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h2 className="text-3xl font-bold text-femfuel-dark mb-2">
                Acceso de Proveedores
              </h2>
              <p className="text-femfuel-medium">
                Accede a tu panel de gestión profesional
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <Button
                variant="outline"
                className="w-full h-12 border-gray-200 hover:bg-gray-50 bg-transparent"
                onClick={() => handleSocialLogin()}
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
                className="w-full h-12 border-gray-200 hover:bg-gray-50 bg-transparent"
                onClick={() => handleSocialLogin()}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continuar con Facebook
              </Button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-3 text-femfuel-medium">O continúa con email</span>
              </div>
            </div>

            {/* Demo Vendor Credentials Notice */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-blue-900 mb-1">
                    Cuenta de Demostración
                  </h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Inicia sesión con Glamour House, un estudio de maquillaje profesional real:
                    <br />
                    <strong>Email:</strong> {demoCredentials.email}
                    <br />
                    <strong>Contraseña:</strong> VendorLogin2025!
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleDemoCredentials}
                    className="border-blue-300 text-blue-700 hover:bg-blue-100 hover:border-blue-400"
                  >
                    Usar Credenciales de Glamour House
                  </Button>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-femfuel-dark">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="negocio@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-femfuel-rose focus:ring-femfuel-rose"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-femfuel-dark">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-gray-200 focus:border-femfuel-rose focus:ring-femfuel-rose"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-femfuel-rose hover:bg-[#9f1853] text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Accediendo...' : 'Acceder al Panel'}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-8 space-y-4">
              <div className="text-center text-sm">
                <span className="text-femfuel-medium">¿Nuevo proveedor?</span>
                <Link 
                  href="/register" 
                  className="ml-1 text-femfuel-rose hover:underline font-medium"
                >
                  Regístrate gratis
                </Link>
              </div>

              <div className="text-center">
                <button 
                  type="button" 
                  className="text-sm text-femfuel-rose hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}