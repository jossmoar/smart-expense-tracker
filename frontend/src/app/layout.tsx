import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { NotificationsProvider } from "@/contexts/NotificationsContext";
import { Navbar } from "@/components/Navbar";
import { LanguageSync } from "@/i18n/LanguageSync";
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
  title: "Smart Expense Tracker",
  description: "Gestor inteligente de gastos personales con clasificación automática y predicción de gasto.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageSync />
        <AuthProvider>
          <NotificationsProvider>
            <Navbar />
            {children}
          </NotificationsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
