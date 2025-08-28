"use client"

import { useAuth } from '@/contexts/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { Bell, Shield, User, Building } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const { profile } = useAuth()
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    bookings: true,
    marketing: false
  })

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600">Administra tu cuenta y preferencias</p>
      </div>

      <div className="grid gap-6">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Información de la Cuenta
            </CardTitle>
            <CardDescription>
              Actualiza tu información personal y de contacto
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Nombre Completo</Label>
                <Input id="full_name" defaultValue={profile.full_name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" defaultValue={profile.email} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input id="phone" defaultValue={profile.phone || ''} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                <Input id="address" defaultValue={profile.address || ''} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Información del Negocio
            </CardTitle>
            <CardDescription>
              Configuración específica de tu negocio
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="business_name">Nombre del Negocio</Label>
              <Input id="business_name" defaultValue={profile.business_name || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business_description">Descripción del Negocio</Label>
              <Textarea 
                id="business_description" 
                placeholder="Describe tu negocio y servicios..."
                rows={3}
              />
            </div>
            <Button>Guardar Cambios</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificaciones
            </CardTitle>
            <CardDescription>
              Controla cómo y cuándo recibes notificaciones
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Notificaciones por Email</Label>
                <p className="text-sm text-gray-600">Recibe notificaciones importantes por correo</p>
              </div>
              <Switch 
                id="email-notifications"
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sms-notifications">Notificaciones por SMS</Label>
                <p className="text-sm text-gray-600">Recibe alertas urgentes por mensaje de texto</p>
              </div>
              <Switch 
                id="sms-notifications"
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, sms: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="booking-notifications">Nuevas Reservas</Label>
                <p className="text-sm text-gray-600">Notificaciones de nuevas citas y cambios</p>
              </div>
              <Switch 
                id="booking-notifications"
                checked={notifications.bookings}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, bookings: checked }))}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-notifications">Marketing y Promociones</Label>
                <p className="text-sm text-gray-600">Recibe consejos y promociones de FemFuel</p>
              </div>
              <Switch 
                id="marketing-notifications"
                checked={notifications.marketing}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Seguridad
            </CardTitle>
            <CardDescription>
              Administra la seguridad de tu cuenta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full">
              Cambiar Contraseña
            </Button>
            <Button variant="outline" className="w-full">
              Habilitar Autenticación de Dos Factores
            </Button>
            <Separator />
            <div className="pt-4">
              <Button variant="destructive" className="w-full">
                Desactivar Cuenta
              </Button>
              <p className="text-xs text-gray-600 mt-2 text-center">
                Esto desactivará temporalmente tu cuenta
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}