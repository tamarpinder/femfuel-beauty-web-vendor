import { supabase } from '@/lib/supabase/client'

interface ServiceRow {
  id: string
  vendor_id: string
  name: string
  description: string | null
  category: string
  price: number
  duration: number
  is_active: boolean
  is_popular: boolean
  image_url: string | null
  created_at: string
}

const SERVICE_SELECT = `
  id, vendor_id, name, description, category,
  price, duration, is_active, is_popular, image_url, created_at
`

export class VendorServiceManager {
  static async getByVendor(vendorId: string): Promise<ServiceRow[]> {
    const { data, error } = await supabase
      .from('services')
      .select(SERVICE_SELECT)
      .eq('vendor_id', vendorId)
      .order('category')
      .order('name')

    if (error) {
      console.error('VendorServiceManager.getByVendor:', error.message)
      return []
    }
    return data || []
  }

  static async create(serviceData: Partial<ServiceRow>): Promise<ServiceRow | null> {
    const { data, error } = await supabase
      .from('services')
      .insert(serviceData)
      .select(SERVICE_SELECT)
      .single()

    if (error) {
      console.error('VendorServiceManager.create:', error.message)
      return null
    }
    return data
  }

  static async update(id: string, updates: Partial<ServiceRow>): Promise<ServiceRow | null> {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id)
      .select(SERVICE_SELECT)
      .single()

    if (error) {
      console.error('VendorServiceManager.update:', error.message)
      return null
    }
    return data
  }

  static async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('VendorServiceManager.delete:', error.message)
      return false
    }
    return true
  }
}
