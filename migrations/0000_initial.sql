CREATE TABLE `photos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer NOT NULL,
	`message_id` integer NOT NULL,
	`file_id` text NOT NULL
);
