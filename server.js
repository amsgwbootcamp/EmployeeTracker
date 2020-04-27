var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");
const menuChoices = ["View All Departments",
                     "View All Roles",
                     "View All Employees",
                     "Add Departments",
                     "Add Roles",
                     "Add Employees",
                     "Update",
                     "Delete A Department",
                     "Delete A Role",
                     "Delete An Employee",
                     "Exit"]

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
      choices:  menuChoices
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View All Departments":
            var query = "SELECT * FROM department ORDER BY id";
                connection.query(query, function(err, res) {
                console.log("                              ");
                console.log("--- BEGINNING OF DEPARTMENTS ---");
                console.log("                              ");
                console.table(res);
                console.log("                              ");
                console.log("------ END OF DEPARTMENTS ------");
                console.log("                              ");
                runMenu();
            });
            break;
          
          case "View All Roles":
            var query = "SELECT * FROM role ORDER BY id";
                connection.query(query, function(err, res) {
                console.log("                          ");
                console.log("------------- BEGINNING OF ROLES -----------");
                console.log("                          ");
                console.table(res);
                console.log("                          ");
                console.log("---------------- END OF ROLES --------------");
                console.log("                          ");
                runMenu();
            });
            break;

        case "View All Employees":
            var query = "SELECT * FROM employee ORDER BY id";
                connection.query(query, function(err, res) {
                  console.log("                          ");
                  console.log("------------- BEGINNING OF EMPLOYEES -----------");
                  console.log("                          ");
                  console.table(res);
                  console.log("                          ");
                  console.log("---------------- END OF EMPLOYEES --------------");
                  console.log("                          ");
                  runMenu();    
            });
            break;

        case "Add Departments":
                processAddDept();
                break;
           
        case "Add Roles":
                processAddRole();
                break;
        
        case "Add Employees":
                processAddEmployee();     
                break;

      case "Update":
        console.log("You chose Update"); 
        break;

      case "Delete A Department":
          deleteDept();  
          break;

      case "Delete A Role":
          console.log("You chose Delete");  
          break;  

      case "Delete An Employee":
          break;    
      case "Exit":
      default:    
         connection.end();
         break;  
      }
    });
}

function processAddDept()
{
  inquirer.prompt({
    name: "dept",
    type: "input",
    message: "What department would you like to add?"
 }).then(function({dept}) {
      var query = `INSERT INTO DEPARTMENT (name) VALUES ("${dept}")`;
      console.log(query)
      connection.query(query, function(err, res) {
          console.log("---------------------------------------------");
          console.log(`Department ${dept} has been added to database`);
          console.log("---------------------------------------------");
          runMenu();
      });
  });
   
}  

function processAddRole() {
    var depts = [];
    var query = `SELECT name FROM DEPARTMENT ORDER BY id`;
    connection.query(query, function(err, res) 
    {  
       for (var i = 0; i < res.length; i++) 
       {  depts.push(res[i].name); }
       
       inquirer.prompt
       ([
          {
              name: "dept",
              type: "list",
              message: "What department would you like to add the role to?",
              choices: depts
          },
          {
              name: "roleName",
              type: "input",
              message: "What role would like to add?"
          },
          {
              message: "What is the salary for this role?",
              type: "input",
              name: "salary"
          }
        ])
        .then(function({dept,roleName,salary}) 
        {
            var query = `INSERT INTO ROLE (title, salary, department_id) VALUES ("${roleName}",${salary},`;
                query += `(select id from department where name = "${dept}"));`
            console.log(query)
            connection.query(query, function(err, res) {
              console.log("----------------------------------------------------------------");
              console.log(`        Role of ${roleName} has been added to database.         `);
              console.log(`With a salary of S${salary} to the following department: ${dept}`);
              console.log("----------------------------------------------------------------");
              runMenu();
            });
        });
    });
}

function processAddEmployee()
{
    var dept = [];
    var roles = ["None"];
    var rolesId = [];
    var managers = ["None"];
    var managersId = [""];
    var chosenDept = "";
    var chosenRoleId = 0;
    var chosenDeptId = 0;
        
    var queryDepts = `SELECT name FROM DEPARTMENT ORDER BY id`;
    connection.query(queryDepts, function(err, res) 
    {
        for (var i = 0; i < res.length; i++) 
        {  
          dept.push(res[i].name); 
        }

        inquirer.prompt(
        {
            name: "dept",
            type: "list",
            message: "What department would you like to add the employee to?",
            choices: dept
        })
        .then(function({dept})  
        {
            chosenDept = dept;
            var queryRoles = `SELECT id, title, department_id FROM ROLE WHERE department_id = `;
            queryRoles += `(SELECT id FROM DEPARTMENT WHERE name = "${dept}");`;
            connection.query(queryRoles, function(err, res)
            {
                for (var z = 0; z < res.length; z++)
                { 
                    roles.push(res[z].title); 
                    rolesId.push({id: res[z].id,
                    title: res[z].title,
                    department_id: res[z].department_id});
                }

                var queryManagers = `SELECT id, first_name, last_name FROM EMPLOYEE WHERE manager_id IS NULL`;
                    queryManagers += ` AND role_id IN (SELECT id FROM role WHERE department_id = `;
                    queryManagers += `(SELECT id FROM department WHERE name = "${chosenDept}"));`;
                    
                connection.query(queryManagers, function(err, res) 
                {   

                    for (var y = 0; y < res.length; y++)
                    {
                        managers.push(res[y].first_name+" "+res[y].last_name);
                        managersId.push({id: res[y].id,
                                         first_name: res[y].first_name,
                                         last_name: res[y].last_name});
                    }
                
                    inquirer.prompt(
                    [{
                        name: "managers",
                        type: "list",
                        message: "Who will be the employee's manager?",
                        choices: managers
                    },
                    {  
                        name: "roles",
                        type: "list",
                        message: "What role would you like to the employee to have?",
                        choices: roles
                    },
                    {
                        name: "firstName",
                        type: "input",
                        message: "What is the first name of the employee?"
                    },
                    {
                        name: "lastName",
                        type: "input",
                        message: "What is the last name of the employee?"
                    }])
                    .then(function({managers,roles,firstName,lastName}) 
                    {
                        for (var x = 0; x < rolesId.length; x++)
                        {
                            if (rolesId[x].title === roles)
                            {
                                chosenRoleId = rolesId[x].id;
                                chosenDeptId = rolesId[x].department_id;
                            }
                        }    

                        var managerName = managers.split(" ");
                         
                        if (roles === "None" && managers === "None")
                        {
                            var insertQuery = `INSERT INTO employee(first_name, last_name)`;
                                insertQuery += `VALUES ("${firstName}", "${lastName}");`
                        }    
                        else if (roles !== "None" && managers === "None")
                        {
                            var insertQuery = `INSERT INTO employee(first_name, last_name, role_id)`; 
                                insertQuery += `VALUES ("${firstName}", "${lastName}", ${chosenRoleId});`;
                        }    
                        else if (roles !== "None" && managers !== "None")   
                        {
                            var insertQuery = `INSERT INTO employee(first_name, last_name, role_id, manager_id) `;
                            insertQuery += `VALUES ("${firstName}", "${lastName}", ${chosenRoleId}, `;
                            insertQuery += `(SELECT id FROM employee WHERE first_name = "${managerName[0]}" `;
                            insertQuery += `AND last_name = "${managerName[1]}");`;
                        }
                        
                        console.log(insertQuery);
                        connection.query(insertQuery, function(err, res)
                        {
                            console.log(`                                                                `);
                            console.log(`----------------------------------------------------------------`);
                            console.log(`        Employee: ${firstName} ${lastName}                      `);
                            console.log(`        Role: ${roles}                                          `);
                            console.log(`        Department: ${chosenDept}                               `);
                            console.log(`        Has Been Added To The Database                          `);
                            console.log(`----------------------------------------------------------------`);
                            console.log(`                                                                `);
                            runMenu();
                        });
                    });
                });
            });
        }); 
    });
}