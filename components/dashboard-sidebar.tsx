'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Scissors, Calendar, DollarSign, MessageCircle, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VENDOR_PHRASES } from '@/lib/constants';

const navigation = [
  {
    name: VENDOR_PHRASES.dashboard,
    href: '/dashboard',
    icon: BarChart3,
  },
  {
    name: VENDOR_PHRASES.services,
    href: '/dashboard/services',
    icon: Scissors,
  },
  {
    name: VENDOR_PHRASES.bookings,
    href: '/dashboard/bookings',
    icon: Calendar,
  },
  {
    name: VENDOR_PHRASES.earnings,
    href: '/dashboard/earnings',
    icon: DollarSign,
  },
  {
    name: 'Chat',
    href: '/dashboard/chat',
    icon: MessageCircle,
  },
  {
    name: VENDOR_PHRASES.profile,
    href: '/dashboard/profile',
    icon: User,
  },
];

interface DashboardSidebarProps {
  className?: string;
}

export function DashboardSidebar({ className }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn('flex flex-col h-full bg-white border-r border-gray-200', className)}>
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
                  ? 'bg-femfuel-rose text-white'
                  : 'text-femfuel-medium hover:bg-gray-100 hover:text-femfuel-dark'
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}