"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Tractor,
  Menu,
  X,
  Phone,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      style={{
        background: "rgba(255,250,240,0.95)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(45,106,79,0.12)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 16px rgba(45,106,79,0.08)",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }} className="container sm:px-6">
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", flexShrink: 0 }}>
          <div style={{ background: "linear-gradient(135deg, #2D6A4F, #40916C)", borderRadius: "0.5rem", padding: "0.4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Tractor size={20} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#1B4332", letterSpacing: "-0.02em" }} className="sm:text-xl">
            Tractor<span style={{ color: "#F4A300" }}>Lease</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ alignItems: "center", gap: "2rem" }} className="hidden md:flex">
          <Link href="/listings" style={{ color: "#374151", fontWeight: 500, fontSize: "0.95rem", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = "#2D6A4F")} onMouseLeave={e => (e.currentTarget.style.color = "#374151")}>Browse Tractors</Link>
          <Link href="/list-tractor" style={{ color: "#374151", fontWeight: 500, fontSize: "0.95rem", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = "#2D6A4F")} onMouseLeave={e => (e.currentTarget.style.color = "#374151")}>List Your Tractor</Link>
          <Link href="/my-bookings" style={{ color: "#374151", fontWeight: 500, fontSize: "0.95rem", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = "#2D6A4F")} onMouseLeave={e => (e.currentTarget.style.color = "#374151")}>My Bookings</Link>
          <Link href="/owner-dashboard" style={{ color: "#374151", fontWeight: 500, fontSize: "0.95rem", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => (e.currentTarget.style.color = "#2D6A4F")} onMouseLeave={e => (e.currentTarget.style.color = "#374151")}>Dashboard</Link>
        </div>

        {/* CTA + mobile toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} className="sm:gap-3">
          <a href="tel:+919502324184" className="hidden lg:flex" style={{ alignItems: "center", gap: "0.4rem", color: "#2D6A4F", fontWeight: 600, fontSize: "0.875rem", textDecoration: "none" }}>
            <Phone size={15} /> +91 95023 24184
          </a>
          <Link href="/list-tractor" className="btn-primary !hidden sm:!inline-flex" style={{ padding: "0.5rem 1rem", fontSize: "0.8rem", width: "auto" }}>
            + List Tractor
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden" aria-label="Toggle Menu" style={{ background: "none", border: "none", cursor: "pointer", color: "#2D6A4F", padding: "0.4rem" }}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div onClick={() => setMobileOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", zIndex: 90 }} />
          <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "280px", background: "white", zIndex: 100, display: "flex", flexDirection: "column", padding: "2rem 1.5rem", boxShadow: "-4px 0 20px rgba(0,0,0,0.1)", animation: "slideIn 0.3s ease-out" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "2rem" }}>
              <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280" }}><X size={28} /></button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {[
                { href: "/", label: "Home" },
                { href: "/listings", label: "Browse Tractors" },
                { href: "/list-tractor", label: "List Your Tractor" },
                { href: "/my-bookings", label: "My Bookings" },
                { href: "/owner-dashboard", label: "Owner Dashboard" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} onClick={() => setMobileOpen(false)} style={{ color: "#1B4332", fontWeight: 600, fontSize: "1.1rem", textDecoration: "none", borderBottom: "1px solid #F3F4F6", paddingBottom: "0.75rem" }}>
                  {label}
                </Link>
              ))}
              <Link href="/list-tractor" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ marginTop: "1rem" }}>
                + List Your Tractor
              </Link>
            </div>
            <div style={{ marginTop: "auto", borderTop: "1px solid #E5E7EB", paddingTop: "1.5rem" }}>
              <p style={{ fontSize: "0.8rem", color: "#6B7280", marginBottom: "0.5rem" }}>Customer Support</p>
              <a href="tel:+919502324184" style={{ color: "#2D6A4F", fontWeight: 700, textDecoration: "none", fontSize: "1rem" }}>+91 95023 24184</a>
            </div>
          </div>
          <style>{`
            @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
          `}</style>
        </>
      )}
    </nav>
  );
}
