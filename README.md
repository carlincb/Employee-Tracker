# Employee-Tracker

## Description

A command-line application to manage a company's employee database.

**Tools & Skills Used**<br>
Node.js, Inquirer, and MySQL.

## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

Here are some guidelines to help you get started:

- [Fork the Repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

```
git clone https://github.com/carlincb/Employee-Tracker
```

- Create a `.gitignore` file and include `node_modules/` and `.DS_Store/` so that your `node_modules` directory isn't tracked or uploaded to GitHub. Be sure to create your `.gitignore` file before installing any npm dependencies.

- Your application should use [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to your MySQL database and perform queries, [Inquirer](https://www.npmjs.com/package/inquirer) to interact with the user via the command line, the [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console, and [Figlet](https://www.npmjs.com/package/figlet) for the title appearance. These are included as dependencies and should be installed by running the following command in the current working directory for this application:

```
npm install
```

- The application will be invoked by using the following command:

```bash
node index.js
```

## Usage

Please see below for examples of this application's usage:

### Screenshots of application:

![1](assets/images/1.png)
![2](assets/images/2.png)
![3](assets/images/3.png)
![4](assets/images/4.png)

### Video of Usage:

![5]()

## Credits

- https://www.npmjs.com/package/figlet
- https://www.npmjs.com/package/console.table
- https://www.npmjs.com/package/inquirer
- https://www.npmjs.com/package/mysql2
- https://www.youtube.com/watch?v=p3qvj9hO_Bo&ab_channel=WebDevSimplified
- https://www.youtube.com/watch?v=7S_tz1z_5bA&ab_channel=ProgrammingwithMosh
- https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)<br/>

    MIT License

    Copyright (c) 2021 COLLEEN FIMISTER

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

## Contributing

1. [Fork the Repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo)

2. Create a branch:

```
git checkout -b yourname-branch
```

3. Commit changes:

```
git commit -m 'Your changes here'
```

4. Push to the branch:

```
git push origin yourname-branch
```

5. Submit a pull request and wait for it to be approved or denied.

## Questions

If you have questions, please contact me at carlin.colleen@gmail.com or find me at https://github.com/carlincb.
