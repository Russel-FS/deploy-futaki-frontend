/**
 * Utilidad para extraer mensajes de error de las respuestas de la API.
 * Soporta formatos de error comunes: { errors: string[] } y { error: string }.
 */
export const extractErrorMessage = async (
  res: Response,
  fallback = "Ocurrió un error inesperado.",
): Promise<string> => {
  try {
    const body = await res.json();

    // array de errores
    if (Array.isArray(body.errors) && body.errors.length > 0) {
      return body.errors.join(" • ");
    }

    // mensaje de error único
    if (typeof body.error === "string") {
      return body.error;
    }

    // mensaje genérico en el body
    if (typeof body.message === "string") {
      return body.message;
    }
  } catch {}

  return fallback;
};
