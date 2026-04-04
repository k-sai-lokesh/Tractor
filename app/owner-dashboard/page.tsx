import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import OwnerDashboardClient from "./OwnerDashboardClient";
import { redirect } from "next/navigation";

export default async function OwnerDashboardPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Fetch the user's first tractor (assuming one for now as per current UI)
  const tractor = await prisma.tractor.findFirst({
    where: { ownerId: session.user.id },
    include: {
      bookings: {
        include: {
          renter: true,
        },
        orderBy: {
          bookedAt: "desc",
        },
      },
    },
  });

  // Get all booking requests for the owner across all their tractors
  const allTractors = await prisma.tractor.findMany({
    where: { ownerId: session.user.id },
    select: { id: true }
  });
  
  const tractorIds = allTractors.map(t => t.id);

  const bookingRequests = await prisma.booking.findMany({
    where: {
      tractorId: { in: tractorIds }
    },
    include: {
      renter: true,
      tractor: true,
    },
    orderBy: {
      bookedAt: "desc"
    }
  });

  return (
    <OwnerDashboardClient 
      user={session.user} 
      tractor={tractor} 
      bookingRequests={bookingRequests} 
    />
  );
}
