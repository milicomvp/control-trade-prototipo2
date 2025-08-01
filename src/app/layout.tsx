import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Control Trade Logistics",
  description: "Soluciones logísticas internacionales y nacionales",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="antialiased">
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
