import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

// Initialize lazily so module import never throws at build time.
// DATABASE_URL must be set at runtime on Railway.
const DATABASE_URL = process.env["DATABASE_URL"] ?? "";

export const db = drizzle(DATABASE_URL, { schema });
export * from "./schema";
