'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { mockData } from '@/data/shared/mock-data';

interface VendorProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
  business_name?: string;
  service_categories?: string[];
  is_approved?: boolean;
  is_active?: boolean;
  is_verified?: boolean;
  avatar_url?: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  profile: VendorProfile | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<VendorProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      // Check for mock session in localStorage (demo mode)
      const mockSession = localStorage.getItem('mockVendorSession');
      
      if (mockSession) {
        const sessionData = JSON.parse(mockSession);
        
        // Map demo email to actual vendor data (first vendor = Glamour Studio RD)
        let vendorEmail = sessionData.email;
        if (sessionData.email === 'owner@glamourhouse.com') {
          vendorEmail = 'vendor1@femfuel.com'; // Map to first vendor in mock data
        }
        
        // Find vendor in mock data
        const vendor = mockData.vendorProfiles.find(v => v.user.email === vendorEmail);
        
        if (vendor) {
          const mockUser = {
            id: vendor.user.id,
            email: vendor.user.email,
            // Add other User properties as needed
          } as User;

          const vendorProfile = {
            id: vendor.id,
            full_name: vendor.businessName,
            email: vendor.user.email,
            role: 'vendor',
            phone: vendor.user.phone,
            address: `${vendor.location.address}, ${vendor.location.district}, ${vendor.location.city}`,
            business_name: vendor.businessName,
            service_categories: vendor.categories,
            is_approved: true,
            is_active: vendor.isActive,
            is_verified: vendor.isVerified,
            avatar_url: vendor.user.avatar,
            created_at: vendor.joinedDate,
          };

          setUser(mockUser);
          setProfile(vendorProfile);
          setSession({ user: mockUser } as Session);
        }
      }

      setLoading(false);
    };

    getSession();
  }, [router]);

  const signOut = async () => {
    localStorage.removeItem('mockVendorSession');
    setUser(null);
    setProfile(null);
    setSession(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      session,
      loading,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}