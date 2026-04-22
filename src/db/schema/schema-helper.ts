import * as t from 'drizzle-orm/pg-core';

export const timestamp = {
  updatedAt: t
    .timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  createdAt: t
    .timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
};

export const userStatus = t.pgEnum('userStatus', ['admin', 'user']);

export const vanStatus = t.pgEnum('vanStatus', [
  'available',
  'rented',
  'no longer available',
  'draft',
]);

export const reviewStatus = t.pgEnum('reviewStatus', ['active', 'deleted']);

export const bookingStatus = t.pgEnum('bookingStatus', [
  'pending',
  'confirmed',
  'cancelled',
]);

export const vanType = t.pgEnum('vanType', ['simple', 'rugged', 'luxury']);
