create database byg;
use byg;
create table users(
     user_id int auto_increment primary key,
     name varchar(100) not null,
     email varchar(100) unique not null,
     password varchar(255) not null,
     created_at timestamp default current_timestamp);