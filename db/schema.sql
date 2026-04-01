-- Drop tables if they exist (for development)
DROP TABLE IF EXISTS faculty;
DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Create departments table
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  banner_image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create faculty table
CREATE TABLE faculty (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  bio TEXT,
  email VARCHAR(255) NOT NULL UNIQUE,
  profile_image_url VARCHAR(500),
  department_id INTEGER NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for faster queries
CREATE INDEX idx_faculty_department_id ON faculty(department_id);