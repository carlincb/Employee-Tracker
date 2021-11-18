// Required dependencies
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');
const mysql = require('mysql2');
require('dotenv').config();
const util = require('util');

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
    },
);

db.connect();
db.query = util.promisify(db.query);

// Figlet for the pretty employee manager display in the terminal
figlet.text(`
    Employee  
    Manager   
`, 
    (err, data) => {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data);
        init();
    }
);

// Initial Function
init = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Roles',
                'View All Departments',
                'Add Employee',
                'Update Employee Role',
                'Add Role',
                'Add Department',
                'Delete Employee',
                'Delete Role',
                'Delete Department',
                'Quit'
            ],
        }
    ])
    .then((answers) => {
            switch (answers.mainMenu) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'View All Departments':
                    viewAllDepartments();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Delete Employee':
                    deleteEmployee();
                    break;  
                case 'Delete Role':
                    deleteRole();
                    break;  
                case 'Delete Department':
                    deleteDepartment();
                    break;  
                case 'Quit':
                    console.log('Thank you for using the Employee Tracker');
                    process.exit();
                    break;
                default:
                    console.log('Error: No values match this expression.');
                    break;
            }
        })
    }

// Functions that correspond to all the choices from initial inquirer prompt 

// View Employees Function
viewEmployees = () => {
    db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name 
    AS department, role.salary, CONCAT (manager.first_name, " ", manager.last_name) 
    AS manager FROM employee 
    LEFT JOIN role on employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id 
    LEFT JOIN employee manager ON employee.manager_id = manager.id`, 
    
   (err, results) => {
        if (err) {
            console.log(err);
            process.exit();
        } else {
            console.table(results);
            init();
        }
    })
};

// View Roles Function
viewAllRoles = () => {
    db.query(`SELECT role.id, role.title, department.name 
    AS department, role.salary FROM role 
    LEFT JOIN department on role.department_id = department.id;`, 
    
    (err, results) => {
        if (err) {
            console.log(err);
            process.exit();
        } else {
            console.table(results);
            init();
        }
    })
};

// View Departments Function
viewAllDepartments = () => {
    db.query(`SELECT * FROM employees.department;`,
    
    (err, results) => {
        if (err) {
            console.log(err)
            process.exit();
        } else {
            console.table(results);
            init();
        }
    })
};

// Add Employee Function
// Practice using async functionality
addEmployee = async () => {
    if (err) {
        console.log(err)
        process.exit();
    } else {
    const data = await db.query(`SELECT role.id, role.title, department.name 
    AS department, role.salary FROM role 
    LEFT JOIN department on role.department_id = department.id;`)

    const roles = data.map((role) => {
        return {
            name: `Role: ${role.title} in Department: ${role.department}.`,
            value: role.id,
        }
    })
    const inputData = await inquirer.prompt(
        [
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the first name of this employee?',
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the last name of the employee?',
            },
            {
                type: 'input',
                name: 'manager',
                message: 'What is the name of the manager?',
            }, 
            {
                type: 'list',
                name: 'roleId',
                message: 'Select which role this employee will have.',
                choices: roles,
            } 
        ]
    )
    const manager = await db.query('SELECT manager_id FROM employee WHERE role_id = ?',[inputData.roleId]);

    const newEmployee = await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [inputData.firstName, inputData.lastName, inputData.roleId, manager[0].manager_id]);
    console.log('Your new Employee has been added!')
    init();
}
};

// Update Employee Role Function
updateEmployeeRole = () => {
    db.query('SELECT * FROM employees.employee;', 
    (err, results) => {
    
        const employees = [];
        
        results.forEach(result => employees.push (
        {
            name: result.first_name + ' ' + result.last_name, 
            value: result.id
        })
    ); 

    return inquirer.prompt([
        {
            type: 'list',
            name: 'getEmployee',
            message: 'Which employee are you updating?',
            choices: employees
        },
    ])
    
    .then((data) => {

    const employeeId = data.getEmployee;
        
    db.query('SELECT * FROM employees.role;', 
        
    (err, results) => {

        const roles = [];

        results.forEach(result => roles.push (
        {
            name: result.title, 
            value: result.id
        })
        );
    
    return inquirer.prompt([
        {
            type: 'list',
            name: 'updateRole',
            message: "What is the employee's new role?",
            choices: roles
        },
    ])
    
    .then((data) => {

    const roleId = data.updateRole;

    db.query('UPDATE employees.employee SET role_id = ? WHERE id = ?', [roleId, employeeId], 
    
    (err, results) => {
        if (err){
            console.log(err);
            process.exit();
        } else {
            console.log(`Your employee's role has been updated!`)
            init();
            }
        })
    })
    })
    })
    })
};

// Add Role Function
addRole = () => {
    db.query('SELECT * FROM employees.department;',
    
    (err, results) => {
    
    const departments = [];
    
    results.forEach(result => departments.push(
        {
            name: result.name, 
            value: result.id
        }
        )
    );

    return inquirer.prompt([
        {
            type: 'input',
            name: 'newRoleName',
            message: 'What is the name of the new role?'
        },
        {
            type: 'input',
            name: 'newRoleSalary',
            message: 'What is the salary of the new role?'
        },
        {
            type: 'list',
            name: 'newRoleDepartment',
            message: 'Which department does the new role belong to?',
            choices: departments
        }
    ])
    
    .then((data) => {

    db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', 
    [data.newRoleName, data.newRoleSalary, data.newRoleDepartment], 
      
    (err, results) => {
        if(err){
            console.log(err);
            process.exit();
        } else {
            console.log('New role is added!');
            init();
        }
        })
    })
    })
};

// Add Department Function

addDepartment = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartmentName',
            message: 'What is the name of the new department?',
        },
    ])
    .then(function (data) {
    
    db.query('INSERT INTO department (name) VALUES (?)', [data.newDepartmentName], 
    (err, results) => { 

        if(err){
            console.log(err);
            process.exit();
        } else {
            console.log('New Department is Added!')
            init();
        }
        })
    })
};

//   Delete Employee
deleteEmployee = () => {
    db.query('SELECT * FROM employees.employee;', 
    
    (err, results) => {

    const employees = [];
    results.forEach(result => employees.push(
        {
            name: result.first_name + ' ' + result.last_name, 
            value: result.id
        }
        )
    );

    return inquirer.prompt([
        {
            type: 'list',
            name: 'deleteEmployee',
            message: 'Which employee would you like to delete?',
            choices: employees
        },
    ])

    .then((data) => {
    const employeeId = data.deleteEmployee;

    db.query('DELETE FROM employee WHERE id = ?', [employeeId], 
    (err, results) => {

        if(err){
            console.log(err);
            process.exit();
        } else {
            console.log('Employee deleted!');
            init();
        }
        })
    })
    })
};

// Delete Role Function
deleteRole = () => {
    
    db.query('SELECT * FROM employees.role;',  
    (err, results) => {
    const roles = [];
    
    results.forEach(result => roles.push(
        {
            name: result.title, 
            value: result.id
        })
    );
  
    return inquirer.prompt([
        {
            type: 'list',
            name: 'deleteRole',
            message: 'Which role would you like to delete?',
            choices: roles,
        },
    ])

    .then((data) => {
    
        const roleId = data.deleteRole;

    db.query('DELETE FROM role WHERE id = ?', [roleId], 
    (err, results) => {

        if(err){
            console.log(err);
            process.exit();
        } else {
            console.log('Role deleted!');
            init();
        }
        })
    })
    })
};

// Delete Department Function
deleteDepartment = () => {
    db.query('SELECT * FROM employees.department;', 
    
    (err, results) => {

    const departments = [];
    results.forEach(result => departments.push(
        {
            name: result.name, 
            value: result.id
        }
        )
    );
  
    return inquirer.prompt([
        {
            type: 'list',
            name: 'deleteDepartment',
            message: 'Which department would you like to delete?',
            choices: departments
        },
        ])

    .then((data) => {
      
    const departmentId = data.deleteDepartment;
    db.query('DELETE FROM department WHERE id = ?', [departmentId], 
        
    (err, results) => {

            if(err){
                console.log(err);
                process.exit();
            } else {
                console.log('Department deleted!')
                init();
            }
        })
    })
    })
};  