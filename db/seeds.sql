INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO role(title, department_id, salary)
VALUES  ("Sales Lead", 1, 100000),
        ("Salesperson", 1, 80000),
        ("Lead Engineer", 2, 150000),
        ("Software Engineer", 2, 120000),
        ("Account Manager", 3, 160000),
        ("Accountant", 3, 125000),
        ("Legal Team Lead", 4, 250000),
        ("Lawyer", 4, 190000);


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, Null),
        ("Mike", "Chan", 2, 1),
        ("Ashley", "Rodriguez", 3, Null),
        ("Kevin", "Tupik", 4, 3),
        ("Kunal", "Singh", 5, Null),
        ("Malia", "Brown", 6, 5),
        ("Sarah", "Lourd", 7, Null),
        ("Tom", "Allen", 8, 7);