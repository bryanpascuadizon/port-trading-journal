import { clsx, type ClassValue } from "clsx";
import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const scryptAsync = async (password: string, salt: string) => {
  return await new Promise<Buffer>((resolve, reject) => {
    scrypt(password, salt, 64, (error, key) => {
      if (error) reject;
      else resolve(key);
    });
  });
};

export const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scryptAsync(password, salt);

  return `${salt}:${derivedKey.toString("hex")}`;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const [salt, originalHash] = hashedPassword.split(":");

  const hashedBuffer = await scryptAsync(password, salt);
  const keyBuffer = Buffer.from(originalHash, "hex");

  return timingSafeEqual(hashedBuffer, keyBuffer);
};
