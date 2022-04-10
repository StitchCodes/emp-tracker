const inquirer = require('inquirer');
const mysql = require('./mysql');
const chalk = require('chalk');
const figlet = require('figlet');
const clear = require('clear');

module.exports = {
  askUserOption: () => {
     const Options = [
      {
        type: 'list',
        name: 'Menu',
        message: 'What would you like to do?',
        choices:['View all Departments', 'View all roles','View all employees', 'Add a department', 'Add a role','Add an employee', 'Update an employee role'],
        }];
  
    const DepartmentAdd = [
      {
        name: 'DepartmentAdd',
        type: 'input',
        message: 'Enter the name of the department',
        validate: function( value ) {
          if (value.length<30) {
              mysql.InsertDepartment(value);
          }
        }
      }];
       const RoleAdd = [
      {
        name: 'role_name',
        type: 'input',
        message: 'Enter the name of the role',
      },
      {
        name: 'role_salary',
        type: 'input',
        message: 'Enter the salary of the role',
      },
      {
        name: 'role_department',
        type: 'input',
        message: 'Enter the department of the role',
      }];
       const EmployeeAdd = [
      {
        name: 'first_name',
        type: 'input',
        message: 'Employee first name:'
      },
      {
        name: 'last_name',
        type: 'input',
        message: 'Employee last name:'
      },
      {
        name: 'role_id',
        type: 'input',
        message: 'Employee role:'
      },
      {
        name: 'manager_id',
        type: 'input',
        message: 'Employee manager (no manager press enter):'
      }];

      function getAnswers() {
        return inquirer.prompt(Options).then(answers => {
          switch(answers.Menu.toLowerCase()) {
                case 'view all departments' :
                mysql.Select("department");
                break;
                case 'view all roles':
                // code block
                mysql.SelectRoles();
                break;
                case 'view all employees':
                // code block
                mysql.SelectEmployees();
                break;
                case 'add a department':
                // code block
                return inquirer.prompt(DepartmentAdd);
                break;
                case 'add a role':
                // code block
                return inquirer.prompt(RoleAdd).then(answers => { mysql.InsertRole(answers.role_name,answers.role_salary,answers.role_department) });
                break;
                case 'add an employee':
                // code block
                return inquirer.prompt(EmployeeAdd).then(answers => { mysql.InsertEmployee(answers.first_name,answers.last_name,answers.role_id,answers.manager_id) });
                break;
                case 'update an employee role':
                // code block
                break;
              default:
                // code block
            }
        });
      }
      getAnswers().then().catch((error) => {});
}
};
