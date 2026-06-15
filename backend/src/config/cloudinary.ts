// src/config/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

const cloud_name = process.env.CLOUDINARY_NAME || process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUD_NAME;
const api_key    = process.env.CLOUDINARY_KEY  || process.env.CLOUDINARY_API_KEY   || process.env.API_KEY;
const api_secret = process.env.CLOUDINARY_SECRET || process.env.CLOUDINARY_API_SECRET || process.env.API_SECRET;

console.log("☁️ Initializing Cloudinary...");
if (!cloud_name) console.error("❌ Cloudinary Cloud Name is missing!");
if (!api_key)    console.error("❌ Cloudinary API Key is missing!");
if (!api_secret) console.error("❌ Cloudinary API Secret is missing!");

cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
});

if (cloud_name && api_key && api_secret) {
    console.log("✅ Cloudinary Configured Successfully");
}

export default cloudinary;