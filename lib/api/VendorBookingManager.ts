import { supabase } from '@/lib/supabase/client'

export interface EnrichedBooking {
  id: string
  vendor_id: string
  customer_id: string
  service_id: string
  professional_id: string | null
  scheduled_date: string
  scheduled_time: string
  status: string
  total_amount: number
  notes: string | null
  cancellation_reason: string | null
  payment_status: string
  booking_reference: string | null
  created_at: string
  profiles: {
    first_name: string
    last_name: string
    phone: string
    email: string
  } | null
  services: {
    name: string
    price: number
    duration: number
    category: string
  } | null
}

const ENRICHED_SELECT = `
  id, vendor_id, customer_id, service_id, professional_id,
  scheduled_date, scheduled_time, status, total_amount,
  notes, cancellation_reason, payment_status, booking_reference, created_at,
  profiles!bookings_customer_id_fkey(first_name, last_name, phone, email),
  services(name, price, duration, category)
`

const PLAIN_SELECT = `
  id, vendor_id, customer_id, service_id, professional_id,
  scheduled_date, scheduled_time, status, total_amount,
  notes, cancellation_reason, payment_status, booking_reference, created_at
`

export class VendorBookingManager {
  static async getByVendor(vendorId: string): Promise<EnrichedBooking[]> {
    const { data, error } = await supabase
      .from('bookings')
      .select(ENRICHED_SELECT)
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('VendorBookingManager.getByVendor:', error.message)
      return []
    }
    return (data as unknown as EnrichedBooking[]) || []
  }

  static async getUpcoming(vendorId: string): Promise<EnrichedBooking[]> {
    const today = new Date().toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('bookings')
      .select(ENRICHED_SELECT)
      .eq('vendor_id', vendorId)
      .gte('scheduled_date', today)
      .in('status', ['pending', 'confirmed'])
      .order('scheduled_date', { ascending: true })

    if (error) {
      console.error('VendorBookingManager.getUpcoming:', error.message)
      return []
    }
    return (data as unknown as EnrichedBooking[]) || []
  }

  static async updateStatus(
    bookingId: string,
    status: string,
    cancellationReason?: string
  ): Promise<EnrichedBooking | null> {
    const updates: Record<string, unknown> = { status }
    if (cancellationReason) updates.cancellation_reason = cancellationReason

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', bookingId)
      .select(PLAIN_SELECT)
      .single()

    if (error) {
      console.error('VendorBookingManager.updateStatus:', error.message)
      return null
    }
    return data as unknown as EnrichedBooking
  }
}
