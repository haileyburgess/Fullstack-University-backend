DROP TABLE IF EXISTS faculty_department;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS faculty;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL,
  email text NOT NULL,
  password text NOT NULL,
  UNIQUE (username),
  UNIQUE (email)
);

CREATE TABLE departments (
    id serial PRIMARY KEY,
    name text NOT NULL,
    description text NOT NULL,
    banner_image text NOT NULL,
    phone text,
    email text,
    location text
);

CREATE TABLE faculty (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    bio text NOT NULL,
    profile_image text NOT NULL,
    title text,
    phone text,
    office text,
    education text,
    publications integer DEFAULT 0,
    awards text[],
    research_areas text[]
);

CREATE TABLE faculty_departments (
    id serial PRIMARY KEY,
    faculty_id integer NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
    department_id integer NOT NULL REFERENCES departments(id) ON DELETE CASCADE
);