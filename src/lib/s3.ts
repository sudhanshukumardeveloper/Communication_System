import { S3Client } from "@aws-sdk/client-s3";

export const s3 = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_S3_ENDPOINT || undefined,
  forcePathStyle: Boolean(process.env.AWS_S3_ENDPOINT)
});

export const mediaBucket = process.env.AWS_S3_BUCKET!;
