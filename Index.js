const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Other = require("./lib/other");

const inquirer = require("inquirer");
const fs = require("fs");
inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer));


const generateHtml = require("./utils/generateHtml");
//seperate questions for each 
//remove loop seperate, 4 sets of questions
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
            message: "Please enter the team manager's name and ID number.",
            name: "Mgmt",
            default: "No name listed"
        },
        {
            if: input => {
                return input.teamMember === "Manager"
            },
            type: "input",
            message: "Please enter the manager's email address.",
            name: "Email",
            default: "No Email given"
        },
        {
            if: input => {
                return input.teamMember === "Manager"
            },
            type: "input",
            message: "Please enter the manager's office number.",
            name: "ONumber",
            default: "No office number given"
        },
        {
            if: input => {
                return input.role === "Engineer" || "Intern" || "other"
            },
            type: "input",
            message: "Please enter the employee's name.",
            name: "Ename",
            default: "no name given"
        },
        {
            if: input => {
                return input.role === "Engineer" || "Intern" || "other"
            },
            type: "input",
            message: "Please enter the employee's ID.",
            name: "id",
            default: "no ID given"
        },
        {
            if: input => {
                return input.role === "Engineer" || "Intern" || "other"
            },
            type: "input",
            message: "Please enter the employee's email address.",
            name: "email",
            default: "no email given"
        },
        {
            if: input => {
                return input.role === "Engineer"
            },
            type: "input",
            message: "Please enter the employee's GitHub username.",
            name: "gitHub",
            default: "no github given"
        },
        {
            if: input => {
                return input.role === "Intern"
            },
            type: "input",
            message: "Please enter the intern's school.",
            name: "school",
            default: "no school given"
        },
        {
            type: "loop",
            message: "Would you like to add a team member? type (n) to generate HTML, select (y) to generate another team member",
            name: "addEmployee",
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