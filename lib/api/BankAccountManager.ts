import { supabase } from '@/lib/supabase/client'

export interface BankAccount {
  id: string
  profile_id: string
  bank_name: string
  account_holder: string
  account_number_last4: string
  account_type: string
  is_default: boolean
  created_at: string
}

const BANK_SELECT = `
  id, profile_id, bank_name, account_holder,
  account_number_last4, account_type, is_default, created_at
`

export class BankAccountManager {
  static async getByProfile(profileId: string): Promise<BankAccount[]> {
    const { data, error } = await supabase
      .from('bank_accounts')
      .select(BANK_SELECT)
      .eq('profile_id', profileId)
      .order('is_default', { ascending: false })

    if (error) {
      console.error('BankAccountManager.getByProfile:', error.message)
      return []
    }
    return data || []
  }

  static async create(
    account: Omit<BankAccount, 'id' | 'created_at'>
  ): Promise<BankAccount | null> {
    const { data, error } = await supabase
      .from('bank_accounts')
      .insert(account)
      .select(BANK_SELECT)
      .single()

    if (error) {
      console.error('BankAccountManager.create:', error.message)
      return null
    }
    return data
  }

  static async delete(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('bank_accounts')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('BankAccountManager.delete:', error.message)
      return false
    }
    return true
  }

  static async setDefault(id: string, profileId: string): Promise<boolean> {
    const { error: clearError } = await supabase
      .from('bank_accounts')
      .update({ is_default: false })
      .eq('profile_id', profileId)

    if (clearError) {
      console.error('BankAccountManager.setDefault clear:', clearError.message)
      return false
    }

    const { error } = await supabase
      .from('bank_accounts')
      .update({ is_default: true })
      .eq('id', id)

    if (error) {
      console.error('BankAccountManager.setDefault:', error.message)
      return false
    }
    return true
  }
}
