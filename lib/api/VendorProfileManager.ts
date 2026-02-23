import { supabase } from '@/lib/supabase/client'

interface VendorProfileRow {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  role: string
  business_name: string | null
  description: string | null
  address: string | null
  district: string | null
  city: string | null
  slug: string | null
  rating: number | null
  total_reviews: number | null
  is_active: boolean
  is_verified: boolean
  is_approved: boolean
  service_categories: string[] | null
  logo_url: string | null
  avatar_url: string | null
  cover_image_url: string | null
  business_hours: Record<string, unknown> | null
  whatsapp: string | null
  instagram: string | null
  facebook: string | null
  created_at: string
}

const PROFILE_SELECT = `
  id, first_name, last_name, email, phone, role,
  business_name, description, address, district, city, slug,
  rating, total_reviews, is_active, is_verified, is_approved,
  service_categories, logo_url, avatar_url, cover_image_url, business_hours,
  whatsapp, instagram, facebook, created_at
`

export class VendorProfileManager {
  static async getProfile(vendorId: string): Promise<VendorProfileRow | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select(PROFILE_SELECT)
      .eq('id', vendorId)
      .single()

    if (error) {
      console.error('VendorProfileManager.getProfile:', error.message)
      return null
    }
    return data
  }

  static async getBySlug(slug: string): Promise<VendorProfileRow | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select(PROFILE_SELECT)
      .eq('slug', slug)
      .eq('role', 'vendor')
      .single()

    if (error) {
      console.error('VendorProfileManager.getBySlug:', error.message)
      return null
    }
    return data
  }

  static async update(
    vendorId: string,
    updates: Partial<VendorProfileRow>
  ): Promise<VendorProfileRow | null> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', vendorId)
      .select(PROFILE_SELECT)
      .single()

    if (error) {
      console.error('VendorProfileManager.update:', error.message)
      return null
    }
    return data
  }

  static async getReviews(vendorId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select('id, customer_id, vendor_id, service_id, rating, comment, reviewer_name, created_at, vendor_response, vendor_response_at')
      .eq('vendor_id', vendorId)
      .eq('is_visible', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('VendorProfileManager.getReviews:', error.message)
      return []
    }
    return data || []
  }

  static async getEmployees(vendorId: string) {
    const { data, error } = await supabase
      .from('vendor_employees')
      .select('id, name, position, avatar_url, is_active')
      .eq('vendor_id', vendorId)
      .eq('is_active', true)
      .order('name')

    if (error) {
      console.error('VendorProfileManager.getEmployees:', error.message)
      return []
    }
    return data || []
  }
}
