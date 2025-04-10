import { json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable("CourseList", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  name: varchar("name").notNull(),
  difficulty: varchar("difficulty").notNull(),
  courseOutput: json("courseOutput").notNull(),
  createdBy: varchar("createdBy"),
  userName: varchar("userName"),
  // category: varchar("category").notNull(),
});
