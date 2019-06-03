create table users (
  id serial primary key,
  user_name varchar(30),
  email varchar(255),
  photo_url varchar(255),
  password text
);