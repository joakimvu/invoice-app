import {
  pgTable,
  serial,
  timestamp,
  integer,
  text,
  pgEnum,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "open",
  "paid",
  "void",
  "uncollectible",
]);

export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey().notNull(),
  createTimeStamp: timestamp("createTimeStamp").defaultNow().notNull(),
  value: integer("value").notNull(),
  description: text("description"),
  status: statusEnum("status").notNull(),
});
