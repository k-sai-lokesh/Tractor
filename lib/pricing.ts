// lib/pricing.ts — Price calculation utilities

export interface PricingBreakdown {
  baseRent: number;
  attachmentTotal: number;
  subtotal: number;
  discount: number;
  platformFee: number;
  gst: number;
  grandTotal: number;
}

const PLATFORM_FEE_PERCENT = 0.05;
const GST_PERCENT = 0.18;

export const PROMO_CODES: Record<string, number> = {
  FARM10: 10,   // 10% off
  KISAN20: 20,  // 20% off
  NEWUSER: 15,  // 15% off
  HARVEST5: 5,  // 5% off
};

export function calculateTotal(
  hours: number,
  days: number,
  pricePerHour: number,
  pricePerDay: number,
  attachmentsTotalPerHour: number,
  promoCode: string = ""
): PricingBreakdown {
  let baseRent = 0;
  let attachmentTotal = 0;

  if (days > 0) {
    baseRent = days * pricePerDay;
    // Attachment pricing: approximate 10 working hours per day
    attachmentTotal = attachmentsTotalPerHour * 10 * days;
  } else {
    baseRent = hours * pricePerHour;
    attachmentTotal = attachmentsTotalPerHour * hours;
  }

  const subtotal = baseRent + attachmentTotal;

  // Promo discount
  const discountPercent = PROMO_CODES[promoCode.toUpperCase()] ?? 0;
  const discount = Math.round(subtotal * (discountPercent / 100));

  const afterDiscount = subtotal - discount;
  const platformFee = Math.round(afterDiscount * PLATFORM_FEE_PERCENT);
  const taxableAmount = afterDiscount + platformFee;
  const gst = Math.round(taxableAmount * GST_PERCENT);
  const grandTotal = taxableAmount + gst;

  return {
    baseRent,
    attachmentTotal,
    subtotal,
    discount,
    platformFee,
    gst,
    grandTotal,
  };
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateBookingId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const prefix = "TL";
  const year = new Date().getFullYear().toString().slice(-2);
  let random = "";
  for (let i = 0; i < 6; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `${prefix}${year}${random}`;
}
