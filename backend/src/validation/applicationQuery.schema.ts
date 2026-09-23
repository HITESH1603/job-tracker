 import {z} from "zod";
 import { applicationStatuses } from "./application.schema";

 export const applicationQuerySchema =z.object({
       status: z.enum(applicationStatuses).optional(),
       search: z.string().trim().min(1).optional()
 });

 export type ApplicationQuery = z.infer<typeof applicationQuerySchema>;

