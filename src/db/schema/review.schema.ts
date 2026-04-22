import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './user.schema';
import { VanTable } from './van.schema';
import { reviewStatus, timestamp } from './schema-helper';
import { relations, sql } from 'drizzle-orm';

export const ReviewTable = t.pgTable(
  'reviews',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'cascade' })
      .notNull(),
    vanId: t
      .uuid('van_id')
      .references(() => VanTable.id, { onDelete: 'cascade' })
      .notNull(),
    title: t.text('title').notNull(),
    body: t.text('body').notNull(),
    rating: t.integer('rating').notNull().default(1),
    imageUrl: t.varchar('image_url'),
    status: reviewStatus('status').notNull().default('active'),
    isDeleted: t.boolean('is_deleted').notNull().default(false),
    ...timestamp,
  },
  (table) => [
    t.uniqueIndex('user_van_review_idx').on(table.userId, table.vanId),
    t.check('rating_check', sql`${table.rating} BETWEEN 1 AND 5`),
  ],
);

export const ReviewTableRelations = relations(ReviewTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [ReviewTable.userId],
    references: [UserTable.id],
  }),
  van: one(VanTable, {
    fields: [ReviewTable.vanId],
    references: [VanTable.id],
  }),
}));
