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
      choices: ["View","Add","Update","Delete","Exit"]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View":
          runView();
          break;

        case "Add":
          console.log("You chose Add");
          runAdd();
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

// This will handle all of the viewing possibities for the user:  
function runView() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: ["View Departments","View Roles","View Employees","Exit"]
    })
      .then(function(answer) {
         switch (answer.action) {
            case "View Departments":
                var query = "SELECT * FROM department ORDER BY id";
                connection.query(query, function(err, res) {
                    console.log("                              ");
                    console.log("--- BEGINNING OF DEPARTMENTS ---");
                    console.log("                              ");
                    console.table(res);
                    console.log("                              ");
                    console.log("------ END OF DEPARTMENTS ------");
                    console.log("                              ");
                    runView();
                });
                break;
  
            case "View Roles":
                var query = "SELECT * FROM role ORDER BY id";
                connection.query(query, function(err, res) {
                    console.log("                          ");
                    console.log("------------- BEGINNING OF ROLES -----------");
                    console.log("                          ");
                    console.table(res);
                    console.log("                          ");
                    console.log("---------------- END OF ROLES --------------");
                    console.log("                          ");
                    runView();
                });
                break;
  
            case "View Employees":
                var query = "SELECT * FROM employee ORDER BY id";
                connection.query(query, function(err, res) {
                    console.table(res);
                    runView();
                });
                break;
  
            case "Exit":
            default:   
                runMenu();
                break;  
        }
    });
    
}

function runAdd() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: ["Add Departments","Add Roles","Add Employees","Exit"]
  })
    .then(function(answer) {
       switch (answer.action) {
          case "Add Departments":
              inquirer.prompt({
                name: "dept",
                type: "input",
                message: "What department would you like to add?"
              })
              .then(function({dept}) {
                  var query = `INSERT INTO DEPARTMENT (name) VALUES ("${dept}")`;
                  console.log(query)
                  connection.query(query, function(err, res) {
                      console.log(`Department ${dept} has been added to database`);
                      runAdd();
                  });
              }); 
              break;

          // case "Add Roles":
          //     // var query = "SELECT * FROM role ORDER BY id";
          //     // connection.query(query, function(err, res) {
          //     //     console.log("                          ");
          //     //     console.log("------------- BEGINNING OF ROLES -----------");
          //     //     console.log("                          ");
          //     //     console.table(res);
          //     //     console.log("                          ");
          //     //     console.log("---------------- END OF ROLES --------------");
          //     //     console.log("                          ");
          //         runView();
          //     });
          //     break;

          // case "Add Employees":
          //     var query = "SELECT * FROM employee ORDER BY id";
          //     connection.query(query, function(err, res) {
          //         console.table(res);
          //         runView();
          //     });
          //     break;

          case "Exit":
          default:   
              runMenu();
              break;  
      }
  });
  
}

