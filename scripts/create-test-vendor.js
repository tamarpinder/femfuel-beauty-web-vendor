const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestVendor() {
  try {
    // First, create the user account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'owner@bellezadominicana.com',
      password: 'BellezaDR2024!',
      options: {
        data: {
          full_name: 'Maria Santos Rodriguez',
          role: 'vendor'
        }
      }
    });

    if (authError) {
      console.error('Auth Error:', authError);
      return;
    }

    console.log('User created:', authData.user?.id);

    // Create vendor profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          full_name: 'Maria Santos Rodriguez',
          email: 'owner@bellezadominicana.com',
          role: 'vendor',
          phone: '+1 809-555-0199',
          address: 'Calle Duarte 456, Gazcue, Santo Domingo',
          business_name: 'Belleza Dominicana Salon',
          service_categories: ['unas', 'peinados', 'maquillaje'],
          is_approved: true,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (profileError) {
      console.error('Profile Error:', profileError);
      return;
    }

    console.log('Vendor profile created:', profileData);

    // Create some services for this vendor
    const services = [
      {
        vendor_id: authData.user.id,
        name: 'Manicure Dominicana Especial',
        description: 'Manicure tradicional dominicano con técnicas ancestrales y productos locales',
        category: 'unas',
        price: 950,
        duration: 75,
        is_active: true,
        is_popular: true
      },
      {
        vendor_id: authData.user.id,
        name: 'Peinado Merengue Style',
        description: 'Peinado inspirado en la cultura dominicana, perfecto para eventos y celebraciones',
        category: 'peinados',
        price: 1800,
        duration: 90,
        is_active: true,
        is_popular: true
      },
      {
        vendor_id: authData.user.id,
        name: 'Maquillaje Caribeño',
        description: 'Look radiante con colores tropicales que resaltan la belleza natural caribeña',
        category: 'maquillaje',
        price: 2200,
        duration: 60,
        is_active: true,
        is_popular: false
      },
      {
        vendor_id: authData.user.id,
        name: 'Pedicure Playa Dorada',
        description: 'Pedicure relajante con exfoliación de arena de playa y aceites tropicales',
        category: 'unas',
        price: 1650,
        duration: 105,
        is_active: true,
        is_popular: true
      }
    ];

    const { data: servicesData, error: servicesError } = await supabase
      .from('services')
      .insert(services)
      .select();

    if (servicesError) {
      console.error('Services Error:', servicesError);
      return;
    }

    console.log('Services created:', servicesData.length, 'services');

    console.log('\n✅ Test vendor "Belleza Dominicana Salon" created successfully!');
    console.log('📧 Email: owner@bellezadominicana.com');
    console.log('🔑 Password: BellezaDR2024!');
    console.log('👤 Owner: Maria Santos Rodriguez');
    console.log('🏪 Business: Belleza Dominicana Salon');
    console.log('📞 Phone: +1 809-555-0199');
    console.log('📍 Address: Calle Duarte 456, Gazcue, Santo Domingo');
    console.log('🎯 Categories: Uñas, Peinados, Maquillaje');
    console.log('⭐ Services:', servicesData.length);

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createTestVendor();