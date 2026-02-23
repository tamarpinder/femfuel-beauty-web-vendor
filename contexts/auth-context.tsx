'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { VendorProfileManager } from '@/lib/api/VendorProfileManager'

interface VendorProfile {
  id: string
  full_name: string
  email: string
  role: string
  phone?: string
  address?: string
  business_name?: string
  service_categories?: string[]
  is_approved?: boolean
  is_active?: boolean
  is_verified?: boolean
  avatar_url?: string
  rating?: number
  total_reviews?: number
  created_at: string
  vendorId: string
}

interface AuthContextType {
  user: User | null
  profile: VendorProfile | null
  session: Session | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function profileRowToVendorProfile(row: any): VendorProfile {
  return {
    id: row.id as string,
    full_name: (row.business_name as string) || `${row.first_name} ${row.last_name}`,
    email: row.email as string,
    role: row.role as string,
    phone: row.phone as string | undefined,
    address: [row.address, row.district, row.city].filter(Boolean).join(', '),
    business_name: row.business_name as string | undefined,
    service_categories: row.service_categories as string[] | undefined,
    is_approved: (row.is_approved as boolean) ?? true,
    is_active: row.is_active as boolean,
    is_verified: row.is_verified as boolean,
    avatar_url: (row.logo_url || row.avatar_url) as string | undefined,
    rating: parseFloat(String(row.rating || 0)) || undefined,
    total_reviews: (row.total_reviews as number) || undefined,
    created_at: row.created_at as string,
    vendorId: row.vendorId || row.id,
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<VendorProfile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const init = async () => {
      // 1. Check real Supabase session
      const { data: { session: supaSession } } = await supabase.auth.getSession()

      if (supaSession?.user) {
        setUser(supaSession.user)
        setSession(supaSession)

        const profileData = await VendorProfileManager.getProfile(supaSession.user.id)
        if (profileData) {
          const enriched = { ...profileData, vendorId: profileData.id }
          const vp = profileRowToVendorProfile(enriched)
          setProfile(vp)
          localStorage.setItem('vendorProfile', JSON.stringify(enriched))
        }
        setLoading(false)
        return
      }

      // 2. Demo mode fallback — check localStorage mock session
      const mockSession = localStorage.getItem('mockVendorSession')
      if (mockSession) {
        const stored = localStorage.getItem('vendorProfile')
        if (stored) {
          const cached = JSON.parse(stored)
          const vp = profileRowToVendorProfile(cached)
          setUser({ id: cached.id, email: cached.email } as User)
          setProfile(vp)
          setSession({ user: { id: cached.id, email: cached.email } } as Session)
        } else {
          const profileData = await VendorProfileManager.getBySlug('glamour-house')
          if (profileData) {
            const enriched = { ...profileData, vendorId: profileData.id }
            const vp = profileRowToVendorProfile(enriched)
            setUser({ id: profileData.id, email: profileData.email } as User)
            setProfile(vp)
            setSession({ user: { id: profileData.id, email: profileData.email } } as Session)
            localStorage.setItem('vendorProfile', JSON.stringify(enriched))
          }
        }
      }

      setLoading(false)
    }

    init()
  }, [router])

  const signOut = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('mockVendorSession')
    localStorage.removeItem('vendorProfile')
    setUser(null)
    setProfile(null)
    setSession(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, profile, session, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
