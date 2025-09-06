'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { services, bookings, reviews } from '@/lib/api';

interface VendorService {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  description: string;
  is_active: boolean;
  images: string[];
}

interface VendorBooking {
  id: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  price: number;
  notes?: string;
  createdAt: string;
  customer_id?: string;
  service_id?: string;
  total_amount?: number;
  scheduled_date?: string;
}

interface VendorReview {
  id: string;
  rating: number;
  comment: string;
  customer_name: string;
  service_name: string;
  created_at: string;
}

interface VendorStats {
  totalServices: number;
  activeServices: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  monthlyEarnings: number;
  totalClients: number;
  averageRating: number;
}

interface UseVendorDataReturn {
  services: VendorService[];
  bookings: VendorBooking[];
  reviews: VendorReview[];
  stats: VendorStats;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  updateBookingStatus: (bookingId: string, status: string, cancellationReason?: string) => Promise<void>;
  createService: (serviceData: any) => Promise<VendorService | null>;
  updateService: (serviceId: string, updates: any) => Promise<VendorService | null>;
  deleteService: (serviceId: string) => Promise<void>;
}

export const useVendorData = (): UseVendorDataReturn => {
  const { profile } = useAuth();
  const [allServices, setAllServices] = useState<VendorService[]>([]);
  const [allBookings, setAllBookings] = useState<VendorBooking[]>([]);
  const [allReviews, setAllReviews] = useState<VendorReview[]>([]);
  const [stats, setStats] = useState<VendorStats>({
    totalServices: 0,
    activeServices: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    monthlyEarnings: 0,
    totalClients: 0,
    averageRating: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatBooking = (booking: any): VendorBooking => ({
    id: booking.id,
    clientName: booking.customer?.first_name && booking.customer?.last_name 
      ? `${booking.customer.first_name} ${booking.customer.last_name}` 
      : 'Cliente',
    clientPhone: booking.customer?.phone || 'N/A',
    clientEmail: booking.customer?.email || 'N/A',
    service: booking.service?.name || 'Servicio',
    date: new Date(booking.scheduled_date).toISOString().split('T')[0],
    time: new Date(booking.scheduled_date).toLocaleTimeString('es-DO', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    }),
    status: booking.status,
    price: booking.total_amount || 0,
    notes: booking.notes,
    createdAt: booking.created_at,
    customer_id: booking.customer_id,
    service_id: booking.service_id,
    total_amount: booking.total_amount,
    scheduled_date: booking.scheduled_date
  });

  const formatService = (service: any): VendorService => ({
    id: service.id,
    name: service.name,
    category: service.category,
    price: service.price,
    duration: service.duration,
    description: service.description || '',
    is_active: service.is_active,
    images: service.images || []
  });

  const formatReview = (review: any): VendorReview => ({
    id: review.id,
    rating: review.rating || 0,
    comment: review.comment || '',
    customer_name: review.customer?.first_name && review.customer?.last_name
      ? `${review.customer.first_name} ${review.customer.last_name}`
      : 'Cliente',
    service_name: review.service?.name || 'Servicio',
    created_at: review.created_at
  });

  const calculateStats = (services: VendorService[], bookings: VendorBooking[], reviews: VendorReview[]): VendorStats => {
    const activeServices = services.filter(s => s.is_active);
    const pendingBookings = bookings.filter(b => b.status === 'pending');
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
    const completedBookings = bookings.filter(b => b.status === 'completed');
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled');
    
    // Calculate monthly earnings (current month)
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyEarnings = completedBookings
      .filter(b => {
        const bookingDate = new Date(b.createdAt);
        return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
      })
      .reduce((sum, b) => sum + b.price, 0);

    // Calculate unique clients
    const uniqueClients = new Set(bookings.map(b => b.customer_id).filter(Boolean)).size;

    // Calculate average rating
    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
      : 0;

    return {
      totalServices: services.length,
      activeServices: activeServices.length,
      pendingBookings: pendingBookings.length,
      confirmedBookings: confirmedBookings.length,
      completedBookings: completedBookings.length,
      cancelledBookings: cancelledBookings.length,
      monthlyEarnings,
      totalClients: uniqueClients,
      averageRating: Math.round(avgRating * 10) / 10
    };
  };

  const fetchAllData = useCallback(async () => {
    if (!profile?.id) return;

    try {
      setLoading(true);
      setError(null);

      const [servicesData, bookingsData, reviewsData] = await Promise.all([
        services.getByVendor(),
        bookings.getByVendor(),
        reviews.getByVendor()
      ]);

      if (servicesData.error) {
        console.error('Services error:', servicesData.error);
      }
      if (bookingsData.error) {
        console.error('Bookings error:', bookingsData.error);
      }
      if (reviewsData.error) {
        console.error('Reviews error:', reviewsData.error);
      }

      const formattedServices = (servicesData.data || []).map(formatService);
      const formattedBookings = (bookingsData.data || []).map(formatBooking);
      const formattedReviews = (reviewsData.data || []).map(formatReview);

      setAllServices(formattedServices);
      setAllBookings(formattedBookings);
      setAllReviews(formattedReviews);
      
      const calculatedStats = calculateStats(formattedServices, formattedBookings, formattedReviews);
      setStats(calculatedStats);

    } catch (error) {
      console.error('Error fetching vendor data:', error);
      setError('Error al cargar los datos');
    } finally {
      setLoading(false);
    }
  }, [profile?.id]);

  const updateBookingStatus = async (bookingId: string, status: string, cancellationReason?: string) => {
    try {
      const { error } = await bookings.updateStatus(bookingId, status, cancellationReason);
      
      if (error) {
        console.error('Error updating booking status:', error);
        return;
      }

      // Update local state optimistically
      const updatedBookings = allBookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: status as any } : booking
      );
      setAllBookings(updatedBookings);
      
      // Recalculate stats
      const calculatedStats = calculateStats(allServices, updatedBookings, allReviews);
      setStats(calculatedStats);
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const createService = async (serviceData: any): Promise<VendorService | null> => {
    if (!profile?.id) return null;

    try {
      const { data, error } = await services.create({
        vendor_id: profile.id,
        ...serviceData
      });
      
      if (error) {
        console.error('Error creating service:', error);
        return null;
      }

      if (data) {
        const formattedService = formatService(data);
        const updatedServices = [...allServices, formattedService];
        setAllServices(updatedServices);
        
        // Recalculate stats
        const calculatedStats = calculateStats(updatedServices, allBookings, allReviews);
        setStats(calculatedStats);
        
        return formattedService;
      }
    } catch (error) {
      console.error('Error creating service:', error);
    }
    return null;
  };

  const updateService = async (serviceId: string, updates: any): Promise<VendorService | null> => {
    try {
      const { data, error } = await services.update(serviceId, updates);
      
      if (error) {
        console.error('Error updating service:', error);
        return null;
      }

      if (data) {
        const formattedService = formatService(data);
        const updatedServices = allServices.map(s => 
          s.id === serviceId ? formattedService : s
        );
        setAllServices(updatedServices);
        
        // Recalculate stats
        const calculatedStats = calculateStats(updatedServices, allBookings, allReviews);
        setStats(calculatedStats);
        
        return formattedService;
      }
    } catch (error) {
      console.error('Error updating service:', error);
    }
    return null;
  };

  const deleteService = async (serviceId: string) => {
    try {
      const { error } = await services.delete(serviceId);
      
      if (error) {
        console.error('Error deleting service:', error);
        return;
      }

      const updatedServices = allServices.filter(s => s.id !== serviceId);
      setAllServices(updatedServices);
      
      // Recalculate stats
      const calculatedStats = calculateStats(updatedServices, allBookings, allReviews);
      setStats(calculatedStats);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  useEffect(() => {
    if (profile?.id) {
      fetchAllData();
    }
  }, [profile?.id, fetchAllData]);

  return {
    services: allServices,
    bookings: allBookings,
    reviews: allReviews,
    stats,
    loading,
    error,
    refreshData: fetchAllData,
    updateBookingStatus,
    createService,
    updateService,
    deleteService
  };
};