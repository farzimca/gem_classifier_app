import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import streamifier from "streamifier";

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload file buffer directly to Cloudinary
 * @param {Buffer} fileBuffer - The image file buffer
 * @param {string} folder - Optional folder name
 * @returns {Promise<object>} Cloudinary response
 */
export const uploadOnCloudinary = (fileBuffer, folder = "gemstone-predictions") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    // Convert buffer to stream and send to Cloudinary
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

/**
 * Delete a file from Cloudinary using its URL
 * @param {string} url - The full Cloudinary URL of the image
 * @returns {Promise<object>} Cloudinary response
 */
export const deleteOnCloudinary = async (url) => {
  if (!url) {
    throw new Error("No URL provided for deletion.");
  }

  try {
    const parts = url.split("/");
    const fileName = parts[parts.length - 1];
    const public_id = fileName.split(".")[0]; // Extract ID before file extension

    // Delete file by public ID
    const response = await cloudinary.uploader.destroy(public_id);
    return response;
  } catch (err) {
    console.error("❌ Failed to delete file from Cloudinary:", err.message);
    throw new Error("Failed to delete file from Cloudinary");
  }
};
