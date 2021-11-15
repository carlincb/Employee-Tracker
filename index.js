const inquirer = require('inquirer');
const db = require('./db/config');
const cTable = require('console.table');

// First, have function that's an inquirer prompt, this will be starter function (usually called init)

// in the inquirer prompt ask user what want to do. inquirer prompt with type of list, choices array of strings, strings will be questions we want to ask user. See video for initial questions. What want to do? Add department, role, employee. View etc. 

// Functions that correspond to all the choices from initial inquirer prompt 

// View all departments function in that function use mysql package to go out query the database select *... get the results from query and console log onto screen...still inside this function is call init function again. After they've done what they want to do go back and do something else. 

// initial database query to get all departments currently in database, then use inside inquirer prompt for user to choose from.