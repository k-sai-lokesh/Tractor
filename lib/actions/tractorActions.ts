"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createTractor(formData: any) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Basic implementation - in a real app, you'd validate with Zod
  const tractor = await prisma.tractor.create({
    data: {
      ownerId: session.user.id,
      brand: formData.brand,
      model: formData.model,
      year: parseInt(formData.year),
      hp: parseInt(formData.hp),
      numberPlate: formData.numberPlate,
      pricePerHour: parseInt(formData.pricePerHour),
      pricePerDay: parseInt(formData.pricePerDay),
      availableTime: formData.availableTime,
      location: formData.location || "Nellore, Andhra Pradesh",
      category: formData.category || "Tractor",
      description: formData.description || "",
      image: formData.image || "/tractor1.png",
      images: JSON.stringify([formData.image || "/tractor1.png"]),
      available: true,
      attachments: {
        create: (formData.attachments || []).map((a: any) => ({
          name: a.name,
          pricePerHour: parseInt(a.pricePerHour),
        })),
      },
    },
  });

  revalidatePath("/listings");
  revalidatePath("/owner-dashboard");
  return tractor;
}

export async function updateBookingStatus(bookingId: string, status: "accepted" | "declined") {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Verify ownership via tractor relationship
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { tractor: true },
  });

  if (!booking || booking.tractor.ownerId !== session.user.id) {
    throw new Error("Unauthorized to update this booking");
  }

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status },
  });

  revalidatePath("/owner-dashboard");
}
