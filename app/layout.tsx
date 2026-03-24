import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { COMPANY_CONFIG } from "@/core/config/company.config";
import { WhatsAppFloatingButton } from "@/shared/ui/whatsapp-floating";

export const metadata: Metadata = {
  title: `${COMPANY_CONFIG.name} | ${COMPANY_CONFIG.tagline}`,
  description: COMPANY_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased font-sans">
          {children}
          <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
