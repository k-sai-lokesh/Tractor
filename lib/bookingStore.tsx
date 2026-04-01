"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Attachment } from "./data";

export interface BookingState {
  tractorId: string;
  tractorModel: string;
  tractorBrand: string;
  tractorImage: string;
  ownerName: string;
  ownerMobile: string;
  ownerUpiId: string;
  pricePerHour: number;
  pricePerDay: number;
  selectedDate: string;
  startTime: string;
  endTime: string;
  durationType: "hours" | "days";
  hours: number;
  days: number;
  selectedAttachments: Attachment[];
  promoCode: string;
  discount: number;
  baseRent: number;
  attachmentTotal: number;
  platformFee: number;
  gst: number;
  grandTotal: number;
  renterName: string;
  renterMobile: string;
  paymentId: string;
  bookingId: string;
  location: string;
}

const defaultBooking: BookingState = {
  tractorId: "",
  tractorModel: "",
  tractorBrand: "",
  tractorImage: "",
  ownerName: "",
  ownerMobile: "",
  ownerUpiId: "",
  pricePerHour: 0,
  pricePerDay: 0,
  selectedDate: "",
  startTime: "8:00 AM",
  endTime: "4:00 PM",
  durationType: "hours",
  hours: 4,
  days: 1,
  selectedAttachments: [],
  promoCode: "",
  discount: 0,
  baseRent: 0,
  attachmentTotal: 0,
  platformFee: 0,
  gst: 0,
  grandTotal: 0,
  renterName: "",
  renterMobile: "",
  paymentId: "",
  bookingId: "",
  location: "",
};

interface BookingContextType {
  booking: BookingState;
  setBooking: (updates: Partial<BookingState>) => void;
  resetBooking: () => void;
}

const BookingContext = createContext<BookingContextType>({
  booking: defaultBooking,
  setBooking: () => {},
  resetBooking: () => {},
});

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBookingState] = useState<BookingState>(defaultBooking);

  const setBooking = (updates: Partial<BookingState>) => {
    setBookingState((prev) => ({ ...prev, ...updates }));
  };

  const resetBooking = () => {
    setBookingState(defaultBooking);
  };

  return (
    <BookingContext.Provider value={{ booking, setBooking, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
