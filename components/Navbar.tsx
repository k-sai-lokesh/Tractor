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
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 68,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
          <div
            style={{
              background: "linear-gradient(135deg, #2D6A4F, #40916C)",
              borderRadius: "0.625rem",
              padding: "0.45rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Tractor size={22} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: "1.25rem", color: "#1B4332", letterSpacing: "-0.02em" }}>
            Tractor<span style={{ color: "#F4A300" }}>Lease</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="hidden md:flex">
          <Link href="/listings" style={{ color: "#374151", fontWeight: 500, fontSize: "0.95rem", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#2D6A4F")}
            onMouseLeave={e => (e.currentTarget.style.color = "#374151")}
          >
            Browse Tractors
          </Link>
          <Link href="/list-tractor" style={{ color: "#374151", fontWeight: 500, fontSize: "0.95rem", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#2D6A4F")}
            onMouseLeave={e => (e.currentTarget.style.color = "#374151")}
          >
            List Your Tractor
          </Link>
          <Link href="/my-bookings" style={{ color: "#374151", fontWeight: 500, fontSize: "0.95rem", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#2D6A4F")}
            onMouseLeave={e => (e.currentTarget.style.color = "#374151")}
          >
            My Bookings
          </Link>
          <Link href="/owner-dashboard" style={{ color: "#374151", fontWeight: 500, fontSize: "0.95rem", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#2D6A4F")}
            onMouseLeave={e => (e.currentTarget.style.color = "#374151")}
          >
            Dashboard
          </Link>
        </div>

        {/* CTA + mobile toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <a
            href="tel:18001234567"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "#2D6A4F",
              fontWeight: 600,
              fontSize: "0.875rem",
              textDecoration: "none",
            }}
            className="hidden md:flex"
          >
            <Phone size={15} />
            +91 95023 24184
          </a>
          <Link
            href="/list-tractor"
            className="btn-primary hidden md:inline-flex"
            style={{ padding: "0.55rem 1.25rem", fontSize: "0.875rem" }}
          >
            + List Tractor
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#2D6A4F" }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            background: "white",
            borderTop: "1px solid rgba(45,106,79,0.1)",
            padding: "1rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {[
            { href: "/listings", label: "Browse Tractors" },
            { href: "/list-tractor", label: "List Your Tractor" },
            { href: "/my-bookings", label: "My Bookings" },
            { href: "/owner-dashboard", label: "Owner Dashboard" },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                color: "#374151",
                fontWeight: 500,
                padding: "0.65rem 0",
                borderBottom: "1px solid #F3F4F6",
                textDecoration: "none",
                fontSize: "0.95rem",
              }}
            >
              {label}
            </Link>
          ))}
          <Link href="/list-tractor" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ marginTop: "0.5rem", justifyContent: "center" }}>
            + List Your Tractor
          </Link>
        </div>
      )}
    </nav>
  );
}
