const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");

const questions = [
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
      type: "list",
      name: "role",
      message: "What is employee's role?",
      choices: ["Manager", "Engineer", "Intern"],
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
  inquirer
  .prompt(questions).then(answers => {

    // Copying the renderHTML template to a new file in dist folder called index.html
  fs.copyFile(
    path.join(__dirname, "src", "renderHTML.html"),
    path.join(__dirname, "dist", "index.html"), (err) => {
      if (err) throw err;

     fs.readFile(path.join(__dirname, "dist", "index.html"), 'utf8', (err, data) => {
      if(err) throw err;

      let teamHTML = "";
  
      if (answers.role === "Manager") {
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);

        fs.readFile(
          path.join(__dirname, "src", "ManagerHTML.html"), "utf8", (err, data) => {
            if (err) throw err;

          const replace = data
          .replace("{{name}}", answers.name)
          .replace("{{role}}", answers.role)
          .replace("{{id}}", answers.id)
          .replace("{{officeNumber}}", answers.officeNumber)
          .replace(/{{email}}/g, `${answers.email}`);

          teamHTML += replace;
          writeHTMLToFile(teamHTML);
        
        // fs.appendFile(
        // path.join(__dirname, "dist", "index.html"), replace, (err) => {
        //   if (err) throw err;
        //   console.log("Successfully generated index.html");
        // })
  
    }
    )}

      if (answers.role === "Engineer") {
        let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
      
        fs.readFile(
          path.join(__dirname, "src", "EngineerHTML.html"), 'utf8', (err, data) => {
            if(err) throw err;

          const replace = data
          .replace("{{name}}", answers.name)
          .replace("{{role}}", answers.role)
          .replace("{{id}}", answers.id)
          .replace("{{github}}", answers.github)
          .replace(/{{email}}/g, `${answers.email}`);

          teamHTML += replace;
          writeHTMLToFile(teamHTML);

      // fs.appendFile(
      //   path.join(__dirname, "dist", "index.html"), replace, (err) => {
      //     if (err) throw err;
      //     console.log("Successfully generated index.html");
      //   }
      // )
    }
    )
      
    }

      if (answers.role === "Intern") {
        let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
      
        fs.readFile(
          path.join(__dirname, "src", "InternHTML.html"), 'utf8', (err, data) => {
            if(err) throw err;

            const replace = data
            .replace("{{name}}", answers.name)
            .replace("{{role}}", answers.role)
            .replace("{{id}}", answers.id)
            .replace("{{school}}", answers.school)
            .replace(/{{email}}/g, `${answers.email}`);

            teamHTML += replace;
            writeHTMLToFile(teamHTML);

        // fs.appendFile(
        //   path.join(__dirname, "dist", "index.html"), replace, (err) => {
        //     if (err) throw err;
        //     console.log("Successfully generated index.html");
        //   }
        // )
        
      })
    }

    if (answers.addEmployee) {
      init();
    }

  })
})
}

  )}
  fs.writeFile("./dist/index.html", init, (err) => {
    if(err) throw err;
  
  })
init();

function writeHTMLToFile(htmlContent) {
  return new Promise((resolve, reject) => {
    fs.appendFile(path.join(__dirname, "dist", "index.html"), htmlContent, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}