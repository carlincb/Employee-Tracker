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
    });

function init(){
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
            console.log(err)
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
            console.log(err)
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
        } else {
            console.table(results);
            init();
        }
    })
};

addEmployee = async () => {
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
                type: 'list',
                name: 'roleId',
                message: 'Select which role this employee will have?',
                choices: roles,
            }
        ]
    )
    const manager = await db.query('SELECT manager_id FROM employee WHERE role_id = ?',[inputData.roleId]);

    const newEmployee = await db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [inputData.firstName, inputData.lastName, inputData.roleId, manager[0].manager_id]);

    init();
}

updateEmployeeRole = async () => {
    const data = await db.query(`SELECT role.id, role.title, department.name 
    AS department, role.salary FROM role 
    LEFT JOIN department on role.department_id = department.id;`)
    // dbquery for employees then inquirer prompt database query to update specific employee
}