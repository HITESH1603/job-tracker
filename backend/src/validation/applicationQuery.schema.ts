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
       order: z.enum(["asc","desc"]).default("desc")
 });

 export type ApplicationQuery = z.infer<typeof applicationQuerySchema>;

