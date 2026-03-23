// app/layout.tsx
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/Toaster";
import "./globals.css";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "ShopSmart",
  description: "Multi-store shopping, live better with ShopSmart.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
