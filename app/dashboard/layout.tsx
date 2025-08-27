'use client';

import React from 'react';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { DashboardMobileNavigation } from '@/components/dashboard-mobile-nav';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Clock } from 'lucide-react';

function DashboardLayoutContent({ children }: { children: React.ReactNode }) {
  const { user, loading, profile } = useAuth();
  const router = useRouter();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-femfuel-pink mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    router.push('/login');
    return null;
  }

  // Show approval pending message
  if (profile && !profile.is_approved) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md p-8 bg-white rounded-xl shadow-lg text-center">
          <Clock className="h-16 w-16 text-femfuel-rose mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-femfuel-dark mb-4">
            Cuenta Pendiente de Aprobación
          </h2>
          <p className="text-gray-600 mb-6">
            Tu cuenta de proveedor está siendo revisada por nuestro equipo. 
            Te notificaremos por email cuando sea aprobada.
          </p>
          <p className="text-sm text-gray-500">
            Tiempo estimado: 24-48 horas
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar - Desktop only */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <DashboardSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 overflow-auto pb-20 md:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile Navigation */}
      <DashboardMobileNavigation />
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardLayoutContent>{children}</DashboardLayoutContent>
  );
}