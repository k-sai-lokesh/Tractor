"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Download, Share2, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { useBooking } from "@/lib/bookingStore";

// Confetti pieces
const CONFETTI_COLORS = ["#2D6A4F", "#F4A300", "#6B4226", "#40916C", "#FFB733", "#52B788"];

function ConfettiBlast() {
  const [pieces] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      duration: 2.5 + Math.random() * 2,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 6 + Math.random() * 8,
      shape: Math.random() > 0.5 ? "circle" : "rect",
    }))
  );

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {pieces.map(p => (
        <div key={p.id} className="confetti-piece" style={{
          left: `${p.left}%`,
          top: 0,
          width: p.size,
          height: p.size,
          background: p.color,
          borderRadius: p.shape === "circle" ? "50%" : "2px",
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
        }} />
      ))}
    </div>
  );
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { booking, resetBooking } = useBooking();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!booking.bookingId) {
    return (
      <div style={{ textAlign: "center", padding: "4rem", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>❓</div>
        <h2 style={{ fontWeight: 700, color: "#374151", marginBottom: "1rem" }}>No booking found</h2>
        <Link href="/listings" className="btn-primary">Browse Tractors</Link>
      </div>
    );
  }

  const handleDownloadReceipt = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();

      // Header
      doc.setFillColor(45, 106, 79);
      doc.rect(0, 0, 210, 40, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("TractorLease", 15, 20);
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text("Rent a Tractor. Grow More.", 15, 30);
      doc.setFontSize(14);
      doc.text(`Booking Receipt`, 145, 22);
      doc.text(`#${booking.bookingId}`, 145, 32);

      // Body
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Booking Details", 15, 60);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);

      const rows = [
        ["Booking ID", booking.bookingId],
        ["Payment ID", booking.paymentId],
        ["Tractor", `${booking.tractorBrand} ${booking.tractorModel}`],
        ["Owner", booking.ownerName],
        ["Location", booking.location],
        ["Renter", booking.renterName],
        ["Mobile", booking.renterMobile],
        ["Date", booking.selectedDate],
        ["Duration", booking.durationType === "hours" ? `${booking.hours} Hours` : `${booking.days} Days`],
        ["Attachments", booking.selectedAttachments.length > 0 ? booking.selectedAttachments.map(a => a.name).join(", ") : "None"],
        ["Base Rent", `Rs. ${booking.baseRent}`],
        ["Platform Fee (5%)", `Rs. ${booking.platformFee}`],
        ["GST (18%)", `Rs. ${booking.gst}`],
        ["Total Paid", `Rs. ${booking.grandTotal}`],
        ["Status", "PAID - CONFIRMED"],
      ];

      rows.forEach(([key, val], i) => {
        const y = 70 + i * 8;
        doc.setFont("helvetica", "bold");
        doc.text(`${key}:`, 15, y);
        doc.setFont("helvetica", "normal");
        doc.text(String(val), 80, y);
        if (i < rows.length - 1) {
          doc.setDrawColor(240, 240, 240);
          doc.line(15, y + 2, 195, y + 2);
        }
      });

      // Footer
      doc.setFillColor(245, 245, 245);
      doc.rect(0, 260, 210, 37, "F");
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      doc.text("Thank you for using TractorLease! | support@tractorlease.in | 1800-123-4567", 15, 272);
      doc.text("This is a computer generated receipt and does not require a signature.", 15, 280);

      doc.save(`TractorLease_Receipt_${booking.bookingId}.pdf`);
    } catch (err) {
      alert("PDF generation failed. Please try again.");
    }
  };

  const handleShareWhatsApp = () => {
    const msg = `🚜 *Booking Confirmed! - TractorLease*\n\n*Booking ID:* ${booking.bookingId}\n*Tractor:* ${booking.tractorBrand} ${booking.tractorModel}\n*Owner:* ${booking.ownerName}\n*Date:* ${booking.selectedDate}\n*Duration:* ${booking.durationType === "hours" ? `${booking.hours} hours` : `${booking.days} days`}\n*Amount Paid:* ₹${booking.grandTotal.toLocaleString("en-IN")}\n\nBooked via TractorLease 🌾`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="wheat-bg" style={{ minHeight: "100vh", padding: "3rem 1.5rem" }}>
      {showConfetti && <ConfettiBlast />}

      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {/* Success header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{
            width: 90, height: 90, borderRadius: "50%",
            background: "linear-gradient(135deg, #D1FAE5, #A7F3D0)",
            border: "4px solid #6EE7B7",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.25rem",
            animation: "pulse 2s ease-in-out infinite",
          }}>
            <CheckCircle size={48} color="#059669" fill="#059669" />
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#059669", marginBottom: "0.4rem" }}>Payment Successful! 🎉</h1>
          <p style={{ color: "#6B7280", fontSize: "1rem" }}>Your tractor has been booked. Happy farming!</p>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem",
            background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "999px",
            padding: "0.4rem 1.25rem",
          }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#166534" }}>Booking ID: {booking.bookingId}</span>
          </div>
        </div>

        {/* Booking summary card */}
        <div style={{ background: "white", borderRadius: "1.25rem", padding: "1.75rem", border: "1px solid #E5E7EB", boxShadow: "0 8px 32px rgba(45,106,79,0.12)", marginBottom: "1.5rem" }}>
          <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#1B4332", marginBottom: "1.25rem" }}>📋 Booking Summary</h3>

          <div style={{ position: "relative", height: 160, borderRadius: "0.75rem", overflow: "hidden", marginBottom: "1.25rem" }}>
            <Image src={booking.tractorImage} alt={booking.tractorModel} fill sizes="640px" style={{ objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(27,67,50,0.8) 0%, transparent 60%)" }} />
            <div style={{ position: "absolute", bottom: "1rem", left: "1rem", color: "white" }}>
              <p style={{ fontWeight: 800, fontSize: "1.15rem" }}>{booking.tractorBrand} {booking.tractorModel}</p>
              <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>Owner: {booking.ownerName}</p>
            </div>
          </div>

          <div style={{ display: "grid", gap: "0.5rem" }}>
            {[
              { label: "📅 Date", value: booking.selectedDate },
              { label: "⏱ Duration", value: booking.durationType === "hours" ? `${booking.hours} hours` : `${booking.days} days` },
              ...(booking.selectedAttachments.length > 0 ? [{ label: "⚙️ Attachments", value: booking.selectedAttachments.map(a => a.name).join(", ") }] : []),
              { label: "💰 Amount Paid", value: `₹${booking.grandTotal.toLocaleString("en-IN")}` },
              { label: "🧾 Payment ID", value: booking.paymentId },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid #F3F4F6" }}>
                <span style={{ fontSize: "0.875rem", color: "#6B7280" }}>{label}</span>
                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#1B4332" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Owner contact (revealed after payment) */}
        <div style={{ background: "#F0FDF4", borderRadius: "1rem", padding: "1.25rem 1.5rem", border: "1px solid #BBF7D0", marginBottom: "1.5rem" }}>
          <h4 style={{ fontWeight: 700, fontSize: "0.95rem", color: "#166534", marginBottom: "0.75rem" }}>
            📞 Owner Contact Details (Revealed after Payment)
          </h4>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.75rem" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "#2D6A4F", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700 }}>
              {booking.ownerName.split(" ").map(n => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <p style={{ fontWeight: 700, color: "#1B4332" }}>{booking.ownerName}</p>
              <p style={{ fontSize: "0.875rem", color: "#374151" }}>📱 +91 {booking.ownerMobile}</p>
              <p style={{ fontSize: "0.85rem", color: "#374151" }}>💳 UPI: {booking.ownerUpiId}</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <a href={`tel:+91${booking.ownerMobile}`} style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
              padding: "0.6rem", borderRadius: "0.6rem", border: "1px solid #BBF7D0",
              background: "white", color: "#166534", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none",
            }}>
              <Phone size={16} /> Call Owner
            </a>
            <a href={`https://wa.me/91${booking.ownerMobile}`} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
              padding: "0.6rem", borderRadius: "0.6rem", border: "none",
              background: "#25D366", color: "white", fontWeight: 600, fontSize: "0.85rem", textDecoration: "none",
            }}>
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
          <button onClick={handleDownloadReceipt} className="btn-outline" style={{ justifyContent: "center", width: "100%" }}>
            <Download size={16} /> Download Receipt
          </button>
          <button onClick={handleShareWhatsApp} style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
            padding: "0.75rem 1.25rem", borderRadius: "0.75rem", border: "none",
            background: "#25D366", color: "white", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit",
          }}>
            <Share2 size={16} /> Share on WhatsApp
          </button>
        </div>

        <Link href="/my-bookings" className="btn-primary" style={{ display: "flex", justifyContent: "center", textDecoration: "none", marginBottom: "1rem" }}>
          View My Bookings <ArrowRight size={16} />
        </Link>

        <button onClick={() => { resetBooking(); router.push("/listings"); }} style={{
          display: "block", width: "100%", padding: "0.75rem", borderRadius: "0.75rem",
          border: "1px solid #E5E7EB", background: "transparent", color: "#6B7280",
          fontWeight: 500, fontSize: "0.9rem", cursor: "pointer", fontFamily: "inherit",
        }}>
          Book Another Tractor
        </button>
      </div>

      <style>{`@keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }`}</style>
    </div>
  );
}
