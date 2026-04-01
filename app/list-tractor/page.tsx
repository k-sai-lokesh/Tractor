"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User, Camera, Plus, Minus, X, CheckCircle,
  ChevronRight, ChevronLeft, Upload, Tractor,
} from "lucide-react";

const STEPS = [
  { step: 1, title: "Tractor Info" },
  { step: 2, title: "Attachments & Pricing" },
  { step: 3, title: "Availability" },
  { step: 4, title: "Bank / UPI Details" },
  { step: 5, title: "Preview & Submit" },
];

const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TIME_SLOTS = ["5:00 AM", "6:00 AM", "7:00 AM", "8:00 AM", "6:00 PM", "7:00 PM", "8:00 PM"];

interface AttachmentEntry { name: string; pricePerHour: string; }

export default function ListTractorPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Step 1
  const [tractorInfo, setTractorInfo] = useState({
    ownerName: "", mobile: "", model: "", brand: "", plate: "",
    year: "", hp: "", description: "",
  });

  // Step 2
  const [attachments, setAttachments] = useState<AttachmentEntry[]>([{ name: "", pricePerHour: "" }]);
  const [pricePerHour, setPricePerHour] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");

  // Step 3
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("6:00 AM");
  const [endTime, setEndTime] = useState("7:00 PM");

  // Step 4
  const [bankDetails, setBankDetails] = useState({
    accountName: "", accountNumber: "", ifscCode: "", upiId: "",
  });

  const next = () => setCurrentStep(s => Math.min(5, s + 1));
  const back = () => setCurrentStep(s => Math.max(1, s - 1));

  const toggleDay = (day: string) => {
    setAvailableDays(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]);
  };

  const addAttachment = () => setAttachments(prev => [...prev, { name: "", pricePerHour: "" }]);
  const removeAttachment = (i: number) => setAttachments(prev => prev.filter((_, idx) => idx !== i));
  const updateAttachment = (i: number, field: keyof AttachmentEntry, val: string) => {
    setAttachments(prev => prev.map((a, idx) => idx === i ? { ...a, [field]: val } : a));
  };

  const handleSubmit = () => {
    setTimeout(() => setSubmitted(true), 1200);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F0F7F4", padding: "2rem" }}>
        <div style={{ background: "white", borderRadius: "1.5rem", padding: "3rem", maxWidth: 520, width: "100%", textAlign: "center", boxShadow: "0 20px 60px rgba(45,106,79,0.15)" }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#D1FAE5", border: "4px solid #6EE7B7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem" }}>
            <CheckCircle size={44} color="#059669" />
          </div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1B4332", marginBottom: "0.75rem" }}>Tractor Listed! 🎉</h2>
          <p style={{ color: "#6B7280", lineHeight: 1.7, marginBottom: "2rem" }}>
            Your <strong>{tractorInfo.brand} {tractorInfo.model}</strong> has been submitted for review. Our team will verify and publish your listing within 24 hours.
          </p>
          <div style={{ background: "#F0FDF4", borderRadius: "0.75rem", padding: "1rem", marginBottom: "2rem", textAlign: "left" }}>
            <p style={{ fontSize: "0.85rem", color: "#166534", fontWeight: 600, marginBottom: "0.5rem" }}>What happens next?</p>
            {["We review your listing (24hrs)", "Your tractor goes live", "Renters book & you earn!"].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "0.5rem", fontSize: "0.82rem", color: "#374151", marginBottom: "0.3rem" }}>
                <span style={{ fontWeight: 700, color: "#2D6A4F" }}>{i + 1}.</span> {s}
              </div>
            ))}
          </div>
          <button onClick={() => router.push("/owner-dashboard")} className="btn-primary" style={{ width: "100%", justifyContent: "center", marginBottom: "0.75rem" }}>
            Go to Dashboard <ChevronRight size={16} />
          </button>
          <button onClick={() => { setSubmitted(false); setCurrentStep(1); }} style={{
            background: "transparent", border: "1px solid #E5E7EB", color: "#6B7280",
            padding: "0.65rem 1.5rem", borderRadius: "0.75rem", width: "100%",
            cursor: "pointer", fontFamily: "inherit", fontWeight: 500, fontSize: "0.9rem",
          }}>List Another Tractor</button>
        </div>
      </div>
    );
  }

  return (
    <div className="wheat-bg" style={{ minHeight: "100vh", padding: "2rem 1.5rem" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontWeight: 800, fontSize: "2rem", color: "#1B4332", marginBottom: "0.5rem" }}>List Your Tractor</h1>
          <p style={{ color: "#6B7280" }}>Complete all steps to publish your tractor listing</p>
        </div>

        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "2.5rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
          {STEPS.map((s, i) => (
            <div key={s.step} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: "0.875rem",
                  ...(currentStep === s.step ? { background: "#2D6A4F", color: "white", boxShadow: "0 0 0 4px rgba(45,106,79,0.2)" } :
                    currentStep > s.step ? { background: "#40916C", color: "white" } :
                    { background: "#E5E7EB", color: "#6B7280" }),
                }}>
                  {currentStep > s.step ? <CheckCircle size={18} /> : s.step}
                </div>
                <span style={{ fontSize: "0.65rem", fontWeight: 600, color: currentStep >= s.step ? "#2D6A4F" : "#9CA3AF", whiteSpace: "nowrap" }}>{s.title}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ height: 2, width: 40, background: currentStep > s.step ? "#40916C" : "#E5E7EB", margin: "0 0.25rem 1.25rem" }} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div style={{ background: "white", borderRadius: "1.25rem", padding: "2rem", border: "1px solid #E5E7EB", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", marginBottom: "1.5rem" }}>
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div>
              <h2 style={{ fontWeight: 700, fontSize: "1.15rem", color: "#1B4332", marginBottom: "1.5rem" }}>🚜 Tractor Information</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { label: "Owner Full Name *", key: "ownerName", placeholder: "Rajesh Patil" },
                  { label: "Mobile Number *", key: "mobile", placeholder: "9876543210" },
                  { label: "Tractor Brand *", key: "brand", placeholder: "Mahindra, John Deere..." },
                  { label: "Model *", key: "model", placeholder: "575 DI, 5050D..." },
                  { label: "Number Plate *", key: "plate", placeholder: "MH-12-AB-1234" },
                  { label: "Manufacturing Year *", key: "year", placeholder: "2021" },
                  { label: "Horsepower (HP) *", key: "hp", placeholder: "45" },
                ].map(({ label, key, placeholder }) => (
                  <div key={key} style={key === "ownerName" || key === "mobile" ? {} : {}}>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>{label}</label>
                    <input
                      className="input-field"
                      placeholder={placeholder}
                      value={tractorInfo[key as keyof typeof tractorInfo]}
                      onChange={e => setTractorInfo(prev => ({ ...prev, [key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>Description</label>
                <textarea
                  className="input-field"
                  placeholder="Describe your tractor — condition, special features, any notes for renters..."
                  value={tractorInfo.description}
                  onChange={e => setTractorInfo(prev => ({ ...prev, description: e.target.value }))}
                  style={{ minHeight: 90, resize: "vertical" }}
                />
              </div>
              {/* Photo upload UI */}
              <div style={{ marginTop: "1rem" }}>
                <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>Tractor Photos</label>
                <div style={{
                  border: "2px dashed #D1D5DB", borderRadius: "0.75rem", padding: "2rem",
                  textAlign: "center", cursor: "pointer", transition: "all 0.2s",
                  background: "#F9FAFB",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#2D6A4F"; e.currentTarget.style.background = "#F0F7F4"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#D1D5DB"; e.currentTarget.style.background = "#F9FAFB"; }}
                >
                  <Upload size={28} color="#9CA3AF" style={{ margin: "0 auto 0.5rem" }} />
                  <p style={{ color: "#6B7280", fontSize: "0.875rem" }}>Click to upload tractor photos (up to 5 images)</p>
                  <p style={{ color: "#9CA3AF", fontSize: "0.75rem", marginTop: "0.25rem" }}>JPG, PNG up to 5MB each</p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div>
              <h2 style={{ fontWeight: 700, fontSize: "1.15rem", color: "#1B4332", marginBottom: "1.5rem" }}>⚙️ Attachments & Pricing</h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>Price Per Hour (₹) *</label>
                  <input className="input-field" placeholder="e.g. 350" value={pricePerHour} onChange={e => setPricePerHour(e.target.value)} type="number" min="0" />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>Price Per Day (₹) *</label>
                  <input className="input-field" placeholder="e.g. 2500" value={pricePerDay} onChange={e => setPricePerDay(e.target.value)} type="number" min="0" />
                </div>
              </div>

              <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <h3 style={{ fontWeight: 600, fontSize: "0.95rem", color: "#374151" }}>Additional Attachments</h3>
                  <button onClick={addAttachment} className="btn-outline" style={{ padding: "0.4rem 0.875rem", fontSize: "0.8rem" }}>
                    <Plus size={14} /> Add Attachment
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {attachments.map((att, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 120px auto", gap: "0.75rem", alignItems: "end" }}>
                      <div>
                        <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.3rem" }}>Attachment Name</label>
                        <input className="input-field" placeholder="Rotavator, Plough..." value={att.name} onChange={e => updateAttachment(i, "name", e.target.value)} />
                      </div>
                      <div>
                        <label style={{ fontSize: "0.78rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.3rem" }}>₹/Hour</label>
                        <input className="input-field" placeholder="200" type="number" value={att.pricePerHour} onChange={e => updateAttachment(i, "pricePerHour", e.target.value)} />
                      </div>
                      <button onClick={() => removeAttachment(i)} style={{
                        width: 36, height: 36, borderRadius: "50%", border: "1px solid #FCA5A5",
                        background: "#FEF2F2", color: "#991B1B", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: "0.1rem",
                      }}>
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div>
              <h2 style={{ fontWeight: 700, fontSize: "1.15rem", color: "#1B4332", marginBottom: "1.5rem" }}>📅 Availability Schedule</h2>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#374151", display: "block", marginBottom: "0.75rem" }}>Available Days *</label>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {DAYS_OF_WEEK.map(day => (
                    <button key={day} onClick={() => toggleDay(day)} style={{
                      padding: "0.5rem 1rem", borderRadius: "0.6rem", border: "2px solid",
                      borderColor: availableDays.includes(day) ? "#2D6A4F" : "#E5E7EB",
                      background: availableDays.includes(day) ? "rgba(45,106,79,0.1)" : "white",
                      color: availableDays.includes(day) ? "#2D6A4F" : "#374151",
                      fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                    }}>{day}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>Start Time</label>
                  <select className="input-field" value={startTime} onChange={e => setStartTime(e.target.value)}>
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>End Time</label>
                  <select className="input-field" value={endTime} onChange={e => setEndTime(e.target.value)}>
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ background: "#F0FDF4", borderRadius: "0.75rem", padding: "1rem", border: "1px solid #BBF7D0" }}>
                <p style={{ fontSize: "0.85rem", color: "#166534" }}>
                  ✅ Your tractor will be listed as available on <strong>{availableDays.join(", ") || "no days selected"}</strong> from <strong>{startTime}</strong> to <strong>{endTime}</strong>.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div>
              <h2 style={{ fontWeight: 700, fontSize: "1.15rem", color: "#1B4332", marginBottom: "0.5rem" }}>🏦 Bank & UPI Details</h2>
              <p style={{ fontSize: "0.85rem", color: "#6B7280", marginBottom: "1.5rem" }}>Your earnings will be transferred to this account within 5 business days of each booking.</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { label: "Account Holder Name *", key: "accountName", placeholder: "Name as per bank records" },
                  { label: "Account Number *", key: "accountNumber", placeholder: "Enter bank account number" },
                  { label: "IFSC Code *", key: "ifscCode", placeholder: "e.g. SBIN0001234" },
                  { label: "UPI ID *", key: "upiId", placeholder: "e.g. name@upi, mobile@paytm" },
                ].map(({ label, key, placeholder }) => (
                  <div key={key}>
                    <label style={{ fontSize: "0.8rem", fontWeight: 600, color: "#6B7280", display: "block", marginBottom: "0.4rem" }}>{label}</label>
                    <input
                      className="input-field"
                      placeholder={placeholder}
                      value={bankDetails[key as keyof typeof bankDetails]}
                      onChange={e => setBankDetails(prev => ({ ...prev, [key]: e.target.value }))}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginTop: "1.5rem", background: "#FEF9E7", borderRadius: "0.75rem", padding: "1rem", border: "1px solid #FDE68A" }}>
                <p style={{ fontSize: "0.82rem", color: "#92400E" }}>
                  🔒 Your banking details are encrypted and stored securely. We never share them with renters.
                </p>
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {currentStep === 5 && (
            <div>
              <h2 style={{ fontWeight: 700, fontSize: "1.15rem", color: "#1B4332", marginBottom: "1.5rem" }}>👁️ Preview & Submit</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { title: "Tractor Info", items: [
                    ["Owner", tractorInfo.ownerName || "Not filled"],
                    ["Mobile", tractorInfo.mobile || "Not filled"],
                    ["Brand", tractorInfo.brand || "Not filled"],
                    ["Model", tractorInfo.model || "Not filled"],
                    ["Plate", tractorInfo.plate || "Not filled"],
                    ["Year", tractorInfo.year || "Not filled"],
                    ["HP", tractorInfo.hp ? `${tractorInfo.hp} HP` : "Not filled"],
                  ]},
                  { title: "Pricing", items: [
                    ["Price/Hour", pricePerHour ? `₹${pricePerHour}` : "Not filled"],
                    ["Price/Day", pricePerDay ? `₹${pricePerDay}` : "Not filled"],
                    ["Attachments", attachments.filter(a => a.name).map(a => `${a.name} (₹${a.pricePerHour}/hr)`).join(", ") || "None"],
                  ]},
                  { title: "Availability", items: [
                    ["Days", availableDays.join(", ") || "Not selected"],
                    ["Hours", `${startTime} – ${endTime}`],
                  ]},
                  { title: "Bank Details", items: [
                    ["Account Name", bankDetails.accountName || "Not filled"],
                    ["IFSC", bankDetails.ifscCode || "Not filled"],
                    ["UPI ID", bankDetails.upiId || "Not filled"],
                  ]},
                ].map(section => (
                  <div key={section.title} style={{ padding: "1.25rem", background: "#F9FAFB", borderRadius: "0.75rem", border: "1px solid #F3F4F6" }}>
                    <h4 style={{ fontWeight: 700, fontSize: "0.9rem", color: "#2D6A4F", marginBottom: "0.75rem" }}>{section.title}</h4>
                    <div style={{ display: "grid", gap: "0.4rem" }}>
                      {section.items.map(([k, v]) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem" }}>
                          <span style={{ color: "#6B7280" }}>{k}</span>
                          <span style={{ fontWeight: 600, color: v === "Not filled" ? "#EF4444" : "#111827", textAlign: "right", maxWidth: "60%" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div style={{ background: "#F0FDF4", borderRadius: "0.75rem", padding: "1rem", border: "1px solid #BBF7D0" }}>
                  <p style={{ fontSize: "0.82rem", color: "#166534" }}>
                    By submitting, you agree to TractorLease's <strong>Terms of Service</strong> and confirm that all information provided is accurate. Your listing will go live after verification (within 24 hours).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={back} disabled={currentStep === 1} className="btn-outline" style={{
            opacity: currentStep === 1 ? 0.4 : 1, cursor: currentStep === 1 ? "not-allowed" : "pointer",
          }}>
            <ChevronLeft size={16} /> Back
          </button>
          {currentStep < 5 ? (
            <button onClick={next} className="btn-primary">
              Next <ChevronRight size={16} />
            </button>
          ) : (
            <button onClick={handleSubmit} className="btn-gold" style={{ padding: "0.75rem 2rem", fontSize: "1rem" }}>
              <Tractor size={18} /> Submit Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
