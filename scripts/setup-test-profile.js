// Setup profile for test user to fix loading issue
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jirxwaxilgdhqudbrgbl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppcnh3YXhpbGdkaHF1ZGJyZ2JsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2Mzk1NzUsImV4cCI6MjA3MTIxNTU3NX0.2HCPhR54jx-K-dM4HfZmT-Gx23tYWV8LFFoTb1_8PR4';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupTestProfile() {
  console.log('Setting up test user profile...');
  
  try {
    // First sign in with test credentials to get user ID
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: 'vendor.test@femfuelbeauty.com',
      password: 'TestVendor2025!'
    });

    if (signInError) {
      console.error('❌ Error signing in:', signInError.message);
      return;
    }

    if (!signInData.user) {
      console.error('❌ No user found after sign in');
      return;
    }

    const userId = signInData.user.id;
    console.log('✅ Signed in successfully. User ID:', userId);

    // Check if profile already exists
    const { data: existingProfile, error: profileCheckError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (existingProfile) {
      console.log('✅ Profile already exists:', existingProfile);
      if (existingProfile.role === 'vendor') {
        console.log('✅ User is already set as vendor');
        return;
      } else {
        // Update role to vendor
        const { data: updatedProfile, error: updateError } = await supabase
          .from('profiles')
          .update({ role: 'vendor' })
          .eq('id', userId)
          .select()
          .single();

        if (updateError) {
          console.error('❌ Error updating profile role:', updateError.message);
          return;
        }
        
        console.log('✅ Updated profile role to vendor:', updatedProfile);
        return;
      }
    }

    // Create new profile
    const profileData = {
      id: userId,
      full_name: 'Maria Rodriguez',
      email: 'vendor.test@femfuelbeauty.com',
      role: 'vendor',
      phone: '+1-829-555-0123',
      business_name: 'Salón de Belleza Elegancia',
      address: 'Calle Principal 123, Santo Domingo, República Dominicana',
      service_categories: ['Cabello', 'Uñas', 'Facial', 'Maquillaje'],
      is_approved: true,
      created_at: new Date().toISOString()
    };

    const { data: newProfile, error: createError } = await supabase
      .from('profiles')
      .insert(profileData)
      .select()
      .single();

    if (createError) {
      console.error('❌ Error creating profile:', createError.message);
      console.error('Full error:', createError);
      return;
    }

    console.log('✅ Test vendor profile created successfully!');
    console.log('Profile:', newProfile);
    console.log('\n🎉 Test user setup complete!');
    console.log('Email: vendor.test@femfuelbeauty.com');
    console.log('Password: TestVendor2025!');
    console.log('Business: Salón de Belleza Elegancia');
    console.log('Status: Ready for dashboard access');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    // Sign out
    await supabase.auth.signOut();
  }
}

setupTestProfile();