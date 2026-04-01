"use client";

import { useState, useMemo } from "react";
import { Filter, Search, Star, SlidersHorizontal, X } from "lucide-react";
import TractorCard from "@/components/TractorCard";
import { tractors } from "@/lib/data";

const BRANDS = ["All", "Mahindra", "John Deere", "Sonalika", "Eicher", "Swaraj", "Kubota"];
const EQUIPMENT_TYPES = ["All", "Tractor", "Rotavator", "Cultivator", "Plough", "Harrow", "Trailer", "Sprayer"];

export default function ListingsPage() {
  const [searchQ, setSearchQ] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState("rating");

  const filtered = useMemo(() => {
    let list = tractors.filter(t => {
      if (searchQ && !`${t.brand} ${t.model} ${t.location} ${t.owner}`.toLowerCase().includes(searchQ.toLowerCase())) return false;
      if (selectedBrand !== "All" && t.brand !== selectedBrand) return false;
      if (t.pricePerHour > maxPrice) return false;
      if (t.rating < minRating) return false;
      if (availableOnly && !t.available) return false;
      return true;
    });
    if (sortBy === "rating") list = list.sort((a, b) => b.rating - a.rating);
    if (sortBy === "price_asc") list = list.sort((a, b) => a.pricePerHour - b.pricePerHour);
    if (sortBy === "price_desc") list = list.sort((a, b) => b.pricePerHour - a.pricePerHour);
    return list;
  }, [searchQ, selectedBrand, selectedType, maxPrice, minRating, availableOnly, sortBy]);

  const FilterPanel = ({ isMobile = false }) => (
    <div style={{ background: "white", borderRadius: isMobile ? 0 : "1rem", padding: isMobile ? "1rem 0.5rem" : "1.5rem", border: isMobile ? "none" : "1px solid #E5E7EB", boxShadow: isMobile ? "none" : "0 2px 8px rgba(0,0,0,0.06)" }}>
      {!isMobile && (
        <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1B4332", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <SlidersHorizontal size={18} /> Filters
        </h3>
      )}

      {/* Equipment type */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.85rem" }}>Equipment Type</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          {EQUIPMENT_TYPES.map(type => (
            <button key={type} onClick={() => setSelectedType(type)} style={{
              background: selectedType === type ? "rgba(45,106,79,0.1)" : "transparent",
              color: selectedType === type ? "#2D6A4F" : "#374151",
              border: "1px solid",
              borderColor: selectedType === type ? "rgba(45,106,79,0.2)" : "transparent",
              borderRadius: "0.6rem", padding: "0.5rem 0.75rem",
              fontSize: "0.9rem", fontWeight: selectedType === type ? 600 : 500,
              cursor: "pointer", textAlign: "left", transition: "all 0.2s",
            }}>
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.85rem" }}>Brand</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          {BRANDS.map(brand => (
            <button key={brand} onClick={() => setSelectedBrand(brand)} style={{
              background: selectedBrand === brand ? "rgba(45,106,79,0.1)" : "transparent",
              color: selectedBrand === brand ? "#2D6A4F" : "#374151",
              border: "1px solid",
              borderColor: selectedBrand === brand ? "rgba(45,106,79,0.2)" : "transparent",
              borderRadius: "0.6rem", padding: "0.5rem 0.75rem",
              fontSize: "0.9rem", fontWeight: selectedBrand === brand ? 600 : 500,
              cursor: "pointer", textAlign: "left", transition: "all 0.2s",
            }}>
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Max Price/Hr</p>
          <span style={{ fontSize: "0.95rem", fontWeight: 800, color: "#2D6A4F" }}>₹{maxPrice}</span>
        </div>
        <input type="range" min={100} max={600} step={25} value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          style={{ width: "100%", cursor: "pointer", accentColor: "#2D6A4F" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#9CA3AF", marginTop: "0.4rem" }}>
          <span>₹100</span><span>₹600</span>
        </div>
      </div>

      {/* Min rating */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.85rem" }}>Minimum Rating</p>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {[0, 3, 3.5, 4, 4.5].map(rating => (
            <button key={rating} onClick={() => setMinRating(rating)} style={{
              flex: 1, minWidth: "45px",
              background: minRating === rating ? "#2D6A4F" : "white",
              color: minRating === rating ? "white" : "#374151",
              border: "1px solid", borderColor: minRating === rating ? "#2D6A4F" : "#E5E7EB",
              borderRadius: "0.6rem", padding: "0.4rem",
              fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
            }}>
              {rating === 0 ? "Any" : `${rating}★`}
            </button>
          ))}
        </div>
      </div>

      {/* Available only */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.5rem", padding: "0.5rem 0" }}>
        <input type="checkbox" id="avail" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)}
          style={{ width: 18, height: 18, accentColor: "#2D6A4F", cursor: "pointer" }} />
        <label htmlFor="avail" style={{ fontSize: "0.95rem", color: "#1B4332", fontWeight: 600, cursor: "pointer" }}>Available Today Only</label>
      </div>

      <button onClick={() => { setSearchQ(""); setSelectedBrand("All"); setSelectedType("All"); setMaxPrice(500); setMinRating(0); setAvailableOnly(false); }}
        className="btn-outline"
        style={{ width: "100%", justifyContent: "center", borderStyle: "dashed" }}
      >
        <X size={16} /> Reset All Filters
      </button>
    </div>
  );

  return (
    <div className="wheat-bg" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1B4332, #214E3A)", padding: "3rem 0" }}>
        <div className="container">
          <div style={{ marginBottom: "2rem" }}>
            <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 900, color: "white", marginBottom: "0.5rem" }}>Browse Tractors</h1>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", fontWeight: 500 }}>
              {filtered.length} equipment sets found matching your needs
            </p>
          </div>

          {/* Search + Sort bar */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "stretch" }}>
            <div style={{ flex: "1 1 300px", position: "relative" }}>
              <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#6B7280", zIndex: 1 }} />
              <input
                className="input-field"
                style={{ paddingLeft: "1.25rem", background: "rgba(255,255,255,0.95)", height: "52px" }}
                placeholder="Search brand, model, location..."
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", gap: "0.75rem", width: "100%", flex: "1 1 200px" }} className="sm:w-auto">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                style={{ flex: 1, padding: "0 1.25rem", borderRadius: "0.75rem", border: "none", background: "rgba(255,255,255,0.95)", fontFamily: "inherit", fontWeight: 700, color: "#374151", cursor: "pointer", outline: "none", height: "52px" }}>
                <option value="rating">Sort: Best Rated</option>
                <option value="price_asc">Price Low→High</option>
                <option value="price_desc">Price High→Low</option>
              </select>
              <button onClick={() => setMobileFilters(true)}
                className="md:hidden btn-gold"
                style={{ padding: "0 1.25rem", borderRadius: "0.75rem", height: "52px", width: "auto" }}>
                <Filter size={18} /> Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container" style={{ padding: "3rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", alignItems: "start" }} className="md:grid-cols-[260px_1fr]">
          {/* Sidebar (Desktop) */}
          <div className="hidden md:block" style={{ position: "sticky", top: 100 }}>
            <FilterPanel />
          </div>

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "5rem 2rem", background: "white", borderRadius: "1.5rem", border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                <div style={{ width: 80, height: 80, background: "#F3F4F6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
                  <Search size={32} color="#9CA3AF" />
                </div>
                <h3 style={{ fontWeight: 800, fontSize: "1.25rem", color: "#1B4332", marginBottom: "0.5rem" }}>No results found</h3>
                <p style={{ color: "#6B7280", maxWidth: "300px", margin: "0 auto" }}>Try adjusting your filters or search terms to find what you're looking for.</p>
                <button onClick={() => { setSearchQ(""); setSelectedBrand("All"); setSelectedType("All"); setMaxPrice(500); setMinRating(0); setAvailableOnly(false); }}
                  className="btn-primary" style={{ marginTop: "2rem" }}>
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid-responsive grid-responsive-2 xl:grid-responsive-3" style={{ gap: "1.5rem" }}>
                {filtered.map(t => <TractorCard key={t.id} tractor={t} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilters && (
        <>
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", zIndex: 190 }}
            onClick={() => setMobileFilters(false)} />
          <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: "85%", maxWidth: "320px", background: "white", zIndex: 200, display: "flex", flexDirection: "column", padding: "1.5rem", boxShadow: "-4px 0 24px rgba(0,0,0,0.15)", animation: "slideIn 0.3s ease-out" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid #F3F4F6", paddingBottom: "1rem" }}>
              <h2 style={{ fontWeight: 800, fontSize: "1.25rem", color: "#1B4332", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <SlidersHorizontal size={20} /> Filters
              </h2>
              <button onClick={() => setMobileFilters(false)} style={{ background: "#F3F4F6", border: "none", borderRadius: "50%", padding: "0.5rem", cursor: "pointer", color: "#6B7280" }}><X size={20} /></button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", margin: "0 -0.5rem", padding: "0 0.5rem" }}>
              <FilterPanel isMobile />
            </div>
            <div style={{ paddingTop: "1.5rem", borderTop: "1px solid #F3F4F6" }}>
              <button onClick={() => setMobileFilters(false)} className="btn-primary" style={{ width: "100%", height: "52px" }}>
                Apply Filters
              </button>
            </div>
          </div>
          <style>{`
            @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
          `}</style>
        </>
      )}
    </div>
  );
}
