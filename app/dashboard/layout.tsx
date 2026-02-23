"use client";

import { useState } from "react";
import Sidebar from "@/components/layouts/Sidebar/Sidebar";
import Header from "@/components/layouts/Header/Header";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => setMobileMenuOpen((prev) => !prev);
  const handleMobileMenuClose = () => setMobileMenuOpen(false);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[var(--color-bg-tertiary)]">
        <Sidebar
          isMobileMenuOpen={mobileMenuOpen}
          onMobileMenuClose={handleMobileMenuClose}
        />

        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-20 lg:hidden"
            onClick={handleMobileMenuClose}
          />
        )}

        <Header onMobileMenuToggle={handleMobileMenuToggle} />

        <main className="main-content transition-all duration-300 pt-[60px]">
          <style jsx>{`
            @media (min-width: 1024px) {
              .main-content {
                padding-inline-start: var(--sidebar-width, 104px);
              }
            }
          `}</style>
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
