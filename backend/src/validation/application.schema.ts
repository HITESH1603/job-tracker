import { z } from "zod";

export const applicationStatuses = [
  "saved",
  "applied",
  "interview",
  "offer",
  "rejected",
  "withdrawn",
] as const;

export const applicationSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  status: z.enum(applicationStatuses),
  location: z.string().nullable().optional(),
  job_url: z.url().nullable().optional(),
  date_applied: z.iso.date().nullable().optional(),
  notes: z.string().nullable().optional(),
});

export const updateApplicationSchema = applicationSchema.partial();
