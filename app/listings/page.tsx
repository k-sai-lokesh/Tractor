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

  const FilterPanel = () => (
    <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
      <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1B4332", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <SlidersHorizontal size={18} /> Filters
      </h3>

      {/* Equipment type */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>Equipment Type</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {EQUIPMENT_TYPES.map(type => (
            <button key={type} onClick={() => setSelectedType(type)} style={{
              background: selectedType === type ? "rgba(45,106,79,0.1)" : "transparent",
              color: selectedType === type ? "#2D6A4F" : "#374151",
              border: selectedType === type ? "1px solid rgba(45,106,79,0.3)" : "1px solid transparent",
              borderRadius: "0.5rem", padding: "0.4rem 0.75rem",
              fontSize: "0.875rem", fontWeight: selectedType === type ? 600 : 400,
              cursor: "pointer", textAlign: "left", transition: "all 0.2s",
            }}>
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>Brand</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {BRANDS.map(brand => (
            <button key={brand} onClick={() => setSelectedBrand(brand)} style={{
              background: selectedBrand === brand ? "rgba(45,106,79,0.1)" : "transparent",
              color: selectedBrand === brand ? "#2D6A4F" : "#374151",
              border: selectedBrand === brand ? "1px solid rgba(45,106,79,0.3)" : "1px solid transparent",
              borderRadius: "0.5rem", padding: "0.4rem 0.75rem",
              fontSize: "0.875rem", fontWeight: selectedBrand === brand ? 600 : 400,
              cursor: "pointer", textAlign: "left", transition: "all 0.2s",
            }}>
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>Max Price/Hr</p>
          <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#2D6A4F" }}>₹{maxPrice}</span>
        </div>
        <input type="range" min={100} max={600} step={25} value={maxPrice}
          onChange={e => setMaxPrice(Number(e.target.value))}
          style={{ width: "100%", background: `linear-gradient(to right, #2D6A4F 0%, #2D6A4F ${((maxPrice-100)/500)*100}%, #E5E7EB ${((maxPrice-100)/500)*100}%, #E5E7EB 100%)` }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#9CA3AF", marginTop: "0.25rem" }}>
          <span>₹100</span><span>₹600</span>
        </div>
      </div>

      {/* Min rating */}
      <div style={{ marginBottom: "1.5rem" }}>
        <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>Minimum Rating</p>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {[0, 3, 3.5, 4, 4.5].map(rating => (
            <button key={rating} onClick={() => setMinRating(rating)} style={{
              background: minRating === rating ? "#2D6A4F" : "white",
              color: minRating === rating ? "white" : "#374151",
              border: "1px solid", borderColor: minRating === rating ? "#2D6A4F" : "#E5E7EB",
              borderRadius: "0.5rem", padding: "0.3rem 0.6rem",
              fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
            }}>
              {rating === 0 ? "Any" : `${rating}★`}
            </button>
          ))}
        </div>
      </div>

      {/* Available only */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
        <input type="checkbox" id="avail" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)}
          style={{ width: 16, height: 16, accentColor: "#2D6A4F" }} />
        <label htmlFor="avail" style={{ fontSize: "0.875rem", color: "#374151", fontWeight: 500, cursor: "pointer" }}>Available Today Only</label>
      </div>

      <button onClick={() => { setSearchQ(""); setSelectedBrand("All"); setSelectedType("All"); setMaxPrice(500); setMinRating(0); setAvailableOnly(false); }}
        style={{ width: "100%", padding: "0.6rem", borderRadius: "0.75rem", border: "1px solid #E5E7EB", background: "transparent", color: "#6B7280", fontSize: "0.875rem", cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}
        onMouseEnter={e => { e.currentTarget.style.background = "#FEF3C7"; e.currentTarget.style.color = "#92400E"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#6B7280"; }}
      >
        <X size={14} style={{ display: "inline", marginRight: 4 }} /> Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="wheat-bg" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)", padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "0.5rem" }}>Browse Tractors</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.95rem" }}>{filtered.length} tractors available across India</p>

          {/* Search + Sort bar */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 240, position: "relative" }}>
              <Search size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#6B7280" }} />
              <input
                className="input-field"
                style={{ paddingLeft: "2.75rem", background: "rgba(255,255,255,0.95)" }}
                placeholder="Search brand, model, location..."
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
              />
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{ padding: "0.75rem 1rem", borderRadius: "0.75rem", border: "none", background: "rgba(255,255,255,0.95)", fontFamily: "inherit", fontWeight: 600, color: "#374151", cursor: "pointer", outline: "none", minWidth: 180 }}>
              <option value="rating">Sort: Best Rated</option>
              <option value="price_asc">Sort: Price Low→High</option>
              <option value="price_desc">Sort: Price High→Low</option>
            </select>
            <button onClick={() => setMobileFilters(!mobileFilters)}
              className="md:hidden"
              style={{ padding: "0.75rem 1.25rem", borderRadius: "0.75rem", background: "#F4A300", color: "white", border: "none", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "inherit" }}>
              <Filter size={16} /> Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "2rem", alignItems: "start" }}>
          {/* Sidebar */}
          <div style={{ position: "sticky", top: 88 }}>
            <FilterPanel />
          </div>

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", background: "white", borderRadius: "1rem", border: "1px solid #E5E7EB" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
                <h3 style={{ fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>No tractors found</h3>
                <p style={{ color: "#6B7280" }}>Try adjusting your filters</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))", gap: "1.5rem" }}>
                {filtered.map(t => <TractorCard key={t.id} tractor={t} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter overlay */}
      {mobileFilters && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", justifyContent: "flex-end" }}
          onClick={() => setMobileFilters(false)}>
          <div style={{ background: "white", width: "85%", maxWidth: 340, padding: "1.5rem", overflowY: "auto" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
              <span style={{ fontWeight: 700, fontSize: "1rem" }}>Filters</span>
              <button onClick={() => setMobileFilters(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><X size={20} /></button>
            </div>
            <FilterPanel />
          </div>
        </div>
      )}
    </div>
  );
}
