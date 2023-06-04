import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  connectionString: "mysql://@127.0.0.1/twitter",
} satisfies Config;