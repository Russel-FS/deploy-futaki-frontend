import { NextResponse } from "next/server";
import { B2DocumentStorageService } from "@/shared/services/b2-document-storage.service";

const docService = new B2DocumentStorageService();

/**
 * GET /api/admin/catalog/products/document-url?key=<fileKey>
 * Genera una URL firmada temporal para acceder a un documento privado.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key || !key.trim()) {
      return NextResponse.json(
        { error: "Se requiere el parámetro 'key' del documento." },
        { status: 400 },
      );
    }

    const signedUrl = await docService.getSignedUrl(key);

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    console.error("Error al generar URL firmada:", error);
    return NextResponse.json(
      { error: "No se pudo generar el enlace de acceso al documento." },
      { status: 500 },
    );
  }
}
