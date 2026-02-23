'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/api';
import { SERVICE_CATEGORY_COLORS } from '@/lib/constants';

// Spanish category names for registration page (Spanish-only marketing page)
const CATEGORY_NAMES: Record<string, string> = {
  nail_care: 'Cuidado de Uñas', makeup: 'Maquillaje', skin_treatment: 'Tratamientos de Piel',
  spa_relaxation: 'Spa y Relajación', hair_removal: 'Depilación', teeth_whitening: 'Blanqueamiento Dental',
  micropigmentation: 'Micropigmentación', hair_styling: 'Peinados y Cortes', hair_coloring: 'Tintes de Cabello',
  eyelash_extensions: 'Extensiones de Pestañas', botox_fillers: 'Botox y Rellenos',
  skin_consultation: 'Consultas de Piel', eyebrow_tinting: 'Tinte de Cejas',
};

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    businessName: '',
    phone: '',
    address: '',
    categories: [] as string[]
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  // Using imported supabase client

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    if (formData.categories.length === 0) {
      setError('Selecciona al menos una categoría de servicio');
      setIsLoading(false);
      return;
    }

    try {
      // Sign up user
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) throw error;

      if (data.user) {
        // Create vendor profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: formData.fullName,
              email: formData.email,
              role: 'vendor',
              phone: formData.phone,
              address: formData.address,
              business_name: formData.businessName,
              service_categories: formData.categories,
              is_approved: false, // Requires admin approval
              created_at: new Date().toISOString(),
            },
          ]);

        if (profileError) throw profileError;

        // Redirect to a pending approval page or dashboard
        router.push('/dashboard?welcome=true');
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryToggle = (categoryKey: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryKey)
        ? prev.categories.filter(c => c !== categoryKey)
        : [...prev.categories, categoryKey]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-femfuel-pink/5 to-femfuel-gold/5 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Image 
              src="/femfuel-logo.png" 
              alt="FemFuel Beauty" 
              width={48}
              height={48}
              className="h-12 w-12"
            />
            <div>
              <h1 className="text-2xl font-display font-bold text-femfuel-black">
                FemFuel Beauty
              </h1>
              <p className="text-sm text-gray-600">Portal de Proveedores</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Crear Cuenta de Proveedor</CardTitle>
            <CardDescription className="text-center">
              Únete a FemFuel Beauty y haz crecer tu negocio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    placeholder="María García"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Negocio *
                  </label>
                  <Input
                    id="businessName"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    placeholder="Salón de Belleza María"
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo Electrónico *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="maria@email.com"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="(809) 123-4567"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección *
                  </label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Santo Domingo, DN"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Contraseña *
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmar Contraseña *
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Service Categories */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Categorías de Servicios * (Selecciona las que ofreces)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {Object.keys(SERVICE_CATEGORY_COLORS).map((key) => (
                    <label key={key} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.categories.includes(key)}
                        onChange={() => handleCategoryToggle(key)}
                        className="rounded text-femfuel-pink focus:ring-femfuel-pink"
                      />
                      <span className="text-sm font-medium">{CATEGORY_NAMES[key]}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta de Proveedor'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <p className="text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <Link href="/login" className="text-femfuel-pink hover:underline">
                  Inicia sesión aquí
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link 
                href="/" 
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Volver al inicio
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}