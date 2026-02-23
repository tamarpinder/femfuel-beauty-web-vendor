import { supabase } from '@/lib/supabase/client'
import type { RealtimeChannel } from '@supabase/supabase-js'

export interface VendorChatConversation {
  id: string
  customerId: string
  vendorId: string
  customerName: string
  lastMessageText: string | null
  lastMessageAt: string | null
  vendorUnreadCount: number
  createdAt: string
}

export interface ChatMessage {
  id: string
  conversationId: string
  senderId: string
  message: string
  messageType: 'text' | 'image' | 'booking_link'
  metadata: Record<string, unknown>
  readAt: string | null
  createdAt: string
}

type ConversationRow = {
  id: string; customer_id: string; vendor_id: string
  last_message_text: string | null; last_message_at: string | null
  vendor_unread_count: number; created_at: string
}

type MessageRow = {
  id: string; conversation_id: string; sender_id: string; message: string
  message_type: string | null; metadata: Record<string, unknown> | null
  read_at: string | null; created_at: string
}

type CustomerProfile = { id: string; full_name: string }

export class VendorChatManager {

  static async getConversations(vendorId: string): Promise<VendorChatConversation[]> {
    const { data, error } = await supabase
      .from('chat_conversations')
      .select('id, customer_id, vendor_id, last_message_text, last_message_at, vendor_unread_count, created_at')
      .eq('vendor_id', vendorId)
      .order('last_message_at', { ascending: false, nullsFirst: false })

    if (error || !data) {
      if (error) console.error('VendorChatManager.getConversations error:', error.message)
      return []
    }

    const customerIds = data.map(c => c.customer_id)
    if (customerIds.length === 0) return []

    const { data: customers } = await supabase
      .from('profiles')
      .select('id, full_name')
      .in('id', customerIds)

    const customerMap = new Map(
      (customers || []).map((c: CustomerProfile) => [c.id, c])
    )

    return (data as ConversationRow[]).map(row => {
      const customer = customerMap.get(row.customer_id)
      return {
        id: row.id,
        customerId: row.customer_id,
        vendorId: row.vendor_id,
        customerName: customer?.full_name || 'Cliente',
        lastMessageText: row.last_message_text,
        lastMessageAt: row.last_message_at,
        vendorUnreadCount: row.vendor_unread_count || 0,
        createdAt: row.created_at,
      }
    })
  }

  static async getMessages(conversationId: string): Promise<ChatMessage[]> {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('id, conversation_id, sender_id, message, message_type, metadata, read_at, created_at')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true })

    if (error || !data) {
      if (error) console.error('VendorChatManager.getMessages error:', error.message)
      return []
    }

    return (data as MessageRow[]).map(row => ({
      id: row.id,
      conversationId: row.conversation_id,
      senderId: row.sender_id,
      message: row.message,
      messageType: (row.message_type || 'text') as ChatMessage['messageType'],
      metadata: row.metadata || {},
      readAt: row.read_at,
      createdAt: row.created_at,
    }))
  }

  static async sendMessage(
    conversationId: string,
    senderId: string,
    message: string
  ): Promise<ChatMessage | null> {
    const { data, error } = await supabase
      .from('chat_messages')
      .insert({ conversation_id: conversationId, sender_id: senderId, message, message_type: 'text' })
      .select('id, conversation_id, sender_id, message, message_type, metadata, read_at, created_at')
      .single()

    if (error || !data) {
      console.error('VendorChatManager.sendMessage error:', error)
      return null
    }

    await supabase
      .from('chat_conversations')
      .update({
        last_message_text: message,
        last_message_at: new Date().toISOString(),
      })
      .eq('id', conversationId)

    return {
      id: data.id,
      conversationId: data.conversation_id,
      senderId: data.sender_id,
      message: data.message,
      messageType: data.message_type || 'text',
      metadata: data.metadata || {},
      readAt: data.read_at,
      createdAt: data.created_at,
    }
  }

  static async markConversationRead(conversationId: string, vendorId: string): Promise<void> {
    await supabase
      .from('chat_messages')
      .update({ read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .neq('sender_id', vendorId)
      .is('read_at', null)

    await supabase
      .from('chat_conversations')
      .update({ vendor_unread_count: 0 })
      .eq('id', conversationId)
  }

  static subscribeToMessages(
    conversationId: string,
    onMessage: (msg: ChatMessage) => void
  ): RealtimeChannel {
    return supabase
      .channel(`vendor-chat:${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `conversation_id=eq.${conversationId}`,
      }, (payload) => {
        const row = payload.new as Record<string, unknown>
        onMessage({
          id: row.id as string,
          conversationId: row.conversation_id as string,
          senderId: row.sender_id as string,
          message: row.message as string,
          messageType: (row.message_type as ChatMessage['messageType']) || 'text',
          metadata: (row.metadata as Record<string, unknown>) || {},
          readAt: row.read_at as string | null,
          createdAt: row.created_at as string,
        })
      })
      .subscribe()
  }

  static subscribeToConversations(
    vendorId: string,
    callback: () => void
  ): RealtimeChannel {
    return supabase
      .channel(`vendor-convos:${vendorId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'chat_conversations',
        filter: `vendor_id=eq.${vendorId}`,
      }, callback)
      .subscribe()
  }

  static async getTotalUnreadCount(vendorId: string): Promise<number> {
    const { data, error } = await supabase
      .from('chat_conversations')
      .select('vendor_unread_count')
      .eq('vendor_id', vendorId)

    if (error || !data) return 0
    return data.reduce((sum: number, row: { vendor_unread_count: number | null }) =>
      sum + (row.vendor_unread_count || 0), 0)
  }

  static unsubscribe(channel: RealtimeChannel): void {
    supabase.removeChannel(channel)
  }
}
