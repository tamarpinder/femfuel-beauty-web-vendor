import { supabase } from '@/lib/supabase/client'

type DocumentType = 'identity' | 'license' | 'certification'

interface VendorDocument {
  id: string
  vendor_id: string
  document_type: DocumentType
  name: string
  file_url: string
  status: string
  created_at: string
}

export class VendorDocumentManager {
  static async upload(
    vendorId: string,
    documentType: DocumentType,
    name: string,
    fileUrl: string
  ): Promise<VendorDocument | null> {
    const { data, error } = await supabase
      .from('vendor_documents')
      .insert({
        vendor_id: vendorId,
        document_type: documentType,
        name,
        file_url: fileUrl,
        status: 'pending',
      })
      .select()
      .single()

    if (error) {
      console.error('VendorDocumentManager.upload:', error.message)
      return null
    }
    return data
  }

  static async getByVendor(vendorId: string): Promise<VendorDocument[]> {
    const { data, error } = await supabase
      .from('vendor_documents')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('VendorDocumentManager.getByVendor:', error.message)
      return []
    }
    return data || []
  }
}
