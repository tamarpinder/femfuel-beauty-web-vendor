import { supabase } from '@/lib/supabase/client'

export interface GalleryRow {
  id: string
  vendor_id: string
  image_url: string
  caption: string | null
  sort_order: number | null
  created_at: string
}

export class VendorGalleryManager {
  static async getByVendor(vendorId: string): Promise<GalleryRow[]> {
    const { data, error } = await supabase
      .from('vendor_gallery')
      .select('id, vendor_id, image_url, caption, sort_order, created_at')
      .eq('vendor_id', vendorId)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('VendorGalleryManager.getByVendor:', error.message)
      return []
    }
    return data || []
  }

  static async add(
    vendorId: string,
    imageUrl: string,
    caption?: string
  ): Promise<GalleryRow | null> {
    const { data, error } = await supabase
      .from('vendor_gallery')
      .insert({
        vendor_id: vendorId,
        image_url: imageUrl,
        caption: caption || null,
      })
      .select('id, vendor_id, image_url, caption, sort_order, created_at')
      .single()

    if (error) {
      console.error('VendorGalleryManager.add:', error.message)
      return null
    }
    return data
  }

  static async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('vendor_gallery')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('VendorGalleryManager.delete:', error.message)
      return false
    }
    return true
  }
}
