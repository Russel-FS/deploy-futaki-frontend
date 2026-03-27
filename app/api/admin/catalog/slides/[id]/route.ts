import { NextResponse } from "next/server";
import { PrismaSlideRepository } from "@/catalog/infrastructure/repositories/prisma-slide.repository";

const slideRepository = new PrismaSlideRepository();

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const slide = await slideRepository.updateSlide(id, body);
    return NextResponse.json({ data: slide });
  } catch (error) {
    console.error("Error al actualizar slide:", error);
    return NextResponse.json(
      { error: "Error al actualizar el banner." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await slideRepository.deleteSlide(id);
    return NextResponse.json({ message: "Banner eliminado correctamente." });
  } catch (error) {
    console.error("Error al eliminar slide:", error);
    return NextResponse.json(
      { error: "Error al eliminar el banner." },
      { status: 500 },
    );
  }
}
