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

function addEntry() {
  inquirer
    .prompt([
      {
        name: "userAddEntry",
        type: "list",
        message: "What would you like to add?",
        choices: [
          "Add department",
          "Add an employee",
          "Add roles",
          "Return to Menu",
        ],
      },
    ])
    .then((answer) => {
      if (answer.userAddEntry === "Add department") {
        addDepartment();
      }
      if (answer.userAddEntry === "Add roles") {
        var departmentChoices = [];
        connection.query("SELECT * FROM roles", (err, res) => {
          if (err) throw err;
          departmentChoices = res.map(({ id, title, salary }) => ({
            value: id,
            name: title,
            salary: salary,
          }));
          //console.log(departmentChoices);
          addRole(departmentChoices);
          // if (err) throw err;
          // console.table(res);
          // initiate();
        });
      }
      if (answer.userAddEntry === "Add an employee") {
        var employeeChoices = [];
        connection.query("SELECT * FROM employee", (err, res) => {
          if (err) throw err;
          employeeChoices = res.map(
            ({
              id,
              first_name,
              last_name,
              role_id,
              manager_name,
              manager_id,
            }) => ({
              value: id,
              name: first_name,
              lname: last_name,
              rid: role_id,
              mname: manager_name,
              mid: manager_id,
            })
          );
          //console.log(employeeChoices);
          addemployee(employeeChoices);
        });
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "userDepartment",
        type: "input",
        message: "What department would you like to add?",
      },
    ])
    .then((answer) => {
      connection.query(
        `INSERT INTO department (name) VALUES ("${answer.userDepartment}")`,
        (err, res) => {
          if (err) throw err;
          console.log("Successfully added!");
          initiate();
        }
      );
    });
}

function addRole(departmentChoices) {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the name of the role you'd like to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?",
      },
      {
        name: "userDeptId",
        type: "list",
        message: "What department would you like to add this person to?",
        choices: departmentChoices,
      },
    ])
    .then((answer) => {
      connection.query; // We need to
      `INSERT INTO roles (title, salary, department_id) VALUES ("${answer.departmentChoices}")`,
        console.log(answer);
      initiate();
    });
}

function addemployee(employeeChoices) {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Please enter the employee's fist name",
      },
      {
        name: "lastName",
        type: "input",
        message: "Please enter the employee's last name",
      },
      {
        name: "employeeRole",
        type: "list",
        message: "please select the employee's job role",
        choices: employeeChoices,
      },
      {
        name: "employeesManager",
        type: "input",
        message:
          "Please enter the name of this employee's manager. If none, please enter N/A",
      },
    ])
    .then((answer) => {
      connection.query;
      console.table(answer);
      initiate();
    });
}

function updateEntry() {
  inquirer
    .prompt([
      {
        name: "userUpdateEntry",
        type: "list",
        message: "What would you like to change?",
        choices: [
          "Delete a Department",
          "Delete a job role",
          "Delete an employee",
          "Update an employee's role",
          "Return to menu",
        ],
      },
    ])
    .then((answer) => {
      if (answer.userUpdateEntry === "Delete a Department") {
        console.log("sfsfgddfgsfggdd");
      } else if (answer.userUpdateEntry === "Delete a job role") {
        console.log("Test");
      } else if (answer.userUpdateEntry === "Delete an employee") {
        console.log("No!");
      } else if (answer.userUpdateEntry === "Update an employee's role") {
        console.log("Yeah!");
      } else if (answer.userUpdateEntry === "Return to menu") {
        initiate();
      }
    });
}
// Build EndProgram functioin
function endProgram() {
  console.log("Goodbye");
  connection.end();
  //process.exit();
}
// if (answer.userViewEntry === "View departments") {
//     connection.query("SELECT * FROM department", (err, res) => {
//       if (err) throw err;
//       console.table(res);
//       initiate();

initiate();
// addEntry();
//   ])
//  .then((answer) => {
//     if (answer.userAddEntry === "Add department"){
//     addDepartment();
//     }}}

// const afterConnection = () => {
//   connection.query("SELECT * FROM department, ", (err, res) => {
//     if (err) throw err;
//     console.log(res);
//     connection.end();
//   });
// }
