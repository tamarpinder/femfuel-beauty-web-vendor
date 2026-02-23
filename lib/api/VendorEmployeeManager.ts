import { supabase } from '@/lib/supabase/client'

export interface EmployeeRow {
  id: string
  vendor_id: string
  name: string
  position: string | null
  specialties: string[] | null
  phone: string | null
  email: string | null
  avatar_url: string | null
  bio: string | null
  rating: number | null
  years_experience: number | null
  portfolio_data: Record<string, unknown> | null
  is_active: boolean
  auth_user_id: string | null
  commission_rate: number
  created_at: string
}

const EMPLOYEE_SELECT = `
  id, vendor_id, name, position, specialties, phone, email,
  avatar_url, bio, rating, years_experience, portfolio_data,
  is_active, auth_user_id, commission_rate, created_at
`

export class VendorEmployeeManager {
  static async getByVendor(vendorId: string): Promise<EmployeeRow[]> {
    const { data, error } = await supabase
      .from('vendor_employees')
      .select(EMPLOYEE_SELECT)
      .eq('vendor_id', vendorId)
      .order('name')

    if (error) {
      console.error('VendorEmployeeManager.getByVendor:', error.message)
      return []
    }
    return data || []
  }

  static async create(
    employee: Omit<EmployeeRow, 'id' | 'created_at' | 'auth_user_id'>
  ): Promise<EmployeeRow | null> {
    const { data, error } = await supabase
      .from('vendor_employees')
      .insert(employee)
      .select(EMPLOYEE_SELECT)
      .single()

    if (error) {
      console.error('VendorEmployeeManager.create:', error.message)
      return null
    }
    return data
  }

  static async update(
    id: string,
    updates: Partial<Omit<EmployeeRow, 'id' | 'vendor_id' | 'created_at'>>
  ): Promise<EmployeeRow | null> {
    const { data, error } = await supabase
      .from('vendor_employees')
      .update(updates)
      .eq('id', id)
      .select(EMPLOYEE_SELECT)
      .single()

    if (error) {
      console.error('VendorEmployeeManager.update:', error.message)
      return null
    }
    return data
  }

  static async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('vendor_employees')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('VendorEmployeeManager.delete:', error.message)
      return false
    }
    return true
  }
}
