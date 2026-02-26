"use client";

import { usePathname } from "next/navigation";
import { VendorHeader } from "@/components/vendor-header";

export function ConditionalHeader() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname === "/login";
  const isRegister = pathname === "/register";

  if (isDashboard || isLogin || isRegister) return null;

  return <VendorHeader />;
}
