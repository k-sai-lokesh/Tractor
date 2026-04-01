"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronRight, Star, Shield, TrendingUp, ArrowRight, Wheat, MapPin } from "lucide-react";
import TractorCard from "@/components/TractorCard";
import { tractors, testimonials } from "@/lib/data";

const CATEGORIES = [
  { name: "Tractor", emoji: "Tractor", color: "#2D6A4F" },
  { name: "Rotavator", emoji: "Rotavator", color: "#40916C" },
  { name: "Cultivator", emoji: "Cultivator", color: "#F4A300" },
  { name: "Plough", emoji: "Plough", color: "#6B4226" },
  { name: "Harrow", emoji: "Harrow", color: "#1B4332" },
  { name: "Trailer", emoji: "Trailer", color: "#52B788" },
  { name: "Sprayer", emoji: "Sprayer", color: "#2D6A4F" },
];

const STEPS = [
  { step: "01", title: "Search and Filter", desc: "Find tractors by location, equipment type, date, and budget. Smart filters to match exactly what your farm needs.", icon: Search, color: "#2D6A4F" },
  { step: "02", title: "Book and Pay Securely", desc: "Choose dates and time slots, select attachments, and pay via UPI, card, or net banking with 100% secure checkout.", icon: Shield, color: "#F4A300" },
  { step: "03", title: "Farm and Grow", desc: "Owner contact revealed post-payment. Tractor arrives at your farm on schedule. Rate your experience afterwards.", icon: TrendingUp, color: "#6B4226" },
];

const STATS = [
  { label: "Tractors Listed", value: "12,000+", icon: "T" },
  { label: "Happy Farmers", value: "85,000+", icon: "F" },
  { label: "States Covered", value: "22", icon: "S" },
  { label: "Bookings Done", value: "3.2 Lakh+", icon: "B" },
];

export default function HomePage() {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [searchType, setSearchType] = useState("");
  const featuredTractors = tractors.slice(0, 6);

  return (
    <div className="wheat-bg">
      <section className="hero-gradient" style={{ position: "relative", overflow: "hidden", minHeight: "80vh", display: "flex", alignItems: "center", padding: "4rem 0" }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "rgba(244,163,0,0.1)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "3%", width: 200, height: 200, borderRadius: "50%", background: "rgba(82,183,136,0.15)", filter: "blur(30px)" }} />
        
        <div className="container" style={{ position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "center" }} className="lg:grid-cols-2">
            <div className="fade-in-up">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(244,163,0,0.15)", border: "1px solid rgba(244,163,0,0.3)", borderRadius: "999px", padding: "0.4rem 1rem", marginBottom: "1.5rem" }}>
                <Wheat size={14} color="#F4A300" />
                <span style={{ color: "#F4A300", fontSize: "0.8rem", fontWeight: 700 }}>India's #1 Leasing Marketplace</span>
              </div>
              <h1 style={{ fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: 900, color: "white", lineHeight: 1, marginBottom: "1.5rem" }}>
                Rent a Tractor.<br className="hidden md:block" /> Grow More.
              </h1>
              <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: "2.5rem", maxWidth: 540 }}>
                Connect with local tractor owners and lease premium farm equipment at the best rates across India. Fully insured and secure.
              </p>
              
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/listings" className="btn-gold" style={{ width: "auto", minWidth: "180px" }}>
                  <Search size={20} /> Find a Tractor
                </Link>
                <Link href="/list-tractor" style={{ padding: "0.875rem 2rem", borderRadius: "0.75rem", border: "2px solid rgba(255,255,255,0.5)", color: "white", fontWeight: 700, fontSize: "1rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }} className="hover:bg-white/20 transition-all w-full sm:w-auto justify-center">
                  List Yours <ArrowRight size={18} />
                </Link>
              </div>

              <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", marginTop: "3rem" }}>
                {[{ val: "12K+", label: "Tractors" }, { val: "85K+", label: "Farmers" }, { val: "22", label: "States" }].map(({ val, label }) => (
                  <div key={label}>
                    <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#F4A300" }}>{val}</div>
                    <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Hero Image Grid */}
            <div className="hidden lg:grid" style={{ gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              {tractors.slice(0, 4).map((t, i) => (
                <div key={t.id} style={{ borderRadius: "1.25rem", overflow: "hidden", position: "relative", height: i === 0 || i === 3 ? 240 : 200, border: "2px solid rgba(255,255,255,0.2)", boxShadow: "0 12px 40px rgba(0,0,0,0.3)", transform: i === 1 ? "translateY(30px)" : i === 2 ? "translateY(-15px)" : "none" }}>
                  <Image src={t.image} alt={t.model} fill sizes="300px" style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }} />
                  <div style={{ position: "absolute", bottom: "1rem", left: "1rem", color: "white" }}>
                    <div style={{ fontWeight: 800, fontSize: "0.9rem" }}>{t.brand} {t.model}</div>
                    <div style={{ fontSize: "0.75rem", opacity: 0.9 }}>₹{t.pricePerHour}/hr</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Responsive Search Box */}
          <div style={{ background: "white", borderRadius: "1.5rem", padding: "1.5rem", marginTop: "4rem", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", border: "1px solid #E5E7EB" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="md:grid-cols-4 md:items-end">
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>Location</label>
                <div style={{ position: "relative" }}>
                  <MapPin size={16} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
                  <input className="input-field" style={{ paddingLeft: "2.5rem" }} placeholder="Village, City..." value={searchLocation} onChange={e => setSearchLocation(e.target.value)} />
                </div>
              </div>
              <div className="md:border-l md:pl-5">
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>Booking Date</label>
                <input type="date" className="input-field" value={searchDate} onChange={e => setSearchDate(e.target.value)} />
              </div>
              <div className="md:border-l md:pl-5">
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>Equipment</label>
                <select className="input-field" value={searchType} onChange={e => setSearchType(e.target.value)}>
                  <option value="">All Equipment</option>
                  {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <Link href={"/listings?location=" + searchLocation + "&date=" + searchDate + "&type=" + searchType} className="btn-primary" style={{ width: "100%", height: "48px", justifyContent: "center" }}>
                <Search size={20} /> Search
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Categories */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <h2 className="section-heading">Equipment for Every Need</h2>
            <p className="section-subheading">Select from our wide range of farming tools</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }} className="sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {CATEGORIES.map((cat) => (
              <Link key={cat.name} href={"/listings?type=" + cat.name} style={{ textDecoration: "none" }}>
                <div style={{ background: "white", border: "1px solid #E5E7EB", borderRadius: "1.25rem", padding: "1.5rem 1rem", textAlign: "center", cursor: "pointer", transition: "all 0.3s", boxShadow: "0 4px 6px rgba(0,0,0,0.02)" }} className="hover:border-[#2D6A4F] hover:shadow-lg hover:-translate-y-1">
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem", color: cat.color }}>
                    <Wheat size={32} color={cat.color} style={{ margin: "0 auto" }} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1F2937" }}>{cat.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Fleet */}
      <section style={{ background: "#F3F7F5", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem", flexWrap: "wrap", gap: "1.5rem" }}>
            <div>
              <h2 className="section-heading">Featured Fleet</h2>
              <p className="section-subheading">Newly listed & top-rated tractors near you</p>
            </div>
            <Link href="/listings" className="btn-outline" style={{ width: "auto" }}>View All Fleet <ArrowRight size={18} /></Link>
          </div>
          <div className="grid-responsive grid-responsive-2 lg:grid-responsive-3" style={{ gap: "2rem" }}>
            {featuredTractors.map(t => <TractorCard key={t.id} tractor={t} />)}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: "6rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="section-heading">How TractorLease Works</h2>
            <p className="section-subheading">Rent farming power in 3 easy steps</p>
          </div>
          <div className="grid-responsive grid-responsive-3" style={{ gap: "3rem" }}>
            {STEPS.map((step) => (
              <div key={step.step} style={{ textAlign: "center" }}>
                <div style={{ width: 80, height: 80, borderRadius: "2rem", background: step.color + "15", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", border: "2px solid " + step.color + "20" }}>
                  <step.icon size={32} color={step.color} />
                </div>
                <div style={{ fontSize: "0.8rem", fontWeight: 800, color: step.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Step {step.step}</div>
                <h3 style={{ fontWeight: 800, fontSize: "1.4rem", color: "#1B4332", marginBottom: "1rem" }}>{step.title}</h3>
                <p style={{ color: "#4B5563", fontSize: "1rem", lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section style={{ padding: "0 0 6rem 0" }}>
        <div className="container">
          <div style={{ background: "linear-gradient(135deg, #1B4332, #214E3A)", borderRadius: "2.5rem", padding: "5rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -50, right: -50, width: 250, height: 250, borderRadius: "50%", background: "rgba(244,163,0,0.1)" }} />
            <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "white", marginBottom: "1.5rem", lineHeight: 1.1 }}>
                Got a Tractor? Start Earning!
              </h2>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.1rem", marginBottom: "3rem", lineHeight: 1.6 }}>
                Join 12,000+ owners and list your equipment for free. Earn up to ₹45,000 extra per month by leasing your idle assets.
              </p>
              <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", justifyContent: "center" }}>
                <Link href="/list-tractor" className="btn-gold" style={{ width: "auto", padding: "1rem 2.5rem" }}>List Your Tractor Free <ArrowRight size={20} /></Link>
                <Link href="/listings" style={{ padding: "1rem 2.5rem", borderRadius: "1rem", border: "2px solid rgba(255,255,255,0.3)", color: "white", fontWeight: 700, textDecoration: "none" }} className="hover:bg-white/10 transition-all font-semibold">Browse Listings</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}