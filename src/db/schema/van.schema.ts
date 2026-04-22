import * as t from 'drizzle-orm/pg-core';
import { vanStatus, vanType } from './schema-helper';
import { timestamp } from './schema-helper';
import { relations, sql } from 'drizzle-orm';
import { ReviewTable } from './review.schema';
import { BookingTable } from './booking.schema';

export const VanTable = t.pgTable(
  'vans',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    name: t.varchar('name', { length: 255 }).notNull(),
    type: vanType('type').notNull().default('simple'),
    rentPerDayInCents: t.integer('rent_per_day_in_cents').notNull(),
    body: t.text('body').notNull(),
    imageUrl: t.varchar('image_url', { length: 255 }).notNull(),
    status: vanStatus('status').notNull().default('draft'),
    isDeleted: t.boolean('is_deleted').notNull().default(false),
    ...timestamp,
  },
  (table) => [t.check('rent_check', sql`${table.rentPerDayInCents} > 0`)],
);

export const VanTableRelations = relations(VanTable, ({ one, many }) => ({
  reviews: many(ReviewTable),
  bookings: many(BookingTable),
}));
