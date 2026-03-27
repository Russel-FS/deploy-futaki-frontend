import { NextResponse } from "next/server";
import { B2StorageService } from "@/shared/services/b2-storage.service";
import { validateImageFile } from "@/catalog/application/validation/catalog.validation";
import sharp from "sharp";

const storageService = new B2StorageService();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No se proporcionó ningún archivo." },
        { status: 400 },
      );
    }

    // Validación de imagen
    const { errors } = validateImageFile(file);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 422 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // validar que sea una imagen valida
    let metadata: sharp.Metadata;
    try {
      metadata = await sharp(buffer).metadata();
    } catch {
      return NextResponse.json(
        { errors: ["El archivo no es una imagen válida o está corrupto."] },
        { status: 422 },
      );
    }

    // Validación adicional de dimensiones mínimas
    if (metadata.width && metadata.height) {
      if (metadata.width < 10 || metadata.height < 10) {
        return NextResponse.json(
          {
            errors: [
              "La imagen es demasiado pequeña. Dimensiones mínimas: 10×10 px.",
            ],
          },
          { status: 422 },
        );
      }
    }

    // Optimización: redimensionar a máximo 1200px y convertir a WebP calidad 80%
    const optimizedBuffer = await sharp(buffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    const originalName = file.name.split(".").slice(0, -1).join(".");
    const safeName = (originalName || "image").replace(/[^a-zA-Z0-9_-]/g, "_");
    const optimizedName = `${safeName}_${Date.now()}.webp`;

    const imageUrl = await storageService.uploadFile(
      optimizedBuffer,
      optimizedName,
      "image/webp",
    );

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Error al subir el archivo a B2:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al procesar la imagen." },
      { status: 500 },
    );
  }
}
