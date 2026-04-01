"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Shield, Lock, CreditCard, Smartphone, Building,
  ChevronDown, Tag, Info, AlertCircle, CheckCircle,
} from "lucide-react";
import { useBooking } from "@/lib/bookingStore";
import { generateBookingId } from "@/lib/pricing";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const BANKS = ["State Bank of India", "HDFC Bank", "ICICI Bank", "Punjab National Bank", "Axis Bank", "Kotak Mahindra Bank", "Bank of Baroda", "Union Bank of India", "Canara Bank", "Indian Bank"];

type PaymentMethod = "upi" | "card" | "netbanking" | "emi";

export default function CheckoutPage() {
  const router = useRouter();
  const { booking, setBooking } = useBooking();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardFlipped, setCardFlipped] = useState(false);
  const [selectedBank, setSelectedBank] = useState("");
  const [renterName, setRenterName] = useState("");
  const [renterMobile, setRenterMobile] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  if (!booking.tractorId) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛒</div>
        <h2 style={{ fontWeight: 700, color: "#374151", marginBottom: "1rem" }}>No booking in progress</h2>
        <button onClick={() => router.push("/listings")} className="btn-primary">Browse Tractors</button>
      </div>
    );
  }

  const formatCard = (val: string) => val.replace(/\s/g, "").replace(/(.{4})/g, "$1 ").trim().slice(0, 19);
  const formatExpiry = (val: string) => val.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2").slice(0, 5);

  const handlePayment = async () => {
    if (!renterName || !renterMobile) { alert("Please enter your name and mobile number."); return; }
    setProcessing(true);
    const bookingId = generateBookingId();

    // Simulate Razorpay / payment flow
    setTimeout(() => {
      setBooking({ bookingId, renterName, renterMobile, paymentId: `pay_${Math.random().toString(36).substr(2,10).toUpperCase()}` });
      router.push("/payment-success");
    }, 2200);
  };

  const totalAmount = booking.grandTotal;

  const METHOD_TABS = [
    { id: "upi" as PaymentMethod, label: "UPI", icon: Smartphone },
    { id: "card" as PaymentMethod, label: "Card", icon: CreditCard },
    { id: "netbanking" as PaymentMethod, label: "Net Banking", icon: Building },
    { id: "emi" as PaymentMethod, label: "EMI / Pay Later", icon: Tag },
  ];

  return (
    <div className="wheat-bg" style={{ minHeight: "100vh", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1 style={{ fontWeight: 800, fontSize: "1.75rem", color: "#1B4332", marginBottom: "0.5rem" }}>Secure Checkout</h1>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
          <Lock size={14} color="#2D6A4F" /><span style={{ fontSize: "0.875rem", color: "#6B7280" }}>Your payment is protected by 256-bit SSL encryption</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "2rem", alignItems: "start" }}>
          {/* Left — payment form */}
          <div>
            {/* Renter info */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: "1.5rem" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1B4332", marginBottom: "1.25rem" }}>👤 Your Details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>Full Name *</label>
                  <input className="input-field" placeholder="Suresh Kumar" value={renterName} onChange={e => setRenterName(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>Mobile Number *</label>
                  <input className="input-field" placeholder="98XXXXXXXX" value={renterMobile} onChange={e => setRenterMobile(e.target.value)} maxLength={10} />
                </div>
              </div>
            </div>

            {/* Payment method tabs */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: "1.5rem" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1B4332", marginBottom: "1.25rem" }}>💳 Payment Method</h3>

              {/* Tab buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {METHOD_TABS.map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => setPaymentMethod(id)} style={{
                    padding: "0.65rem 0.5rem", borderRadius: "0.65rem", border: "2px solid",
                    borderColor: paymentMethod === id ? "#2D6A4F" : "#E5E7EB",
                    background: paymentMethod === id ? "rgba(45,106,79,0.08)" : "white",
                    color: paymentMethod === id ? "#2D6A4F" : "#374151",
                    cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem",
                  }}>
                    <Icon size={20} />
                    <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>{label}</span>
                  </button>
                ))}
              </div>

              {/* UPI */}
              {paymentMethod === "upi" && (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1.5rem", alignItems: "start" }}>
                    <div>
                      <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.5rem" }}>Enter UPI ID</label>
                      <input className="input-field" placeholder="yourname@upi" value={upiId} onChange={e => setUpiId(e.target.value)} />
                      <p style={{ fontSize: "0.78rem", color: "#6B7280", marginTop: "0.4rem" }}>e.g. mobile@paytm, name@ybl, number@okicici</p>

                      <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#F0FDF4", borderRadius: "0.65rem", border: "1px solid #BBF7D0" }}>
                        <p style={{ fontSize: "0.8rem", color: "#166534", fontWeight: 600, marginBottom: "0.25rem" }}>✅ Supported UPI Apps</p>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                          {["PhonePe", "Google Pay", "Paytm", "BHIM", "Amazon Pay"].map(app => (
                            <span key={app} style={{ background: "white", border: "1px solid #BBF7D0", borderRadius: "999px", padding: "0.15rem 0.6rem", fontSize: "0.75rem", color: "#166534" }}>{app}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* QR Code placeholder */}
                    <div style={{ textAlign: "center" }}>
                      <div style={{ width: 120, height: 120, background: "white", border: "2px solid #E5E7EB", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "0.5rem" }}>
                        <div style={{ fontSize: "3rem" }}>📲</div>
                        <p style={{ fontSize: "0.65rem", color: "#6B7280", textAlign: "center" }}>Scan to pay</p>
                      </div>
                      <p style={{ fontSize: "0.7rem", color: "#6B7280", marginTop: "0.4rem" }}>UPI QR</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Card */}
              {paymentMethod === "card" && (
                <div>
                  {/* Card preview */}
                  <div className="flip-container" style={{ marginBottom: "1.5rem", height: 160 }}>
                    <div className={`flip-inner ${cardFlipped ? "flipped" : ""}`} style={{ height: "100%", width: "100%", position: "relative" }}>
                      {/* Front */}
                      <div className="flip-front" style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(135deg, #1B4332, #2D6A4F, #40916C)",
                        borderRadius: "1rem", padding: "1.25rem",
                        color: "white", display: "flex", flexDirection: "column", justifyContent: "space-between",
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>TractorLease</span>
                          <CreditCard size={28} color="rgba(255,255,255,0.8)" />
                        </div>
                        <div>
                          <p style={{ fontFamily: "monospace", fontSize: "1.2rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>
                            {cardNumber || "•••• •••• •••• ••••"}
                          </p>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div><p style={{ fontSize: "0.65rem", opacity: 0.7 }}>CARD HOLDER</p><p style={{ fontSize: "0.85rem", fontWeight: 600 }}>{cardName || "YOUR NAME"}</p></div>
                            <div><p style={{ fontSize: "0.65rem", opacity: 0.7 }}>EXPIRY</p><p style={{ fontSize: "0.85rem", fontWeight: 600 }}>{cardExpiry || "MM/YY"}</p></div>
                          </div>
                        </div>
                      </div>
                      {/* Back */}
                      <div className="flip-back" style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(135deg, #374151, #1F2937)",
                        borderRadius: "1rem", color: "white",
                      }}>
                        <div style={{ height: 36, background: "#111", marginTop: "1.5rem", width: "100%" }} />
                        <div style={{ padding: "0 1.25rem", marginTop: "0.75rem" }}>
                          <div style={{ background: "#F9FAFB", borderRadius: "0.3rem", padding: "0.4rem 0.75rem", textAlign: "right", color: "#111", fontFamily: "monospace", fontSize: "1rem" }}>
                            {cardCvv || "•••"}
                          </div>
                          <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", marginTop: "0.4rem", textAlign: "right" }}>CVV</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "1rem" }}>
                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>Card Number</label>
                      <input className="input-field" placeholder="1234 5678 9012 3456" value={cardNumber}
                        onChange={e => setCardNumber(formatCard(e.target.value))} maxLength={19} />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>Name on Card</label>
                      <input className="input-field" placeholder="SURESH KUMAR" value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>Expiry Date</label>
                        <input className="input-field" placeholder="MM/YY" value={cardExpiry}
                          onChange={e => setCardExpiry(formatExpiry(e.target.value))} maxLength={5} />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>CVV</label>
                        <input className="input-field" placeholder="•••" type="password" maxLength={4} value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          onFocus={() => setCardFlipped(true)} onBlur={() => setCardFlipped(false)} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === "netbanking" && (
                <div>
                  <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.5rem" }}>Select Your Bank</label>
                  <select className="input-field" value={selectedBank} onChange={e => setSelectedBank(e.target.value)}>
                    <option value="">-- Choose Bank --</option>
                    {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <div style={{ marginTop: "1rem", padding: "0.75rem", background: "#FFF7ED", borderRadius: "0.65rem", border: "1px solid #FED7AA" }}>
                    <p style={{ fontSize: "0.8rem", color: "#9A3412" }}>You will be redirected to your bank's secure login page to complete payment.</p>
                  </div>
                </div>
              )}

              {/* EMI */}
              {paymentMethod === "emi" && (
                <div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      { label: "Pay Later (7 days)", partner: "Simpl", fee: "No extra charge" },
                      { label: "3 Month EMI", partner: "ZestMoney", fee: "₹45/month interest" },
                      { label: "6 Month EMI", partner: "Bajaj Finserv", fee: "₹32/month interest" },
                    ].map(option => (
                      <div key={option.label} style={{ padding: "1rem", borderRadius: "0.75rem", border: "2px solid #E5E7EB", background: "white", cursor: "pointer", transition: "all 0.2s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = "#2D6A4F"; e.currentTarget.style.background = "rgba(45,106,79,0.04)"; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = "#E5E7EB"; e.currentTarget.style.background = "white"; }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <div>
                            <p style={{ fontWeight: 600, fontSize: "0.9rem", color: "#1B4332" }}>{option.label}</p>
                            <p style={{ fontSize: "0.78rem", color: "#6B7280" }}>via {option.partner}</p>
                          </div>
                          <span style={{ fontSize: "0.78rem", background: "#F0FDF4", color: "#166534", padding: "0.2rem 0.6rem", borderRadius: "999px", fontWeight: 600 }}>{option.fee}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Refund policy */}
            <div style={{ background: "#FEF9E7", borderRadius: "0.75rem", padding: "1rem 1.25rem", border: "1px solid #FDE68A", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <Info size={16} color="#D97706" style={{ flexShrink: 0 }} />
                <strong style={{ fontSize: "0.875rem", color: "#92400E" }}>Refund Policy</strong>
              </div>
              <ul style={{ fontSize: "0.8rem", color: "#92400E", paddingLeft: "1.25rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <li>Cancel 24+ hours before → <strong>100% refund</strong></li>
                <li>Cancel on same day → <strong>50% refund</strong></li>
                <li>No-show → <strong>No refund</strong></li>
              </ul>
            </div>
          </div>

          {/* Right — order summary */}
          <div style={{ position: "sticky", top: 88 }}>
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #E5E7EB", boxShadow: "0 8px 32px rgba(45,106,79,0.12)", marginBottom: "1rem" }}>
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1B4332", marginBottom: "1.25rem" }}>📋 Booking Summary</h3>

              {/* Tractor image */}
              <div style={{ position: "relative", height: 140, borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1rem" }}>
                <Image src={booking.tractorImage} alt={booking.tractorModel} fill sizes="380px" style={{ objectFit: "cover" }} />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <p style={{ fontWeight: 700, color: "#1B4332", fontSize: "1.05rem" }}>{booking.tractorBrand} {booking.tractorModel}</p>
                <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>{booking.location}</p>
                <p style={{ fontSize: "0.8rem", color: "#6B7280", marginTop: "0.25rem" }}>Owner: {booking.ownerName}</p>
              </div>

              <div style={{ borderTop: "1px solid #F3F4F6", paddingTop: "0.75rem", marginBottom: "0.75rem" }}>
                {[
                  { label: "Date", value: booking.selectedDate || "Not selected" },
                  { label: "Duration", value: booking.durationType === "hours" ? `${booking.hours} hours` : `${booking.days} days` },
                  ...(booking.selectedAttachments.length > 0 ? [{ label: "Attachments", value: booking.selectedAttachments.map(a => a.name).join(", ") }] : []),
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                    <span style={{ fontSize: "0.8rem", color: "#6B7280" }}>{label}</span>
                    <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "#374151", textAlign: "right", maxWidth: "60%" }}>{value}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1px dashed #E5E7EB", paddingTop: "0.75rem", marginBottom: "1rem" }}>
                {[
                  { label: "Base Rent", value: `₹${booking.baseRent.toLocaleString("en-IN")}` },
                  ...(booking.attachmentTotal > 0 ? [{ label: "Attachments", value: `₹${booking.attachmentTotal.toLocaleString("en-IN")}` }] : []),
                  ...(booking.discount > 0 ? [{ label: "Promo Discount", value: `-₹${booking.discount.toLocaleString("en-IN")}` }] : []),
                  { label: "Platform Fee (5%)", value: `₹${booking.platformFee.toLocaleString("en-IN")}` },
                  { label: "GST (18%)", value: `₹${booking.gst.toLocaleString("en-IN")}` },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", fontSize: "0.85rem" }}>
                    <span style={{ color: "#6B7280" }}>{label}</span>
                    <span style={{ fontWeight: 600, color: value.startsWith("-") ? "#059669" : "#374151" }}>{value}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "0.75rem", borderTop: "2px solid #E5E7EB", marginTop: "0.5rem" }}>
                  <span style={{ fontWeight: 800, fontSize: "1rem", color: "#1B4332" }}>Total Payable</span>
                  <span style={{ fontWeight: 900, fontSize: "1.15rem", color: "#2D6A4F" }}>₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button onClick={handlePayment} disabled={processing} className="btn-primary" style={{
                width: "100%", justifyContent: "center", fontSize: "1rem", padding: "0.9rem",
                opacity: processing ? 0.8 : 1, cursor: processing ? "not-allowed" : "pointer",
              }}>
                {processing ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                    Processing...
                  </span>
                ) : (
                  <><Lock size={16} /> Pay ₹{totalAmount.toLocaleString("en-IN")}</>
                )}
              </button>

              {/* Trust badges */}
              <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                {[
                  { icon: "🔒", label: "SSL Secured" },
                  { icon: "✅", label: "Razorpay" },
                  { icon: "🛡️", label: "100% Safe" },
                ].map(({ icon, label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.72rem", color: "#6B7280" }}>
                    <span>{icon}</span>{label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
