USE empTrackDB;

#Department Data

INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Quality Assurance");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Customer Support");
INSERT INTO department (name) VALUES ("Training");
INSERT INTO department (name) VALUES ("Human Resources");
INSERT INTO department (name) VALUES ("Professional Services");

#Role Data

INSERT INTO role (title, salary, department_id) VALUES ("Senior Software Engineer", 60000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Software Tester", 60000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Software Team Lead", 75000.50, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Software Engineer", 55000.23, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Software Tester", 50000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Software Architect", 100000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Software Architect", 75000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Engineering Manager", 125000.00, 1);

INSERT INTO role (title, salary, department_id) VALUES ("Senior Salesperson", 90000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Salesperson", 50000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Team Lead", 90000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Manager", 100000.00, 2);

INSERT INTO role (title, salary, department_id) VALUES ("Senior Software Tester", 90000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Software Tester", 50000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Testing Team Lead", 90000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Testing Verifier", 80000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Testing Verifier", 50000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Testing Manager", 100000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Documentation Specialist", 85000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Automation Tester", 50000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Automation Tester", 50000.00, 3);

INSERT INTO role (title, salary, department_id) VALUES ("Senior Support Person", 90000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Support Person", 50000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Support Team Lead", 90000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Support Manager", 80000.00, 4);

INSERT INTO role (title, salary, department_id) VALUES ("Senior Instructor", 75000.00, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Instructor", 50000.00, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Online Instructor", 90000.00, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Online Instructor", 50000.00, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Training Team Lead", 80000.00, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Training Manager", 100000.00, 5);

INSERT INTO role (title, salary, department_id) VALUES ("Senior HR Person", 90000.00, 6);
INSERT INTO role (title, salary, department_id) VALUES ("Junior HR Person", 50000.00, 6);
INSERT INTO role (title, salary, department_id) VALUES ("HR Manager", 100000.00, 6);

INSERT INTO role (title, salary, department_id) VALUES ("Senior Implementation Engineer", 75000.00, 7);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Implementation Engineer", 50000.00, 7);
INSERT INTO role (title, salary, department_id) VALUES ("Senior Accountant", 90000.00, 7);
INSERT INTO role (title, salary, department_id) VALUES ("Junior Accountant", 50000.00, 7);
INSERT INTO role (title, salary, department_id) VALUES ("PS Team Lead", 80000.00, 7);
INSERT INTO role (title, salary, department_id) VALUES ("PS Manager", 100000.00, 7);

#Department Managers

INSERT INTO employee(first_name, last_name, role_id) VALUES ("Mary", "Brosius", 40);
INSERT INTO employee(first_name, last_name, role_id) VALUES ("Samantha", "Stevenson", 34);
INSERT INTO employee(first_name, last_name, role_id) VALUES ("Matthew", "Smith", 25);
INSERT INTO employee(first_name, last_name, role_id) VALUES ("Lisa", "Smith", 8);
INSERT INTO employee(first_name, last_name, role_id) VALUES ("Leroy", "Jones", 12);
INSERT INTO employee(first_name, last_name, role_id) VALUES ("Noah", "Jackson", 18);
INSERT INTO employee(first_name, last_name, role_id) VALUES ("Noah", "Jackson", 31);

