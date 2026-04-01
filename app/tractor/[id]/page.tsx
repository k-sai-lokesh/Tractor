"use client";

import { useState, use } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Star, Clock, MapPin, Phone, MessageCircle,
  Zap, Calendar, ChevronLeft, ChevronRight,
  Plus, Minus, Shield, CheckCircle,
} from "lucide-react";
import { tractors } from "@/lib/data";
import { calculateTotal, formatCurrency } from "@/lib/pricing";
import { useBooking } from "@/lib/bookingStore";

export default function TractorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { setBooking } = useBooking();

  const tractor = tractors.find(t => t.id === id);

  const [activeImage, setActiveImage] = useState(0);
  const [durationType, setDurationType] = useState<"hours" | "days">("hours");
  const [hours, setHours] = useState(4);
  const [days, setDays] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  if (!tractor) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>😔</div>
        <h2 style={{ fontWeight: 700, color: "#374151" }}>Tractor not found</h2>
      </div>
    );
  }

  const toggleAttachment = (name: string) => {
    setSelectedAttachments(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const attachmentTotalPerHour = tractor.attachments
    .filter(a => selectedAttachments.includes(a.name))
    .reduce((sum, a) => sum + a.pricePerHour, 0);

  const pricing = calculateTotal(
    durationType === "hours" ? hours : 0,
    durationType === "days" ? days : 0,
    tractor.pricePerHour,
    tractor.pricePerDay,
    attachmentTotalPerHour,
    promoApplied ? promoCode : ""
  );

  const handleBookNow = () => {
    setBooking({
      tractorId: tractor.id,
      tractorModel: tractor.model,
      tractorBrand: tractor.brand,
      tractorImage: tractor.image,
      ownerName: tractor.owner,
      ownerMobile: tractor.mobile,
      ownerUpiId: tractor.upiId,
      pricePerHour: tractor.pricePerHour,
      pricePerDay: tractor.pricePerDay,
      selectedDate,
      durationType,
      hours,
      days,
      selectedAttachments: tractor.attachments.filter(a => selectedAttachments.includes(a.name)),
      promoCode: promoApplied ? promoCode : "",
      ...pricing,
      location: tractor.location,
    });
    router.push("/checkout");
  };

  return (
    <div className="wheat-bg" style={{ minHeight: "100vh" }}>
      {/* Photo carousel */}
      <div style={{ background: "#1B4332", padding: "1.5rem", position: "relative" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", alignItems: "start" }}>
            {/* Main image */}
            <div style={{ position: "relative", height: 420, borderRadius: "1rem", overflow: "hidden", background: "#F0F7F4" }}>
              <Image src={tractor.images[activeImage]} alt={tractor.model} fill sizes="800px" style={{ objectFit: "cover" }} />
              <button onClick={() => setActiveImage(i => (i - 1 + tractor.images.length) % tractor.images.length)}
                style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => setActiveImage(i => (i + 1) % tractor.images.length)}
                style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.9)", border: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ChevronRight size={20} />
              </button>
            </div>
            {/* Thumbnails */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {tractor.images.map((img, i) => (
                <div key={i} onClick={() => setActiveImage(i)} style={{
                  width: 100, height: 75, borderRadius: "0.5rem", overflow: "hidden",
                  border: `3px solid ${activeImage === i ? "#F4A300" : "transparent"}`,
                  cursor: "pointer", position: "relative",
                }}>
                  <Image src={img} alt="" fill sizes="100px" style={{ objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2rem", alignItems: "start" }}>
          {/* Left — tractor details */}
          <div>
            {/* Header */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.75rem", border: "1px solid #E5E7EB", marginBottom: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <p style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{tractor.brand}</p>
                  <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1B4332", marginBottom: "0.5rem" }}>{tractor.model}</h1>
                  <span className="plate-badge" style={{ marginRight: "0.5rem" }}>{tractor.numberPlate}</span>
                  <span className={tractor.available ? "badge-available" : "badge-booked"}>{tractor.available ? "✓ Available" : "✗ Currently Booked"}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 900, color: "#2D6A4F" }}>₹{tractor.pricePerHour.toLocaleString("en-IN")}<span style={{ fontSize: "1rem", color: "#6B7280" }}>/hr</span></div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "#6B4226" }}>₹{tractor.pricePerDay.toLocaleString("en-IN")}<span style={{ fontSize: "0.875rem", color: "#6B7280" }}>/day</span></div>
                </div>
              </div>

              {/* Stars */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={18} fill={s<=tractor.rating?"#F4A300":"none"} color={s<=tractor.rating?"#F4A300":"#D1D5DB"} />)}
                <span style={{ fontWeight: 700, color: "#1B4332" }}>{tractor.rating}</span>
                <span style={{ color: "#6B7280", fontSize: "0.875rem" }}>({tractor.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Specs */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.75rem", border: "1px solid #E5E7EB", marginBottom: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1B4332", marginBottom: "1.25rem" }}>Tractor Specifications</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {[
                  { label: "Brand", value: tractor.brand },
                  { label: "Model", value: tractor.model },
                  { label: "Year", value: tractor.year },
                  { label: "Horsepower", value: `${tractor.hp} HP` },
                  { label: "Number Plate", value: tractor.numberPlate },
                  { label: "Available Hours", value: tractor.availableTime },
                  { label: "Available Days", value: tractor.availableDays.join(", ") },
                  { label: "Location", value: tractor.location },
                ].map(({ label, value }) => (
                  <div key={label} style={{ padding: "0.75rem", background: "#F9FAFB", borderRadius: "0.5rem" }}>
                    <p style={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: 500, marginBottom: "0.2rem" }}>{label}</p>
                    <p style={{ fontSize: "0.875rem", color: "#111827", fontWeight: 600 }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.75rem", border: "1px solid #E5E7EB", marginBottom: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1B4332", marginBottom: "0.75rem" }}>About This Tractor</h2>
              <p style={{ color: "#374151", lineHeight: 1.8, fontSize: "0.9rem" }}>{tractor.description}</p>
            </div>

            {/* Attachments */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.75rem", border: "1px solid #E5E7EB", marginBottom: "1.5rem", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1B4332", marginBottom: "1.25rem" }}>Available Attachments</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.75rem" }}>
                {tractor.attachments.map(att => (
                  <button key={att.name} onClick={() => toggleAttachment(att.name)} style={{
                    padding: "1rem", borderRadius: "0.75rem", border: "2px solid",
                    borderColor: selectedAttachments.includes(att.name) ? "#2D6A4F" : "#E5E7EB",
                    background: selectedAttachments.includes(att.name) ? "rgba(45,106,79,0.08)" : "white",
                    cursor: "pointer", textAlign: "left", transition: "all 0.2s", fontFamily: "inherit",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1B4332" }}>{att.name}</span>
                      {selectedAttachments.includes(att.name) && <CheckCircle size={18} color="#2D6A4F" fill="#2D6A4F" />}
                    </div>
                    <div style={{ marginTop: "0.3rem", fontSize: "0.8rem", color: "#6B7280" }}>+₹{att.pricePerHour}/hr</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.75rem", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1B4332", marginBottom: "1.25rem" }}>Renter Reviews</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {tractor.reviews.map(review => (
                  <div key={review.id} style={{ padding: "1rem", background: "#F9FAFB", borderRadius: "0.75rem", border: "1px solid #F3F4F6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "#1B4332" }}>{review.renter}</span>
                      <div style={{ display: "flex", gap: "0.15rem" }}>
                        {[1,2,3,4,5].map(s => <Star key={s} size={13} fill={s<=review.rating?"#F4A300":"none"} color={s<=review.rating?"#F4A300":"#D1D5DB"} />)}
                      </div>
                    </div>
                    <p style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.6 }}>{review.comment}</p>
                    <p style={{ fontSize: "0.75rem", color: "#9CA3AF", marginTop: "0.4rem" }}>{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — booking panel */}
          <div style={{ position: "sticky", top: 88 }}>
            {/* Pricing panel */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #E5E7EB", boxShadow: "0 8px 32px rgba(45,106,79,0.12)", marginBottom: "1rem" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: "#1B4332", marginBottom: "1.25rem" }}>📋 Booking Details</h3>

              {/* Date picker */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>Select Date</label>
                <input type="date" className="input-field" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
              </div>

              {/* Duration type */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.5rem" }}>Duration Type</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {[["hours", "⏱ Hourly"], ["days", "📅 Daily"]].map(([type, label]) => (
                    <button key={type} onClick={() => setDurationType(type as "hours" | "days")} style={{
                      padding: "0.6rem", borderRadius: "0.6rem", border: "2px solid",
                      borderColor: durationType === type ? "#2D6A4F" : "#E5E7EB",
                      background: durationType === type ? "rgba(45,106,79,0.08)" : "white",
                      color: durationType === type ? "#2D6A4F" : "#374151",
                      fontWeight: 600, fontSize: "0.85rem", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                    }}>{label}</button>
                  ))}
                </div>
              </div>

              {/* Count selector */}
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.5rem" }}>
                  {durationType === "hours" ? `Hours: ${hours}` : `Days: ${days}`}
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <button onClick={() => durationType === "hours" ? setHours(h => Math.max(1, h-1)) : setDays(d => Math.max(1, d-1))}
                    style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #E5E7EB", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Minus size={16} />
                  </button>
                  <span style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1B4332", minWidth: 32, textAlign: "center" }}>{durationType === "hours" ? hours : days}</span>
                  <button onClick={() => durationType === "hours" ? setHours(h => Math.min(12, h+1)) : setDays(d => Math.min(30, d+1))}
                    style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #E5E7EB", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Promo code */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>Promo Code</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <input className="input-field" placeholder="KISAN20, FARM10..." value={promoCode} onChange={e => setPromoCode(e.target.value)} style={{ flex: 1 }} />
                  <button onClick={() => setPromoApplied(!promoApplied)} style={{
                    padding: "0.6rem 0.9rem", borderRadius: "0.6rem", border: "none",
                    background: promoApplied ? "#D1FAE5" : "#2D6A4F", color: promoApplied ? "#065F46" : "white",
                    fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit",
                  }}>{promoApplied ? "✓" : "Apply"}</button>
                </div>
              </div>

              {/* Divider */}
              <div style={{ borderTop: "1px dashed #E5E7EB", paddingTop: "1rem", marginBottom: "1rem" }}>
                {[
                  { label: `Base Rent (${durationType === "hours" ? `${hours}hr` : `${days}day`})`, value: pricing.baseRent },
                  ...(pricing.attachmentTotal > 0 ? [{ label: "Attachments", value: pricing.attachmentTotal }] : []),
                  ...(pricing.discount > 0 ? [{ label: "Discount (Promo)", value: -pricing.discount }] : []),
                  { label: "Platform Fee (5%)", value: pricing.platformFee },
                  { label: "GST (18%)", value: pricing.gst },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
                    <span style={{ color: "#6B7280" }}>{label}</span>
                    <span style={{ fontWeight: 600, color: value < 0 ? "#059669" : "#374151" }}>{value < 0 ? `-₹${Math.abs(value).toLocaleString("en-IN")}` : `₹${value.toLocaleString("en-IN")}`}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.75rem", paddingTop: "0.75rem", borderTop: "1px solid #E5E7EB" }}>
                  <span style={{ fontWeight: 700, fontSize: "1rem", color: "#1B4332" }}>Total Payable</span>
                  <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#2D6A4F" }}>₹{pricing.grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button onClick={handleBookNow} disabled={!tractor.available || !selectedDate} className="btn-primary" style={{
                width: "100%", justifyContent: "center", fontSize: "1rem",
                opacity: (!tractor.available || !selectedDate) ? 0.6 : 1,
                cursor: (!tractor.available || !selectedDate) ? "not-allowed" : "pointer",
              }}>
                <Calendar size={18} /> {!selectedDate ? "Select a Date First" : "Proceed to Pay"}
              </button>
              {!selectedDate && <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#F4A300", marginTop: "0.5rem" }}>⚠ Please select a booking date</p>}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", marginTop: "0.75rem" }}>
                <Shield size={14} color="#2D6A4F" />
                <span style={{ fontSize: "0.75rem", color: "#6B7280" }}>100% Secure Payment via Razorpay</span>
              </div>
            </div>

            {/* Owner card */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.25rem", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h4 style={{ fontWeight: 700, fontSize: "0.9rem", color: "#1B4332", marginBottom: "1rem" }}>👨‍🌾 Tractor Owner</h4>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #2D6A4F, #40916C)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "white", fontSize: "1rem" }}>
                  {tractor.owner.split(" ").map(n => n[0]).join("").slice(0,2)}
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: "#111827" }}>{tractor.owner}</p>
                  <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>{tractor.location}</p>
                </div>
              </div>
              <div style={{ background: "#FEF9E7", border: "1px solid #FDE68A", borderRadius: "0.6rem", padding: "0.6rem 0.75rem", marginBottom: "0.75rem" }}>
                <p style={{ fontSize: "0.78rem", color: "#92400E" }}>🔒 Contact details shared only after payment to protect privacy</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "0.6rem", borderRadius: "0.6rem", border: "1px solid #E5E7EB", background: "white", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, color: "#374151", fontFamily: "inherit" }}>
                  <Phone size={14} /> Call
                </button>
                <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem", padding: "0.6rem", borderRadius: "0.6rem", border: "none", background: "#25D366", cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, color: "white", fontFamily: "inherit" }}>
                  <MessageCircle size={14} /> WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
