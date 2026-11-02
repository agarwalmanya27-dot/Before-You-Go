create database byg;
use byg;
create table users(
     user_id int auto_increment primary key,
     name varchar(100) not null,
     email varchar(100) unique not null,
     password varchar(255) not null,
     created_at timestamp default current_timestamp);
create table destinations(
    dest_id int auto_increment primary key,
    dest_name varchar(50) not null,
    state varchar(50) not null,
    vibe enum('Spiritual','Historical','Adventure','Relaxing','Cultural') not null,
    descrip text,
    img_path varchar(255));
CREATE TABLE place (
    place_id INT AUTO_INCREMENT PRIMARY KEY,
    dest_id INT,
    place_name VARCHAR(100),
    route VARCHAR(5),
    descrip TEXT,
    p_image VARCHAR(2048),

    FOREIGN KEY (dest_id)
    REFERENCES destinations(dest_id)
);