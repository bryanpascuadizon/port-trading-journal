import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(20, "Username must be at most 20 characters"),
  name: z
    .string()
    .min(5, "Name must be at least 5 characters")
    .max(20, "Name must be at most 20 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
