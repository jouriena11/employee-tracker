const dbCredentials = require('../config/configuration');
const mysql = require('mysql2/promise');
const Department = require('./department');

class Role {
    constructor(roleID, roleName, salary, deptID, deptName) {
        this.roleID = roleID
        this.roleName = roleName
        this.salary = salary
        this.dept = new Department(deptID, deptName)
    };

    getRole() {
        let reformatRole = []
        this.roleName.split(' ').forEach((item)=>{
            reformatRole.push(item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
        })
        return reformatRole.join(" ");
    };

    async getQuestions() {
        const db = await mysql.createConnection(dbCredentials);
        const sql = `SELECT * FROM department`
        const [rows] = await db.execute(sql);
        const departmentList = rows.map((row) => `${row.name} (ID:${row.id})`)
        const roleQuestions = [
            {
                type: "input",
                message: "What is the name of the role?",
                name: "roleName"
            },
            {
                type: "number",
                message: "What is the salary of the role?",
                name: "salary"
            },
            {
                type: "list",
                message: "Which department does the role belong to?",
                name: "roleDepartment",
                choices: departmentList
            }
        ]

        return roleQuestions;
    }
}

module.exports = Role;