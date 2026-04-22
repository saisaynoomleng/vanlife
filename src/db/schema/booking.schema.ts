import * as t from 'drizzle-orm/pg-core';
import { VanTable } from './van.schema';
import { UserTable } from './user.schema';
import { bookingStatus, timestamp } from './schema-helper';
import { relations, sql } from 'drizzle-orm';

export const BookingTable = t.pgTable(
  'bookings',
  {
    id: t.uuid('id').primaryKey().defaultRandom(),
    vanId: t
      .uuid('van_id')
      .references(() => VanTable.id, { onDelete: 'set null' })
      .notNull(),
    userId: t
      .uuid('user_id')
      .references(() => UserTable.id, { onDelete: 'set null' })
      .notNull(),
    stripeCheckoutSessionId: t.varchar('stripe_checkout_session_id').unique(),
    stripePaymentIntentId: t.varchar('stripe_payment_intent_id').unique(),
    rentStart: t.timestamp('rent_start', { withTimezone: true }).notNull(),
    rentEnd: t.timestamp('rent_end', { withTimezone: true }).notNull(),
    totalInCentsSnapshot: t.integer('total_in_cents_snapshot').notNull(),
    status: bookingStatus('status').notNull().default('pending'),
    ...timestamp,
  },
  (table) => [
    t.check('rent_date_check', sql`${table.rentEnd} > ${table.rentStart}`),
    t.check('total_chcek', sql`${table.totalInCentsSnapshot} > 0`),
    t.index('user_booking_id_idx').on(table.userId, table.id),
  ],
);

export const BookingTableRelations = relations(BookingTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [BookingTable.userId],
    references: [UserTable.id],
  }),
  van: one(VanTable, {
    fields: [BookingTable.vanId],
    references: [VanTable.id],
  }),
}));
