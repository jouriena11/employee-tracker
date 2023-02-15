class Department {
    constructor(id, deptName) {
        this.id = id
        this.deptName = deptName
    };

    getDepartment() {
        let reformatDepartment = []
        this.deptName.split(' ').forEach((item)=>{
            reformatDepartment.push(item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
        })
        return reformatDepartment.join(" ");
    };

    getQuestions() {
        const departmentQuestions = [
            {
                type: "input",
                message: "What is the name of the department?",
                name: "deptName"
            }
        ]

        return departmentQuestions;
    }
}

module.exports = Department;