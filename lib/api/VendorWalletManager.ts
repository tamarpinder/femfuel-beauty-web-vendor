import { supabase } from '@/lib/supabase/client'

export interface Payout {
  id: string
  vendor_id: string
  amount: number
  gross_amount: number | null
  commission_amount: number | null
  express_fee: number | null
  status: 'pending' | 'processing' | 'completed' | 'failed'
  payout_type: string | null
  bank_name: string | null
  bank_account_last4: string | null
  bank_account_id: string | null
  requested_at: string
  processed_at: string | null
  eligible_at: string | null
  period_start: string | null
  period_end: string | null
  notes: string | null
  rejection_reason: string | null
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
    bankAccountId?: string
  ): Promise<Payout | null> {
    const { commissionRate, bankSnapshot } = await this.fetchPayoutContext(
      vendorId,
      bankAccountId
    )

    const grossAmount = amount / (1 - commissionRate / 100)
    const commissionAmount = grossAmount - amount

    const { data, error } = await supabase
      .from('vendor_payouts')
      .insert({
        vendor_id: vendorId,
        amount,
        gross_amount: Math.round(grossAmount * 100) / 100,
        commission_amount: Math.round(commissionAmount * 100) / 100,
        status: 'pending',
        payout_type: 'standard',
        bank_name: bankSnapshot?.bank_name ?? null,
        bank_account_last4: bankSnapshot?.account_number_last4 ?? null,
        bank_account_id: bankAccountId || null,
        initiated_by: 'vendor',
        requested_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Error requesting payout:', error)
      return null
    }

    return data
  }

  private static async fetchPayoutContext(
    vendorId: string,
    bankAccountId?: string
  ): Promise<{
    commissionRate: number
    bankSnapshot: { bank_name: string; account_number_last4: string } | null
  }> {
    const { data: settings } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'commissionRate')
      .single()

    const commissionRate = settings?.value ?? 8

    let bankSnapshot = null
    if (bankAccountId) {
      const { data: bank } = await supabase
        .from('bank_accounts')
        .select('bank_name, account_number_last4')
        .eq('id', bankAccountId)
        .eq('profile_id', vendorId)
        .single()
      bankSnapshot = bank
    }

    return { commissionRate, bankSnapshot }
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
