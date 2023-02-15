const mysql = require('mysql2/promise');
const inquirer = require('inquirer');
const cTable = require('console.table');
const dbCredentials = require('./config/configuration');

const Employee = require('./lib/employee');
const mockEmployee = new Employee('','','','','');
const Role = require('./lib/role');
const mockRole = new Role('','','','','');
const Department = require('./lib/department');
const mockDepartment = new Department('', '');

const loopQuestion = {
    type: "list",
    message: "What would you like to do?",
    name: "loopQuestion",
    choices: [
        "View All Departments", // completed
        "View All Roles", // completed
        "View All Employees", // completed
        "Add a Department", // completed
        "Add a Role", // completed
        "Add an Employee", // completed
        "Update an Employee Role", 
        "Update an Employee's Department",
        "Update an Employee's Manager",
        "Delete a Role", // completed
        "Delete a Department", // completed
        "Delete an Employee", // completed
        "View Employees by Department", 
        "View employees by Manager",         
        "View Total Utilized Budget of a Department"
    ]
}

async function connectMYSQL() {
    return await mysql.createConnection(dbCredentials);
}

async function promptLoopQuestion() {
    const db = await connectMYSQL()
    while(true) {
        const response = await inquirer.prompt(loopQuestion);

        if(response.loopQuestion === "View All Employees") {

            try {
                // Note: the commented-out codes below is an alternative table output
                // const sql = `SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.salary AS Salary, role.title AS Job_Title, department.name AS Department, m.first_name AS Manager_First_Name, m.last_name AS Manager_Last_Name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee m ON employee.manager_id = m.id`;
                const sql = `SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.salary AS Salary, role.title AS Job_Title, department.name AS Department, CONCAT_WS(" ", m.first_name, m.last_name) AS Manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee m ON employee.manager_id = m.id`;
                const [rows, fields] = await db.execute(sql); // reference to the library's documentation on Using Promise Wrapper
                console.table(rows)
            } 
            
            catch(error) {
                console.error("View All Employees (ERROR) => ", error);
            }
        }

        else if(response.loopQuestion === "View All Roles") {

            try {
                const sql = `SELECT role.id AS ID, role.title AS Job_Title, department.name AS Department, role.salary AS Salary FROM role INNER JOIN department ON role.department_id = department.id`;
                const [rows, fields] = await db.execute(sql);
                console.table(rows);
            } 
            
            catch(error) {
                console.error("View All Roles (ERROR) => ", error)
            }
        }

        else if(response.loopQuestion === "View All Departments") {
            
            try {
                const sql = `SELECT department.id AS ID, department.name AS Department FROM department`;
                const [rows, fields] = await db.execute(sql);
                console.table(rows);
            } 
            
            catch(error) {
                console.error("View All Departments (ERROR) => ", error);
            }
        }
        
        else if(response.loopQuestion === "Delete a Department") {
            
            try {
                const [departmentList] = await db.execute(`SELECT * FROM department`);
                const refineDepartmentList = departmentList.map(row => `${row.name} (ID:${row.id})`); // returns an array of department names

                const delDeptQuestion = {
                    type: "list",
                    message: "Which department do you want to delete?",
                    name: "deptToDelete",
                    choices: refineDepartmentList
                }

                const delDeptData = await inquirer.prompt(delDeptQuestion);
                const delArray = delDeptData.deptToDelete.replace(")","").split(" (ID:");
                const deleteId = delArray[delArray.length - 1];
                const sql = `DELETE FROM department WHERE id = ?`; // Note: better use `id` instead of `name` as there could be a name duplicate
                const [result] = await db.query(sql, [deleteId]);
                console.log(`"${delArray[0]}" has successfully been deleted from the department table.`);
            } 
            
            catch(error) {
                console.error(error);
            }
        }

        else if(response.loopQuestion === "Delete a Role") {
            
            try {
                const [roleList] = await db.execute(`SELECT * FROM role`);
                const refineRoleList = roleList.map((row) => `${row.title} (ID:${row.id})`)
                
                const delRoleQuestion = {
                    type: "list",
                    message: "Which role do you want to delete?",
                    name: "roleToDelete",
                    choices: refineRoleList
                }

                const delRoleData = await inquirer.prompt(delRoleQuestion);
                const delArray = delRoleData.roleToDelete.replace(")","").split(" (ID:");
                const delRoleId = delArray[delArray.length - 1];
                const sql = `DELETE FROM role WHERE id = ?`
                const [result] = await db.query(sql, [delRoleId]);
                console.log(`"${delArray[0]}" has successfully been deleted from the role table.`)
            }

            catch(error) {
                console.error("Delete a Role (ERROR) => ", error);
            }
        }

        else if(response.loopQuestion === "Delete an Employee") {
            
            try {
                const [employeeList] = await db.execute(`SELECT * FROM employee`)
                console.log(employeeList);
                const refineEmployeeList = employeeList.map((row) => `${row.first_name} ${row.last_name} (ID:${row.id})`)
                
                const delEmployeeQuestion = {
                    type: "list",
                    message: "Which employee do you want to delete?",
                    name: "delEmployee",
                    choices: refineEmployeeList
                }

                const delEmployeeData = await inquirer.prompt(delEmployeeQuestion);
                const delArray = delEmployeeData.delEmployee.replace(")","").split(" (ID:");
                const delEmployeeId = delArray[delArray.length -1];
                const sql = `DELETE FROM employee WHERE id = ?`;
                const [result] = await db.query(sql,[delEmployeeId]);
                console.log(`"${delArray[0]}" has successfully been deleted from the employee table."`)
            }

            catch(error) {
                console.error("Delete an Employee (ERROR) => ", error);
            }
        }

        else if(response.loopQuestion == "Add a Department") {
            
            try {
                const deptQuestions = mockDepartment.getQuestions();
                const deptData = await inquirer.prompt(deptQuestions);
                const department = new Department(-1, deptData.deptName); // -1 is a dummy id value
                const departmentName = department.getDepartment(); // call function
                const sql = `INSERT INTO department (name) VALUES ("${departmentName}")`; // because id value is not passed, auto_increment would be executed
                const [result] = await db.query(sql);
                console.log(`Added a new department to the database.`);
            } 
            
            catch(error) {
                console.error("Add a Department (ERROR) => ", error);
            }
        }

        else if(response.loopQuestion === "Add a Role") {

            try {
                const roleQuestions = await mockRole.getQuestions();
                const roleData = await inquirer.prompt(roleQuestions);
                const arr = roleData.roleDepartment.replace(")","").split(" (ID:");
                const role = new Role(-1, roleData.roleName, roleData.salary, arr[1], arr[0]);
                const [result] = await db.query(`INSERT INTO role (title, department_id, salary) VALUES (?, ?, ?)`, [role.roleName, role.dept.id, roleData.salary]);
                console.log(`${role.roleName} role has been added to the database.`);
            } 
            
            catch(error) {
                console.error("Add a Role (ERROR) => ",error);
            } 
        }

        else if(response.loopQuestion === "Add an Employee") {
            
            try {
                const employeeQuestions = await mockEmployee.getQuestions();
                const employeeData = await inquirer.prompt(employeeQuestions);
                const {firstName, lastName, employeeRole, manager} = employeeData;
                const roleData = employeeRole.replace(")","").split(" (ID:");
                const managerData = manager.replace(")","").split(" (ID:");
                
                const newRole = new Role(roleData[1], roleData[0], -1, -1, ''); // dummy value is used in parameter 3,4,5 so that the codes can run. Actual data is retrieved from MySQL database, so the dummy values here have no impact on the actual data.
                const newEmployee = new Employee(-1, firstName, lastName, newRole, managerData[1]);
                console.log(newEmployee)
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${newEmployee.getFirstName()}", "${newEmployee.getLastName()}", ${newEmployee.role.roleID}, ${newEmployee.managerID})`;
                
                const [rows] = await db.execute(sql);
                console.log(`Added a new employee to the database.`);
            } 
            
            catch(error) {
                console.error("Add an Employee => ", error);
            };
        }

        else if(response.loopQuestion === "Update an Employee Role") {

            

            db.query(`UPDATE role SET name = "" where id = ?`)
        }

        // else if(response.loopQuestion == "View Employees by Department") {
        //     const employeeByDeptData = await inquirer.prompt(employeeByDeptQuestion);

        //     employeeByDeptData();
        //     // const sql = `SELECT * FROM employee JOIN department ON employee.department_id = department.id`
            
        // }

    }
}

init();

function init() {
    promptLoopQuestion();
}