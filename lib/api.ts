import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('vendor_id', vendorId)
      .order('created_at', { ascending: false });
    return { data, error };
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
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        service:services(*),
        customer:profiles!customer_id(*)
      `)
      .eq('vendor_id', vendorId)
      .order('scheduled_date', { ascending: false });
    return { data, error };
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