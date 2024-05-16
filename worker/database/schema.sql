DROP TABLE IF EXISTS photos;

CREATE TABLE IF NOT EXISTS photos (id SERIAL PRIMARY KEY, user_id number, message_id number, file_id varchar(255));