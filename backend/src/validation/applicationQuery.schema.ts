 import {z} from "zod";
 import { applicationStatuses } from "./application.schema";

 export const applicationQuerySchema =z.object({
       status: z.enum(applicationStatuses).optional(),
       search: z.string().trim().min(1).optional(),
       sortBy: z.enum([
            "company",
            "role",
            "created_at",
            "updated_at",
            "status",
            "date_applied"
       ]).default("created_at"),
       order: z.enum(["asc","desc"]).default("desc"),
       page: z.coerce.number().int().min(1).default(1),
       limit: z.coerce.number().int().min(1).max(100).default(10)
 });

 export type ApplicationQuery = z.infer<typeof applicationQuerySchema>;

