"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar, Clock, DollarSign, Star,
  X, CheckCircle, AlertCircle, XCircle,
} from "lucide-react";
import { mockBookings, Booking } from "@/lib/data";

function StatusBadge({ status }: { status: Booking["status"] }) {
  if (status === "paid") return <span className="badge-paid">✅ Paid</span>;
  if (status === "pending") return <span className="badge-pending">⏳ Pending</span>;
  return <span className="badge-cancelled">❌ Cancelled</span>;
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState(mockBookings);
  const [activeTab, setActiveTab] = useState<"all" | "upcoming" | "past">("all");
  const [ratingModal, setRatingModal] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [reviewText, setReviewText] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const filtered = bookings.filter(b => {
    if (activeTab === "upcoming") return b.startDate >= today && b.status !== "cancelled";
    if (activeTab === "past") return b.startDate < today || b.status === "cancelled";
    return true;
  });

  const handleCancel = (id: string) => {
    if (window.confirm("Are you sure you want to cancel this booking? Refund will be processed per our refund policy.")) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "cancelled" as const } : b));
    }
  };

  const handleRatingSubmit = (id: string) => {
    alert(`Rating ${ratings[id]}★ submitted! Thank you for your feedback.`);
    setRatingModal(null);
    setReviewText("");
  };

  return (
    <div className="wheat-bg" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)", padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "white", marginBottom: "0.4rem" }}>My Bookings</h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>{bookings.length} total bookings</p>

          {/* Tabs */}
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1.5rem" }}>
            {[["all", "All Bookings"], ["upcoming", "Upcoming"], ["past", "Past"]] .map(([tab, label]) => (
              <button key={tab} onClick={() => setActiveTab(tab as typeof activeTab)} style={{
                padding: "0.5rem 1.25rem", borderRadius: "999px", border: "none",
                background: activeTab === tab ? "white" : "rgba(255,255,255,0.15)",
                color: activeTab === tab ? "#2D6A4F" : "rgba(255,255,255,0.85)",
                fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.2s",
              }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem", background: "white", borderRadius: "1rem", border: "1px solid #E5E7EB" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🚜</div>
            <h3 style={{ fontWeight: 700, color: "#374151", marginBottom: "0.5rem" }}>No bookings found</h3>
            <p style={{ color: "#6B7280", marginBottom: "1.5rem" }}>Start by browsing available tractors</p>
            <Link href="/listings" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex" }}>Browse Tractors</Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {filtered.map(booking => (
              <div key={booking.id} style={{
                background: "white", borderRadius: "1rem", border: "1px solid #E5E7EB",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)", overflow: "hidden",
                transition: "box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(45,106,79,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
              >
                <div className="booking-card-grid">
                  {/* Image */}
                  <div className="booking-card-image">
                    <Image src={booking.image} alt={booking.tractorModel} fill sizes="140px" style={{ objectFit: "cover" }} />
                  </div>

                  {/* Info */}
                  <div style={{ padding: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: "1.05rem", color: "#1B4332" }}>{booking.tractorBrand} {booking.tractorModel}</p>
                        <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>Owner: {booking.ownerName}</p>
                      </div>
                      <StatusBadge status={booking.status} />
                    </div>

                    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", color: "#374151" }}>
                        <Calendar size={13} color="#2D6A4F" />
                        <span>{booking.startDate}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", color: "#374151" }}>
                        <Clock size={13} color="#2D6A4F" />
                        <span>{booking.duration} {booking.durationType}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", color: "#374151" }}>
                        <DollarSign size={13} color="#2D6A4F" />
                        <span style={{ fontWeight: 700, color: "#2D6A4F" }}>₹{booking.grandTotal.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    {booking.attachments.length > 0 && (
                      <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
                        {booking.attachments.map(a => <span key={a} className="attachment-chip">{a}</span>)}
                      </div>
                    )}

                    <p style={{ fontSize: "0.75rem", color: "#9CA3AF", marginTop: "0.5rem" }}>Booking ID: {booking.id}</p>
                  </div>

                  {/* Actions */}
                  <div className="booking-card-actions">
                    {booking.status === "paid" && booking.startDate < today && (
                      <button onClick={() => setRatingModal(booking.id)} style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                        padding: "0.6rem 0.75rem", borderRadius: "0.6rem",
                        border: "1px solid #F4A300", background: "#FFF9E6",
                        color: "#92400E", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit",
                      }}>
                        <Star size={14} /> Rate & Review
                      </button>
                    )}
                    {booking.status === "paid" && booking.startDate >= today && (
                      <button onClick={() => handleCancel(booking.id)} style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                        padding: "0.6rem 0.75rem", borderRadius: "0.6rem",
                        border: "1px solid #FCA5A5", background: "#FEF2F2",
                        color: "#991B1B", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit",
                      }}>
                        <X size={14} /> Cancel Booking
                      </button>
                    )}
                    {booking.status === "pending" && (
                      <>
                        <button onClick={() => handleCancel(booking.id)} style={{
                          display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                          padding: "0.6rem 0.75rem", borderRadius: "0.6rem",
                          border: "1px solid #FCA5A5", background: "#FEF2F2",
                          color: "#991B1B", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit",
                        }}>
                          <X size={14} /> Cancel
                        </button>
                        <div style={{ fontSize: "0.7rem", color: "#9CA3AF", textAlign: "center" }}>Refund per policy</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Rating modal */}
      {ratingModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ background: "white", borderRadius: "1.25rem", padding: "2rem", maxWidth: 440, width: "100%" }}>
            <h3 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1B4332", marginBottom: "1.25rem" }}>⭐ Rate Your Experience</h3>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem", justifyContent: "center" }}>
              {[1,2,3,4,5].map(s => (
                <button key={s} onClick={() => setRatings(prev => ({ ...prev, [ratingModal]: s }))} style={{
                  background: "none", border: "none", cursor: "pointer", fontSize: "2rem",
                  color: s <= (ratings[ratingModal] || 0) ? "#F4A300" : "#E5E7EB",
                  transition: "color 0.2s, transform 0.1s",
                  transform: s <= (ratings[ratingModal] || 0) ? "scale(1.1)" : "scale(1)",
                }}>★</button>
              ))}
            </div>
            <textarea
              style={{ width: "100%", padding: "0.75rem", borderRadius: "0.75rem", border: "1.5px solid #E5E7EB", fontFamily: "inherit", fontSize: "0.9rem", minHeight: 80, resize: "vertical", outline: "none" }}
              placeholder="Share your experience..."
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "1rem" }}>
              <button onClick={() => setRatingModal(null)} className="btn-outline" style={{ width: "100%", justifyContent: "center" }}>Cancel</button>
              <button onClick={() => handleRatingSubmit(ratingModal)} className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>Submit Review</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
