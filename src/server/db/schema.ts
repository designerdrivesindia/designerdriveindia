import {
  pgTable,
  pgEnum,
  uuid,
  text,
  varchar,
  integer,
  doublePrecision,
  boolean,
  timestamp,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type {
  GalleryImage,
  ItineraryDay,
  SeoMeta,
  BlogPost,
} from "@/types";

/* ------------------------------------------------------------------ */
/*  Enums                                                             */
/* ------------------------------------------------------------------ */

export const countryEnum = pgEnum("country", [
  "India",
  "Nepal",
  "Bhutan",
  "Sri Lanka",
  "Dubai",
  "Thailand",
  "Maldives",
]);

export const carCategoryEnum = pgEnum("car_category", [
  "SUV",
  "Sedan",
  "Hatchback",
  "Luxury",
  "Tempo Traveller",
  "Bus",
]);

export const transmissionEnum = pgEnum("transmission", ["Manual", "Automatic"]);

export const userRoleEnum = pgEnum("user_role", [
  "super_admin",
  "content_manager",
  "sales_manager",
]);

export const inquiryStatusEnum = pgEnum("inquiry_status", [
  "new",
  "contacted",
  "negotiation",
  "converted",
  "closed",
]);

export const inquirySourceEnum = pgEnum("inquiry_source", [
  "package",
  "car",
  "destination",
  "contact",
  "general",
]);

export const blogStatusEnum = pgEnum("blog_status", ["draft", "published"]);

/* ------------------------------------------------------------------ */
/*  Auth: users + refresh tokens                                      */
/* ------------------------------------------------------------------ */

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 120 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    role: userRoleEnum("role").notNull().default("content_manager"),
    avatarUrl: text("avatar_url"),
    isActive: boolean("is_active").notNull().default(true),
    lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("users_email_idx").on(t.email)],
);

export const refreshTokens = pgTable(
  "refresh_tokens",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull(),
    userAgent: text("user_agent"),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("refresh_tokens_user_idx").on(t.userId),
    index("refresh_tokens_hash_idx").on(t.tokenHash),
  ],
);

/* ------------------------------------------------------------------ */
/*  Content: destinations                                             */
/* ------------------------------------------------------------------ */

export const destinations = pgTable(
  "destinations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 160 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    country: countryEnum("country").notNull(),
    region: varchar("region", { length: 200 }).notNull(),
    tagline: text("tagline").notNull(),
    heroImage: text("hero_image").notNull(),
    thumbnail: text("thumbnail").notNull(),
    overview: text("overview").notNull(),
    bestTimeToVisit: text("best_time_to_visit").notNull(),
    seasons: text("seasons").array().notNull().default([]),
    tripTypes: text("trip_types").array().notNull().default([]),
    attractions: jsonb("attractions")
      .$type<{ title: string; description: string }[]>()
      .notNull()
      .default([]),
    travelTips: jsonb("travel_tips").$type<string[]>().notNull().default([]),
    gallery: jsonb("gallery").$type<GalleryImage[]>().notNull().default([]),
    featured: boolean("featured").notNull().default(false),
    seo: jsonb("seo").$type<SeoMeta | null>(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("destinations_slug_idx").on(t.slug),
    index("destinations_country_idx").on(t.country),
    index("destinations_featured_idx").on(t.featured),
  ],
);

/* ------------------------------------------------------------------ */
/*  Content: packages                                                 */
/* ------------------------------------------------------------------ */

export const packages = pgTable(
  "packages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 180 }).notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    country: countryEnum("country").notNull(),
    state: varchar("state", { length: 160 }).notNull(),
    destinationSlugs: text("destination_slugs").array().notNull().default([]),
    durationDays: integer("duration_days").notNull(),
    durationNights: integer("duration_nights").notNull(),
    startingPrice: integer("starting_price").notNull(),
    tripTypes: text("trip_types").array().notNull().default([]),
    summary: text("summary").notNull(),
    heroImage: text("hero_image").notNull(),
    thumbnail: text("thumbnail").notNull(),
    gallery: jsonb("gallery").$type<GalleryImage[]>().notNull().default([]),
    overview: text("overview").notNull(),
    highlights: jsonb("highlights").$type<string[]>().notNull().default([]),
    itinerary: jsonb("itinerary").$type<ItineraryDay[]>().notNull().default([]),
    inclusions: jsonb("inclusions").$type<string[]>().notNull().default([]),
    exclusions: jsonb("exclusions").$type<string[]>().notNull().default([]),
    hotels: jsonb("hotels")
      .$type<{ city: string; name: string; category: string }[]>()
      .notNull()
      .default([]),
    transport: text("transport").notNull(),
    faqs: jsonb("faqs")
      .$type<{ question: string; answer: string }[]>()
      .notNull()
      .default([]),
    rating: doublePrecision("rating").notNull().default(0),
    reviewCount: integer("review_count").notNull().default(0),
    featured: boolean("featured").notNull().default(false),
    popularity: integer("popularity").notNull().default(0),
    seo: jsonb("seo").$type<SeoMeta | null>(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("packages_slug_idx").on(t.slug),
    index("packages_country_idx").on(t.country),
    index("packages_featured_idx").on(t.featured),
    index("packages_price_idx").on(t.startingPrice),
    index("packages_popularity_idx").on(t.popularity),
  ],
);

/* ------------------------------------------------------------------ */
/*  Content: cars                                                     */
/* ------------------------------------------------------------------ */

export const cars = pgTable(
  "cars",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 160 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    category: carCategoryEnum("category").notNull(),
    thumbnail: text("thumbnail").notNull(),
    gallery: jsonb("gallery").$type<GalleryImage[]>().notNull().default([]),
    seats: integer("seats").notNull(),
    luggage: integer("luggage").notNull(),
    ac: boolean("ac").notNull().default(true),
    transmission: transmissionEnum("transmission").notNull(),
    pricePerDay: integer("price_per_day").notNull(),
    pricePerKm: integer("price_per_km").notNull(),
    cities: text("cities").array().notNull().default([]),
    features: jsonb("features").$type<string[]>().notNull().default([]),
    description: text("description").notNull(),
    driverInfo: text("driver_info").notNull(),
    featured: boolean("featured").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("cars_slug_idx").on(t.slug),
    index("cars_category_idx").on(t.category),
    index("cars_featured_idx").on(t.featured),
  ],
);

/* ------------------------------------------------------------------ */
/*  Content: blog posts                                               */
/* ------------------------------------------------------------------ */

export const blogPosts = pgTable(
  "blog_posts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: varchar("slug", { length: 200 }).notNull(),
    title: varchar("title", { length: 240 }).notNull(),
    excerpt: text("excerpt").notNull(),
    coverImage: text("cover_image").notNull(),
    category: varchar("category", { length: 120 }).notNull(),
    tags: text("tags").array().notNull().default([]),
    author: jsonb("author")
      .$type<BlogPost["author"]>()
      .notNull(),
    content: jsonb("content")
      .$type<{ heading: string; body: string }[]>()
      .notNull()
      .default([]),
    readMinutes: integer("read_minutes").notNull().default(1),
    status: blogStatusEnum("status").notNull().default("published"),
    featured: boolean("featured").notNull().default(false),
    seo: jsonb("seo").$type<SeoMeta | null>(),
    publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("blog_posts_slug_idx").on(t.slug),
    index("blog_posts_status_idx").on(t.status),
    index("blog_posts_category_idx").on(t.category),
    index("blog_posts_published_idx").on(t.publishedAt),
  ],
);

/* ------------------------------------------------------------------ */
/*  CRM: inquiries + notes                                            */
/* ------------------------------------------------------------------ */

export const inquiries = pgTable(
  "inquiries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    fullName: varchar("full_name", { length: 120 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 40 }).notNull(),
    whatsapp: varchar("whatsapp", { length: 40 }),
    destination: varchar("destination", { length: 160 }),
    travelDate: varchar("travel_date", { length: 40 }),
    travelers: integer("travelers"),
    budget: varchar("budget", { length: 80 }),
    message: text("message"),
    source: inquirySourceEnum("source").notNull().default("general"),
    referenceId: varchar("reference_id", { length: 80 }),
    referenceTitle: varchar("reference_title", { length: 240 }),
    status: inquiryStatusEnum("status").notNull().default("new"),
    assignedToId: uuid("assigned_to_id").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("inquiries_status_idx").on(t.status),
    index("inquiries_source_idx").on(t.source),
    index("inquiries_created_idx").on(t.createdAt),
    index("inquiries_assigned_idx").on(t.assignedToId),
  ],
);

export const inquiryNotes = pgTable(
  "inquiry_notes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    inquiryId: uuid("inquiry_id")
      .notNull()
      .references(() => inquiries.id, { onDelete: "cascade" }),
    authorId: uuid("author_id").references(() => users.id, {
      onDelete: "set null",
    }),
    body: text("body").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("inquiry_notes_inquiry_idx").on(t.inquiryId)],
);

/* ------------------------------------------------------------------ */
/*  Media library + settings                                         */
/* ------------------------------------------------------------------ */

export const media = pgTable(
  "media",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    url: text("url").notNull(),
    key: text("key").notNull(), // S3 object key
    folder: varchar("folder", { length: 160 }).notNull().default("uploads"),
    filename: varchar("filename", { length: 255 }).notNull(),
    mimeType: varchar("mime_type", { length: 120 }).notNull(),
    width: integer("width"),
    height: integer("height"),
    sizeBytes: integer("size_bytes"),
    alt: varchar("alt", { length: 255 }),
    uploadedById: uuid("uploaded_by_id").references(() => users.id, {
      onDelete: "set null",
    }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("media_folder_idx").on(t.folder)],
);

export const settings = pgTable("settings", {
  key: varchar("key", { length: 120 }).primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/* ------------------------------------------------------------------ */
/*  Relations                                                         */
/* ------------------------------------------------------------------ */

export const usersRelations = relations(users, ({ many }) => ({
  refreshTokens: many(refreshTokens),
  assignedInquiries: many(inquiries),
  notes: many(inquiryNotes),
}));

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(users, { fields: [refreshTokens.userId], references: [users.id] }),
}));

export const inquiriesRelations = relations(inquiries, ({ one, many }) => ({
  assignedTo: one(users, {
    fields: [inquiries.assignedToId],
    references: [users.id],
  }),
  notes: many(inquiryNotes),
}));

export const inquiryNotesRelations = relations(inquiryNotes, ({ one }) => ({
  inquiry: one(inquiries, {
    fields: [inquiryNotes.inquiryId],
    references: [inquiries.id],
  }),
  author: one(users, {
    fields: [inquiryNotes.authorId],
    references: [users.id],
  }),
}));

/* ------------------------------------------------------------------ */
/*  Inferred types                                                    */
/* ------------------------------------------------------------------ */

export type UserRow = typeof users.$inferSelect;
export type NewUserRow = typeof users.$inferInsert;
export type DestinationRow = typeof destinations.$inferSelect;
export type PackageRow = typeof packages.$inferSelect;
export type CarRow = typeof cars.$inferSelect;
export type BlogPostRow = typeof blogPosts.$inferSelect;
export type InquiryRow = typeof inquiries.$inferSelect;
export type NewInquiryRow = typeof inquiries.$inferInsert;
export type InquiryNoteRow = typeof inquiryNotes.$inferSelect;
export type MediaRow = typeof media.$inferSelect;
