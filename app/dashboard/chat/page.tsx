'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { chat } from '@/lib/api'
import type { VendorChatConversation } from '@/lib/api/VendorChatManager'
import ConversationList from '@/components/chat/ConversationList'
import MessageThread from '@/components/chat/MessageThread'

function getProfileId(): string {
  if (typeof window === 'undefined') return ''
  try {
    const stored = localStorage.getItem('vendorProfile')
    if (!stored) return ''
    const parsed = JSON.parse(stored)
    return parsed.profileId || parsed.id || ''
  } catch { return '' }
}

export default function ChatPage() {
  const t = useTranslations('chat')
  const [conversations, setConversations] = useState<VendorChatConversation[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const profileId = getProfileId()

  const loadConversations = useCallback(async () => {
    const data = await chat.getConversations()
    setConversations(data)
  }, [])

  useEffect(() => {
    loadConversations()
    const channel = chat.subscribeToConversations(() => loadConversations())
    return () => { if (channel) chat.unsubscribe(channel) }
  }, [loadConversations])

  const selectedConversation = conversations.find(c => c.id === selectedId)
  const totalUnread = conversations.reduce((sum, c) => sum + c.vendorUnreadCount, 0)

  const handleSelect = (id: string) => {
    setSelectedId(id)
    setConversations(prev =>
      prev.map(c => c.id === id ? { ...c, vendorUnreadCount: 0 } : c)
    )
  }

  return (
    <div className="p-6">
      <div className="flex h-[calc(100vh-8rem)] bg-[var(--color-bg-card)] rounded-[20px] shadow-lg overflow-hidden">
        <ConversationList
          conversations={conversations}
          selectedId={selectedId}
          onSelect={handleSelect}
        />

        {selectedConversation ? (
          <MessageThread
            key={selectedConversation.id}
            conversationId={selectedConversation.id}
            customerName={selectedConversation.customerName}
            vendorProfileId={profileId}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-[var(--color-text-muted)] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">{t('selectConversation')}</h3>
              <p className="text-[var(--color-text-muted)]">{t('selectConversationHint')}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-[var(--color-primary)]">{totalUnread}</div>
            <p className="text-sm text-[var(--color-text-muted)]">{t('unreadMessages')}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-[var(--color-success)]">{conversations.length}</div>
            <p className="text-sm text-[var(--color-text-muted)]">{t('totalConversations')}</p>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-[var(--color-info)]">15 min</div>
            <p className="text-sm text-[var(--color-text-muted)]">{t('avgResponseTime')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
