USE employee_trackerDB;

-- Add Department Names
INSERT INTO department (name)
VALUES ("Support");
INSERT INTO department (name)
VALUES ("Clerical");
INSERT INTO department (name)
VALUES ("Legal");
INSERT INTO department (name)
VALUES ("Marketing");
INSERT INTO department (name)
VALUES ("Engineering");
INSERT INTO department (name)
VALUES ("Finance");
INSERT INTO department (name)
VALUES ("Sales");

-- Support Roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Customer Service Support", 50000, 1);
INSERT INTO roles (title, salary, department_id)
VALUES ("Sr Support Team Lead", 90000, 1);

-- Clerical Roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Assistant Secretary", 40000, 2);
INSERT INTO roles (title, salary, department_id)
VALUES ("Office Manager", 80000, 2);

-- Legal Roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Jr Lawyer", 95000, 3);
INSERT INTO roles (title, salary, department_id)
VALUES ("Legal Team Lead", 150000, 3);

-- Marketing Roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Jr Marketing Associate", 36000, 4);
INSERT INTO roles (title, salary, department_id)
VALUES ("Marketing Team Lead", 100000, 4);

-- Engineering Roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer Intern", 40000, 5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Jr Software Engineer", 90000, 5);
INSERT INTO roles (title, salary, department_id)
VALUES ("Sr. Software Engineer", 200000, 5);

-- Finance Roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 60000, 6);
INSERT INTO roles (title, salary, department_id)
VALUES ("Head Accountant", 120000, 6);

-- Sales Roles
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Associate", 30000, 7);
INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 80000, 7);

-- Adding Fake employees to employee table
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Lamar", "Jackson", 1, "Russell Wilson");
INSERT INTO employee (first_name, last_name, role_id, manager_name, manager_id)
VALUES ("Aaron", "Donald", 3, "N/A", 2);
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Patrick", "Mahomes", 5, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Michael", "Thomas", 6, "Sean Payton");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("George", "Kittle", 7, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Deandre", "Hopkins", 9, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Julio", "Jones", 10, "Arthur Smith");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Tom", "Brady", 11, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name)
VALUES ("Tyreek", "Hill", 13, "N/A");
INSERT INTO employee (first_name, last_name, role_id, manager_name, manager_id)
VALUES ("Matt", "Ryan", 15, "N/A", 5);