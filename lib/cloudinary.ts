"use server";

import axios from "axios";

const CLOUDINARY_CONFIG = {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
  ASSET_FOLDER: process.env.CLOUDINARY_ASSET_FOLDER,
  CLIENT_ID: process.env.CLOUDINARY_CLIENT_ID,
  CLIENT_SECRET: process.env.CLOUDINARY_CLIENT_SECRET,
};

const auth = Buffer.from(
  `${CLOUDINARY_CONFIG.CLIENT_ID}:${CLOUDINARY_CONFIG.CLIENT_SECRET}`
).toString("base64");

export const uploadImageToCloudinary = async (file: File | string) => {
  try {
    if (typeof file === "string") {
      return;
    }

    if (
      !CLOUDINARY_CONFIG.CLOUD_NAME ||
      !CLOUDINARY_CONFIG.UPLOAD_PRESET ||
      !CLOUDINARY_CONFIG.ASSET_FOLDER
    ) {
      return;
    }

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", `${CLOUDINARY_CONFIG.UPLOAD_PRESET}`);
    formData.append("asset_folder", `${CLOUDINARY_CONFIG.ASSET_FOLDER}`);

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/upload`,
      formData
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteImageFromCloudinary = async (public_id: string) => {
  if (!CLOUDINARY_CONFIG.CLOUD_NAME) {
    return;
  }

  const response = await axios.delete(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.CLOUD_NAME}/resources/image/upload/${public_id}`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );

  return response;
};
