"use server";

import { v2 as cloudinary } from "cloudinary";

const CLOUDINARY_CONFIG = {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
  ASSET_FOLDER: process.env.CLOUDINARY_ASSET_FOLDER,
  CLIENT_ID: process.env.CLOUDINARY_CLIENT_ID,
  CLIENT_SECRET: process.env.CLOUDINARY_CLIENT_SECRET,
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_CLIENT_ID!,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET!,
});

export const uploadImageToCloudinary = async (file: File | string) => {
  try {
    if (typeof file === "string") {
      return;
    }

    if (!process.env.CLOUDINARY_UPLOAD_PRESET) {
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");

    const mime = file.type;
    const dataUri = `data:${mime};base64,${base64}`;

    const response = await cloudinary.uploader.upload(dataUri, {
      folder: process.env.CLOUDINARY_ASSET_FOLDER!,
    });

    return response;
  } catch (error) {
    console.log(error);
    return;
  }
};

export const deleteImageFromCloudinary = async (public_id: string) => {
  try {
    if (!CLOUDINARY_CONFIG.CLOUD_NAME) {
      return;
    }

    const response = await cloudinary.uploader.destroy(public_id);

    return response;
  } catch (error) {
    console.log(error);
    return;
  }
};
