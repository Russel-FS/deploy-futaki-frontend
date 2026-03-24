import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  endpoint: process.env.B2_ENDPOINT,
  region: process.env.B2_REGION,
  credentials: {
    accessKeyId: process.env.B2_KEY_ID!,
    secretAccessKey: process.env.B2_APPLICATION_KEY!,
  },
});

export class B2StorageService {
  async uploadFile(
    file: Buffer,
    fileName: string,
    contentType: string,
  ): Promise<string> {
    const bucketName = process.env.B2_BUCKET_NAME!;

    // crear un nombre de archivo unico para evitar duplicados
    const timestamp = Date.now();
    const uniqueFileName = `${timestamp}-${fileName}`;

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: uniqueFileName,
        Body: file,
        ContentType: contentType,
      }),
    );

    return `https://${bucketName}.s3.${process.env.B2_REGION}.backblazeb2.com/${uniqueFileName}`;
  }
}
