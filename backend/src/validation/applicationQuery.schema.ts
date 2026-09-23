 import {z} from "zod";
 import { applicationStatuses } from "./application.schema";

 export const applicationQuerySchema =z.object({
       status: z.enum(applicationStatuses).optional()
 });

 export type ApplicationQuery = z.infer<typeof applicationQuerySchema>;

