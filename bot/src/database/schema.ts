import { sqliteTable, integer, text, unique } from 'drizzle-orm/sqlite-core';

export const photos = sqliteTable(
	'photos',
	{
		id: integer('id').primaryKey({ autoIncrement: true }),
		user_id: integer('user_id').notNull(),
		message_id: integer('message_id').notNull(),
		file_id: text('file_id').notNull(),
	},
	(t) => ({
		unq: unique().on(t.user_id, t.message_id),
	})
);
