import { prisma } from "@/lib/prisma";
import { Tractor } from "@/lib/data";
import ListingsClient from "./ListingsClient";

export default async function ListingsPage() {
  const dbTractors = await prisma.tractor.findMany({
    include: {
      owner: true,
      attachments: true,
    },
  });

  // Map database tractors to the format expected by the UI components
  const mappedTractors: Tractor[] = dbTractors.map(t => ({
    id: t.id,
    owner: t.owner?.name || "Unknown Owner",
    mobile: t.owner?.email || "9876543210", // Fallback mobile from owner mail for now
    upiId: "", // Privacy protected till payment
    bankAccount: "",
    ifscCode: "",
    model: t.model,
    brand: t.brand,
    numberPlate: t.numberPlate,
    year: t.year,
    hp: t.hp,
    rating: t.rating || 4.5,
    reviews: [], // Fetch reviews separately if needed
    reviewCount: t.reviewCount || 0,
    pricePerHour: t.pricePerHour,
    pricePerDay: t.pricePerDay,
    availableTime: t.availableTime,
    attachments: t.attachments.map(a => ({
      name: a.name,
      pricePerHour: a.pricePerHour
    })),
    availableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"], // Standard fallback
    earnings: 0,
    location: t.location,
    image: t.image || "/tractor1.png",
    images: typeof t.images === "string" ? JSON.parse(t.images) : (t.images || ["/tractor1.png"]),
    category: t.category || "Utility",
    description: t.description,
    available: t.available,
  }));

  return <ListingsClient initialTractors={mappedTractors} />;
}
