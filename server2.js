var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "empTrackDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  runMenu();
});

function runMenu() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Departments",
                  "View Roles",
                  "View Employees",
                  "Add",
                  "Update",
                  "Delete",
                  "Exit"]
      })
      .then(function(answer) {
        switch (answer.action) {
            case "View Departments":
                var query = "SELECT * FROM department ORDER BY id";
                connection.query(query, function(err, res) {
                console.table(res);
                });
                runMenu();
                break;
  
            case "View Roles":
                console.log("You chose View Roles");
                break;
  
            case "View Employees":
                console.log("You chose View Employees"); 
                break;
  
        case "Add":
          console.log("You chose Add");
          runMenu();
  //        multiSearch();
          break;
  
        case "Update":
          console.log("You chose Update"); 
          runMenu();
  //        rangeSearch();
          break;
  
        case "Delete":
          console.log("You chose Delete");  
          runMenu();
  //        songSearch();
          break;
  
        case "Exit":
        default:    
           connection.end();
  //        songSearch();
           break;  
        }
      });
  }