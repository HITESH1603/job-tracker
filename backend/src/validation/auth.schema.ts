import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required."),
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .refine(
      (password) => Buffer.byteLength(password, "utf8") <= 72,
      "Password must not exceed 72 bytes.",
    ),
});
