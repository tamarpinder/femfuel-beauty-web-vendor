"use client";

import Image from "next/image";

interface SplashScreenProps {
  message?: string;
}

export default function SplashScreen({ message }: SplashScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[var(--color-bg-primary)] to-[var(--color-bg-tertiary)]">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        {/* Logo */}
        <div className="relative">
          <div className="absolute -inset-4 bg-[var(--color-primary)]/10 rounded-full blur-xl animate-pulse" />
          <Image
            src="/femfuel-logo.png"
            alt="FemFuel Beauty"
            width={80}
            height={80}
            className="relative"
            priority
          />
        </div>

        {/* Brand */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
            FemFuel Beauty
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Portal de Proveedores
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 h-1 bg-[var(--color-border-primary)] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--femfuel-gold)] rounded-full animate-progress" />
        </div>

        {/* Message */}
        {message && (
          <p className="text-sm text-[var(--color-text-muted)] animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
