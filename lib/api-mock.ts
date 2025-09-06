// Mock API implementation for demo mode
// Replaces Supabase API calls with mock data

import { mockData } from '@/data/shared/mock-data';

// Helper to simulate async API calls
const simulateDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Get current vendor from localStorage session
const getCurrentVendor = () => {
  const session = localStorage.getItem('mockVendorSession');
  if (!session) return null;
  
  const sessionData = JSON.parse(session);
  const vendorEmail = sessionData.email === 'owner@glamourhouse.com' 
    ? 'vendor1@femfuel.com' 
    : sessionData.email;
  
  return mockData.vendorProfiles.find(v => v.user.email === vendorEmail);
};

export const auth = {
  signUp: async (email: string) => {
    await simulateDelay();
    return { data: { user: { email } }, error: null };
  },
  
  signIn: async (email: string, password: string) => {
    await simulateDelay();
    if (email === 'owner@glamourhouse.com' && password === 'VendorLogin2025!') {
      return { data: { user: { email } }, error: null };
    }
    return { data: null, error: { message: 'Invalid credentials' } };
  },
  
  signOut: async () => {
    await simulateDelay();
    localStorage.removeItem('mockVendorSession');
    return { error: null };
  },
  
  getSession: async () => {
    const session = localStorage.getItem('mockVendorSession');
    return session ? JSON.parse(session) : null;
  },
  
  onAuthStateChange: () => {
    // Mock auth state listener
    return {
      data: { subscription: { unsubscribe: () => {} } }
    };
  }
};

export const bookings = {
  getByVendor: async () => {
    await simulateDelay();
    const vendor = getCurrentVendor();
    if (!vendor) return { data: [], error: 'No vendor found' };
    
    // Get bookings for this vendor
    const vendorBookings = mockData.bookings.filter(b => b.vendorId === vendor.id);
    
    // Transform bookings to match expected format
    const transformedBookings = vendorBookings.map(booking => {
      const service = mockData.services.find(s => s.id === booking.serviceId);
      const customer = mockData.customerProfiles.find(c => c.id === booking.customerId);
      
      return {
        id: booking.id,
        vendor_id: booking.vendorId,
        customer_id: booking.customerId,
        service_id: booking.serviceId,
        scheduled_date: booking.scheduledDate,
        status: booking.status,
        total_amount: booking.totalAmount,
        created_at: booking.createdAt,
        notes: booking.notes,
        profiles: customer ? {
          first_name: customer.user.name.split(' ')[0],
          last_name: customer.user.name.split(' ')[1] || '',
          phone: customer.user.phone || 'N/A',
          email: customer.user.email || 'N/A'
        } : null,
        services: service ? {
          name: service.name,
          price: service.price,
          duration: service.duration
        } : null
      };
    });
    
    return { data: transformedBookings, error: null };
  },
  
  create: async (bookingData: Record<string, unknown>) => {
    await simulateDelay();
    const newBooking = {
      id: `booking-${Date.now()}`,
      ...bookingData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return { data: newBooking, error: null };
  },
  
  update: async (id: string, updates: Record<string, unknown>) => {
    await simulateDelay();
    const booking = mockData.bookings.find(b => b.id === id);
    if (!booking) return { data: null, error: 'Booking not found' };
    
    const updated = { ...booking, ...updates };
    return { data: updated, error: null };
  },
  
  getUpcoming: async (vendorId: string) => {
    const result = await bookings.getByVendor();
    if (result.error) return result;
    
    const upcoming = result.data
      .filter((b: { scheduled_date: string }) => new Date(b.scheduled_date) >= new Date())
      .sort((a: { scheduled_date: string }, b: { scheduled_date: string }) => new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime());
    
    return { data: upcoming, error: null };
  }
};

export const services = {
  getByVendor: async () => {
    await simulateDelay();
    const vendor = getCurrentVendor();
    if (!vendor) return { data: [], error: 'No vendor found' };
    
    // Get services for this vendor
    const vendorServices = mockData.services.filter(s => s.vendorId === vendor.id);
    
    // Transform services to match expected format
    const transformedServices = vendorServices.map(service => ({
      id: service.id,
      vendor_id: service.vendorId,
      name: service.name,
      description: service.description,
      category: service.category,
      subcategory: service.subcategory,
      price: service.price,
      duration: service.duration,
      is_popular: service.isPopular,
      is_active: service.isActive,
      created_at: service.createdAt,
      images: service.images
    }));
    
    return { data: transformedServices, error: null };
  },
  
  create: async (serviceData: Record<string, unknown>) => {
    await simulateDelay();
    const vendor = getCurrentVendor();
    if (!vendor) return { data: null, error: 'No vendor found' };
    
    const newService = {
      id: `service-${Date.now()}`,
      vendorId: vendor.id,
      ...serviceData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    return { data: newService, error: null };
  },
  
  update: async (id: string, updates: Record<string, unknown>) => {
    await simulateDelay();
    const service = mockData.services.find(s => s.id === id);
    if (!service) return { data: null, error: 'Service not found' };
    
    const updated = { ...service, ...updates };
    return { data: updated, error: null };
  },
  
  delete: async (id: string) => {
    await simulateDelay();
    return { data: { id }, error: null };
  }
};

export const profiles = {
  getVendor: async () => {
    await simulateDelay();
    const vendor = getCurrentVendor();
    if (!vendor) return { data: null, error: 'No vendor found' };
    
    return {
      data: {
        id: vendor.id,
        user_id: vendor.userId,
        business_name: vendor.businessName,
        description: vendor.description,
        phone: vendor.user.phone,
        email: vendor.user.email,
        address: `${vendor.location.address}, ${vendor.location.district}`,
        city: vendor.location.city,
        is_verified: vendor.isVerified,
        is_active: vendor.isActive,
        rating: vendor.rating,
        review_count: vendor.reviewCount,
        categories: vendor.categories,
        business_hours: vendor.businessHours
      },
      error: null
    };
  },
  
  update: async (updates: Record<string, unknown>) => {
    await simulateDelay();
    const vendor = getCurrentVendor();
    if (!vendor) return { data: null, error: 'No vendor found' };
    
    const updated = { ...vendor, ...updates };
    return { data: updated, error: null };
  }
};

export const reviews = {
  getByVendor: async () => {
    await simulateDelay();
    const vendor = getCurrentVendor();
    if (!vendor) return { data: [], error: 'No vendor found' };
    
    // Get reviews for this vendor
    const vendorReviews = mockData.reviews.filter(r => r.vendorId === vendor.id);
    
    // Transform reviews to match expected format
    const transformedReviews = vendorReviews.map(review => {
      const customer = mockData.customerProfiles.find(c => c.id === review.customerId);
      const service = mockData.services.find(s => s.id === review.serviceId);
      
      return {
        id: review.id,
        vendor_id: review.vendorId,
        customer_id: review.customerId,
        service_id: review.serviceId,
        rating: review.rating,
        comment: review.comment,
        created_at: review.createdAt,
        profiles: customer ? {
          first_name: customer.user.name.split(' ')[0],
          last_name: customer.user.name.split(' ')[1] || '',
          avatar_url: customer.user.avatar
        } : null,
        services: service ? {
          name: service.name
        } : null
      };
    });
    
    return { data: transformedReviews, error: null };
  },
  
  respond: async (reviewId: string, response: string) => {
    await simulateDelay();
    return { data: { id: reviewId, response }, error: null };
  }
};

export const earnings = {
  getMonthly: async () => {
    await simulateDelay();
    const vendor = getCurrentVendor();
    if (!vendor) return { data: [], error: 'No vendor found' };
    
    // Generate mock monthly earnings data
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];
    const monthlyData = months.map((month) => ({
      month,
      bookings: Math.floor(Math.random() * 50) + 20,
      earnings: Math.floor(Math.random() * 100000) + 50000,
      commission: Math.floor(Math.random() * 10000) + 5000
    }));
    
    return { data: monthlyData, error: null };
  },
  
  getStats: async () => {
    await simulateDelay();
    const vendor = getCurrentVendor();
    if (!vendor) return { data: null, error: 'No vendor found' };
    
    return {
      data: {
        total_earnings: 458000,
        pending_payments: 38000,
        available_balance: 420000,
        last_payout: '2025-01-01',
        next_payout: '2025-02-01'
      },
      error: null
    };
  }
};

// Export mock supabase client for compatibility
export const supabase = {
  auth,
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: (data: Record<string, unknown>) => ({ data, error: null }),
    update: (data: Record<string, unknown>) => ({ eq: () => ({ data, error: null }) }),
    delete: () => ({ eq: () => ({ data: null, error: null }) })
  })
};