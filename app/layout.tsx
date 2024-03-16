import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/navigation/Navbar";

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
      <SessionProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
