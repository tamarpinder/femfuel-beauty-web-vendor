import { supabase } from '@/lib/supabase/client'

export interface Payout {
  id: string
  vendor_id: string
  amount: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  bank_name: string | null
  bank_account_last4: string | null
  requested_at: string
  processed_at: string | null
  notes: string | null
  created_at: string
}

export interface EmployeeEarnings {
  professional_id: string | null
  professional_name: string
  total_earnings: number
  completed_services: number
  commission_rate: number
  stylist_share: number
  salon_share: number
}

interface EmployeeLookup {
  name: string
  commission_rate: number
}

export class VendorWalletManager {
  static async getPayouts(vendorId: string): Promise<Payout[]> {
    const { data, error } = await supabase
      .from('vendor_payouts')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('requested_at', { ascending: false })

    if (error) {
      console.error('Error fetching payouts:', error)
      return []
    }

    return data || []
  }

  static async requestPayout(
    vendorId: string,
    amount: number,
    bankName?: string,
    bankLast4?: string
  ): Promise<Payout | null> {
    const { data, error } = await supabase
      .from('vendor_payouts')
      .insert({
        vendor_id: vendorId,
        amount,
        status: 'pending',
        bank_name: bankName || null,
        bank_account_last4: bankLast4 || null,
      })
      .select()
      .single()

    if (error) {
      console.error('Error requesting payout:', error)
      return null
    }

    return data
  }

  private static async buildEmployeeMap(
    vendorId: string
  ): Promise<Map<string, EmployeeLookup>> {
    const map = new Map<string, EmployeeLookup>()
    const { data } = await supabase
      .from('vendor_employees')
      .select('id, name, commission_rate')
      .eq('vendor_id', vendorId)
      .eq('is_active', true)

    if (data) {
      data.forEach(emp => {
        map.set(emp.id, { name: emp.name, commission_rate: emp.commission_rate })
      })
    }
    return map
  }

  private static computeShares(
    total: number,
    rate: number
  ): { stylist_share: number; salon_share: number } {
    const stylist_share = Math.round(total * rate / 100)
    return { stylist_share, salon_share: total - stylist_share }
  }

  static async getEarningsByEmployee(vendorId: string): Promise<EmployeeEarnings[]> {
    const { data: bookingsData, error } = await supabase
      .from('bookings')
      .select('professional_id, total_amount')
      .eq('vendor_id', vendorId)
      .eq('status', 'completed')

    if (error) {
      console.error('Error fetching employee earnings:', error)
      return []
    }

    const employeeMap = await this.buildEmployeeMap(vendorId)

    const earningsMap = new Map<string | null, { total: number; count: number }>()
    for (const booking of bookingsData || []) {
      const key = booking.professional_id || null
      const existing = earningsMap.get(key) || { total: 0, count: 0 }
      earningsMap.set(key, {
        total: existing.total + (booking.total_amount || 0),
        count: existing.count + 1,
      })
    }

    const results: EmployeeEarnings[] = []
    for (const [profId, stats] of earningsMap) {
      const lookup = profId ? employeeMap.get(profId) : null
      const name = profId ? (lookup?.name || profId) : 'owner'
      const rate = lookup?.commission_rate ?? 100
      const shares = this.computeShares(stats.total, rate)

      results.push({
        professional_id: profId,
        professional_name: name,
        total_earnings: stats.total,
        completed_services: stats.count,
        commission_rate: rate,
        ...shares,
      })
    }

    return results.sort((a, b) => b.total_earnings - a.total_earnings)
  }

}
