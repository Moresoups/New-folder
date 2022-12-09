const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Other = require("./lib/other");

const inquirer = require("inquirer");
const fs = require("fs");
//inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer));


const generateHtml = require("./utils/generateHtml");
//seperate questions for each 
//remove loop seperate, 4 sets of questions
const questionManager = () => {
    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter the team manager's name and ID number.",
            name: "Mgmt",
            default: "No name listed"
        },
        {
            type: "input",
            message: "Please enter the manager's email address.",
            name: "Email",
            default: "No Email given"
        },
        {
            type: "input",
            message: "Please enter the manager's office number.",
            name: "ONumber",
            default: "No office number given"
        },
        {
            type: "input",
            message: "Please enter the employee's name.",
            name: "Ename",
            default: "no name given"
        },
    ])
}
const QuestionOther = () => {

    return inquirer.prompt([
        {
            type: "input",
            message: "Please enter the employee's name and ID.",
            name: "id",
            default: "no ID given"
        },
        {
            type: "input",
            message: "Please enter the employee's email address.",
            name: "email",
            default: "no email given"
        },
        {
            type: "input",
            message: "Please enter the employee's GitHub username.",
            name: "gitHub",
            default: "no github given"
        },
        {
            type: "input",
            message: "Please enter the intern's school.",
            name: "school",
            default: "no school given"
        },
        {
            type: 'confirm',
            name: 'NewMember',
            message: 'Add another team member?',
            default: false
        }
    ])

        .then(managerInput => {
            const { Mgmt, Email, ONumber, Ename } = managerInput;
            const manager = new Manager(Mgmt, Email, ONumber, Ename);

            teamArray.push(manager);
            console.log(manager);
        })
        .then(employeeData => {
            let { id, email, github, school, NewMember } = employeeData;
            let employee;
            if (role === "Engineer") {
                employee = new Engineer(id, email, github);

                console.log(employee);

            } else if (role === "Intern") {
                employee = new Intern(id, email, school);

                console.log(employee);
            } if (NewMember) {
                return addEmployee(teamArray);
            } else {
                return teamArray;
            }
        })
}
questionManager() 
  .then(QuestionOther)
        .then(teamArray => {
            return generateHTML(teamArray);
        })
        .then(pageHTML => {
            return writeToFile(pageHTML);
        })
        .catch(err => {
            console.log(err);
        });

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log('SOMETHING FUCKED UP');
        }

        console.log("HTML file succesfully generated")
    });
}