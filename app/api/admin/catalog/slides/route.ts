import { NextResponse } from "next/server";
import { PrismaSlideRepository } from "@/catalog/infrastructure/repositories/prisma-slide.repository";

const slideRepository = new PrismaSlideRepository();

export async function GET() {
  try {
    const slides = await slideRepository.getAllSlides();
    return NextResponse.json({ data: slides });
  } catch (error) {
    console.error("Error al obtener slides:", error);
    return NextResponse.json(
      { error: "Error al obtener los banners." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const slide = await slideRepository.createSlide(body);
    return NextResponse.json({ data: slide }, { status: 201 });
  } catch (error) {
    console.error("Error al crear slide:", error);
    return NextResponse.json(
      { error: "Error al registrar el banner." },
      { status: 500 },
    );
  }
}
