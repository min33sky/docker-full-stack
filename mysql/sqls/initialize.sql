DROP DATABASE IF EXISTS myapp;

CREATE DATABASE myapp;

use myapp;

CREATE TABLE lists (
    id INTEGER auto_increment,
    value TEXT,
    PRIMARY KEY (id)
)
