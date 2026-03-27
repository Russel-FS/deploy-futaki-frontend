import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

/**
 * Servicio de almacenamiento para documentos privados PDFs técnicos.
 * Utiliza un bucket Backblaze B2 PRIVADO.
 * El acceso a los documentos se realiza mediante URLs firmadas con expiración.
 */
const docS3Client = new S3Client({
  endpoint: process.env.B2_DOCS_ENDPOINT,
  region: process.env.B2_DOCS_REGION,
  credentials: {
    accessKeyId: process.env.B2_DOCS_KEY_ID!,
    secretAccessKey: process.env.B2_DOCS_APPLICATION_KEY!,
  },
});

/** Tiempo de expiración de las URLs firmadas en segundos 1 hora por defecto*/
const SIGNED_URL_EXPIRY_SECONDS = 3600;

export class B2DocumentStorageService {
  /**
   * Sube un archivo al bucket privado de documentos.
   * @param file Buffer del archivo a subir.
   * @param fileName Nombre del archivo.
   * @param contentType Tipo MIME del archivo.
   * @returns La clave (key) del archivo en el bucket, NO una URL pública.
   */
  async uploadFile(
    file: Buffer,
    fileName: string,
    contentType: string,
  ): Promise<string> {
    const bucketName = process.env.B2_DOCS_BUCKET_NAME!;
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}-${fileName}`;

    await docS3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: uniqueFileName,
        Body: file,
        ContentType: contentType,
      }),
    );
    return uniqueFileName;
  }

  /**
   * Genera una URL firmada temporal para acceder a un documento privado.
   * @param fileKey La clave del archivo almacenada en la base de datos.
   * @param expiresIn Segundos de validez de la URL 1 hora por defecto.
   */
  async getSignedUrl(
    fileKey: string,
    expiresIn: number = SIGNED_URL_EXPIRY_SECONDS,
  ): Promise<string> {
    const bucketName = process.env.B2_DOCS_BUCKET_NAME!;

    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });

    return getSignedUrl(docS3Client, command, { expiresIn });
  }
}
