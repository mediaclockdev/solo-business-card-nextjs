"use client";


import { Providers } from "@/providers/Providers";


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <Providers>{children}</Providers>
    
  );
}
