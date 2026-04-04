import { PrismaClient } from "@prisma/client";
import { tractors, mockBookings } from "../lib/data";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning up database...");
  await prisma.booking.deleteMany();
  await prisma.review.deleteMany();
  await prisma.attachment.deleteMany();
  await prisma.tractor.deleteMany();
  await prisma.user.deleteMany();

  console.log("Seeding users...");
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Map of owner names to User IDs
  const ownerMap = new Map<string, string>();

  // Use unique owners from tractors data
  const uniqueOwners = Array.from(new Set(tractors.map(t => t.owner)));

  for (const ownerName of uniqueOwners) {
    const user = await prisma.user.create({
      data: {
        name: ownerName,
        email: `${ownerName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
        password: hashedPassword,
      },
    });
    ownerMap.set(ownerName, user.id);
  }

  // Create an extra user for renting
  const renterUser = await prisma.user.create({
    data: {
      name: "Suresh Kumar",
      email: "suresh@example.com",
      password: hashedPassword,
    },
  });

  console.log("Seeding tractors...");
  const tractorIdMap = new Map<string, string>(); // Maps mock id (t1) to database cuid

  for (const t of tractors) {
    const ownerId = ownerMap.get(t.owner);
    if (!ownerId) continue;

    const tractor = await prisma.tractor.create({
      data: {
        ownerId,
        model: t.model,
        brand: t.brand,
        numberPlate: t.numberPlate,
        year: t.year,
        hp: t.hp,
        rating: t.rating,
        reviewCount: t.reviewCount,
        pricePerHour: t.pricePerHour,
        pricePerDay: t.pricePerDay,
        availableTime: t.availableTime,
        location: t.location,
        image: t.image,
        images: JSON.stringify(t.images),
        category: t.category,
        description: t.description,
        available: t.available,
        attachments: {
          create: t.attachments.map(a => ({
            name: a.name,
            pricePerHour: a.pricePerHour,
          })),
        },
        reviews: {
          create: t.reviews.map(r => ({
            renterName: r.renter,
            rating: r.rating,
            comment: r.comment,
            date: r.date,
          })),
        },
      },
    });
    tractorIdMap.set(t.id, tractor.id);
  }

  console.log("Seeding bookings...");
  for (const b of mockBookings) {
    const dbTractorId = tractorIdMap.get(b.tractorId);
    if (!dbTractorId) continue;

    await prisma.booking.create({
      data: {
        tractorId: dbTractorId,
        renterId: renterUser.id,
        startDate: b.startDate,
        endDate: b.endDate,
        startTime: b.startTime,
        endTime: b.endTime,
        duration: b.duration,
        durationType: b.durationType,
        attachments: JSON.stringify(b.attachments),
        baseRent: b.baseRent,
        attachmentTotal: b.attachmentTotal,
        platformFee: b.platformFee,
        gst: b.gst,
        grandTotal: b.grandTotal,
        status: b.status === "paid" ? "paid" : b.status === "pending" ? "pending" : "cancelled",
        paymentId: b.paymentId,
        bookedAt: new Date(b.bookedAt),
      },
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
