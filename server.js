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
        var roleChoices = [];
        connection.query("SELECT * FROM roles", (err, res) => {
          if (err) throw err;
          roleChoices = res.map(({ id, title }) => ({
            value: id,
            name: title,
          }));
          //console.log(employeeChoices);
          addemployee(roleChoices);
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

function addemployee(roleChoices) {
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
        choices: roleChoices,
      },
    ])
    .then((answer) => {
      connection.query(
        `INSERT INTO employee (first_name, last_name, role_id) VALUES ("${answer.firstname}","${answer.lastName}", ${answer.employeeRole})`,
        (error, data) => {
          if (error) throw error;
          console.log("Data successfully added!");
          initiate();
        }
      );
    });
}

function updateEntry() {
  inquirer
    .prompt([
      {
        name: "userUpdateEntry",
        type: "list",
        message: "What would you like to change?",
        choices: ["Update an employee's role", "Return to menu"],
      },
    ])
    .then((answer) => {
      if (answer.userUpdateEntry === "Update an employee's role") {
        updateEmployeeRole();
      } else {
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
function updateEmployeeRole() {
  var listEmployeeChoices = [];
  var listRowChoices = [];
  connection.query("SELECT * FROM employee", (err, data) => {
    if (err) throw err;
    listEmployeeChoices = data.map((employee) => ({
      value: employee.id,
      name: employee.first_name + " " + employee.last_name,
    }));
    console.log(listEmployeeChoices);
    connection.query("SELECT * FROM roles", (err, data) => {
      if (err) throw err;
      listRowChoices = data.map((role) => ({
        value: role.id,
        name: role.title,
      }));
      inquirer
        .prompt([
          {
            name: "id",
            type: "list",
            message: "Which employee do you want to update the role of?",
            choices: listEmployeeChoices,
          },
          {
            name: "roleId",
            type: "list",
            message: "Which is their new role of the employee",
            choices: listRowChoices,
          },
        ])
        .then((answer) => {
          console.log(answer);
          connection.query(
            `UPDATE employee SET role_id = ${answer.roleId} WHERE id = ${answer.id}`,
            (err, data) => {
              if (err) throw err;
              console.log("Role of the employee has been updated!");
              initiate();
            }
          );
        });
    });
    // inquirer
    //   .prompt([
    //     {
    //       name: "id",
    //       type: "list",
    //       message: "Which employee do you want to update the role of?",
    //       choices: listEmployeeChoices,
    //     },
    //     {
    //       name: "roleId",
    //       type: "list",
    //       message: "Which is their new role of the employee",
    //       choices: listRowChoices,
    //     },
    //   ])
    //   .then((answer) => {
    //     console.log(answer);
    //   });
  });
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
