'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Info } from 'lucide-react';
import { VendorProfileManager } from '@/lib/api/VendorProfileManager';

interface DemoOption {
  label: string
  email: string
  password: string
  slug: string
}

const DEMO_OPTION: DemoOption = {
  label: 'Propietaria (Glamour House)',
  email: 'owner@glamourhouse.com',
  password: 'VendorLogin2025!',
  slug: 'glamour-house',
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDemoLogin = async (option: DemoOption) => {
    setIsLoading(true);
    setError('');
    try {
      const profileData = await VendorProfileManager.getBySlug(option.slug);

      if (!profileData) {
        setError('No se pudo conectar con el servidor. Inténtalo de nuevo.');
        return;
      }

      const enriched: Record<string, unknown> = {
        ...profileData,
        vendorId: profileData.id,
      };

      localStorage.setItem('mockVendorSession', JSON.stringify({
        email: profileData.email,
        isAuthenticated: true,
        loginTime: new Date().toISOString(),
      }));
      localStorage.setItem('vendorProfile', JSON.stringify(enriched));
      window.location.href = '/dashboard';
    } catch {
      setError('Error al iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (email === DEMO_OPTION.email && password === DEMO_OPTION.password) {
        await handleDemoLogin(DEMO_OPTION);
      } else {
        setError('Credenciales incorrectas. Usa las credenciales de demostración.');
      }
    } catch {
      setError('Error al iniciar sesión. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async () => {
    await handleDemoLogin(DEMO_OPTION);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] relative">
      <div className="relative flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Branding */}
        <div className="lg:w-1/2 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary-light)] to-[var(--color-accent)] p-8 lg:p-12 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-48 translate-x-48" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32" />

          <div className="relative z-10 text-white text-center lg:text-left max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">
                Portal de Proveedores
              </h1>
              <p className="text-lg opacity-90 leading-relaxed">
                Gestiona tu negocio de belleza desde una plataforma profesional y moderna
              </p>
            </div>

            <div className="space-y-4 text-sm">
              {[
                'Dashboard completo de gestión',
                'Control total de reservas y servicios',
                'Análisis detallado de ganancias',
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-3 opacity-80">
                  <div className="w-2 h-2 bg-white/60 rounded-full flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12 bg-[var(--color-bg-secondary)]">
          <div className="w-full max-w-md">
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
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                Acceso de Proveedores
              </h2>
              <p className="text-[var(--color-text-muted)]">
                Accede a tu panel de gestión profesional
              </p>
            </div>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialLogin()}
                disabled={isLoading}
                className="w-full h-12 border border-[var(--color-border-input)] hover:bg-[var(--color-bg-hover)] bg-transparent rounded-xl flex items-center justify-center gap-3 text-sm font-medium text-[var(--color-text-primary)] transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continuar con Google
              </button>
              <button
                onClick={() => handleSocialLogin()}
                disabled={isLoading}
                className="w-full h-12 border border-[var(--color-border-input)] hover:bg-[var(--color-bg-hover)] bg-transparent rounded-xl flex items-center justify-center gap-3 text-sm font-medium text-[var(--color-text-primary)] transition-colors disabled:opacity-50"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continuar con Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-border-input)]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[var(--color-bg-secondary)] px-3 text-[var(--color-text-muted)]">
                  O continúa con email
                </span>
              </div>
            </div>

            {/* Demo Autofill Button */}
            <div className="mb-6 p-4 bg-[var(--color-info)]/10 border border-[var(--color-info)]/20 rounded-[20px]">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-[var(--color-info)] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-[var(--color-text-primary)] mb-2">
                    Cuenta de Demostración
                  </h3>
                  <button
                    type="button"
                    onClick={() => { setEmail(DEMO_OPTION.email); setPassword(DEMO_OPTION.password); }}
                    className="w-full px-3 py-2.5 rounded-xl border border-[var(--color-border-primary)] hover:border-[var(--color-info)] hover:bg-[var(--color-info)]/5 transition-colors text-center"
                  >
                    <span className="block text-sm font-medium text-[var(--color-text-primary)]">
                      Salón
                    </span>
                    <span className="block text-xs text-[var(--color-text-muted)] mt-0.5">
                      Glamour House
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20 text-[var(--color-error)] rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[var(--color-text-primary)]">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-placeholder)] h-4 w-4" />
                  <input
                    id="email"
                    type="email"
                    placeholder="negocio@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 h-12 rounded-xl border border-[var(--color-border-input)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-[var(--color-text-primary)]">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-placeholder)] h-4 w-4" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 h-12 rounded-xl border border-[var(--color-border-input)] bg-[var(--color-bg-input)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-colors"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text-placeholder)] hover:text-[var(--color-text-secondary)]"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white font-medium transition-colors disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? 'Accediendo...' : 'Acceder al Panel'}
              </button>
            </form>

            <div className="mt-8 space-y-4">
              <div className="text-center text-sm">
                <span className="text-[var(--color-text-muted)]">¿Nuevo proveedor?</span>
                <Link href="/register" className="ml-1 text-[var(--color-primary)] hover:underline font-medium">
                  Regístrate gratis
                </Link>
              </div>
              <div className="text-center">
                <button type="button" className="text-sm text-[var(--color-primary)] hover:underline">
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
