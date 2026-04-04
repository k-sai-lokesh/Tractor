import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookingProvider } from "@/lib/bookingStore";
import AuthProvider from "@/components/providers/AuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TractorLease — Rent a Tractor. Grow More.",
  description:
    "India's premier agricultural equipment leasing marketplace. Find and lease tractors, rotavators, ploughs, harrows and more from trusted local farmers.",
  keywords: "tractor lease, tractor rental, farm equipment hire, rotavator rent, India agriculture",
  openGraph: {
    title: "TractorLease — Rent a Tractor. Grow More.",
    description: "India's premier agricultural equipment leasing marketplace.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <AuthProvider>
          <BookingProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </BookingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
