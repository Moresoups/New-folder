const inquirer = require("inquirer");
inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer));
const fs = require("fs");

const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager")
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Intern = require("./lib/other");

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
                "Other"
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
                        "Other"
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