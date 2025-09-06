// API module - automatically uses mock data in demo mode
// Check if we're in demo mode
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || 
                   !process.env.NEXT_PUBLIC_SUPABASE_URL || 
                   process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co';

// Always use mock API for now since we're in demo mode
export * from './api-mock';