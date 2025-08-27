'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Plus, Edit3, Trash2, ToggleLeft, ToggleRight, Scissors } from 'lucide-react';
import { VENDOR_PHRASES, SERVICE_CATEGORIES } from '@/lib/constants';

export default function ServicesPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState<{
    id: string;
    name: string;
    category: string;
    price: number;
    duration: number;
    description: string;
    is_active: boolean;
    images: string[];
  } | null>(null);

  // Mock services data - replace with Supabase data
  const [services, setServices] = useState([
    {
      id: '1',
      name: 'Manicure Completo',
      category: 'nail_care',
      price: 800,
      duration: 60,
      description: 'Manicure completo con esmaltado regular, incluye limado, cutícula y hidratación',
      is_active: true,
      images: []
    },
    {
      id: '2',
      name: 'Pedicure con Spa',
      category: 'nail_care',
      price: 1200,
      duration: 90,
      description: 'Pedicure relajante con exfoliación, hidratación profunda y masaje',
      is_active: true,
      images: []
    },
    {
      id: '3',
      name: 'Corte y Peinado',
      category: 'hair_styling',
      price: 1500,
      duration: 75,
      description: 'Corte de cabello profesional con peinado incluido',
      is_active: false,
      images: []
    }
  ]);

  const [newService, setNewService] = useState({
    name: '',
    category: '',
    price: '',
    duration: '',
    description: '',
    is_active: true
  });

  const handleAddService = () => {
    if (!newService.name || !newService.category || !newService.price) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    const service = {
      id: Date.now().toString(),
      name: newService.name,
      category: newService.category,
      price: Number(newService.price),
      duration: Number(newService.duration) || 60,
      description: newService.description,
      is_active: newService.is_active,
      images: []
    };

    setServices([...services, service]);
    setNewService({
      name: '',
      category: '',
      price: '',
      duration: '',
      description: '',
      is_active: true
    });
    setShowAddForm(false);
  };

  const handleEditService = (service: {
    id: string;
    name: string;
    category: string;
    price: number;
    duration: number;
    description: string;
    is_active: boolean;
    images: string[];
  }) => {
    setEditingService(service);
    setNewService({
      name: service.name,
      category: service.category,
      price: service.price.toString(),
      duration: service.duration.toString(),
      description: service.description,
      is_active: service.is_active
    });
    setShowAddForm(true);
  };

  const handleUpdateService = () => {
    if (!editingService) return;

    const updatedServices = services.map(s => 
      s.id === editingService.id 
        ? {
            ...s,
            name: newService.name,
            category: newService.category,
            price: Number(newService.price),
            duration: Number(newService.duration) || 60,
            description: newService.description,
            is_active: newService.is_active
          }
        : s
    );

    setServices(updatedServices);
    setEditingService(null);
    setNewService({
      name: '',
      category: '',
      price: '',
      duration: '',
      description: '',
      is_active: true
    });
    setShowAddForm(false);
  };

  const toggleServiceStatus = (serviceId: string) => {
    const updatedServices = services.map(s => 
      s.id === serviceId ? { ...s, is_active: !s.is_active } : s
    );
    setServices(updatedServices);
  };

  const deleteService = (serviceId: string) => {
    if (confirm('¿Estás segura de que quieres eliminar este servicio?')) {
      setServices(services.filter(s => s.id !== serviceId));
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-femfuel-black">
            {VENDOR_PHRASES.services}
          </h1>
          <p className="text-gray-600">
            Gestiona tus servicios y precios
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>{VENDOR_PHRASES.add_service}</span>
        </Button>
      </div>

      {/* Add/Edit Service Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingService ? VENDOR_PHRASES.edit_service : VENDOR_PHRASES.add_service}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Servicio *
                </label>
                <Input
                  value={newService.name}
                  onChange={(e) => setNewService({...newService, name: e.target.value})}
                  placeholder="Ej: Manicure Completo"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  value={newService.category}
                  onChange={(e) => setNewService({...newService, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-femfuel-pink focus:border-femfuel-pink"
                >
                  <option value="">Seleccionar categoría</option>
                  {Object.entries(SERVICE_CATEGORIES).map(([key, category]) => (
                    <option key={key} value={key}>
                      {category.icon} {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (RD$) *
                </label>
                <Input
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({...newService, price: e.target.value})}
                  placeholder="800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duración (minutos)
                </label>
                <Input
                  type="number"
                  value={newService.duration}
                  onChange={(e) => setNewService({...newService, duration: e.target.value})}
                  placeholder="60"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <textarea
                  value={newService.description}
                  onChange={(e) => setNewService({...newService, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-femfuel-pink focus:border-femfuel-pink"
                  placeholder="Describe el servicio en detalle..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newService.is_active}
                    onChange={(e) => setNewService({...newService, is_active: e.target.checked})}
                    className="rounded text-femfuel-pink focus:ring-femfuel-pink"
                  />
                  <span className="text-sm font-medium text-gray-700">Servicio activo</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowAddForm(false);
                  setEditingService(null);
                  setNewService({
                    name: '',
                    category: '',
                    price: '',
                    duration: '',
                    description: '',
                    is_active: true
                  });
                }}
              >
                Cancelar
              </Button>
              <Button onClick={editingService ? handleUpdateService : handleAddService}>
                {editingService ? 'Actualizar' : 'Agregar'} Servicio
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services List */}
      <div className="grid gap-4">
        {services.map((service) => {
          const category = SERVICE_CATEGORIES[service.category as keyof typeof SERVICE_CATEGORIES];
          
          return (
            <Card key={service.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-femfuel-black">
                        {service.name}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        service.is_active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {service.is_active ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${category?.color || 'bg-gray-100 text-gray-800'}`}>
                        {category?.icon} {category?.name}
                      </span>
                      <span>💰 RD${service.price}</span>
                      <span>⏱️ {service.duration} min</span>
                    </div>

                    {service.description && (
                      <p className="text-gray-600 text-sm">
                        {service.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditService(service)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleServiceStatus(service.id)}
                    >
                      {service.is_active ? <ToggleRight className="h-4 w-4 text-green-600" /> : <ToggleLeft className="h-4 w-4 text-gray-400" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteService(service.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {services.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="flex justify-center mb-4">
              <Scissors className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tienes servicios registrados
            </h3>
            <p className="text-gray-600 mb-4">
              Agrega tu primer servicio para que los clientes puedan encontrarte
            </p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {VENDOR_PHRASES.add_service}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}