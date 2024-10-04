import { primaryKey, serial, varchar, text } from "drizzle-orm/pg-core"; // Correct import
import { pgTable } from "drizzle-orm/pg-core"; 

export const MockInterview = pgTable('mockInterview', {
    // Creating column name in our database
    id: serial('id').primaryKey(),
    jsonMockResp: text('jsonMoResponse').notNull(), //text to store long text
    jobPosition: varchar('jobPosition').notNull(),
    jobDesc: varchar('jobDesc').notNull(),
    jobExperience: varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt: varchar('createdAt'),
    mockId: varchar('mockId').notNull()
});
