DROP TABLE IF EXISTS faculty_department;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS faculty;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL,
  password text NOT NULL,
  UNIQUE (username)
);

CREATE TABLE departments (
    id serial PRIMARY KEY,
    name text NOT NULL,
    description text NOT NULL,
    banner_image text NOT NULL
);

CREATE TABLE faculty (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    bio text NOT NULL,
    profile_image text NOT NULL,
    department_id integer NOT NULL REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE faculty_departments (
    id serial PRIMARY KEY,
    faculty_id integer NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
    department_id integer NOT NULL REFERENCES departments(id) ON DELETE CASCADE
);