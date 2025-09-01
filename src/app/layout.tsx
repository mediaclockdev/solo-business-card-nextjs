import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LifetimeOfferButton } from "@/components/ui/LifetimeOfferButton";

import "../styles/ShareModal.css";

import { Providers } from "@/providers/Providers";
import MainLayout from "@/components/MainLayout";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Solo Business Cards",
  description: "Digital business card platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
    <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
