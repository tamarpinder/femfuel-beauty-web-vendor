import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

const isServer = typeof window === 'undefined'

const noopStorage = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getItem: (_key: string) => null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setItem: (_key: string, _value: string) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeItem: (_key: string) => {},
}

export const supabase: SupabaseClient = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      storage: isServer ? noopStorage : globalThis.localStorage,
      autoRefreshToken: !isServer,
      detectSessionInUrl: !isServer,
    },
  }
)
