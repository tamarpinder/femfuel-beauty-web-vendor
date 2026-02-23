'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Paperclip } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { chat } from '@/lib/api'
import type { ChatMessage } from '@/lib/api/VendorChatManager'

interface MessageThreadProps {
  conversationId: string
  customerName: string
  vendorProfileId: string
}

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function formatTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleTimeString('es-DO', { hour: '2-digit', minute: '2-digit' })
}

export default function MessageThread({ conversationId, customerName, vendorProfileId }: MessageThreadProps) {
  const t = useTranslations('chat')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [messageInput, setMessageInput] = useState('')
  const [sending, setSending] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadMessages() {
      const msgs = await chat.getMessages(conversationId)
      if (!cancelled) {
        setMessages(msgs)
        setTimeout(scrollToBottom, 50)
      }
    }

    loadMessages()
    chat.markRead(conversationId)

    const channel = chat.subscribeToMessages(conversationId, (newMsg) => {
      setMessages(prev => {
        if (prev.some(m => m.id === newMsg.id)) return prev
        return [...prev, newMsg]
      })
      setTimeout(scrollToBottom, 50)
    })

    return () => {
      cancelled = true
      if (channel) chat.unsubscribe(channel)
    }
  }, [conversationId, scrollToBottom])

  const handleSend = async () => {
    const text = messageInput.trim()
    if (!text || sending) return

    setSending(true)
    setMessageInput('')

    const sent = await chat.sendMessage(conversationId, text)
    if (sent) {
      setMessages(prev => {
        if (prev.some(m => m.id === sent.id)) return prev
        return [...prev, sent]
      })
      setTimeout(scrollToBottom, 50)
    }
    setSending(false)
  }

  const quickResponses = [t('quickResponse1'), t('quickResponse2'), t('quickResponse3'), t('quickResponse4')]

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-tertiary)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white font-medium">
              {getInitials(customerName)}
            </div>
            <div>
              <h3 className="font-medium text-[var(--color-text-primary)]">{customerName}</h3>
              <p className="text-sm text-[var(--color-text-muted)]">{t('online')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline">{t('call')}</Button>
            <Button size="sm" variant="outline">{t('schedule')}</Button>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isVendor = message.senderId === vendorProfileId
          return (
            <div key={message.id} className={`flex ${isVendor ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                isVendor
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)]'
              }`}>
                <p className="text-sm">{message.message}</p>
                <p className={`text-xs mt-1 ${isVendor ? 'text-white/70' : 'text-[var(--color-text-muted)]'}`}>
                  {formatTime(message.createdAt)}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-4 border-t border-[var(--color-border-primary)]">
        <div className="flex items-center space-x-4">
          <Button size="sm" variant="outline"><Paperclip className="h-4 w-4" /></Button>
          <div className="flex-1">
            <Input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={t('messagePlaceholder')}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
          </div>
          <Button onClick={handleSend} disabled={!messageInput.trim() || sending}>
            {t('send')}
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {quickResponses.map((qr, i) => (
            <button
              key={i}
              onClick={() => setMessageInput(qr)}
              className="px-3 py-1 bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] rounded-full text-xs hover:bg-[var(--color-bg-hover)] transition-colors"
            >
              {qr}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
