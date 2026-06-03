import "server-only";
import { S3Client, DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.AWS_REGION;
const bucket = process.env.AWS_S3_BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

export const isS3Configured = Boolean(
  region && bucket && accessKeyId && secretAccessKey,
);

const client = isS3Configured
  ? new S3Client({ region, credentials: { accessKeyId: accessKeyId!, secretAccessKey: secretAccessKey! } })
  : null;

/** CloudFront/S3 public base URL for an object key. */
export function publicUrl(key: string): string {
  const cdn = process.env.AWS_CDN_URL;
  if (cdn) return `${cdn.replace(/\/$/, "")}/${key}`;
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
}

/** Presigned PUT URL for direct browser upload. */
export async function presignUpload(
  key: string,
  contentType: string,
): Promise<{ uploadUrl: string; key: string; url: string }> {
  if (!client || !bucket) throw new Error("S3 is not configured");
  const command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: contentType });
  const uploadUrl = await getSignedUrl(client, command, { expiresIn: 300 });
  return { uploadUrl, key, url: publicUrl(key) };
}

export async function deleteObject(key: string): Promise<void> {
  if (!client || !bucket) return;
  await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
}
