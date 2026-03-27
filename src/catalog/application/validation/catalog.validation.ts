/**
 * Centralizes all input validation for the admin catalog API.
 * Returns null if valid, or an error message string if invalid.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductInput {
  name?: unknown;
  description?: unknown;
  price?: unknown;
  stock?: unknown;
  categoryId?: unknown;
  imageUrl?: unknown;
  pdfUrl?: unknown;
  isFeatured?: unknown;
  isActive?: unknown;
  specs?: unknown;
}

export interface CategoryInput {
  name?: unknown;
  description?: unknown;
  imageUrl?: unknown;
  isFeatured?: unknown;
  isActive?: unknown;
}

const MAX_NAME_LENGTH = 200;
const MAX_DESCRIPTION_LENGTH = 2000;
const MAX_PRICE = 999_999_999;
const MAX_STOCK = 999_999;
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];

const ALLOWED_DOC_TYPES = ["application/pdf"];

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

/**
 * Método para validar si una URL es válida
 */
const isValidUrl = (value: unknown): boolean => {
  if (typeof value !== "string") return false;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

/**
 * Método para validar si un UUID es válido
 */
const isValidUUID = (value: unknown): boolean =>
  typeof value === "string" && UUID_REGEX.test(value);

/**
 * Método para validar la creación de un producto
 * @param data Datos del producto
 * @returns Array de errores
 */
export const validateCreateProduct = (
  data: ProductInput,
): { errors: string[] } => {
  const errors: string[] = [];

  // nombre
  if (!data.name || typeof data.name !== "string" || !data.name.trim()) {
    errors.push("El nombre del producto es obligatorio.");
  } else if (data.name.trim().length > MAX_NAME_LENGTH) {
    errors.push(`El nombre no puede superar ${MAX_NAME_LENGTH} caracteres.`);
  }

  // precio
  if (data.price === undefined || data.price === null) {
    errors.push("El precio es obligatorio.");
  } else {
    const price = Number(data.price);
    if (isNaN(price)) {
      errors.push("El precio debe ser un número válido.");
    } else if (price < 0) {
      errors.push("El precio no puede ser negativo.");
    } else if (price > MAX_PRICE) {
      errors.push(`El precio no puede ser mayor a ${MAX_PRICE}.`);
    }
  }

  // stock
  if (data.stock !== undefined && data.stock !== null) {
    const stock = Number(data.stock);
    if (!Number.isInteger(stock)) {
      errors.push("El stock debe ser un número entero.");
    } else if (stock < 0) {
      errors.push("El stock no puede ser negativo.");
    } else if (stock > MAX_STOCK) {
      errors.push(`El stock no puede ser mayor a ${MAX_STOCK}.`);
    }
  }

  // categoryId
  if (!data.categoryId) {
    errors.push("La categoría es obligatoria.");
  } else if (!isValidUUID(data.categoryId)) {
    errors.push("El ID de categoría no es válido.");
  }

  // descripcion (opcional)
  if (data.description !== undefined && data.description !== null) {
    if (typeof data.description !== "string") {
      errors.push("La descripción debe ser texto.");
    } else if (data.description.length > MAX_DESCRIPTION_LENGTH) {
      errors.push(
        `La descripción no puede superar ${MAX_DESCRIPTION_LENGTH} caracteres.`,
      );
    }
  }

  // imagen url (opcional)
  if (
    data.imageUrl !== undefined &&
    data.imageUrl !== null &&
    data.imageUrl !== ""
  ) {
    if (!isValidUrl(data.imageUrl)) {
      errors.push("La URL de la imagen no es válida.");
    }
  }

  // pdf url (opcional)
  if (data.pdfUrl !== undefined && data.pdfUrl !== null && data.pdfUrl !== "") {
    if (!isValidUrl(data.pdfUrl)) {
      errors.push("La URL del PDF no es válida.");
    }
  }

  return { errors };
};

/**
 * Método para validar la actualización de un producto
 * @param data Datos del producto
 * @returns Array de errores
 */
export const validateUpdateProduct = (
  data: ProductInput,
): { errors: string[] } => {
  const errors: string[] = [];

  if (Object.keys(data).length === 0) {
    errors.push("El cuerpo de la solicitud no puede estar vacío.");
    return { errors };
  }

  if (data.name !== undefined) {
    if (typeof data.name !== "string" || !data.name.trim()) {
      errors.push("El nombre no puede estar vacío.");
    } else if (data.name.trim().length > MAX_NAME_LENGTH) {
      errors.push(`El nombre no puede superar ${MAX_NAME_LENGTH} caracteres.`);
    }
  }

  if (data.price !== undefined && data.price !== null) {
    const price = Number(data.price);
    if (isNaN(price)) {
      errors.push("El precio debe ser un número válido.");
    } else if (price < 0) {
      errors.push("El precio no puede ser negativo.");
    } else if (price > MAX_PRICE) {
      errors.push(`El precio no puede superar ${MAX_PRICE}.`);
    }
  }

  if (data.stock !== undefined && data.stock !== null) {
    const stock = Number(data.stock);
    if (!Number.isInteger(stock)) {
      errors.push("El stock debe ser un número entero.");
    } else if (stock < 0) {
      errors.push("El stock no puede ser negativo.");
    } else if (stock > MAX_STOCK) {
      errors.push(`El stock no puede superar ${MAX_STOCK}.`);
    }
  }

  if (data.categoryId !== undefined) {
    if (!isValidUUID(data.categoryId)) {
      errors.push("El ID de categoría no es válido.");
    }
  }

  if (data.description !== undefined && data.description !== null) {
    if (typeof data.description !== "string") {
      errors.push("La descripción debe ser texto.");
    } else if (data.description.length > MAX_DESCRIPTION_LENGTH) {
      errors.push(
        `La descripción no puede superar ${MAX_DESCRIPTION_LENGTH} caracteres.`,
      );
    }
  }

  if (
    data.imageUrl !== undefined &&
    data.imageUrl !== null &&
    data.imageUrl !== ""
  ) {
    if (!isValidUrl(data.imageUrl)) {
      errors.push("La URL de la imagen no es válida.");
    }
  }

  if (data.pdfUrl !== undefined && data.pdfUrl !== null && data.pdfUrl !== "") {
    if (!isValidUrl(data.pdfUrl)) {
      errors.push("La URL del PDF no es válida.");
    }
  }

  return { errors };
};

/**
 * Método para validar la creación de una categoría
 * @param data Datos de la categoría
 * @returns Array de errores
 */
export const validateCreateCategory = (
  data: CategoryInput,
): { errors: string[] } => {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== "string" || !data.name.trim()) {
    errors.push("El nombre de la categoría es obligatorio.");
  } else if (data.name.trim().length > MAX_NAME_LENGTH) {
    errors.push(`El nombre no puede superar ${MAX_NAME_LENGTH} caracteres.`);
  }

  if (data.description !== undefined && data.description !== null) {
    if (typeof data.description !== "string") {
      errors.push("La descripción debe ser texto.");
    } else if (data.description.length > MAX_DESCRIPTION_LENGTH) {
      errors.push(
        `La descripción no puede superar ${MAX_DESCRIPTION_LENGTH} caracteres.`,
      );
    }
  }

  if (
    data.imageUrl !== undefined &&
    data.imageUrl !== null &&
    data.imageUrl !== ""
  ) {
    if (!isValidUrl(data.imageUrl)) {
      errors.push("La URL de la imagen no es válida.");
    }
  }

  return { errors };
};

/**
 * Método para validar la actualización de una categoría
 * @param data Datos de la categoría
 * @returns Array de errores
 */
export const validateUpdateCategory = (
  data: CategoryInput,
): { errors: string[] } => {
  const errors: string[] = [];

  if (Object.keys(data).length === 0) {
    errors.push("El cuerpo de la solicitud no puede estar vacío.");
    return { errors };
  }

  if (data.name !== undefined) {
    if (typeof data.name !== "string" || !data.name.trim()) {
      errors.push("El nombre no puede estar vacío.");
    } else if (data.name.trim().length > MAX_NAME_LENGTH) {
      errors.push(`El nombre no puede superar ${MAX_NAME_LENGTH} caracteres.`);
    }
  }

  if (data.description !== undefined && data.description !== null) {
    if (typeof data.description !== "string") {
      errors.push("La descripción debe ser texto.");
    } else if (data.description.length > MAX_DESCRIPTION_LENGTH) {
      errors.push(
        `La descripción no puede superar ${MAX_DESCRIPTION_LENGTH} caracteres.`,
      );
    }
  }

  if (
    data.imageUrl !== undefined &&
    data.imageUrl !== null &&
    data.imageUrl !== ""
  ) {
    if (!isValidUrl(data.imageUrl)) {
      errors.push("La URL de la imagen no es válida.");
    }
  }

  return { errors };
};

/**
 * Método para validar la imagen de un producto
 * @param file Archivo de imagen
 * @returns Array de errores
 */
export const validateImageFile = (file: File): { errors: string[] } => {
  const errors: string[] = [];

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    errors.push(
      `Tipo de archivo no permitido (${file.type}). Solo se aceptan: JPEG, PNG, WebP, GIF, AVIF.`,
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(1);
    errors.push(
      `El archivo es demasiado grande (${sizeMB} MB). El límite es ${MAX_FILE_SIZE_MB} MB.`,
    );
  }

  if (file.size === 0) {
    errors.push("El archivo está vacío.");
  }

  return { errors };
};

/**
 * Método para validar un archivo PDF
 * @param file Archivo PDF
 * @returns Array de errores
 */
export const validatePdfFile = (file: File): { errors: string[] } => {
  const errors: string[] = [];

  if (!ALLOWED_DOC_TYPES.includes(file.type)) {
    errors.push(
      `Tipo de archivo no permitido (${file.type}). Solo se aceptan archivos PDF.`,
    );
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMB = (file.size / 1024 / 1024).toFixed(1);
    errors.push(
      `El archivo es demasiado grande (${sizeMB} MB). El límite para documentos es de ${MAX_FILE_SIZE_MB} MB.`,
    );
  }

  if (file.size === 0) {
    errors.push("El archivo está vacío.");
  }

  return { errors };
};
