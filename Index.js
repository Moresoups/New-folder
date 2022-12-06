const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Other = require("./lib/other");

const inquirer = require("inquirer");
//inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer));
const fs = require("fs");



const generateHtml = require("./utils/generateHtml");

const questions = () => {
    return inquirer.prompt([
        {
            type: "checkbox",
            message: "What is the role of this Team member",
            name: "teamMember",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "other"
            ],
        },
        {
            when: input => {
                return input.teamMember === "Manager"
            },
            type: "input",
            message: "Please enter the team manager's name.",
            name: "Name",
            default: "No name listed"
        },
        {
            type: "input",
            message: "Please enter the manager's employee ID.",
            name: "ID",
            default: "No ID given"
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
            type: "loop",
            message: "Would you like to add a team member? press enter to skip ress ethis question and generate the HTML",
            name: "addEmployee",
            questions: [
                {
                    type: "list",
                    message: "Which would you like to add?",
                    name: "role",
                    choices: [
                        "Engineer",
                        "Intern",
                        "other"
                    ],
                }
            ]
        },
        {
            type: "input",
            message: "Please enter the employee's name.",
            name: "name",
            default: "no name given"
        },
        {
            type: "input",
            message: "Please enter the employee's ID.",
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
            when: input => {
                return input.role === "Engineer"
            },
            type: "input",
            message: "Please enter the employee's GitHub username.",
            name: "gitHub",
            default: "no github given"
        },
        {
            when: input => {
                return input.role === "Intern"
            },
            type: "input",
            message: "Please enter the intern's school.",
            name: "school",
            default: "no school given"
        },
    ]);
}

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
            return console.log('SOMETHING FUCKED UP');
        }

        console.log("HTML file succesfully generated")
    });
}

function promptUser() {
    questions()
        .then((response) => {
            const madeHtml = generateHtml(response);
            writeToFile('index.html', madeHtml);
        });
}


promptUser();