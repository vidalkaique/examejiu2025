import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const registrations = pgTable("registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  birthDate: text("birth_date").notNull(),
  phone: text("phone").notNull(),
  countryCode: text("country_code").notNull().default("+55"),
  email: text("email").notNull(),
  beltColor: text("belt_color").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRegistrationSchema = createInsertSchema(registrations).pick({
  name: true,
  birthDate: true,
  phone: true,
  countryCode: true,
  email: true,
  beltColor: true,
}).extend({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  birthDate: z.string().min(1, "Data de nascimento é obrigatória"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  email: z.string().email("Email inválido"),
  beltColor: z.enum(["branca", "azul", "roxa", "marrom", "preta"], {
    required_error: "Selecione a cor da faixa"
  })
});

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;
