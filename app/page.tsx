"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ChevronRight, Star, Shield, TrendingUp, ArrowRight, Wheat } from "lucide-react";
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
      <section className="hero-gradient" style={{ position: "relative", overflow: "hidden", minHeight: "90vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 300, height: 300, borderRadius: "50%", background: "rgba(244,163,0,0.1)", filter: "blur(40px)" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "3%", width: 200, height: 200, borderRadius: "50%", background: "rgba(82,183,136,0.15)", filter: "blur(30px)" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.5rem", width: "100%", position: "relative" }}>
          <div style={{ display: "grid", gridTemplateColumns: "55% 45%", gap: "3rem", alignItems: "center" }}>
            <div className="fade-in-up">
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(244,163,0,0.15)", border: "1px solid rgba(244,163,0,0.3)", borderRadius: "999px", padding: "0.4rem 1rem", marginBottom: "1.5rem" }}>
                <Wheat size={14} color="#F4A300" />
                <span style={{ color: "#F4A300", fontSize: "0.8rem", fontWeight: 600 }}>India No.1 Tractor Leasing Platform</span>
              </div>
              <h1 style={{ fontSize: "clamp(2rem,5vw,3.8rem)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: "1.25rem" }}>
                Rent a Tractor. Grow More.
              </h1>
              <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 480 }}>
                Connect with local tractor owners and lease premium farm equipment at the best rates across India.
              </p>
              <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", marginBottom: "2rem" }}>
                {[{ val: "12K+", label: "Tractors" }, { val: "85K+", label: "Farmers" }, { val: "22", label: "States" }].map(({ val, label }) => (
                  <div key={label}>
                    <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "#F4A300" }}>{val}</div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>{label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/listings" className="btn-gold" style={{ fontSize: "1rem", padding: "0.875rem 2rem" }}>
                  <Search size={18} /> Find a Tractor
                </Link>
                <Link href="/list-tractor" style={{ padding: "0.875rem 2rem", borderRadius: "0.75rem", border: "2px solid rgba(255,255,255,0.4)", color: "white", fontWeight: 600, fontSize: "1rem", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  List Your Tractor <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {tractors.slice(0, 4).map((t, i) => (
                <div key={t.id} style={{ borderRadius: "1rem", overflow: "hidden", position: "relative", height: i === 0 || i === 3 ? 200 : 170, border: "2px solid rgba(255,255,255,0.15)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", transform: i === 1 ? "translateY(20px)" : i === 2 ? "translateY(-10px)" : "none" }}>
                  <Image src={t.image} alt={t.model} fill sizes="250px" style={{ objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />
                  <div style={{ position: "absolute", bottom: "0.6rem", left: "0.75rem", color: "white" }}>
                    <div style={{ fontWeight: 700, fontSize: "0.78rem" }}>{t.brand} {t.model}</div>
                    <div style={{ fontSize: "0.7rem", opacity: 0.8 }}>from Rs.{t.pricePerHour}/hr</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.97)", borderRadius: "1.25rem", padding: "1.25rem 1.5rem", marginTop: "3rem", boxShadow: "0 20px 60px rgba(0,0,0,0.2)", display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: "1rem", alignItems: "center" }}>
            <div>
              <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.3rem" }}>Location</label>
              <input className="input-field" style={{ border: "none", padding: "0.3rem 0", background: "transparent", boxShadow: "none" }} placeholder="Village, district, state..." value={searchLocation} onChange={e => setSearchLocation(e.target.value)} />
            </div>
            <div style={{ borderLeft: "1px solid #E5E7EB", paddingLeft: "1rem" }}>
              <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.3rem" }}>Date</label>
              <input type="date" className="input-field" style={{ border: "none", padding: "0.3rem 0", background: "transparent", boxShadow: "none" }} value={searchDate} onChange={e => setSearchDate(e.target.value)} />
            </div>
            <div style={{ borderLeft: "1px solid #E5E7EB", paddingLeft: "1rem" }}>
              <label style={{ fontSize: "0.72rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.3rem" }}>Equipment</label>
              <select className="input-field" style={{ border: "none", padding: "0.3rem 0", background: "transparent", boxShadow: "none" }} value={searchType} onChange={e => setSearchType(e.target.value)}>
                <option value="">All types</option>
                {CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <Link href={"/listings?location=" + searchLocation + "&date=" + searchDate + "&type=" + searchType} className="btn-primary" style={{ padding: "0.875rem 1.75rem", whiteSpace: "nowrap" }}>
              <Search size={18} /> Search
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "4.5rem 1.5rem", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 className="section-heading">Browse by Equipment</h2>
          <p className="section-subheading">Find the right tool for every farm task</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "1rem" }}>
          {CATEGORIES.map((cat) => (
            <Link key={cat.name} href={"/listings?type=" + cat.name} style={{ textDecoration: "none" }}>
              <div style={{ background: "white", border: "2px solid transparent", borderRadius: "1rem", padding: "1.5rem 1rem", textAlign: "center", cursor: "pointer", transition: "all 0.3s ease", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = cat.color; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 12px 28px " + cat.color + "25"; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "transparent"; el.style.transform = "translateY(0)"; el.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.6rem", color: cat.color, fontWeight: 800 }}>&#9740;</div>
                <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#374151" }}>{cat.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ background: "#F0F7F4", padding: "4.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <h2 className="section-heading">Featured Tractors</h2>
              <p className="section-subheading">Top-rated tractors available near you</p>
            </div>
            <Link href="/listings" className="btn-outline">View All <ArrowRight size={16} /></Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {featuredTractors.map(t => <TractorCard key={t.id} tractor={t} />)}
          </div>
        </div>
      </section>

      <section style={{ padding: "5rem 1.5rem", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <h2 className="section-heading">How TractorLease Works</h2>
          <p className="section-subheading">Three simple steps to get your farm productive</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {STEPS.map((step) => (
            <div key={step.step}>
              <div style={{ background: "white", borderRadius: "1.25rem", padding: "2rem", border: "2px solid " + step.color + "20", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", transition: "all 0.3s ease", height: "100%" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = step.color + "60"; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = step.color + "20"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}
              >
                <div style={{ width: 56, height: 56, borderRadius: "1rem", background: step.color + "18", border: "2px solid " + step.color + "30", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                  <step.icon size={24} color={step.color} />
                </div>
                <div style={{ fontSize: "0.7rem", fontWeight: 700, color: step.color, letterSpacing: "0.1em", marginBottom: "0.5rem" }}>STEP {step.step}</div>
                <h3 style={{ fontWeight: 700, fontSize: "1.15rem", color: "#1B4332", marginBottom: "0.75rem" }}>{step.title}</h3>
                <p style={{ color: "#6B7280", fontSize: "0.875rem", lineHeight: 1.7 }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)", padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem", textAlign: "center" }}>
          {STATS.map(stat => (
            <div key={stat.label}>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "#F4A300", lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", marginTop: "0.35rem" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "5rem 1.5rem", maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2 className="section-heading">What Farmers Say</h2>
          <p className="section-subheading">Real stories from our farming community</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {testimonials.map(t => (
            <div key={t.id} style={{ background: "white", borderRadius: "1.25rem", padding: "2rem", border: "1px solid #E5E7EB", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", transition: "all 0.3s ease" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(45,106,79,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)"; }}
            >
              <div style={{ display: "flex", gap: "0.2rem", marginBottom: "1rem" }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s<=t.rating?"#F4A300":"none"} color={s<=t.rating?"#F4A300":"#D1D5DB"} />)}
              </div>
              <p style={{ color: "#374151", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.5rem", fontStyle: "italic" }}>"{t.comment}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg, #2D6A4F, #40916C)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: "0.875rem" }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#111827" }}>{t.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "#6B7280" }}>{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "2rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 50%, #40916C 100%)", borderRadius: "2rem", padding: "4rem 3rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(244,163,0,0.1)" }} />
          <h2 style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 900, color: "white", marginBottom: "1rem", position: "relative" }}>
            Own a Tractor? Start Earning Today!
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.05rem", marginBottom: "2rem", maxWidth: 500, margin: "0 auto 2rem", position: "relative" }}>
            List your tractor for free and earn Rs.15,000 to Rs.45,000 per month. Join 12,000+ tractor owners on TractorLease.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/list-tractor" className="btn-gold" style={{ padding: "0.875rem 2rem", fontSize: "1rem" }}>List Your Tractor Free <ArrowRight size={18} /></Link>
            <Link href="/listings" style={{ padding: "0.875rem 2rem", borderRadius: "0.75rem", border: "2px solid rgba(255,255,255,0.4)", color: "white", fontWeight: 600, fontSize: "1rem", textDecoration: "none", display: "inline-flex", alignItems: "center" }}>Browse Tractors</Link>
          </div>
        </div>
      </section>
    </div>
  );
}