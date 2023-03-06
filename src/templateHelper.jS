const path = require("path");
const fs = require("fs");


const createTeams = (managerArray, engineerArray, internArray) => {
    const contentTeams = function() {
    let contentHTML = '';
   
        for (let i = 0; i < managerArray.length; i++) {
            const manager = managerArray[i];
            contentHTML += `
            <div class="card m-3" style="width: 18rem;">
                <div class="card-body bg-info">
                    <h5 class="card-title">${manager.name}</h5>
                    <h5 class="card-title">👑 Manager</h5>
                </div>
                <div class="card-body">
                <p class="card-text border mb-0 p-1">ID: ${manager.id} </p>
                <p class="card-text border mb-0 p-1">Email: <a href="mailto:${manager.email}">${manager.email}</a></p>
                <p class="card-text border p-1">Office Number: ${manager.officeNumber}</p>
                </div>
            </div>
        `;
        }

        // Generate content for all engineers
        for (let i = 0; i < engineerArray.length; i++) {
            const engineer = engineerArray[i];
            contentHTML += `
            <div class="card m-3" style="width: 18rem;">
                <div class="card-body bg-info">
                <h5 class="card-title">${engineer.name}</h5>
                <h5 class="card-title">🛠 Engineer</h5>
                </div>
                <div class="card-body">
                <p class="card-text border mb-0 p-1">ID: ${engineer.id} </p>
                <p class="card-text border mb-0 p-1">Email: <a href="mailto:${engineer.email}">${engineer.email}</a></p>
                <p class="card-text border p-1">Github: <a href="https://github.com/${engineer.github}">${engineer.github}</a></p>
                </div>
            </div>
            `;
        }

    // Generate content for all interns
        for (let i = 0; i < internArray.length; i++) {
            const intern = internArray[i];
            contentHTML += `
            <div class="card m-3" style="width: 18rem;">
                <div class="card-body bg-info">
                <h5 class="card-title">${intern.name}</h5>
                <h5 class="card-title">👨‍🎓👩‍🎓 Intern</h5>
                </div>
                <div class="card-body">
                <p class="card-text border mb-0 p-1">ID: ${intern.id} </p>
                <p class="card-text border mb-0p-1">Email: <a href="mailto:${intern.email}">${intern.email}</a></p>
                <p class="card-text border p-1">School: ${intern.school}</p>
                </div>
            </div>`;
        }

    return contentHTML;
    }

    fs.readFile(path.join(__dirname, "../dist", "index.html"), "utf8", (err, data) => {
        if (err) throw err;

        // find the index of class 'row'
        const rowClass = data.indexOf('<div class="row">');

        // insert the new employee's HTML code below the 'row' element. We use 17 because <div class="row"> is 17 characters long 
        const newHTML = data.slice(0, rowClass + 17) + contentTeams() + data.slice(rowClass + 17);
        
        // write the modified HTML code back to the index.html file
        fs.writeFile(path.join(__dirname, "../dist", "index.html"), newHTML, err => {
            if (err) throw err;
            console.log(`Team members added successfully to ./dist/`);
        });
    });
}


module.exports = createTeams;