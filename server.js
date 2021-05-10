// Connection to the DB
const mysql = require("mysql");
const cTable = require("console.table");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  //port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "",
  database: "employee_trackerDB",
});

// const afterConnection = () => {
//   connection.query("SELECT * FROM department, ", (err, res) => {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
//   });
// };

// connection.connect((err) => {
//   if (err) throw err;
//   console.log(`connected as id ${connection.threadId}`);
//   connection.end();
//   // afterConnection();
// });

// Begins of asking questions
function initiate() {
  inquirer
    .prompt([
      {
        name: "userSelectedChoice",
        type: "list",
        message: "Please choose from the actions listed to proceed.",
        choices: [
          "View an entry",
          "Add an entry",
          "Update an entry",
          "Exit Menu",
        ],
      },
    ])
    .then((answer) => {
      if (answer.userSelectedChoice === "View an entry") {
        viewEntry();
      } else if (answer.userSelectedChoice === "Add an entry") {
        addEntry();
      } else if (answer.userSelectedChoice === "Update an entry") {
        updateEntry();
      } else if (answer.userSelectedChoice === "Exit Menu") {
        endProgram();
      }
    });
}

function viewEntry() {
  inquirer
    .prompt([
      {
        name: "userViewEntry",
        type: "list",
        message: "Would you like to view employees?",
        choices: ["View roles", "View employees", "View departments"],
      },
    ])
    .then((answer) => {
      if (answer.userViewEntry === "View departments") {
        connection.query("SELECT * FROM department", (err, res) => {
          if (err) throw err;
          console.table(res);
          initiate();
        });
      } else if (answer.userViewEntry === "View roles") {
        connection.query("SELECT * FROM roles", (err, res) => {
          if (err) throw err;
          console.table(res);
          initiate();
        });
      } else if (answer.userViewEntry === "View employees") {
        connection.query("SELECT * FROM employee", (err, res) => {
          if (err) throw err;
          console.table(res);
          initiate();
        });
      }
    });
}

initiate();

// const afterConnection = () => {
//   connection.query("SELECT * FROM department, ", (err, res) => {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
//   });
// };
