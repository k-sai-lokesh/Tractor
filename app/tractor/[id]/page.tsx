import { prisma } from "@/lib/prisma";
import TractorDetailClient from "./TractorDetailClient";
import { notFound } from "next/navigation";

export default async function TractorDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const tractor = await prisma.tractor.findUnique({
    where: { id },
    include: {
      owner: true,
      attachments: true,
      reviews: true,
    },
  });

  if (!tractor) {
    notFound();
  }

  return <TractorDetailClient tractor={tractor} />;
}
