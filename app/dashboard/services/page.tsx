'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit3, Trash2, ToggleLeft, ToggleRight, Scissors } from 'lucide-react';
import { VENDOR_PHRASES, SERVICE_CATEGORIES } from '@/lib/constants';
import { useAuth } from '@/contexts/auth-context';
import { services } from '@/lib/api';

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  description: string;
  is_active: boolean;
  images: string[];
}

export default function ServicesPage() {
  const { profile } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = useCallback(async () => {
    if (!profile?.id) return;

    try {
      setLoading(true);
      const { data, error } = await services.getByVendor();
      
      if (error) {
        console.error('Error fetching services:', error);
        return;
      }

      if (data) {
        const formattedServices: Service[] = data.map(service => ({
          id: service.id,
          name: service.name,
          category: service.category,
          price: service.price,
          duration: service.duration,
          description: service.description || '',
          is_active: service.is_active,
          images: service.images || []
        }));
        
        setAllServices(formattedServices);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }, [profile?.id]);

  useEffect(() => {
    if (profile?.id) {
      fetchServices();
    }
  }, [profile?.id, fetchServices]);

  const [newService, setNewService] = useState({
    name: '',
    category: '',
    price: '',
    duration: '',
    description: '',
    is_active: true
  });

  const handleAddService = async () => {
    if (!profile?.id || !newService.name || !newService.category || !newService.price) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }

    try {
      const { data, error } = await services.create({
        vendor_id: profile.id,
        name: newService.name,
        category: newService.category,
        price: Number(newService.price),
        duration: Number(newService.duration) || 60,
        description: newService.description,
        images: []
      });
      
      if (error) {
        console.error('Error creating service:', error);
        alert('Error al crear el servicio');
        return;
      }

      if (data) {
        const formattedService: Service = {
          id: data.id,
          name: data.name,
          category: data.category,
          price: data.price,
          duration: data.duration,
          description: data.description || '',
          is_active: data.is_active,
          images: data.images || []
        };
        
        setAllServices([...allServices, formattedService]);
        setNewService({
          name: '',
          category: '',
          price: '',
          duration: '',
          description: '',
          is_active: true
        });
        setShowAddForm(false);
      }
    } catch (error) {
      console.error('Error creating service:', error);
      alert('Error al crear el servicio');
    }
  };

  const handleEditService = (service: Service) => {
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

  const handleUpdateService = async () => {
    if (!editingService) return;

    try {
      const { data, error } = await services.update(editingService.id, {
        name: newService.name,
        category: newService.category,
        price: Number(newService.price),
        duration: Number(newService.duration) || 60,
        description: newService.description,
        is_active: newService.is_active
      });
      
      if (error) {
        console.error('Error updating service:', error);
        alert('Error al actualizar el servicio');
        return;
      }

      if (data) {
        const updatedServices = allServices.map(s => 
          s.id === editingService.id 
            ? {
                ...s,
                name: data.name,
                category: data.category,
                price: data.price,
                duration: data.duration,
                description: data.description,
                is_active: data.is_active
              }
            : s
        );

        setAllServices(updatedServices);
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
      }
    } catch (error) {
      console.error('Error updating service:', error);
      alert('Error al actualizar el servicio');
    }
  };

  const toggleServiceStatus = async (serviceId: string) => {
    const service = allServices.find(s => s.id === serviceId);
    if (!service) return;

    try {
      const { error } = await services.update(serviceId, {
        is_active: !service.is_active
      });
      
      if (error) {
        console.error('Error toggling service status:', error);
        return;
      }

      const updatedServices = allServices.map(s => 
        s.id === serviceId ? { ...s, is_active: !s.is_active } : s
      );
      setAllServices(updatedServices);
    } catch (error) {
      console.error('Error toggling service status:', error);
    }
  };

  const deleteService = async (serviceId: string) => {
    if (!confirm('¿Estás segura de que quieres eliminar este servicio?')) {
      return;
    }

    try {
      const { error } = await services.delete(serviceId);
      
      if (error) {
        console.error('Error deleting service:', error);
        alert('Error al eliminar el servicio');
        return;
      }

      setAllServices(allServices.filter(s => s.id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Error al eliminar el servicio');
    }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Cargando servicios...</div>
        </div>
      </div>
    );
  }

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
        {allServices.map((service) => {
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

      {allServices.length === 0 && (
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