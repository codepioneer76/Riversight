import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RIVERSIGHT — Intelligent River Monitoring Platform",
  description: "IoT-Enabled Intelligent River Monitoring, Telemetry, GIS & Predictive Analytics Platform for Government Research",
  keywords: "river monitoring, IoT, telemetry, GIS, hydrology, LAD, sediment, bathymetry, predictive analytics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
