/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:RPVy1dF3eHWi@ep-plain-meadow-a5jpkpej.us-east-2.aws.neon.tech/AI-Interview?sslmode=require',
    }
  };