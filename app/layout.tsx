import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/globals.css";
import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/lib/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
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
        <Providers>
          {children} <Toaster position="bottom-center" />
        </Providers>
      </body>
    </html>
  );
}
