import sharp from "sharp";

export default async (image_base64: string): Promise<string> => {
  const buffer = Buffer.from(image_base64, "base64");

  // Check if the buffer is empty or invalid
  if (!buffer || buffer.length === 0) throw new Error("Invalid input buffer");

  // Use sharp to convert the image to WebP format
  const webpBuffer = await sharp(buffer).webp().toBuffer();

  // Convert the WebP buffer to a base64-encoded string
  const webpBase64 = webpBuffer.toString("base64");

  return webpBase64;
};
