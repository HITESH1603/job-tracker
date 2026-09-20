import {z} from "zod";

export const applicationSchema = z.object({
    company: z.string().min(1),
    role: z.string().min(1),
    status: z.enum([
        "saved",
        "applied",
        "interview",
        "offer",
        "rejected",
         "withdrawn"
    ]),
    location: z.string().optional(),
    job_url: z.url().optional(),
    date_applied: z.iso.date().optional(),
    notes: z.string().optional()
});

export const updateApplicationSchema = applicationSchema.partial();