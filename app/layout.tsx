import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { VendorHeader } from "@/components/vendor-header";
import { MobileHeader } from "@/components/mobile-header";
import { AuthProvider } from "@/contexts/auth-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "FemFuel Beauty - Portal de Proveedores",
  description: "Portal para proveedores de servicios de belleza en República Dominicana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased font-sans`}
      >
        <AuthProvider>
          <VendorHeader />
          <MobileHeader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
