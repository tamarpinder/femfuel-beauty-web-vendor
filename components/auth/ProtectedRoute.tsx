"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import SplashScreen from "./SplashScreen";
import { Clock } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <SplashScreen />;
  }

  if (!user) return null;

  // Vendor approval pending
  if (profile && (!profile.is_active || !profile.is_verified)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-tertiary)]">
        <div className="max-w-md p-8 bg-[var(--color-bg-card)] rounded-[20px] border border-[var(--color-border-primary)] shadow-lg text-center">
          <Clock className="h-16 w-16 text-[var(--color-primary)] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">
            Cuenta Pendiente de Aprobación
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Tu cuenta de proveedor está siendo revisada por nuestro equipo.
            Te notificaremos por email cuando sea aprobada.
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            Tiempo estimado: 24-48 horas
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
