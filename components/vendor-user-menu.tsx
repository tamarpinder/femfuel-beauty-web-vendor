"use client"

import Link from "next/link"
import { User, Settings, Calendar, LogOut, ChevronDown, Scissors, HelpCircle, Building2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/auth-context"

export function VendorUserMenu() {
  const { user, profile, signOut } = useAuth()

  if (!user) {
    return (
      <>
        <Link href="/login">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Iniciar Sesión</span>
          </Button>
        </Link>
      </>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 h-auto p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.full_name} />
            <AvatarFallback className="bg-femfuel-pink text-white text-sm">
              {profile?.full_name?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-900">
              {profile?.business_name || profile?.full_name}
            </p>
            <p className="text-xs text-gray-600">{profile?.email}</p>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Mi Negocio</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/dashboard/profile">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Building2 className="h-4 w-4" />
            <span>Mi Perfil de Negocio</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/services">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Scissors className="h-4 w-4" />
            <span>Mis Servicios</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/dashboard/calendar">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Calendar className="h-4 w-4" />
            <span>Mi Calendario</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href="/dashboard/settings">
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
            <Settings className="h-4 w-4" />
            <span>Configuración</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
          <HelpCircle className="h-4 w-4" />
          <span>Soporte</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer text-red-600"
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          <span>Cerrar Sesión</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}