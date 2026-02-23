"use client";

import { usePathname } from "next/navigation";
import { VendorHeader } from "@/components/vendor-header";

export function ConditionalHeader() {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname === "/login";

  if (isDashboard || isLogin) return null;

  return <VendorHeader />;
}
