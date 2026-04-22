import * as t from 'drizzle-orm/pg-core';
import { UserTable } from './user.schema';
import { timestamp } from './schema-helper';
import { relations } from 'drizzle-orm';

export const AddressTable = t.pgTable('addresses', {
  id: t.uuid('id').primaryKey().defaultRandom(),
  userId: t
    .uuid('user_id')
    .references(() => UserTable.id, { onDelete: 'cascade' })
    .notNull(),
  address1: t.varchar('address_1', { length: 255 }).notNull(),
  address2: t.varchar('address_2', { length: 255 }),
  city: t.varchar('city', { length: 255 }).notNull(),
  zip: t.varchar('zip', { length: 255 }).notNull(),
  state: t.varchar('state', { length: 255 }).notNull(),
  country: t.varchar('country', { length: 255 }).notNull(),
  ...timestamp,
});

export const AddressTableRelations = relations(AddressTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [AddressTable.userId],
    references: [UserTable.id],
  }),
}));
