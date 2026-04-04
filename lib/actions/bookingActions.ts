"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createBooking(data: any) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized. Please login to book a tractor.");
  }

  const {
    tractorId,
    startDate,
    endDate,
    startTime,
    endTime,
    duration,
    durationType,
    attachments,
    baseRent,
    attachmentTotal,
    platformFee,
    gst,
    grandTotal,
    paymentId,
  } = data;

  const booking = await prisma.booking.create({
    data: {
      tractorId,
      renterId: session.user.id,
      startDate,
      endDate,
      startTime,
      endTime,
      duration,
      durationType,
      attachments: JSON.stringify(attachments),
      baseRent,
      attachmentTotal,
      platformFee,
      gst,
      grandTotal,
      status: "pending",
      paymentId: paymentId || "pay_mock_" + Math.random().toString(36).substring(7),
      bookedAt: new Date(),
    },
  });

  revalidatePath("/my-bookings");
  revalidatePath("/owner-dashboard");
  return booking;
}
