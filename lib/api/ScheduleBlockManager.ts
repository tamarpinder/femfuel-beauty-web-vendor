import { supabase } from '@/lib/supabase/client'

export type BlockType = 'lunch' | 'personal' | 'walk_in' | 'day_off' | 'custom'

export interface ScheduleBlock {
  id: string
  vendor_id: string
  employee_id: string | null
  block_date: string
  start_time: string
  end_time: string
  block_type: BlockType
  title: string | null
  notes: string | null
  created_at: string
}

const BLOCK_SELECT = `id, vendor_id, employee_id, block_date, start_time, end_time, block_type, title, notes, created_at`

export class ScheduleBlockManager {
  static async getByVendor(vendorId: string, employeeId?: string): Promise<ScheduleBlock[]> {
    let query = supabase
      .from('schedule_blocks')
      .select(BLOCK_SELECT)
      .eq('vendor_id', vendorId)
      .order('block_date', { ascending: true })

    if (employeeId) {
      query = query.eq('employee_id', employeeId)
    }

    const { data, error } = await query
    if (error) {
      console.error('ScheduleBlockManager.getByVendor:', error.message)
      return []
    }
    return data || []
  }

  static async getByDateRange(
    vendorId: string,
    startDate: string,
    endDate: string,
    employeeId?: string
  ): Promise<ScheduleBlock[]> {
    let query = supabase
      .from('schedule_blocks')
      .select(BLOCK_SELECT)
      .eq('vendor_id', vendorId)
      .gte('block_date', startDate)
      .lte('block_date', endDate)
      .order('block_date', { ascending: true })

    if (employeeId) {
      query = query.eq('employee_id', employeeId)
    }

    const { data, error } = await query
    if (error) {
      console.error('ScheduleBlockManager.getByDateRange:', error.message)
      return []
    }
    return data || []
  }

  static async create(block: {
    vendor_id: string
    employee_id?: string | null
    block_date: string
    start_time: string
    end_time: string
    block_type: BlockType
    title?: string
    notes?: string
  }): Promise<ScheduleBlock | null> {
    const { data, error } = await supabase
      .from('schedule_blocks')
      .insert(block)
      .select(BLOCK_SELECT)
      .single()

    if (error) {
      console.error('ScheduleBlockManager.create:', error.message)
      return null
    }
    return data
  }

  static async delete(blockId: string): Promise<boolean> {
    const { error } = await supabase
      .from('schedule_blocks')
      .delete()
      .eq('id', blockId)

    if (error) {
      console.error('ScheduleBlockManager.delete:', error.message)
      return false
    }
    return true
  }
}
