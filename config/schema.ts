import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    clerkId: varchar({ length: 255 }).notNull().unique(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    imageUrl: varchar({ length: 255 }),
    headline: varchar({ length: 255 }), // A short, impactful headline or tagline (e.g., "Full-Stack Developer | React & Node.js Enthusiast")
    bio: text("bio"), // A longer description of the user's professional background, skills, and aspirations.
    location: varchar({ length: 255 }),
    resumeUrl: text("resumeUrl"),
    linkedinUrl: text("linkedinUrl"),
    githubUrl: text("githubUrl"),
    portfolioUrl: text("portfolioUrl"),
    role: varchar({ length: 255 }), // employee, employer, admin
    subscriptionId: varchar({ length: 255 }),
    createdAt: timestamp("createdAt", { withTimezone: true })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }),
  },
  (table) => ({
    clerkIdIdx: uniqueIndex("clerkId_idx").on(table.clerkId),
    emailIdx: uniqueIndex("email_idx").on(table.email),
    headline: index("headline_idx").on(table.headline),
    roleIdx: index("role_idx").on(table.role),
    createdAtIdx: index("createdAt_idx").on(table.createdAt),
  })
);
