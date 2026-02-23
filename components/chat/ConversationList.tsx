'use client'

import { useTranslations } from 'next-intl'
import type { VendorChatConversation } from '@/lib/api/VendorChatManager'

interface ConversationListProps {
  conversations: VendorChatConversation[]
  selectedId: string | null
  onSelect: (id: string) => void
}

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function formatRelativeTime(dateStr: string | null): string {
  if (!dateStr) return ''
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 60) return `${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Ayer'
  return `${days}d`
}

export default function ConversationList({ conversations, selectedId, onSelect }: ConversationListProps) {
  const t = useTranslations('chat')
  const unreadCount = conversations.filter(c => c.vendorUnreadCount > 0).length

  return (
    <div className="w-1/3 border-r border-[var(--color-border-primary)] flex flex-col">
      <div className="p-4 border-b border-[var(--color-border-primary)]">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{t('title')}</h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          {t('unreadConversations', { count: unreadCount })}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 && (
          <div className="p-6 text-center">
            <p className="text-sm text-[var(--color-text-muted)]">{t('noConversations')}</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{t('noConversationsHint')}</p>
          </div>
        )}
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            className={`p-4 cursor-pointer transition-colors border-b border-[var(--color-border-primary)] hover:bg-[var(--color-bg-hover)] ${
              selectedId === conversation.id ? 'bg-[var(--color-primary)]/10' : ''
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white font-medium shrink-0">
                {getInitials(conversation.customerName)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                    {conversation.customerName}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {formatRelativeTime(conversation.lastMessageAt)}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[var(--color-text-muted)] truncate">
                    {conversation.lastMessageText || '...'}
                  </p>
                  {conversation.vendorUnreadCount > 0 && (
                    <span className="bg-[var(--color-primary)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shrink-0 ml-2">
                      {conversation.vendorUnreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
