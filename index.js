const inquirer = require('inquirer');
const db = require('./db/config');
const cTable = require('console.table');
const figlet = require('figlet');

figlet.text('Employee Manager', function(err, data) {
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
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Update Employee Managers',
                'View Employees by Manager',
                'View Employees by Department',
                'Delete Department',
                'Delete Role',
                'Delete Employee',
                'View Department Budget',
                'Quit'
            ],
        }
    ])
    .then((answers) => {
            switch (answers.mainMenu) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeRole();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    viewAllDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Update Employee Managers':
                    updateEmployeeManagers();
                    break;
                case 'View Employees by Manager':
                    viewEmployeesByManager();
                    break;
                case 'View Employees by Department':
                    viewEmployeesByDepartment();
                    break;
                case 'Delete Department':
                    deleteDepartment();
                    break;
                case 'Delete Role':
                    deleteRole();
                    break;
                case 'Delete Employee':
                    deleteEmployee();
                    break;
                case 'View Department Budget':
                    viewDepartmentBudget();
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

// View all departments function in that function use mysql package to go out query the database select *... get the results from query and console log onto screen...still inside this function is call init function again. After they've done what they want to do go back and do something else. 

// initial database query to get all departments currently in database, then use inside inquirer prompt for user to choose from.