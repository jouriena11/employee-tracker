# **12 SQL: Employee Tracker**

## **Project Description**
Employee Tracker is a command-line application that allows users to manage employee data in the following manners:
- create records in the database, including adding an employee, an employee role, and a department (which the role belongs to)
- read records from the database, including viewing a list of departments, roles, and employees unsorted or sorted by a different attributes, such as first name, last name, salary, and manager-in-charge.
- update records in the database, including updating an employee role 
- delete records from the database, including deleting an employee, a role, and a department

## **URLs**
- [Walkthrough Video](https://drive.google.com/file/d/1TX3YbC18DMFhg7uQzBj3wr_7t3DO9lm_/view?usp=sharing)
- [GitHub Repository URL](https://github.com/jouriena11/employee-tracker)

## **Table of Contents**
- <a href="#installation">Installation</a>
- <a href="#technologies-used">Technologies Used</a>
- <a href="#usage">Usage</a>
- <a href="#future-developments">Future Developments</a>

## **Installation**
The following npm packages must be installed to run this application:
- mysql2 v.3.1.2
- inquirer v.8.2.4
- console.table v0.10.0

The installations can be done conveniently by the running the following command line at the root directory: 
```
npm i
```

## **Technologies Used**
- JavaScript / OOP
- Node.js
- MySQL
- Inquirer v8.2.4 (npm package)
- MySQL2 v3.1.2 (npm package)
- console.table v0.10.0 (npm package)

## **Usage**
To run this application, enter the following code in a command-line application
```
node server.js
```
To exit the application, press CTRL+c on the keyboard.
## **Future Developments**

- to extend employee's `update` prompt questions. In other words, instead of separating [update employee data] into different menus (i.e. [update employee role], [update employee first name], [update employee last name], and [update employee manager]), it's better to put them in the same prompt question `update employee data` and have users select what employee data they want to update.

- to make it so that `null` value is used as a default value when a new employee is a manager. Currently, the application requires a user to select a manager that the new employee reports to, and this shouldn't be applicable if the new employee is a manager.

- to include `exit application` menu




