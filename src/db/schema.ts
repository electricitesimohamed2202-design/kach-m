import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

export const clients = pgTable("clients", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  businessName: text("business_name").notNull(),
  tagline: text("tagline"),
  description: text("description"),
  logoUrl: text("logo_url"),
  coverUrl: text("cover_url"),
  phone: text("phone"),
  whatsapp: text("whatsapp"),
  email: text("email"),
  website: text("website"),
  facebook: text("facebook"),
  instagram: text("instagram"),
  tiktok: text("tiktok"),
  youtube: text("youtube"),
  telegram: text("telegram"),
  mapsUrl: text("maps_url"),
  address: text("address"),
  businessHours: text("business_hours"),
  pdfUrl: text("pdf_url"),
  gallery: jsonb("gallery").notNull().default([]),
  ownerId: uuid("owner_id"),
  category: text("category"),
  theme: text("theme").notNull().default("obsidian"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const qrScans = pgTable("qr_scans", {
  id: uuid("id").primaryKey().defaultRandom(),
  clientId: uuid("client_id")
    .references(() => clients.id, { onDelete: "cascade" })
    .notNull(),
  userAgent: text("user_agent"),
  referrer: text("referrer"),
  scannedAt: timestamp("scanned_at", { withTimezone: true }).notNull().defaultNow(),
});

export const userRoles = pgTable("user_roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull(),
  role: text("role").notNull(), // 'admin' | 'user'
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
