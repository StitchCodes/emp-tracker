const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inquirer = require('./lib/inquirer');

clear();

console.log(
  chalk.yellow(
    figlet.textSync('CMS Corp', { horizontalLayout: 'full' })
  )
);

const getUserOption = async () => {
  // Fetch token from config store
  const credentials = await inquirer.askUserOption();
};

getUserOption();