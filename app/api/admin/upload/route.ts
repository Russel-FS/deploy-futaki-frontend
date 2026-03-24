import { NextResponse } from "next/server";
import { B2StorageService } from "@/shared/services/b2-storage.service";
import sharp from "sharp";

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

    // Redimensionar máximo 1200px de ancho
    // Convertir a WebP calidad 80%
    const optimizedBuffer = await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    // Cambiar el nombre del archivo para que tenga extensión .webp
    const originalName = file.name.split(".").slice(0, -1).join(".");
    const optimizedName = `${originalName || "image"}.webp`;

    const imageUrl = await storageService.uploadFile(
      optimizedBuffer,
      optimizedName,
      "image/webp",
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
