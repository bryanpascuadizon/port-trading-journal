import { z } from "zod";

export const portfolioSchema = z.object({
  name: z
    .string()
    .min(5, "Porfolio name must be at least 5 characters")
    .max(20, "Portfolio name must be at most 20 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(50, "Description must be at most 50 characters"),
  broker: z
    .string()
    .min(1, "This field is required")
    .max(20, "Broker name must be at most 20 characters"),
  accountNumber: z
    .string()
    .trim()
    .regex(/^\d+$/, "Account number must contain only digits"),
  isDefault: z.boolean(),
});

export type PortfolioSchema = z.infer<typeof portfolioSchema>;
