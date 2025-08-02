import { z } from "zod";

export const MAX_FILE_SIZE = 2 * 1024 * 1024; //2mb
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const tradeSchema = z.object({
  symbol: z
    .string()
    .min(1, "Symbol must be at least 1 character")
    .max(6, "Symbol must be at most 6 characters"),
  position: z.enum(["long", "short"]),
  entryDate: z
    .date()
    .refine(
      (val) => val instanceof Date && !isNaN(val.getTime()),
      "Pick an entry date"
    ),
  exitDate: z
    .date()
    .refine(
      (val) => val instanceof Date && !isNaN(val.getTime()),
      "Pick an exit date"
    ),
  entryPrice: z
    .string()
    .refine((val) => Number(val) > 0, "Entry price must be greater than 0")
    .refine((val) => !isNaN(Number(val)), "Entry price must be a valid number"),
  exitPrice: z
    .string()
    .refine((val) => Number(val) > 0, "Exit price must be greater than 0")
    .refine((val) => !isNaN(Number(val)), "Exit price must be a valid number"),
  lotSize: z
    .string()
    .refine((val) => Number(val) > 0, "Lot size must be greater than 0")
    .refine((val) => !isNaN(Number(val)), "Lot size must be a valid number"),
  pnl: z
    .string()
    .refine((val) => !isNaN(Number(val)), "Pnl must be a valid number"),
  screenshot: z
    .custom<File>((file) => file instanceof File, "No file selected")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File size must be less than 2mb"
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Unsupported file type. Only .jpeg, .jpg, .png, or .webp allowed"
    ),
});

export type TradeSchema = z.infer<typeof tradeSchema>;
