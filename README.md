# EmployeeTracker
# Unit 12 MySQL Homework: Employee Tracker

Developers are often tasked with creating interfaces that make it easy for non-developers to view and interact with information stored in databases. Often these interfaces are known as **C**ontent **M**anagement **S**ystems. In this homework assignment, your challenge is to architect and build a solution for managing a company's employees using node, inquirer, and MySQL.

## Instructions

Design the following database schema containing three tables:

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manager of the current employee. This field may be null if the employee has no manager
  
Build a command-line application that allows the user to:

  * Add departments, roles, employees
  * View departments, roles, employees
  * Delete departments, roles, and employees
  * Update employee roles

We can frame this challenge as follows:

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

This project will track all of my employees using a MySql database.  

Please make sure to install the following npm packages:  mysql, inquirer and console.table before executing.

To start the program the user will enter the following at the command prompt:

node server.js

Once the user has enter the above command the user will be prompted as follows:  

What would you like to do?

The user will be given the following options to choose from by using the arrow keys and hitting enter for the option they want:

View All Departments - will display all of the departments in the database.
View All Roles - will display all of the roles for all departments in the database.
View All Employees - will display all employees in the database.
Add Departments - will add a new department to the database.
Add Roles - will add a new role into a specific department.
Add Employees - will add a new employee based on department, role and manager.
Update Employee Role - will update the role for an employee based on the department that the user selects.
Delete A Department - will delete a department from the database.
Delete A Role - will delete a role within a specific department.
Delete An Employee - will delete an employee from the database. 
Exit - will exit the system.  

If the user chooses View All Departments, all department will be displayed to the user and they will return to the main menu options.  

If the user chooses View All Roles, all roles will be displayed to the user and they will return to the main menu options.

If the user chooses View All Employees, all employees will be displayed to the user and they will return to the main menu options.

If the user chooses Add Departments, they will be asked what department they would like to add.  A message will displayed to the user indicating that the department has been added to the database. 

If the user chooses Add Roles, they will be asked what department, what role and the salary for the role they would like to add.  A message will displayed to the user indicating that the role has been added to the database along with the salary and the department that the role was added to. 

If the user chooses Add Employees, they will be asked what department they want to add the employee to.  They will next be prompted for what role they would like assign to the employee followed by what manager they will be assigned to.  Next they will be prompted for the first and last name of the employee to be added.  e they would like to add.  A message will displayed to the user indicating that the employee has been added to the database along with the department and role.  PLEASE NOTE:  The user will be given the option to not assign a role and/or a manager to the employee that they are attempting to add. 

If the user chooses Update Employee Role, they will be prompted for the employee that they wish to update.  Once the user has chosen an employee, they will be prompted to select a department to update.  The user can either change the department or choose the same department they are currently in.  The user will be prompted for the manager they will report to and the role they are filling.  A message will be displayed to the user stating what has been updated in the database.  PLEASE NOTE:  The user can also select None for either or one of these options.  If None is selected for both the manager and role, NO update will take place and a message will be displayed to the user stating that no update has happened.  

If the user chooses Delete A Department, they will be prompted to choose the department they wish to delete.  A message will be displayed to the user stating that the department has been deleted from the database.  

If the user chooses Delete A Role, they will be prompted for the department first followed by the roles for that department.  They can select from the list of roles for the department that they have chosen.  A message will be displayed to the user stating what department and the role that was deleted from the database. 

If the user chooses Delete An Employee, the user will be given a list of all employees and once the choice has been made, the employee will deleted from database.  

## Submission on BCS

You are required to submit the following:

* The URL of the GitHub repository
* A video demonstrating the entirety of the app's functionality 