import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

/**
 * Servicio de almacenamiento para archivos multimedia públicos (imágenes).
 * Utiliza un bucket Backblaze B2 con acceso público.
 */
const mediaS3Client = new S3Client({
  endpoint: process.env.B2_MEDIA_ENDPOINT,
  region: process.env.B2_MEDIA_REGION,
  credentials: {
    accessKeyId: process.env.B2_MEDIA_KEY_ID!,
    secretAccessKey: process.env.B2_MEDIA_APPLICATION_KEY!,
  },
});

export class B2MediaStorageService {
  async uploadFile(
    file: Buffer,
    fileName: string,
    contentType: string,
  ): Promise<string> {
    const bucketName = process.env.B2_MEDIA_BUCKET_NAME!;
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}-${fileName}`;

    await mediaS3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: uniqueFileName,
        Body: file,
        ContentType: contentType,
      }),
    );

    return `https://${bucketName}.s3.${process.env.B2_MEDIA_REGION}.backblazeb2.com/${uniqueFileName}`;
  }
}
