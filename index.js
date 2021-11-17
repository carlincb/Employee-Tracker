const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');
const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    },
);

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

// initial database query to get all departments currently in database, then use inside inquirer prompt for user to choose from.