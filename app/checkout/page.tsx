"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Shield, Lock, CreditCard, Smartphone, Building,
  ChevronDown, Tag, Info, AlertCircle, CheckCircle,
  MapPin, Clock, Calendar,
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
    <div className="wheat-bg" style={{ minHeight: "100vh", padding: "3rem 0" }}>
      <div className="container">
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ fontWeight: 900, fontSize: "clamp(1.75rem, 5vw, 2.5rem)", color: "#1B4332", marginBottom: "0.5rem" }}>Secure Checkout</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Lock size={16} color="#2D6A4F" />
            <span style={{ fontSize: "0.9rem", color: "#6B7280", fontWeight: 600 }}>Your payment is protected by 256-bit SSL encryption</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem", alignItems: "start" }} className="lg:grid-cols-[1fr_380px]">
          {/* Left — payment form */}
          <div className="fade-in-up">
            {/* Renter info */}
            <div style={{ background: "white", borderRadius: "1.5rem", padding: "2rem", border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", marginBottom: "2rem" }}>
              <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#1B4332", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ background: "rgba(45,106,79,0.1)", padding: "0.4rem", borderRadius: "0.5rem" }}>👤</span> Personal Details
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }} className="sm:grid-cols-2">
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>Full Name *</label>
                  <input className="input-field" style={{ height: "52px" }} placeholder="Suresh Kumar" value={renterName} onChange={e => setRenterName(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>Mobile Number *</label>
                  <input className="input-field" style={{ height: "52px" }} placeholder="98XXXXXXXX" value={renterMobile} onChange={e => setRenterMobile(e.target.value)} maxLength={10} />
                </div>
              </div>
            </div>

            {/* Payment method tabs */}
            <div style={{ background: "white", borderRadius: "1.5rem", padding: "2rem", border: "1px solid #E5E7EB", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", marginBottom: "2rem" }}>
              <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#1B4332", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ background: "rgba(45,106,79,0.1)", padding: "0.4rem", borderRadius: "0.5rem" }}>💳</span> Payment Method
              </h3>

              {/* Tab buttons */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.75rem", marginBottom: "2rem" }} className="sm:grid-cols-4">
                {METHOD_TABS.map(({ id, label, icon: Icon }) => (
                  <button key={id} onClick={() => setPaymentMethod(id)} style={{
                    padding: "1rem 0.5rem", borderRadius: "1rem", border: "2.5px solid",
                    borderColor: paymentMethod === id ? "#2D6A4F" : "#F3F4F6",
                    background: paymentMethod === id ? "rgba(45,106,79,0.03)" : "white",
                    color: paymentMethod === id ? "#2D6A4F" : "#6B7280",
                    cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
                  }}>
                    <div style={{ background: paymentMethod === id ? "#2D6A4F" : "#F3F4F6", padding: "0.5rem", borderRadius: "0.6rem", transition: "all 0.2s" }}>
                      <Icon size={22} color={paymentMethod === id ? "white" : "#9CA3AF"} />
                    </div>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700 }}>{label}</span>
                  </button>
                ))}
              </div>

              {/* UPI */}
              {paymentMethod === "upi" && (
                <div className="fade-in">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", alignItems: "start" }} className="sm:grid-cols-[1fr_auto]">
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.75rem" }}>Enter UPI ID</label>
                      <input className="input-field" style={{ height: "52px", fontSize: "1.1rem", fontWeight: 600, color: "#111827" }} placeholder="mobile@upi" value={upiId} onChange={e => setUpiId(e.target.value)} />
                      <p style={{ fontSize: "0.85rem", color: "#6B7280", marginTop: "0.75rem", fontWeight: 500 }}>e.g. 9502324184@ybl, name@oksbi</p>

                      <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "#F0FDF4", borderRadius: "1rem", border: "1px solid #BBF7D0" }}>
                        <p style={{ fontSize: "0.85rem", color: "#166534", fontWeight: 800, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.4rem" }}><CheckCircle size={16} /> Fast, Secure & Free</p>
                        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                          {["PhonePe", "Google Pay", "Paytm", "BHIM"].map(app => (
                            <span key={app} style={{ background: "white", border: "1px solid #BBF7D0", borderRadius: "0.6rem", padding: "0.3rem 0.75rem", fontSize: "0.8rem", color: "#166534", fontWeight: 700 }}>{app}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* QR Code placeholder */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "#F9FAFB", padding: "1.5rem", borderRadius: "1rem", border: "1px dashed #D1D5DB" }}>
                      <div style={{ width: 140, height: 140, background: "white", border: "2px solid white", borderRadius: "0.75rem", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                        <Smartphone size={64} style={{ opacity: 0.1, color: "#2D6A4F" }} />
                      </div>
                      <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#6B7280", marginTop: "1rem", textAlign: "center", textTransform: "uppercase", letterSpacing: "0.1em" }}>Scan UPI QR</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Card */}
              {paymentMethod === "card" && (
                <div className="fade-in">
                  <div className="flip-container" style={{ marginBottom: "2rem", height: 210 }}>
                    <div className={`flip-inner ${cardFlipped ? "flipped" : ""}`} style={{ height: "100%", width: "100%", position: "relative" }}>
                      {/* Front */}
                      <div className="flip-front" style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(135deg, #1B4332, #2D6A4F, #40916C)",
                        borderRadius: "1.25rem", padding: "2rem",
                        color: "white", display: "flex", flexDirection: "column", justifyContent: "space-between",
                        boxShadow: "0 20px 40px rgba(45,106,79,0.25)"
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontWeight: 900, fontSize: "1.25rem", letterSpacing: "0.05em" }}>TractorLease</span>
                          <CreditCard size={32} color="rgba(255,255,255,0.8)" />
                        </div>
                        <div>
                          <p style={{ fontFamily: "monospace", fontSize: "1.5rem", fontWeight: 700, letterSpacing: "0.15em", marginBottom: "1.5rem", textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>
                            {cardNumber || "•••• •••• •••• ••••"}
                          </p>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div><p style={{ fontSize: "0.7rem", opacity: 0.8, fontWeight: 700 }}>CARD HOLDER</p><p style={{ fontSize: "1rem", fontWeight: 800 }}>{cardName || "CHOOSE NAME"}</p></div>
                            <div><p style={{ fontSize: "0.7rem", opacity: 0.8, fontWeight: 700 }}>VALID THRU</p><p style={{ fontSize: "1rem", fontWeight: 800 }}>{cardExpiry || "MM/YY"}</p></div>
                          </div>
                        </div>
                      </div>
                      {/* Back */}
                      <div className="flip-back" style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(135deg, #374151, #1F2937)",
                        borderRadius: "1.25rem", color: "white",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                      }}>
                        <div style={{ height: 44, background: "#111", marginTop: "2rem", width: "100%" }} />
                        <div style={{ padding: "0 2rem", marginTop: "1rem" }}>
                          <div style={{ background: "white", borderRadius: "0.4rem", padding: "0.6rem 1rem", textAlign: "right", color: "#111", fontFamily: "monospace", fontSize: "1.25rem", fontWeight: 700 }}>
                            {cardCvv || "•••"}
                          </div>
                          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", marginTop: "0.5rem", textAlign: "right", fontWeight: 700 }}>SECURITY CODE (CVV)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: "1.25rem" }}>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>Card Number</label>
                      <input className="input-field" style={{ height: "52px", fontSize: "1.1rem", fontWeight: 600 }} placeholder="1234 5678 9012 3456" value={cardNumber}
                        onChange={e => setCardNumber(formatCard(e.target.value))} maxLength={19} />
                    </div>
                    <div>
                      <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>Name on Card</label>
                      <input className="input-field" style={{ height: "52px", fontWeight: 600 }} placeholder="SURESH KUMAR" value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())} />
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>Expiry Date</label>
                        <input className="input-field" style={{ height: "52px", textAlign: "center", fontWeight: 600 }} placeholder="MM/YY" value={cardExpiry}
                          onChange={e => setCardExpiry(formatExpiry(e.target.value))} maxLength={5} />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.5rem" }}>CVV</label>
                        <input className="input-field" style={{ height: "52px", textAlign: "center", fontWeight: 600 }} placeholder="•••" type="password" maxLength={4} value={cardCvv}
                          onChange={e => setCardCvv(e.target.value)}
                          onFocus={() => setCardFlipped(true)} onBlur={() => setCardFlipped(false)} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Net Banking */}
              {paymentMethod === "netbanking" && (
                <div className="fade-in">
                  <label style={{ fontSize: "0.75rem", fontWeight: 800, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "0.75rem" }}>Select Your Bank</label>
                  <select className="input-field" style={{ height: "52px", fontWeight: 600 }} value={selectedBank} onChange={e => setSelectedBank(e.target.value)}>
                    <option value="">-- Choose Bank --</option>
                    {BANKS.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "#FFF7ED", borderRadius: "1rem", border: "1px solid #FED7AA", display: "flex", gap: "0.75rem" }}>
                    <Info size={20} color="#9A3412" />
                    <p style={{ fontSize: "0.9rem", color: "#9A3412", fontWeight: 500, lineHeight: 1.5 }}>You will be redirected to your bank's secure portal to authorize the transaction.</p>
                  </div>
                </div>
              )}

              {/* EMI */}
              {paymentMethod === "emi" && (
                <div className="fade-in">
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    {[
                      { label: "Pay Later (7 days Interest Free)", partner: "Simpl", fee: "0% Interest" },
                      { label: "3 Month Low Cost EMI", partner: "ZestMoney", fee: "₹45/mo Interest" },
                      { label: "6 Month No Cost EMI", partner: "Bajaj Finserv", fee: "No extra fee" },
                    ].map(option => (
                      <div key={option.label} style={{ padding: "1.25rem", borderRadius: "1.25rem", border: "2px solid #F3F4F6", background: "white", cursor: "pointer", transition: "all 0.2s" }}
                        className="hover:border-green-600 hover:bg-green-50"
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <p style={{ fontWeight: 800, fontSize: "1rem", color: "#1B4332" }}>{option.label}</p>
                            <p style={{ fontSize: "0.85rem", color: "#6B7280", fontWeight: 600 }}>Powered by {option.partner}</p>
                          </div>
                          <span style={{ fontSize: "0.75rem", background: "#F0FDF4", color: "#166534", padding: "0.4rem 0.8rem", borderRadius: "0.6rem", fontWeight: 800 }}>{option.fee}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Refund policy */}
            <div style={{ background: "#FEFCE8", borderRadius: "1.5rem", padding: "2rem", border: "1px solid #FEF08A", marginBottom: "2rem" }}>
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
                <AlertCircle size={20} color="#92400E" style={{ flexShrink: 0 }} />
                <h4 style={{ fontSize: "1rem", color: "#92400E", fontWeight: 800 }}>TractorLease Refund Policy</h4>
              </div>
              <ul style={{ fontSize: "0.9rem", color: "#92400E", paddingLeft: "1.5rem", display: "flex", flexDirection: "column", gap: "0.6rem", fontWeight: 500 }}>
                <li>Cancel 24+ hours before delivery for a <strong>Full Refund</strong></li>
                <li>Same-day cancellations are subject to <strong>50% service fee</strong></li>
                <li>Refunds are processed within <strong>2-3 business days</strong> to source</li>
              </ul>
            </div>
          </div>

          {/* Right — order summary */}
          <div className="lg:sticky lg:top-[100px]">
            <div style={{ background: "white", borderRadius: "1.5rem", padding: "2rem", border: "1px solid #E5E7EB", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", marginBottom: "1rem" }}>
              <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#1B4332", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                📋 Order Summary
              </h3>

              {/* Tractor card compact */}
              <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", background: "#F9FAFB", padding: "1rem", borderRadius: "1.25rem", border: "1px solid #F3F4F6" }}>
                <div style={{ width: 80, height: 60, position: "relative", borderRadius: "0.75rem", overflow: "hidden", flexShrink: 0 }}>
                  <Image src={booking.tractorImage} alt={booking.tractorModel} fill sizes="80px" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 800, color: "#1B4332", fontSize: "0.95rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{booking.tractorBrand} {booking.tractorModel}</p>
                  <p style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: 500, display: "flex", alignItems: "center", gap: "0.2rem" }}><MapPin size={12} /> {booking.location}</p>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.5rem", padding: "0 0.5rem" }}>
                {[
                  { label: "Rental Date", value: booking.selectedDate || "Select Date", icon: Calendar },
                  { label: "Duration", value: booking.durationType === "hours" ? `${booking.hours} hours` : `${booking.days} days`, icon: Clock },
                  ...(booking.selectedAttachments.length > 0 ? [{ label: "Equipment", value: booking.selectedAttachments.map(a => a.name).join(", "), icon: Tag }] : []),
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.85rem", color: "#6B7280", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <Icon size={14} /> {label}
                    </span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 800, color: "#1B4332", textAlign: "right" }}>{value}</span>
                  </div>
                ))}
              </div>

              <div style={{ background: "#F9FAFB", borderRadius: "1.25rem", padding: "1.5rem", marginBottom: "1.5rem", border: "1px solid #F3F4F6" }}>
                {[
                  { label: "Base Rental", value: booking.baseRent },
                  ...(booking.attachmentTotal > 0 ? [{ label: "Attachments", value: booking.attachmentTotal }] : []),
                  ...(booking.discount > 0 ? [{ label: "Promo Applied", value: -booking.discount }] : []),
                  { label: "Service Fee (5%)", value: booking.platformFee },
                  { label: "Tax (18% GST)", value: booking.gst },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem", fontSize: "0.9rem" }}>
                    <span style={{ color: "#6B7280", fontWeight: 600 }}>{label}</span>
                    <span style={{ fontWeight: 800, color: value < 0 ? "#059669" : "#374151" }}>{value < 0 ? `-₹${Math.abs(value).toLocaleString("en-IN")}` : `₹${value.toLocaleString("en-IN")}`}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.25rem", paddingTop: "1rem", borderTop: "2px solid #E5E7EB" }}>
                  <span style={{ fontWeight: 900, fontSize: "1.1rem", color: "#1B4332" }}>Total Payable</span>
                  <span style={{ fontWeight: 900, fontSize: "1.25rem", color: "#2D6A4F" }}>₹{totalAmount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button onClick={handlePayment} disabled={processing} className="btn-primary" style={{
                width: "100%", height: "60px", justifyContent: "center", fontSize: "1.1rem",
                boxShadow: "0 12px 24px rgba(45,106,79,0.2)"
              }}>
                {processing ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: 20, height: 20, border: "3px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />
                    Securely Processing...
                  </span>
                ) : (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <Lock size={20} /> Pay ₹{totalAmount.toLocaleString("en-IN")}
                  </span>
                )}
              </button>

              <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "#6B7280", fontWeight: 700 }}>
                  <Shield size={14} color="#059669" /> PCI-DSS
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "#6B7280", fontWeight: 700 }}>
                  <CheckCircle size={14} color="#059669" /> Razorpay
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
