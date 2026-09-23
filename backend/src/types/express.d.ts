import type { ApplicationQuery } from "../validation/applicationQuery.schema";
export {}

declare global {
    namespace Express{
        interface Request {
            userId ?: number;
            validatedQuery: ApplicationQuery;
        }
    }
}