import { clsx, type ClassValue } from "clsx";
import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { DEFAULT_ERROR_MESSAGE } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const scryptAsync = async (password: string, salt: string) => {
  return await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, (error, key) => {
      if (error) reject(error);
      else resolve(key as Buffer);
    });
  });
};

export const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = (await scryptAsync(password, salt)) as Buffer;

  return `${salt}:${derivedKey.toString("hex")}`;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const [salt, originalHash] = hashedPassword.split(":");

  const hashedBuffer = (await scryptAsync(password, salt)) as Buffer;
  const keyBuffer = Buffer.from(originalHash, "hex");

  return timingSafeEqual(hashedBuffer, keyBuffer);
};

export const axiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    if (status !== 200) {
      return {
        success: false,
        message: data,
      };
    }
  }

  return {
    success: false,
    message: DEFAULT_ERROR_MESSAGE,
  };
};
