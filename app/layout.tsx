import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/app/components/navigation/Navbar";
import React from "react";

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
        </body>
    </html>
  );
}
