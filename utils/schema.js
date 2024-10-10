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

export const UserAnswer=pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns').notNull(),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt: varchar('createdAt')
})