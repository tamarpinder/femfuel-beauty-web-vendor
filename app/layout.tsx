import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { VendorHeader } from "@/components/vendor-header";
import { MobileHeader } from "@/components/mobile-header";
import { AuthProvider } from "@/contexts/auth-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
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
