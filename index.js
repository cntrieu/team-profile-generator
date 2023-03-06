const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const createTeams = require("./src/templateHelper");

const managerArray = [];
const engineerArray = [];
const internArray = [];


const questions = [
  {
    type: "list",
    name: "role",
    message: "What is employee's role?",
    choices: ["Manager", "Engineer", "Intern"],
  },
  {
    type: "input",
    name: "name",
    message: "What is the employee's name?",
  },
  {
    type: "input",
    name: "id",
    message: "What the employee's id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is the employee's email?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the manager's office number?",
    when: (answers) => answers.role === "Manager"
  },
  {
    type: "input",
    name: "github",
    message: "What is the engineer's github account?",
    when: (answers) => answers.role === "Engineer"
  },
  {
    type: "input",
    name: "school",
    message: "What is the name of the intern's school?",
    when: (answers) => answers.role === "Intern"
  },
  {
    type: "confirm",
    message: "Would you like to add another employee?",
    name: "addEmployee",
  },
];


function init() {
  inquirer.prompt(questions).then(answers => {
  
  const indexHTMLPath = path.join(__dirname, "dist", "index.html");
  
  // Using existsSync to see if file exists, if not, copy it from render
  if (!fs.existsSync(indexHTMLPath)) {
    fs.copyFile(path.join(__dirname, "src", "render.html"), indexHTMLPath, (err) => {
      if (err) throw err;
      console.log(`${answers.role} added`);
      executeCreateTeams(answers, managerArray, engineerArray, internArray);
    });

    } else {
      console.log(`${answers.role} added`);
      executeCreateTeams(answers, managerArray, engineerArray, internArray);
    }
  });
}

init();
  
function executeCreateTeams(answers, managerArray, engineerArray, internArray) {

  // Create a new employee object based on the user's input
  if (answers.role === "Manager") {
    let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
    managerArray.push(manager);
  }
  if (answers.role === "Engineer") {
    let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    engineerArray.push(engineer);
  }
  if (answers.role === "Intern") {
    let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
    internArray.push(intern);
  }

  // Check if the user wants to add another employee
  if (answers.addEmployee) {
    inquirer.prompt(questions).then(newAnswers => {
      executeCreateTeams(newAnswers, managerArray, engineerArray, internArray);
    });
  } else {
    // If the user does not want to add another employee, create the team
    createTeams(managerArray, engineerArray, internArray);
  }
}
