import * as t from 'drizzle-orm/pg-core';
import { timestamp, userStatus } from './schema-helper';
import { relations } from 'drizzle-orm';
import { AddressTable } from './address.schema';
import { BookingTable } from './booking.schema';
import { ReviewTable } from './review.schema';

export const UserTable = t.pgTable(
  'users',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    clerkUserId: t.varchar('clerk_user_id', { length: 255 }).notNull().unique(),
    email: t.varchar('email', { length: 255 }).notNull(),
    firstName: t.varchar('first_name', { length: 255 }).notNull(),
    lastName: t.varchar('last_name', { length: 255 }).notNull(),
    status: userStatus('status').notNull().default('user'),
    imageUrl: t.varchar('image_url', { length: 255 }).notNull(),
    isActive: t.boolean('is_active').notNull().default(true),
    ...timestamp,
  },
  (table) => [
    t.uniqueIndex('user_clerk_id_idx').on(table.id, table.clerkUserId),
  ],
);

export const UserRelations = relations(UserTable, ({ one, many }) => ({
  address: one(AddressTable),
  bookings: many(BookingTable),
  reviews: many(ReviewTable),
}));
