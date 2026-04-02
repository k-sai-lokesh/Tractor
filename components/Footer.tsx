"use client";

import Link from "next/link";
import { Tractor, Share2, Heart, MessageCircle, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer style={{ background: "#1B4332", color: "rgba(255,255,255,0.85)", marginTop: "auto" }}>
      {/* Main footer */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3.5rem 1.5rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2.5rem" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <div style={{ background: "linear-gradient(135deg, #2D6A4F, #40916C)", borderRadius: "0.625rem", padding: "0.45rem", display: "flex" }}>
                <Tractor size={22} color="white" />
              </div>
              <span style={{ fontWeight: 800, fontSize: "1.25rem", color: "white" }}>
                Tractor<span style={{ color: "#F4A300" }}>Lease</span>
              </span>
            </div>
            <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "rgba(255,255,255,0.65)", marginBottom: "1.25rem" }}>
              India's premier agricultural equipment leasing marketplace. Connecting farmers with the right tools for a better harvest.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[Share2, Heart, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" style={{
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "0.5rem",
                  padding: "0.5rem",
                  display: "flex",
                  transition: "background 0.2s",
                  color: "rgba(255,255,255,0.8)",
                }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(244,163,0,0.3)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: "1rem", color: "white", marginBottom: "1rem" }}>Quick Links</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { href: "/listings", label: "Browse Tractors" },
                { href: "/list-tractor", label: "List Your Tractor" },
                { href: "/my-bookings", label: "My Bookings" },
                { href: "/owner-dashboard", label: "Owner Dashboard" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#F4A300")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Equipment */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: "1rem", color: "white", marginBottom: "1rem" }}>Equipment</h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {["Tractor", "Rotavator", "Cultivator", "Plough", "Harrow", "Trailer", "Sprayer"].map(eq => (
                <li key={eq}>
                  <Link href={`/listings?type=${eq}`} style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#F4A300")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                  >
                    {eq}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: "1rem", color: "white", marginBottom: "1rem" }}>Contact Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { icon: Phone, text: "+91 95023 24184" },
                { icon: Mail, text: "support@tractorlease.in" },
                { icon: MapPin, text: "Nellore, Andhra Pradesh, India" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}>
                  <Icon size={16} style={{ color: "#F4A300", marginTop: "0.1rem", flexShrink: 0 }} />
                  <span style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.65)" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "1.25rem 1.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "0.5rem" }}>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
            © {new Date().getFullYear()} TractorLease. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map(link => (
              <a key={link} href="#" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#F4A300")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
