import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/navigation/Navbar";
import React from "react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react"

// These styles apply to every route in the application
import './globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BandPal",
  description: "The band management application you love to use",
  keywords: "band management music "
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`${inter.className} m-0`}>
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
    </html>
  );
}
