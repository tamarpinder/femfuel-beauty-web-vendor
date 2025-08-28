import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Check for missing environment variables
if (supabaseUrl === 'https://placeholder.supabase.co' || supabaseAnonKey === 'placeholder-key') {
  console.error('Missing Supabase environment variables. Please check your .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Helper function for retry logic
const withRetry = async <T>(operation: () => Promise<T>, maxRetries = 3): Promise<T> => {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }
  throw lastError;
};

export const auth = {
  signUp: async (email: string, password: string, metadata: {
    firstName: string;
    lastName: string;
    phone?: string;
    businessName: string;
    role: 'vendor';
  }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    return { data, error };
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  },

  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { session, error };
  },

  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    return { user, error };
  }
};

export const profiles = {
  getProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    return { data, error };
  },

  updateProfile: async (userId: string, updates: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    return { data, error };
  },

  createProfile: async (profile: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single();
    return { data, error };
  }
};

export const services = {
  getByVendor: async (vendorId: string) => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('vendor_id', vendorId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching services:', error);
        throw error;
      }
      
      return { data, error };
    });
  },

  create: async (service: {
    vendor_id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    duration: number;
    images?: string[];
  }) => {
    const { data, error } = await supabase
      .from('services')
      .insert(service)
      .select()
      .single();
    return { data, error };
  },

  update: async (serviceId: string, updates: Record<string, unknown>) => {
    const { data, error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', serviceId)
      .select()
      .single();
    return { data, error };
  },

  delete: async (serviceId: string) => {
    const { data, error } = await supabase
      .from('services')
      .update({ is_active: false })
      .eq('id', serviceId)
      .select()
      .single();
    return { data, error };
  }
};

export const bookings = {
  getByVendor: async (vendorId: string) => {
    return withRetry(async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          services!inner(*),
          profiles!inner(*)
        `)
        .eq('vendor_id', vendorId)
        .order('scheduled_date', { ascending: false });
      
      if (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }
      
      return { data, error };
    });
  },

  updateStatus: async (bookingId: string, status: string, cancellationReason?: string) => {
    const updates: Record<string, unknown> = { status };
    if (cancellationReason) {
      updates.cancellation_reason = cancellationReason;
    }

    const { data, error } = await supabase
      .from('bookings')
      .update(updates)
      .eq('id', bookingId)
      .select()
      .single();
    return { data, error };
  }
};

export const reviews = {
  getByVendor: async (vendorId: string) => {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        customer:profiles!customer_id(first_name, last_name)
      `)
      .eq('vendor_id', vendorId)
      .eq('is_visible', true)
      .order('created_at', { ascending: false });
    return { data, error };
  }
};

export const analytics = {
  getSalesReport: async (vendorId: string, startDate: string, endDate: string) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('total_amount, created_at, status')
      .eq('vendor_id', vendorId)
      .eq('payment_status', 'paid')
      .gte('created_at', startDate)
      .lte('created_at', endDate);
    return { data, error };
  },

  getBookingStats: async (vendorId: string) => {
    const { data, error } = await supabase
      .from('bookings')
      .select('status, created_at')
      .eq('vendor_id', vendorId);
    return { data, error };
  }
};

export default supabase;