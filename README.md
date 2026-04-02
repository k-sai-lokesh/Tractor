# TractorLease 🚜

> **Rent a Tractor. Grow More.**

India's premier agricultural equipment leasing marketplace — connecting farmers with trusted local tractor owners.

**Live:** (https://tractor-omega.vercel.app/)

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, categories, featured tractors, testimonials |
| `/listings` | Browse tractors with filter sidebar & search |
| `/tractor/[id]` | Tractor detail — specs, attachments, booking panel |
| `/checkout` | Secure checkout — UPI, Card, Net Banking, EMI |
| `/payment-success` | Booking confirmation with PDF receipt |
| `/my-bookings` | Renter dashboard — booking history & reviews |
| `/owner-dashboard` | Owner dashboard — earnings, requests, payouts |
| `/list-tractor` | 5-step form to list a tractor |

## Tech Stack

- **Framework:** Next.js 16.2.2 (App Router)
- **Styling:** Tailwind CSS v4
- **Icons:** lucide-react
- **Font:** Poppins (Google Fonts via next/font)
- **PDF:** jsPDF
- **QR:** qrcode.react
- **Payment UI:** Razorpay mock (simulated flow)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
