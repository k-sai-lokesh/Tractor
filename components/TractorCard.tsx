"use client";

import Link from "next/link";
import Image from "next/image";
import { Star, Clock, MapPin, Phone, Zap, Calendar } from "lucide-react";
import { Tractor } from "@/lib/data";

interface Props {
  tractor: Tractor;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.15rem" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={13}
          fill={star <= Math.floor(rating) ? "#F4A300" : star <= rating ? "#F4A300" : "none"}
          color={star <= rating ? "#F4A300" : "#D1D5DB"}
          style={{ opacity: star <= rating ? 1 : 0.4 }}
        />
      ))}
    </div>
  );
}

export default function TractorCard({ tractor }: Props) {
  return (
    <div className="card" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Image */}
      <div style={{ position: "relative", height: 200, overflow: "hidden", background: "#F0F7F4" }}>
        <Image
          src={tractor.image}
          alt={`${tractor.brand} ${tractor.model}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          style={{ objectFit: "cover", transition: "transform 0.4s ease" }}
          onMouseEnter={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1.06)")}
          onMouseLeave={(e) => ((e.target as HTMLImageElement).style.transform = "scale(1)")}
        />
        {/* Availability badge */}
        <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}>
          <span className={tractor.available ? "badge-available" : "badge-booked"}>
            {tractor.available ? "✓ Available" : "✗ Booked"}
          </span>
        </div>
        {/* HP badge */}
        <div style={{
          position: "absolute", bottom: "0.75rem", left: "0.75rem",
          background: "rgba(27,67,50,0.9)", color: "white",
          padding: "0.2rem 0.6rem", borderRadius: "0.4rem", fontSize: "0.75rem", fontWeight: 700,
          display: "flex", alignItems: "center", gap: "0.25rem",
        }}>
          <Zap size={11} /> {tractor.hp} HP
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "1rem 1.1rem", display: "flex", flexDirection: "column", flex: 1 }}>
        {/* Brand + model */}
        <div style={{ marginBottom: "0.35rem" }}>
          <p style={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            {tractor.brand}
          </p>
          <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "#111827", lineHeight: 1.25 }}>
            {tractor.model}
          </h3>
        </div>

        {/* Number plate */}
        <div style={{ marginBottom: "0.65rem" }}>
          <span className="plate-badge">{tractor.numberPlate}</span>
        </div>

        {/* Location */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.65rem", color: "#6B7280", fontSize: "0.8rem" }}>
          <MapPin size={13} />
          <span>{tractor.location}</span>
        </div>

        {/* Attachments */}
        {tractor.attachments.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "0.75rem" }}>
            {tractor.attachments.slice(0, 3).map((a) => (
              <span key={a.name} className="attachment-chip">{a.name}</span>
            ))}
            {tractor.attachments.length > 3 && (
              <span className="attachment-chip">+{tractor.attachments.length - 3}</span>
            )}
          </div>
        )}

        {/* Availability time */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.75rem", color: "#6B7280", fontSize: "0.8rem" }}>
          <Clock size={13} />
          <span>{tractor.availableTime}</span>
        </div>

        {/* Owner + rating */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.85rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, #2D6A4F, #40916C)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.7rem", color: "white", fontWeight: 700,
            }}>
              {tractor.owner.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <span style={{ fontSize: "0.8rem", color: "#374151", fontWeight: 500 }}>{tractor.owner}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
            <StarRating rating={tractor.rating} />
            <span style={{ fontSize: "0.78rem", color: "#6B7280" }}>({tractor.reviewCount})</span>
          </div>
        </div>

        {/* Pricing divider */}
        <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: "0.75rem", marginTop: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "0.75rem" }}>
            <div>
              <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#2D6A4F" }}>
                ₹{tractor.pricePerHour.toLocaleString("en-IN")}
              </span>
              <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>/hr</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: "1rem", fontWeight: 700, color: "#6B4226" }}>
                ₹{tractor.pricePerDay.toLocaleString("en-IN")}
              </span>
              <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>/day</span>
            </div>
          </div>

          <Link
            href={`/tractor/${tractor.id}`}
            className="btn-primary"
            style={{
              display: "flex",
              justifyContent: "center",
              textDecoration: "none",
              width: "100%",
              opacity: tractor.available ? 1 : 0.5,
              pointerEvents: tractor.available ? "auto" : "none",
            }}
          >
            <Calendar size={15} />
            {tractor.available ? "Book Now" : "Unavailable"}
          </Link>
        </div>
      </div>
    </div>
  );
}
