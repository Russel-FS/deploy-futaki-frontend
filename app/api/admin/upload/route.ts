import { NextResponse } from "next/server";
import { B2StorageService } from "@/shared/infrastructure/storage/b2-storage.service";

const storageService = new B2StorageService();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No se proporciono ningun archivo" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imageUrl = await storageService.uploadFile(
      buffer,
      file.name,
      file.type,
    );

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Error al subir el archivo a B2:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
