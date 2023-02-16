const dbCredentials = require('../config/configuration');
const mysql = require('mysql2/promise');

class Employee {
    constructor(employeeID, firstName, lastName, role, managerID) {
        this.employeeID = employeeID
        this.firstName = firstName
        this.lastName = lastName;
        this.role = role;
        this.managerID = managerID;
    };

    getFirstName() {
        return this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1).toLowerCase();
    };

    getLastName() {
        return this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1).toLowerCase();
    };

    async getQuestions() {
        const db = await mysql.createConnection(dbCredentials);
        const roleSQL = `select * from role`;
        const [rowsRole] = await db.execute(roleSQL);
        const roleList = rowsRole.map((row) => `${row.title} (ID:${row.id})`)
        const employeeSQL = `select * from employee where manager_id is null`; // `manager_id is null` means the employee is a manager
        const [rowsManager] = await db.execute(employeeSQL)
        const employeeList = rowsManager.map((row) => `${row.first_name} ${row.last_name} (ID:${row.id})`)

        const employeeQuestions = [
            {
                type: "input",
                message: "What is the employee’s first name?",
                name: "firstName"
            },
            {
                type: "input",
                message: "What is the employee’s last name?",
                name: "lastName"
            },
            {
                type: "list",
                message: "What is the employee’s role?",
                name: "employeeRole",
                choices: roleList,
            },
            {
                type: "list",
                message: "Who is the employee’s manager?",
                name: "manager",
                choices: employeeList,
            }
        ]
        return employeeQuestions;
    };

    async getEmployeeByDeptQuestion() {

        const db = await mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: 'FML4417*(',
                database: 'employee_db'
            }
        );

        const [rows] = await db.execute(`SELECT * FROM department`);

        const choices = rows.map(row => row.name)

        const employeeByDeptQuestion = {
            type: "list",
            message: "Which department do you want to employee list?",
            name: "employeeByDept",
            choices: choices
        };

        return employeeByDeptQuestion;
    };
};

module.exports = Employee;