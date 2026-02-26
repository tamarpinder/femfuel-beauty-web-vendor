// Real Supabase API — replaces mock data layer
import { VendorBookingManager } from './api/VendorBookingManager'
import { VendorServiceManager } from './api/VendorServiceManager'
import { VendorProfileManager } from './api/VendorProfileManager'
import { VendorWalletManager } from './api/VendorWalletManager'
import { VendorEmployeeManager } from './api/VendorEmployeeManager'
import { VendorGalleryManager } from './api/VendorGalleryManager'
import { VendorStorageManager } from './api/VendorStorageManager'
import { ScheduleBlockManager } from './api/ScheduleBlockManager'
import type { BlockType } from './api/ScheduleBlockManager'
import { BankAccountManager } from './api/BankAccountManager'
import { VendorChatManager } from './api/VendorChatManager'
import type { RealtimeChannel } from '@supabase/supabase-js'

export { supabase } from './supabase/client'

// Get vendor ID from localStorage session
function getVendorId(): string | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('vendorProfile')
  if (!stored) return null
  try {
    const parsed = JSON.parse(stored)
    return parsed.vendorId || parsed.id || null
  } catch {
    return null
  }
}

function getVendorSlug(): string | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('vendorProfile')
  if (!stored) return null
  try {
    return JSON.parse(stored).slug || null
  } catch {
    return null
  }
}

function getProfileId(): string | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem('vendorProfile')
  if (!stored) return null
  try {
    return JSON.parse(stored).profileId || JSON.parse(stored).id || null
  } catch {
    return null
  }
}

export const bookings = {
  getByVendor: async () => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: [], error: 'No vendor found' }
    const data = await VendorBookingManager.getByVendor(vendorId)
    return { data, error: null }
  },

  getUpcoming: async () => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: [], error: 'No vendor found' }
    const data = await VendorBookingManager.getUpcoming(vendorId)
    return { data, error: null }
  },

  updateStatus: async (id: string, status: string, cancellationReason?: string) => {
    const data = await VendorBookingManager.updateStatus(id, status, cancellationReason)
    if (!data) return { data: null, error: 'Failed to update' }
    return { data, error: null }
  },
}

export const services = {
  getByVendor: async () => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: [], error: 'No vendor found' }
    const data = await VendorServiceManager.getByVendor(vendorId)
    return { data, error: null }
  },

  create: async (serviceData: Record<string, unknown>) => {
    const data = await VendorServiceManager.create(
      serviceData as Parameters<typeof VendorServiceManager.create>[0]
    )
    if (!data) return { data: null, error: 'Failed to create' }
    return { data, error: null }
  },

  update: async (id: string, updates: Record<string, unknown>) => {
    const data = await VendorServiceManager.update(
      id,
      updates as Parameters<typeof VendorServiceManager.update>[1]
    )
    if (!data) return { data: null, error: 'Failed to update' }
    return { data, error: null }
  },

  delete: async (id: string) => {
    const success = await VendorServiceManager.delete(id)
    if (!success) return { data: null, error: 'Failed to delete' }
    return { data: { id }, error: null }
  },
}

export const profiles = {
  getVendor: async () => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: null, error: 'No vendor found' }
    const data = await VendorProfileManager.getProfile(vendorId)
    if (!data) return { data: null, error: 'Profile not found' }
    return { data, error: null }
  },

  update: async (updates: Record<string, unknown>) => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: null, error: 'No vendor found' }
    const data = await VendorProfileManager.update(
      vendorId,
      updates as Parameters<typeof VendorProfileManager.update>[1]
    )
    if (!data) return { data: null, error: 'Failed to update' }
    return { data, error: null }
  },
}

export const reviews = {
  getByVendor: async () => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: [], error: 'No vendor found' }
    const data = await VendorProfileManager.getReviews(vendorId)
    return { data, error: null }
  },
}

export const wallet = {
  getPayouts: async () => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: [], error: 'No vendor found' }
    const data = await VendorWalletManager.getPayouts(vendorId)
    return { data, error: null }
  },

  requestPayout: async (amount: number, bankAccountId?: string) => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: null, error: 'No vendor found' }
    const data = await VendorWalletManager.requestPayout(vendorId, amount, bankAccountId)
    if (!data) return { data: null, error: 'Failed to request payout' }
    return { data, error: null }
  },

  getEarningsByEmployee: async () => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: [], error: 'No vendor found' }
    const data = await VendorWalletManager.getEarningsByEmployee(vendorId)
    return { data, error: null }
  },
}

export const employees = {
  getByVendor: async () => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: [], error: 'No vendor found' }
    const data = await VendorEmployeeManager.getByVendor(vendorId)
    return { data, error: null }
  },

  create: async (employeeData: Record<string, unknown>) => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: null, error: 'No vendor found' }
    const data = await VendorEmployeeManager.create({
      ...employeeData,
      vendor_id: vendorId,
      is_active: true,
    } as Parameters<typeof VendorEmployeeManager.create>[0])
    if (!data) return { data: null, error: 'Failed to create' }
    return { data, error: null }
  },

  update: async (id: string, updates: Record<string, unknown>) => {
    const data = await VendorEmployeeManager.update(
      id,
      updates as Parameters<typeof VendorEmployeeManager.update>[1]
    )
    if (!data) return { data: null, error: 'Failed to update' }
    return { data, error: null }
  },

  delete: async (id: string) => {
    const success = await VendorEmployeeManager.delete(id)
    if (!success) return { data: null, error: 'Failed to delete' }
    return { data: { id }, error: null }
  },
}

export const gallery = {
  getByVendor: async () => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: [], error: 'No vendor found' }
    const data = await VendorGalleryManager.getByVendor(vendorId)
    return { data, error: null }
  },

  add: async (imageUrl: string, caption?: string) => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: null, error: 'No vendor found' }
    const data = await VendorGalleryManager.add(vendorId, imageUrl, caption)
    if (!data) return { data: null, error: 'Failed to add' }
    return { data, error: null }
  },

  delete: async (id: string) => {
    const success = await VendorGalleryManager.delete(id)
    if (!success) return { data: null, error: 'Failed to delete' }
    return { data: { id }, error: null }
  },
}

export const scheduleBlocks = {
  getByVendor: async () => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: [], error: 'No vendor found' }
    const data = await ScheduleBlockManager.getByVendor(vendorId)
    return { data, error: null }
  },

  getByDateRange: async (startDate: string, endDate: string) => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: [], error: 'No vendor found' }
    const data = await ScheduleBlockManager.getByDateRange(vendorId, startDate, endDate)
    return { data, error: null }
  },

  create: async (block: { block_date: string; start_time: string; end_time: string; block_type: BlockType; title?: string; notes?: string }) => {
    const vendorId = getVendorId()
    if (!vendorId) return { data: null, error: 'No vendor found' }
    const data = await ScheduleBlockManager.create({ ...block, vendor_id: vendorId, employee_id: null })
    if (!data) return { data: null, error: 'Failed to create block' }
    return { data, error: null }
  },

  delete: async (id: string) => {
    const success = await ScheduleBlockManager.delete(id)
    if (!success) return { data: null, error: 'Failed to delete block' }
    return { data: { id }, error: null }
  },
}

export const storage = {
  upload: async (folder: string, file: File) => {
    const slug = getVendorSlug()
    if (!slug) return { data: null, error: 'No vendor found' }
    const url = await VendorStorageManager.upload(slug, folder, file)
    if (!url) return { data: null, error: 'Upload failed' }
    return { data: url, error: null }
  },

  delete: async (publicUrl: string) => {
    const success = await VendorStorageManager.delete(publicUrl)
    if (!success) return { data: null, error: 'Delete failed' }
    return { data: true, error: null }
  },
}

export const chat = {
  getConversations: async () => {
    const vendorId = getVendorId()
    if (!vendorId) return []
    return VendorChatManager.getConversations(vendorId)
  },

  getMessages: async (conversationId: string) => {
    return VendorChatManager.getMessages(conversationId)
  },

  sendMessage: async (conversationId: string, message: string) => {
    const profileId = getProfileId()
    if (!profileId) return null
    return VendorChatManager.sendMessage(conversationId, profileId, message)
  },

  markRead: async (conversationId: string) => {
    const profileId = getProfileId()
    if (!profileId) return
    return VendorChatManager.markConversationRead(conversationId, profileId)
  },

  getUnreadCount: async () => {
    const vendorId = getVendorId()
    if (!vendorId) return 0
    return VendorChatManager.getTotalUnreadCount(vendorId)
  },

  subscribeToMessages: (conversationId: string, callback: Parameters<typeof VendorChatManager.subscribeToMessages>[1]) => {
    return VendorChatManager.subscribeToMessages(conversationId, callback)
  },

  subscribeToConversations: (callback: () => void) => {
    const vendorId = getVendorId()
    if (!vendorId) return null
    return VendorChatManager.subscribeToConversations(vendorId, callback)
  },

  unsubscribe: (channel: RealtimeChannel) => {
    VendorChatManager.unsubscribe(channel)
  },
}

export const bankAccounts = {
  getByProfile: async () => {
    const profileId = getProfileId()
    if (!profileId) return { data: [], error: 'No profile found' }
    const data = await BankAccountManager.getByProfile(profileId)
    return { data, error: null }
  },

  create: async (account: { bank_name: string; account_holder: string; account_number_last4: string; account_type: string; is_default: boolean }) => {
    const profileId = getProfileId()
    if (!profileId) return { data: null, error: 'No profile found' }
    const data = await BankAccountManager.create({ ...account, profile_id: profileId })
    if (!data) return { data: null, error: 'Failed to create' }
    return { data, error: null }
  },

  delete: async (id: string) => {
    const success = await BankAccountManager.delete(id)
    if (!success) return { data: null, error: 'Failed to delete' }
    return { data: { id }, error: null }
  },

  setDefault: async (id: string) => {
    const profileId = getProfileId()
    if (!profileId) return { data: null, error: 'No profile found' }
    const success = await BankAccountManager.setDefault(id, profileId)
    if (!success) return { data: null, error: 'Failed to set default' }
    return { data: true, error: null }
  },
}
