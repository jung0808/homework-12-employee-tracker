-- DROPS DB (normal start)
DROP DATABASE IF EXISTS employee_trackerDB;

-- Creates new datbase employee-trackerDB
CREATE DATABASE employee_trackerDB;

-- Uses the newly created DB
USE employee_trackerDB;

-- Create tables for department,roles, and employee
CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INTEGER NOT NULL AUTO_INCREMENT,
    title VARCHAR(50),
    salary DECIMAL (11,2),
    department_id INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_name VARCHAR(50),
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES roles (id) ON DELETE CASCADE
);
