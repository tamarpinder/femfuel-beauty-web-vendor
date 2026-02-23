import { supabase } from '@/lib/supabase/client'

const BUCKET = 'images'

export class VendorStorageManager {
  static async upload(
    vendorSlug: string,
    folder: string,
    file: File
  ): Promise<string | null> {
    const ext = file.name.split('.').pop() || 'jpg'
    const timestamp = Date.now()
    const path = `vendors/${vendorSlug}/${folder}/${timestamp}.${ext}`

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { upsert: true })

    if (error) {
      console.error('VendorStorageManager.upload:', error.message)
      return null
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(path)

    return urlData.publicUrl
  }

  static async delete(publicUrl: string): Promise<boolean> {
    // Extract path from full public URL
    const match = publicUrl.match(/\/storage\/v1\/object\/public\/images\/(.+)/)
    if (!match) return false

    const { error } = await supabase.storage
      .from(BUCKET)
      .remove([match[1]])

    if (error) {
      console.error('VendorStorageManager.delete:', error.message)
      return false
    }
    return true
  }
}
