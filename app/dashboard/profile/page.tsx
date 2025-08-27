'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/auth-context';
import { SERVICE_CATEGORIES } from '@/lib/constants';

export default function ProfilePage() {
  const { profile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'business' | 'gallery' | 'hours'>('info');

  const [formData, setFormData] = useState({
    full_name: profile?.full_name || '',
    business_name: profile?.business_name || '',
    phone: profile?.phone || '',
    address: profile?.address || '',
    description: '',
    instagram: '',
    facebook: '',
    whatsapp: '',
    service_categories: profile?.service_categories || []
  });

  const [businessHours, setBusinessHours] = useState({
    monday: { open: '9:00', close: '18:00', closed: false },
    tuesday: { open: '9:00', close: '18:00', closed: false },
    wednesday: { open: '9:00', close: '18:00', closed: false },
    thursday: { open: '9:00', close: '18:00', closed: false },
    friday: { open: '9:00', close: '18:00', closed: false },
    saturday: { open: '9:00', close: '16:00', closed: false },
    sunday: { open: '10:00', close: '14:00', closed: true }
  });

  const handleSave = async () => {
    // Here you would save to Supabase
    console.log('Saving profile:', formData);
    setIsEditing(false);
    // Show success message
  };

  const handleCategoryToggle = (categoryKey: string) => {
    setFormData(prev => ({
      ...prev,
      service_categories: prev.service_categories.includes(categoryKey)
        ? prev.service_categories.filter(c => c !== categoryKey)
        : [...prev.service_categories, categoryKey]
    }));
  };

  const dayNames = {
    monday: 'Lunes',
    tuesday: 'Martes', 
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-femfuel-black">
            Mi Perfil
          </h1>
          <p className="text-gray-600">
            Gestiona la información de tu negocio
          </p>
        </div>
        <Button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? '💾 Guardar' : '✏️ Editar'}
        </Button>
      </div>

      {/* Profile Status */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 bg-femfuel-pink rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profile?.full_name?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-femfuel-black">
                {profile?.business_name || profile?.full_name}
              </h2>
              <p className="text-gray-600">{profile?.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  profile?.is_approved
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {profile?.is_approved ? '✅ Cuenta Aprobada' : '⏳ Pendiente de Aprobación'}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                  ⭐ 4.8 (24 reseñas)
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { key: 'info', label: 'Información Personal', icon: '👤' },
            { key: 'business', label: 'Datos del Negocio', icon: '🏢' },
            { key: 'gallery', label: 'Galería', icon: '📸' },
            { key: 'hours', label: 'Horarios', icon: '🕐' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as 'info' | 'business' | 'gallery' | 'hours')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.key
                  ? 'border-femfuel-pink text-femfuel-pink'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'info' && (
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <Input
                  value={formData.full_name}
                  onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección
                </label>
                <Input
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'business' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Información del Negocio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Negocio
                  </label>
                  <Input
                    value={formData.business_name}
                    onChange={(e) => setFormData({...formData, business_name: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción del Negocio
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-femfuel-pink focus:border-femfuel-pink disabled:bg-gray-50"
                    placeholder="Describe tu negocio, especialidades y experiencia..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram
                    </label>
                    <Input
                      value={formData.instagram}
                      onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                      disabled={!isEditing}
                      placeholder="@tu_usuario"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Facebook
                    </label>
                    <Input
                      value={formData.facebook}
                      onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                      disabled={!isEditing}
                      placeholder="Tu página de Facebook"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp
                    </label>
                    <Input
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      disabled={!isEditing}
                      placeholder="(809) 123-4567"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categorías de Servicios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(SERVICE_CATEGORIES).map(([key, category]) => (
                  <label
                    key={key}
                    className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.service_categories.includes(key)
                        ? 'border-femfuel-pink bg-pink-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    } ${!isEditing ? 'cursor-not-allowed opacity-60' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.service_categories.includes(key)}
                      onChange={() => handleCategoryToggle(key)}
                      disabled={!isEditing}
                      className="rounded text-femfuel-pink focus:ring-femfuel-pink"
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'gallery' && (
        <Card>
          <CardHeader>
            <CardTitle>Galería de Trabajos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Upload Zone */}
              <div className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center hover:border-femfuel-pink transition-colors cursor-pointer">
                <div className="text-center">
                  <span className="text-3xl text-gray-400">📷</span>
                  <p className="text-sm text-gray-600 mt-2">
                    Subir Foto
                  </p>
                </div>
              </div>
              
              {/* Mock gallery items */}
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center relative group">
                  <span className="text-4xl">✨</span>
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button size="sm" variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Sube fotos de tus mejores trabajos para atraer más clientes. Se recomiendan imágenes de alta calidad.
            </p>
          </CardContent>
        </Card>
      )}

      {activeTab === 'hours' && (
        <Card>
          <CardHeader>
            <CardTitle>Horarios de Atención</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(businessHours).map(([day, hours]) => (
                <div key={day} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-24">
                      <span className="font-medium text-gray-900">
                        {dayNames[day as keyof typeof dayNames]}
                      </span>
                    </div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={!hours.closed}
                        onChange={(e) => {
                          if (isEditing) {
                            setBusinessHours({
                              ...businessHours,
                              [day]: { ...hours, closed: !e.target.checked }
                            });
                          }
                        }}
                        disabled={!isEditing}
                        className="rounded text-femfuel-pink focus:ring-femfuel-pink"
                      />
                      <span className="text-sm text-gray-600">Abierto</span>
                    </label>
                  </div>

                  {!hours.closed && (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="time"
                        value={hours.open}
                        onChange={(e) => {
                          if (isEditing) {
                            setBusinessHours({
                              ...businessHours,
                              [day]: { ...hours, open: e.target.value }
                            });
                          }
                        }}
                        disabled={!isEditing}
                        className="w-24"
                      />
                      <span className="text-gray-500">-</span>
                      <Input
                        type="time"
                        value={hours.close}
                        onChange={(e) => {
                          if (isEditing) {
                            setBusinessHours({
                              ...businessHours,
                              [day]: { ...hours, close: e.target.value }
                            });
                          }
                        }}
                        disabled={!isEditing}
                        className="w-24"
                      />
                    </div>
                  )}

                  {hours.closed && (
                    <span className="text-gray-500 italic">Cerrado</span>
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Define tus horarios de atención para que los clientes sepan cuándo pueden reservar contigo.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}