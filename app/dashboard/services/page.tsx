'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Edit3, Trash2, ToggleLeft, ToggleRight, Scissors } from 'lucide-react';
import { SERVICE_CATEGORY_COLORS } from '@/lib/constants';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/auth-context';
import { services } from '@/lib/api';

interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  description: string | null;
  is_active: boolean;
  images: string[];
}

export default function ServicesPage() {
  const { profile } = useAuth();
  const t = useTranslations('services');
  const tCat = useTranslations('serviceCategories');
  const tCommon = useTranslations('common');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchServices = useCallback(async () => {
    if (!profile?.id) return;
    try {
      setLoading(true);
      const { data, error } = await services.getByVendor();
      if (error) { console.error('Error fetching services:', error); return; }
      if (data) {
        setAllServices(data.map(service => ({
          id: service.id, name: service.name, category: service.category,
          price: service.price, duration: service.duration,
          description: service.description || '', is_active: service.is_active, images: [],
        })));
      }
    } catch (error) { console.error('Error fetching services:', error);
    } finally { setLoading(false); }
  }, [profile?.id]);

  useEffect(() => { if (profile?.id) fetchServices(); }, [profile?.id, fetchServices]);

  const [newService, setNewService] = useState({
    name: '', category: '', price: '', duration: '', description: '', is_active: true
  });

  const handleAddService = async () => {
    if (!profile?.id || !newService.name || !newService.category || !newService.price) {
      alert(t('requiredFields')); return;
    }
    try {
      const { data, error } = await services.create({
        vendor_id: profile.id, name: newService.name, category: newService.category,
        price: Number(newService.price), duration: Number(newService.duration) || 60,
        description: newService.description, images: []
      });
      if (error) { console.error('Error creating service:', error); alert(t('createError')); return; }
      if (data) {
        setAllServices([...allServices, {
          id: data.id, name: data.name, category: data.category, price: data.price,
          duration: data.duration, description: data.description || '',
          is_active: data.is_active, images: []
        }]);
        setNewService({ name: '', category: '', price: '', duration: '', description: '', is_active: true });
        setShowAddForm(false);
      }
    } catch (error) { console.error('Error creating service:', error); alert(t('createError')); }
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setNewService({
      name: service.name, category: service.category, price: service.price.toString(),
      duration: service.duration.toString(), description: service.description || '',
      is_active: service.is_active
    });
    setShowAddForm(true);
  };

  const handleUpdateService = async () => {
    if (!editingService) return;
    try {
      const { data, error } = await services.update(editingService.id, {
        name: newService.name, category: newService.category,
        price: Number(newService.price), duration: Number(newService.duration) || 60,
        description: newService.description, is_active: newService.is_active
      });
      if (error) { console.error('Error updating service:', error); alert(t('updateError')); return; }
      if (data) {
        setAllServices(allServices.map(s => s.id === editingService.id
          ? { ...s, name: data.name, category: data.category, price: data.price,
              duration: data.duration, description: data.description, is_active: data.is_active }
          : s
        ));
        setEditingService(null);
        setNewService({ name: '', category: '', price: '', duration: '', description: '', is_active: true });
        setShowAddForm(false);
      }
    } catch (error) { console.error('Error updating service:', error); alert(t('updateError')); }
  };

  const toggleServiceStatus = async (serviceId: string) => {
    const service = allServices.find(s => s.id === serviceId);
    if (!service) return;
    try {
      const { error } = await services.update(serviceId, { is_active: !service.is_active });
      if (error) { console.error('Error toggling service status:', error); return; }
      setAllServices(allServices.map(s => s.id === serviceId ? { ...s, is_active: !s.is_active } : s));
    } catch (error) { console.error('Error toggling service status:', error); }
  };

  const deleteService = async (serviceId: string) => {
    if (!confirm(t('deleteConfirm'))) return;
    try {
      const { error } = await services.delete(serviceId);
      if (error) { console.error('Error deleting service:', error); alert(t('deleteError')); return; }
      setAllServices(allServices.filter(s => s.id !== serviceId));
    } catch (error) { console.error('Error deleting service:', error); alert(t('deleteError')); }
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-[var(--color-text-muted)]">{t('loadingServices')}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">{t('title')}</h1>
          <p className="text-[var(--color-text-muted)]">{t('subtitle')}</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>{t('addService')}</span>
        </Button>
      </div>

      {showAddForm && (
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardHeader>
            <CardTitle>{editingService ? t('editService') : t('addService')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  {t('serviceName')} {t('required')}
                </label>
                <Input value={newService.name} onChange={(e) => setNewService({...newService, name: e.target.value})}
                  placeholder={t('serviceNamePlaceholder')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  {t('category')} {t('required')}
                </label>
                <select value={newService.category} onChange={(e) => setNewService({...newService, category: e.target.value})}
                  className="w-full px-3 py-2 border border-[var(--color-border-primary)] rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-bg-card)] text-[var(--color-text-primary)]">
                  <option value="">{t('selectCategory')}</option>
                  {Object.keys(SERVICE_CATEGORY_COLORS).map((key) => (
                    <option key={key} value={key}>{tCat(key)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  {t('price')} {t('required')}
                </label>
                <Input type="number" value={newService.price}
                  onChange={(e) => setNewService({...newService, price: e.target.value})} placeholder="800" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">{t('duration')}</label>
                <Input type="number" value={newService.duration}
                  onChange={(e) => setNewService({...newService, duration: e.target.value})} placeholder="60" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">{t('description')}</label>
                <textarea value={newService.description} onChange={(e) => setNewService({...newService, description: e.target.value})}
                  rows={3} className="w-full px-3 py-2 border border-[var(--color-border-primary)] rounded-lg focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] bg-[var(--color-bg-card)] text-[var(--color-text-primary)]"
                  placeholder={t('descriptionPlaceholder')} />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={newService.is_active}
                    onChange={(e) => setNewService({...newService, is_active: e.target.checked})}
                    className="rounded text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                  <span className="text-sm font-medium text-[var(--color-text-secondary)]">{t('activeService')}</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="outline" onClick={() => {
                setShowAddForm(false); setEditingService(null);
                setNewService({ name: '', category: '', price: '', duration: '', description: '', is_active: true });
              }}>{tCommon('cancel')}</Button>
              <Button onClick={editingService ? handleUpdateService : handleAddService}>
                {editingService ? t('updateService') : t('addService')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {allServices.map((service) => (
          <Card key={service.id} className="rounded-[20px] bg-[var(--color-bg-card)]">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">{service.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      service.is_active ? 'bg-[var(--color-success)]/15 text-[var(--color-success)]'
                        : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]'
                    }`}>{service.is_active ? tCommon('active') : tCommon('inactive')}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-[var(--color-text-muted)] mb-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${SERVICE_CATEGORY_COLORS[service.category] || 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]'}`}>
                      {tCat(service.category)}
                    </span>
                    <span>RD${service.price}</span>
                    <span>{service.duration} min</span>
                  </div>
                  {service.description && (
                    <p className="text-[var(--color-text-muted)] text-sm">{service.description}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Button size="sm" variant="outline" onClick={() => handleEditService(service)}>
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => toggleServiceStatus(service.id)}>
                    {service.is_active ? <ToggleRight className="h-4 w-4 text-[var(--color-success)]" /> : <ToggleLeft className="h-4 w-4 text-[var(--color-text-muted)]" />}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => deleteService(service.id)}
                    className="text-[var(--color-error)] hover:text-[var(--color-error)]">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {allServices.length === 0 && (
        <Card className="rounded-[20px] bg-[var(--color-bg-card)]">
          <CardContent className="text-center py-12">
            <div className="flex justify-center mb-4">
              <Scissors className="h-16 w-16 text-[var(--color-text-muted)]" />
            </div>
            <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">{t('noServices')}</h3>
            <p className="text-[var(--color-text-muted)] mb-4">{t('noServicesHint')}</p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              {t('addService')}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
