'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { VENDOR_PHRASES } from '@/lib/constants';

const navigation = [
  {
    name: VENDOR_PHRASES.dashboard,
    href: '/dashboard',
    icon: '📊',
  },
  {
    name: VENDOR_PHRASES.services,
    href: '/dashboard/services',
    icon: '💅',
  },
  {
    name: VENDOR_PHRASES.bookings,
    href: '/dashboard/bookings',
    icon: '📅',
  },
  {
    name: VENDOR_PHRASES.earnings,
    href: '/dashboard/earnings',
    icon: '💰',
  },
  {
    name: 'Chat',
    href: '/dashboard/chat',
    icon: '💬',
  },
  {
    name: VENDOR_PHRASES.profile,
    href: '/dashboard/profile',
    icon: '👤',
  },
];

interface DashboardSidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn('flex flex-col h-full bg-white border-r border-gray-200', className)}>
      {/* Logo */}
      <div className="flex items-center px-6 py-4 border-b border-gray-200">
        <img 
          src="/Logo - Complete Transparency.png" 
          alt="FemFuel Beauty" 
          className="h-8 w-8"
        />
        <div className="ml-3">
          <h2 className="text-lg font-display font-bold text-femfuel-black">
            FemFuel
          </h2>
          <p className="text-xs text-gray-600">Panel de Proveedor</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
                          (item.href !== '/dashboard' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                isActive
                  ? 'bg-femfuel-pink text-white'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}