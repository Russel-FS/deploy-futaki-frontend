import { NextResponse } from "next/server";
import { PrismaSlideRepository } from "@/catalog/infrastructure/repositories/prisma-slide.repository";

const slideRepository = new PrismaSlideRepository();

export async function GET() {
  try {
    const slides = await slideRepository.getActiveSlides();
    return NextResponse.json({ data: slides });
  } catch (error) {
    console.error("Error al obtener slides públicos:", error);
    return NextResponse.json(
      { error: "No se pudieron cargar los banners." },
      { status: 500 },
    );
  }
}
