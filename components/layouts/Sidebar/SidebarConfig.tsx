import {
  LayoutDashboard,
  Scissors,
  CalendarDays,
  Calendar,
  Wallet,
  MessageCircle,
  UserCircle,
  Settings,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  tooltip: string;
}

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  {
    id: "dashboard",
    label: "Panel",
    href: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
    tooltip: "Panel de Control",
  },
  {
    id: "services",
    label: "Servicios",
    href: "/dashboard/services",
    icon: <Scissors className="w-5 h-5" />,
    tooltip: "Mis Servicios",
  },
  {
    id: "bookings",
    label: "Reservas",
    href: "/dashboard/bookings",
    icon: <CalendarDays className="w-5 h-5" />,
    tooltip: "Reservaciones",
  },
  {
    id: "calendar",
    label: "Calendario",
    href: "/dashboard/calendar",
    icon: <Calendar className="w-5 h-5" />,
    tooltip: "Mi Calendario",
  },
  {
    id: "earnings",
    label: "Billetera",
    href: "/dashboard/earnings",
    icon: <Wallet className="w-5 h-5" />,
    tooltip: "Mis Ganancias",
  },
  {
    id: "chat",
    label: "Chat",
    href: "/dashboard/chat",
    icon: <MessageCircle className="w-5 h-5" />,
    tooltip: "Mensajes",
  },
];

export const SETTINGS_NAV_ITEM: NavItem = {
  id: "settings",
  label: "Ajustes",
  href: "/dashboard/settings",
  icon: <Settings className="w-5 h-5" />,
  tooltip: "Configuracion",
};

export const PROFILE_NAV_ITEM: NavItem = {
  id: "profile",
  label: "Perfil",
  href: "/dashboard/profile",
  icon: <UserCircle className="w-5 h-5" />,
  tooltip: "Mi Perfil",
};

export const SIDEBAR_WIDTH = {
  EXPANDED: "104px",
  COLLAPSED: "68px",
} as const;
