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
      {/* Photo header carousel */}
      <div style={{ background: "#1B4332", padding: "2rem 0", position: "relative" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }} className="lg:grid-cols-[1fr_auto]">
            {/* Main image */}
            <div style={{ position: "relative", height: "clamp(250px, 50vh, 480px)", borderRadius: "1.5rem", overflow: "hidden", background: "#0D2119", boxShadow: "0 20px 40px rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <Image src={tractor.images[activeImage]} alt={tractor.model} fill sizes="(max-width: 768px) 100vw, 800px" style={{ objectFit: "cover" }} priority />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent 30%)" }} />
              
              <button onClick={() => setActiveImage(i => (i - 1 + tractor.images.length) % tractor.images.length)}
                style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "50%", width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                <ChevronLeft size={24} />
              </button>
              <button onClick={() => setActiveImage(i => (i + 1) % tractor.images.length)}
                style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "50%", width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                <ChevronRight size={24} />
              </button>
              
              <div style={{ position: "absolute", bottom: "1rem", right: "1rem", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", padding: "0.4rem 0.8rem", borderRadius: "999px", color: "white", fontSize: "0.75rem", fontWeight: 700 }}>
                {activeImage + 1} / {tractor.images.length}
              </div>
            </div>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: "0.75rem", overflowX: "auto", paddingBottom: "0.5rem" }} className="lg:flex-col no-scrollbar">
              {tractor.images.map((img, i) => (
                <div key={i} onClick={() => setActiveImage(i)} style={{
                  width: 80, height: 60, borderRadius: "0.75rem", overflow: "hidden", flexShrink: 0,
                  border: `3px solid ${activeImage === i ? "#F4A300" : "rgba(255,255,255,0.1)"}`,
                  cursor: "pointer", position: "relative", transition: "all 0.2s"
                }} className="lg:w-[100px] lg:h-[75px]">
                  <Image src={img} alt="" fill sizes="100px" style={{ objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "3rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem", alignItems: "start" }} className="lg:grid-cols-[1fr_380px]">
          {/* Left — tractor details */}
          <div className="fade-in-up">
            {/* Header */}
            <div style={{ background: "white", borderRadius: "1.5rem", padding: "2rem", border: "1px solid #E5E7EB", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", color: "#2D6A4F", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{tractor.brand}</span>
                    <span className={tractor.available ? "badge-available" : "badge-booked"}>{tractor.available ? "✓ Available Now" : "✗ Currently Leased"}</span>
                  </div>
                  <h1 style={{ fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: 900, color: "#1B4332", marginBottom: "0.75rem", lineHeight: 1.1 }}>{tractor.model}</h1>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center" }}>
                    <span className="plate-badge" style={{ fontSize: "0.9rem" }}>{tractor.numberPlate}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#6B7280", fontSize: "0.9rem", fontWeight: 500 }}>
                      <MapPin size={16} /> {tractor.location}
                    </div>
                  </div>
                </div>
                <div style={{ background: "rgba(45,106,79,0.05)", padding: "1rem 1.5rem", borderRadius: "1rem", border: "1px solid rgba(45,106,79,0.1)" }}>
                  <div style={{ fontSize: "1.75rem", fontWeight: 900, color: "#2D6A4F" }}>₹{tractor.pricePerHour.toLocaleString("en-IN")}<span style={{ fontSize: "0.9rem", color: "#6B7280", fontWeight: 600 }}>/hr</span></div>
                  <div style={{ fontSize: "1rem", fontWeight: 700, color: "#6B4226", marginTop: "0.25rem" }}>₹{tractor.pricePerDay.toLocaleString("en-IN")}<span style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: 500 }}>/day</span></div>
                </div>
              </div>

              {/* Stars */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid #F3F4F6" }}>
                <div style={{ display: "flex", gap: "0.1rem" }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={20} fill={s<=tractor.rating?"#F4A300":"none"} color={s<=tractor.rating?"#F4A300":"#D1D5DB"} />)}
                </div>
                <span style={{ fontWeight: 800, color: "#1B4332", fontSize: "1.1rem" }}>{tractor.rating}</span>
                <span style={{ color: "#6B7280", fontSize: "0.9rem", fontWeight: 500 }}>({tractor.reviewCount} customer reviews)</span>
              </div>
            </div>

            {/* Specs Grid */}
            <div style={{ background: "white", borderRadius: "1.5rem", padding: "2rem", border: "1px solid #E5E7EB", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
              <h2 style={{ fontWeight: 800, fontSize: "1.25rem", color: "#1B4332", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Zap size={20} color="#F4A300" fill="#F4A300" /> Key Specifications
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }} className="sm:grid-cols-2">
                {[
                  { label: "Horsepower", value: `${tractor.hp} HP`, icon: Zap },
                  { label: "Manufacturing Year", value: tractor.year, icon: Calendar },
                  { label: "Number Plate", value: tractor.numberPlate, icon: Shield },
                  { label: "Location", value: tractor.location, icon: MapPin },
                  { label: "Available Hours", value: tractor.availableTime, icon: Clock },
                  { label: "Working Days", value: tractor.availableDays.join(", "), icon: Calendar },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} style={{ padding: "1.25rem", background: "#F9FAFB", borderRadius: "1rem", border: "1px solid #F3F4F6", display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div style={{ background: "white", padding: "0.5rem", borderRadius: "0.75rem", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                      <Icon size={18} color="#2D6A4F" />
                    </div>
                    <div>
                      <p style={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.15rem" }}>{label}</p>
                      <p style={{ fontSize: "0.95rem", color: "#111827", fontWeight: 700 }}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div style={{ background: "white", borderRadius: "1.5rem", padding: "2rem", border: "1px solid #E5E7EB", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
              <h2 style={{ fontWeight: 800, fontSize: "1.25rem", color: "#1B4332", marginBottom: "1rem" }}>Equipment Description</h2>
              <p style={{ color: "#4B5563", lineHeight: 1.8, fontSize: "1rem" }}>{tractor.description}</p>
            </div>

            {/* Attachments */}
            <div style={{ background: "white", borderRadius: "1.5rem", padding: "2rem", border: "1px solid #E5E7EB", marginBottom: "2rem", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
              <h2 style={{ fontWeight: 800, fontSize: "1.25rem", color: "#1B4332", marginBottom: "1.5rem" }}>Compatible Attachments</h2>
              <div className="grid-responsive grid-responsive-2" style={{ gap: "1rem" }}>
                {tractor.attachments.map(att => (
                  <button key={att.name} onClick={() => toggleAttachment(att.name)} style={{
                    padding: "1.25rem", borderRadius: "1rem", border: "2px solid",
                    borderColor: selectedAttachments.includes(att.name) ? "#2D6A4F" : "#F3F4F6",
                    background: selectedAttachments.includes(att.name) ? "rgba(45,106,79,0.05)" : "white",
                    cursor: "pointer", textAlign: "left", transition: "all 0.2s", fontFamily: "inherit",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span style={{ fontWeight: 700, fontSize: "1rem", color: "#1B4332" }}>{att.name}</span>
                      <div style={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid", borderColor: selectedAttachments.includes(att.name) ? "#2D6A4F" : "#D1D5DB", display: "flex", alignItems: "center", justifyContent: "center", background: selectedAttachments.includes(att.name) ? "#2D6A4F" : "transparent" }}>
                        {selectedAttachments.includes(att.name) && <CheckCircle size={14} color="white" />}
                      </div>
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "#6B7280", fontWeight: 600 }}>+₹{att.pricePerHour.toLocaleString("en-IN")}/hr</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div style={{ background: "white", borderRadius: "1.5rem", padding: "2rem", border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
              <h2 style={{ fontWeight: 800, fontSize: "1.25rem", color: "#1B4332", marginBottom: "1.5rem" }}>Recent Renter Reviews</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {tractor.reviews.map(review => (
                  <div key={review.id} style={{ padding: "1.5rem", background: "#F9FAFB", borderRadius: "1.25rem", border: "1px solid #F3F4F6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#2D6A4F", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.8rem" }}>{review.renter[0]}</div>
                        <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1B4332" }}>{review.renter}</span>
                      </div>
                      <div style={{ display: "flex", gap: "0.1rem" }}>
                        {[1,2,3,4,5].map(s => <Star key={s} size={14} fill={s<=review.rating?"#F4A300":"none"} color={s<=review.rating?"#F4A300":"#D1D5DB"} />)}
                      </div>
                    </div>
                    <p style={{ fontSize: "0.95rem", color: "#4B5563", lineHeight: 1.7, fontStyle: "italic" }}>"{review.comment}"</p>
                    <p style={{ fontSize: "0.8rem", color: "#9CA3AF", marginTop: "0.75rem", fontWeight: 500 }}>{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — combined booking & owner panel */}
          <div className="lg:sticky lg:top-[100px]">
            {/* Booking Card */}
            <div style={{ background: "white", borderRadius: "1.5rem", padding: "1.5rem", border: "1px solid #E5E7EB", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.5rem" }}>
                <div style={{ background: "#F4A300", padding: "0.4rem", borderRadius: "0.5rem" }}><Calendar size={18} color="white" /></div>
                <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#1B4332" }}>Secure Your Booking</h3>
              </div>

              {/* Date selection */}
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>Rental Date</label>
                <div style={{ position: "relative" }}>
                  <Calendar size={18} style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} />
                  <input type="date" className="input-field" style={{ paddingLeft: "2.75rem", height: "52px" }} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
                </div>
              </div>

              {/* Duration tabs */}
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", background: "#F3F4F6", padding: "0.3rem", borderRadius: "0.85rem", gap: "0.3rem" }}>
                  {[["hours", "Hourly"], ["days", "Daily"]].map(([type, label]) => (
                    <button key={type} onClick={() => setDurationType(type as "hours" | "days")} style={{
                      flex: 1, padding: "0.75rem", borderRadius: "0.65rem", border: "none",
                      background: durationType === type ? "white" : "transparent",
                      boxShadow: durationType === type ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
                      color: durationType === type ? "#2D6A4F" : "#6B7280",
                      fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", transition: "all 0.2s"
                    }}>{label}</button>
                  ))}
                </div>
              </div>

              {/* Counter */}
              <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", background: "white", border: "1px solid #E5E7EB", padding: "0.75rem 1rem", borderRadius: "1rem" }}>
                <span style={{ fontWeight: 700, color: "#4B5563" }}>{durationType === "hours" ? "Total Hours" : "Total Days"}</span>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <button onClick={() => durationType === "hours" ? setHours(h => Math.max(1, h-1)) : setDays(d => Math.max(1, d-1))}
                    style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #E5E7EB", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} className="hover:border-green-600">
                    <Minus size={16} />
                  </button>
                  <span style={{ fontSize: "1.25rem", fontWeight: 800, color: "#1B4332", minWidth: "2rem", textAlign: "center" }}>{durationType === "hours" ? hours : days}</span>
                  <button onClick={() => durationType === "hours" ? setHours(h => Math.min(12, h+1)) : setDays(d => Math.min(30, d+1))}
                    style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid #E5E7EB", background: "white", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }} className="hover:border-green-600">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Promo link */}
              {!promoApplied ? (
                <button onClick={() => setPromoApplied(true)} style={{ background: "none", border: "none", color: "#2D6A4F", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <Plus size={14} /> Have a promo code?
                </button>
              ) : (
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  <input className="input-field" autoFocus placeholder="Enter code..." value={promoCode} onChange={e => setPromoCode(e.target.value.toUpperCase())} style={{ height: "44px", fontSize: "0.85rem" }} />
                  <button onClick={() => setPromoApplied(false)} style={{ background: "#D1FAE5", color: "#065F46", border: "none", borderRadius: "0.75rem", padding: "0 1rem", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>Apply</button>
                </div>
              )}

              {/* Price Breakdown */}
              <div style={{ background: "#F9FAFB", borderRadius: "1.25rem", padding: "1.25rem", marginBottom: "1.5rem", border: "1px solid #F3F4F6" }}>
                {[
                  { label: "Base Rental", value: pricing.baseRent },
                  ...(pricing.attachmentTotal > 0 ? [{ label: "Attachments", value: pricing.attachmentTotal }] : []),
                  ...(pricing.discount > 0 ? [{ label: "Promo Discount", value: -pricing.discount }] : []),
                  { label: "Platform Fee", value: pricing.platformFee },
                  { label: "GST (18%)", value: pricing.gst },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.6rem", fontSize: "0.9rem" }}>
                    <span style={{ color: "#6B7280", fontWeight: 500 }}>{label}</span>
                    <span style={{ fontWeight: 700, color: value < 0 ? "#059669" : "#374151" }}>{value < 0 ? `-₹${Math.abs(value).toLocaleString("en-IN")}` : `₹${value.toLocaleString("en-IN")}`}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", paddingTop: "0.9rem", borderTop: "2px solid #E5E7EB" }}>
                  <span style={{ fontWeight: 900, fontSize: "1.15rem", color: "#1B4332" }}>Payable Amount</span>
                  <span style={{ fontWeight: 900, fontSize: "1.25rem", color: "#2D6A4F" }}>₹{pricing.grandTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button onClick={handleBookNow} disabled={!tractor.available || !selectedDate} className="btn-primary" style={{
                width: "100%", height: "56px", justifyContent: "center", fontSize: "1.1rem",
                opacity: (!tractor.available || !selectedDate) ? 0.6 : 1,
                cursor: (!tractor.available || !selectedDate) ? "not-allowed" : "pointer",
                boxShadow: "0 12px 24px rgba(45,106,79,0.25)"
              }}>
                {!selectedDate ? "Select Date to Rent" : (tractor.available ? "Rent Now — Secure Payment" : "Unavailable")}
              </button>
              
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "1rem" }}>
                <Shield size={14} color="#059669" />
                <span style={{ fontSize: "0.75rem", color: "#6B7280", fontWeight: 600 }}>Razorpay Secure Checkout</span>
              </div>
            </div>

            {/* Owner Section */}
            <div style={{ background: "white", borderRadius: "1.5rem", padding: "1.5rem", border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
              <h4 style={{ fontWeight: 800, fontSize: "1rem", color: "#1B4332", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ background: "rgba(45,106,79,0.1)", padding: "0.3rem", borderRadius: "0.4rem" }}>👨‍🌾</span> Owner Information
              </h4>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #1B4332, #214E3A)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, color: "white", fontSize: "1.25rem", boxShadow: "0 4px 12px rgba(27,67,50,0.2)" }}>
                  {tractor.owner.split(" ").map(n => n[0]).join("").slice(0,2)}
                </div>
                <div>
                  <p style={{ fontWeight: 800, color: "#111827", fontSize: "1.1rem" }}>{tractor.owner}</p>
                  <p style={{ fontSize: "0.85rem", color: "#6B7280", fontWeight: 500 }}>Verified Owner since 2023</p>
                </div>
              </div>
              
              <div style={{ background: "#FFFBEB", border: "1px solid #FEF3C7", borderRadius: "1rem", padding: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <Shield size={18} color="#D97706" style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: "0.8rem", color: "#92400E", lineHeight: 1.5, fontWeight: 500 }}>
                    For your security, contact details are private until payment is confirmed. WhatsApp and Call will be enabled then.
                  </p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <button disabled style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.875rem", borderRadius: "0.85rem", border: "1px solid #E5E7EB", background: "#F9FAFB", cursor: "not-allowed", fontSize: "0.9rem", fontWeight: 700, color: "#9CA3AF" }}>
                  <Phone size={16} /> Call
                </button>
                <button disabled style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", padding: "0.875rem", borderRadius: "0.85rem", border: "1px solid #E5E7EB", background: "#F9FAFB", cursor: "not-allowed", fontSize: "0.9rem", fontWeight: 700, color: "#9CA3AF" }}>
                  <MessageCircle size={16} /> Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
