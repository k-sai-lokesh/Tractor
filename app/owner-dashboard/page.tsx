"use client";

import { useState } from "react";
import {
  TrendingUp, DollarSign, Calendar, CheckCircle, XCircle,
  Clock, CreditCard, Building, User, Save,
} from "lucide-react";
import { ownerBookingRequests, tractors } from "@/lib/data";

type RequestStatus = "pending" | "accepted" | "declined";

export default function OwnerDashboardPage() {
  const ownerTractor = tractors[0]; // Rajesh Patil's tractor
  const [requests, setRequests] = useState(
    ownerBookingRequests.map(r => ({ ...r, status: r.status as RequestStatus }))
  );
  const [bankDetails, setBankDetails] = useState({
    accountName: "Rajesh Patil",
    accountNumber: "",
    ifscCode: "",
    upiId: "rajesh@upi",
  });
  const [bankSaved, setBankSaved] = useState(false);

  const totalEarnings = ownerTractor.earnings;
  const acceptedRequests = requests.filter(r => r.status === "accepted").length;
  const pendingRequests = requests.filter(r => r.status === "pending").length;

  const handleAccept = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "accepted" as RequestStatus } : r));
  };
  const handleDecline = (id: string) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: "declined" as RequestStatus } : r));
  };
  const handleSaveBank = () => {
    setBankSaved(true);
    setTimeout(() => setBankSaved(false), 3000);
  };

  const STATS = [
    { label: "This Month Earnings", value: `₹${totalEarnings.toLocaleString("en-IN")}`, icon: TrendingUp, color: "#2D6A4F", bg: "#D1FAE5" },
    { label: "Active Bookings", value: acceptedRequests, icon: CheckCircle, color: "#059669", bg: "#D1FAE5" },
    { label: "Pending Requests", value: pendingRequests, icon: Clock, color: "#D97706", bg: "#FEF3C7" },
    { label: "Total Reviews", value: ownerTractor.reviewCount, icon: User, color: "#6B4226", bg: "#FEF3C7" },
  ];

  return (
    <div className="wheat-bg" style={{ minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1B4332, #2D6A4F)", padding: "2.5rem 1.5rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "white", fontSize: "1.25rem" }}>
              {ownerTractor.owner.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "white" }}>Owner Dashboard</h1>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>{ownerTractor.owner} · {ownerTractor.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem", marginBottom: "2rem" }}>
          {STATS.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <p style={{ fontSize: "0.8rem", color: "#6B7280", fontWeight: 500, marginBottom: "0.5rem" }}>{label}</p>
                  <p style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1B4332" }}>{value}</p>
                </div>
                <div style={{ width: 44, height: 44, borderRadius: "0.75rem", background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={22} color={color} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-main-grid">
          {/* Booking requests */}
          <div>
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: "1.5rem" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1B4332", marginBottom: "1.5rem" }}>
                📋 Booking Requests
                {pendingRequests > 0 && (
                  <span style={{ marginLeft: "0.5rem", background: "#F4A300", color: "white", padding: "0.1rem 0.5rem", borderRadius: "999px", fontSize: "0.75rem" }}>{pendingRequests} new</span>
                )}
              </h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {requests.map(req => (
                  <div key={req.id} style={{
                    padding: "1.25rem", borderRadius: "0.75rem", border: "1.5px solid",
                    borderColor: req.status === "accepted" ? "#6EE7B7" : req.status === "declined" ? "#FCA5A5" : "#E5E7EB",
                    background: req.status === "accepted" ? "#F0FDF4" : req.status === "declined" ? "#FEF2F2" : "#F9FAFB",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
                      <div>
                        <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1B4332" }}>{req.renterName}</p>
                        <p style={{ fontSize: "0.8rem", color: "#6B7280" }}>📱 {req.renterMobile}</p>
                        <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", flexWrap: "wrap" }}>
                          <span style={{ fontSize: "0.8rem", color: "#374151" }}><Calendar size={12} style={{ display: "inline", marginRight: 3 }} />{req.startDate}</span>
                          <span style={{ fontSize: "0.8rem", color: "#374151" }}><Clock size={12} style={{ display: "inline", marginRight: 3 }} />{req.duration}</span>
                          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#2D6A4F" }}>₹{req.amount.toLocaleString("en-IN")}</span>
                        </div>
                        {req.attachments.length > 0 && (
                          <div style={{ display: "flex", gap: "0.3rem", marginTop: "0.4rem", flexWrap: "wrap" }}>
                            {req.attachments.map(a => <span key={a} className="attachment-chip">{a}</span>)}
                          </div>
                        )}
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        {req.status === "pending" ? (
                          <>
                            <button onClick={() => handleAccept(req.id)} style={{
                              display: "flex", alignItems: "center", gap: "0.4rem",
                              padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "none",
                              background: "#2D6A4F", color: "white", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit",
                            }}>
                              <CheckCircle size={14} /> Accept
                            </button>
                            <button onClick={() => handleDecline(req.id)} style={{
                              display: "flex", alignItems: "center", gap: "0.4rem",
                              padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #FCA5A5",
                              background: "white", color: "#991B1B", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit",
                            }}>
                              <XCircle size={14} /> Decline
                            </button>
                          </>
                        ) : (
                          <span style={{
                            padding: "0.4rem 0.85rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 700,
                            background: req.status === "accepted" ? "#D1FAE5" : "#FEE2E2",
                            color: req.status === "accepted" ? "#065F46" : "#991B1B",
                          }}>
                            {req.status === "accepted" ? "✅ Accepted" : "❌ Declined"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payout status */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.5rem", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h2 style={{ fontWeight: 700, fontSize: "1.1rem", color: "#1B4332", marginBottom: "1.25rem" }}>💰 Payout History</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { period: "March 2024", amount: 18500, status: "transferred", date: "2024-04-05" },
                  { period: "February 2024", amount: 14200, status: "transferred", date: "2024-03-05" },
                  { period: "April 2024 (Current)", amount: 6800, status: "pending", date: "Expected: 2024-05-05" },
                ].map(p => (
                  <div key={p.period} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", background: "#F9FAFB", borderRadius: "0.5rem" }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: "0.875rem", color: "#1B4332" }}>{p.period}</p>
                      <p style={{ fontSize: "0.75rem", color: "#6B7280" }}>{p.date}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontWeight: 700, color: "#2D6A4F" }}>₹{p.amount.toLocaleString("en-IN")}</p>
                      <span style={{
                        fontSize: "0.72rem", fontWeight: 600, padding: "0.15rem 0.5rem", borderRadius: "999px",
                        background: p.status === "transferred" ? "#D1FAE5" : "#FEF3C7",
                        color: p.status === "transferred" ? "#065F46" : "#92400E",
                      }}>
                        {p.status === "transferred" ? "✅ Transferred" : "⏳ Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div>
            {/* My tractor card */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.25rem", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: "1.25rem" }}>
              <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1B4332", marginBottom: "1rem" }}>🚜 My Tractor</h3>
              <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.75rem" }}>
                <div style={{ fontWeight: 700, fontSize: "1.05rem", color: "#1B4332" }}>{ownerTractor.brand} {ownerTractor.model}</div>
              </div>
              <div style={{ display: "grid", gap: "0.4rem" }}>
                {[
                  ["Number Plate", ownerTractor.numberPlate],
                  ["HP", `${ownerTractor.hp} HP`],
                  ["Rating", `⭐ ${ownerTractor.rating} (${ownerTractor.reviewCount} reviews)`],
                  ["Availability", ownerTractor.availableTime],
                  ["Price/Hour", `₹${ownerTractor.pricePerHour}`],
                  ["Price/Day", `₹${ownerTractor.pricePerDay}`],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem" }}>
                    <span style={{ color: "#6B7280" }}>{k}</span>
                    <span style={{ fontWeight: 600, color: "#374151" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank details */}
            <div style={{ background: "white", borderRadius: "1rem", padding: "1.25rem", border: "1px solid #E5E7EB", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1B4332", marginBottom: "1rem" }}>🏦 Bank Details for Payout</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {[
                  { label: "Account Holder Name", key: "accountName", placeholder: "Full name as per bank" },
                  { label: "Account Number", key: "accountNumber", placeholder: "XXXXXXXXXXXXXXXXXX" },
                  { label: "IFSC Code", key: "ifscCode", placeholder: "e.g. SBIN0001234" },
                  { label: "UPI ID", key: "upiId", placeholder: "name@upi" },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.3rem" }}>{label}</label>
                    <input
                      className="input-field"
                      placeholder={placeholder}
                      value={bankDetails[key as keyof typeof bankDetails]}
                      onChange={e => setBankDetails(prev => ({ ...prev, [key]: e.target.value }))}
                      style={{ fontSize: "0.85rem", padding: "0.6rem 0.875rem" }}
                    />
                  </div>
                ))}
                <button onClick={handleSaveBank} style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                  padding: "0.7rem", borderRadius: "0.65rem", border: "none",
                  background: bankSaved ? "#D1FAE5" : "#2D6A4F", color: bankSaved ? "#065F46" : "white",
                  fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s",
                }}>
                  {bankSaved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Bank Details</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
