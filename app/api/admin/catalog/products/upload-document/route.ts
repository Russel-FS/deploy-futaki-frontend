import { NextResponse } from "next/server";
import { B2DocumentStorageService } from "@/shared/services/b2-document-storage.service";
import { validatePdfFile } from "@/catalog/application/validation/catalog.validation";

const storageService = new B2DocumentStorageService();

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

    // Validación de PDF
    const { errors } = validatePdfFile(file);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 422 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // limpiar nombre de archivo
    const originalName = file.name.split(".").slice(0, -1).join(".");
    const safeName = (originalName || "doc").replace(/[^a-zA-Z0-9_-]/g, "_");
    const fileName = `${safeName}_${Date.now()}.pdf`;

    // Subida directa
    const pdfUrl = await storageService.uploadFile(
      buffer,
      fileName,
      "application/pdf",
    );

    return NextResponse.json({ url: pdfUrl });
  } catch (error) {
    console.error("Error al subir el PDF a B2:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al procesar el documento." },
      { status: 500 },
    );
  }
}
