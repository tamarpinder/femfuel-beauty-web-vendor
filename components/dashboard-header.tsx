'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/auth-context';

export function DashboardHeader() {
  const { profile, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-femfuel-black">
            ¡Hola, {profile?.business_name || profile?.full_name}!
          </h1>
          <p className="text-sm text-gray-600">
            Gestiona tu negocio desde aquí
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="outline" size="sm" className="relative">
            <span className="text-lg">🔔</span>
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="h-8 w-8 bg-femfuel-pink rounded-full flex items-center justify-center text-white text-sm font-bold">
                {profile?.full_name?.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  {profile?.full_name}
                </p>
                <p className="text-xs text-gray-600">
                  {profile?.business_name}
                </p>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <a
                  href="/dashboard/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Ver Perfil
                </a>
                <a
                  href="/dashboard/settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Configuración
                </a>
                <hr className="my-2" />
                <button
                  onClick={signOut}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}