"use client"

import { useAuth } from '@/contexts/auth-context'
import OwnerSettings from '@/components/settings/OwnerSettings'

export default function SettingsPage() {
  const { profile } = useAuth()

  if (!profile) return null

  return <OwnerSettings />
}
