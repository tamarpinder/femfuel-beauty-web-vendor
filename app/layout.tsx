import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getLocale, getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ConditionalHeader } from "@/components/ConditionalHeader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://femfuel-beauty-web-vendor.vercel.app"),
  title: "FemFuel Beauty - Portal de Proveedores",
  description:
    "Gestiona tu negocio de belleza desde una plataforma profesional. Reservas, agenda, pagos y más. Solo 8% de comisión.",
  keywords: [
    "belleza",
    "proveedor",
    "salón",
    "spa",
    "maquillaje",
    "uñas",
    "República Dominicana",
    "Santo Domingo",
    "portal proveedores",
  ],
  authors: [{ name: "FemFuel Beauty" }],
  creator: "FemFuel Beauty",
  publisher: "FemFuel Beauty",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "es_DO",
    title: "FemFuel Beauty - Portal de Proveedores",
    description:
      "Gestiona tu negocio de belleza desde una plataforma profesional en República Dominicana",
    siteName: "FemFuel Beauty",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FemFuel Beauty - Portal de Proveedores",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FemFuel Beauty - Portal de Proveedores",
    description:
      "Gestiona tu negocio de belleza desde una plataforma profesional en República Dominicana",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('theme');
                if (t === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased font-sans`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <AuthProvider>
              <ConditionalHeader />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
