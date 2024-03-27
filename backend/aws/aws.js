import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { config } from "aws-sdk";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const REGION = process.env.AWS_REGION;
const ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;

// console.log(REGION, ACCESS_KEY_ID, SECRET_ACCESS_KEY);
async function handleUpload() {
  const client = new S3Client({
    region: REGION,
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const command = new PutObjectCommand({
    Bucket: "campfire",
    Key: "hello-s3.txt",
    Body: "Hello S3!",
  });

  try {
    const response = await client.send(command);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
}

// handleUpload();
