var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require("console.table");
const menuChoices = ["View All Departments",
                     "View All Roles",
                     "View All Employees",
                     "Add Departments",
                     "Add Roles",
                     "Add Employees",
                     "Update Employee Role",
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
    .then(function(answer) 
    {
      switch (answer.action) 
      {
        case "View All Departments":
            viewDepts();
            break;
          
        case "View All Roles":
            viewRoles();
            break;

        case "View All Employees":
            viewEmployees();
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

        case "Update Employee Role":
            updateEmployeeRole(); 
            break;

        case "Delete A Department":
            deleteDept();  
            break;

        case "Delete A Role":
            deleteRole();  
            break;  

        case "Delete An Employee":
            deleteEmployee();
            break;    

        case "Exit":
        default:    
            connection.end();
            break;  
      }
    });
}

function viewDepts()
{
    var query = "SELECT * FROM department ORDER BY id";
    connection.query(query, function(err, res) 
    {
        console.log("                                ");
        console.log("--- BEGINNING OF DEPARTMENTS ---");
        console.log("                                ");
        console.table(res);
        console.log("                                ");
        console.log("------ END OF DEPARTMENTS ------");
        console.log("                                ");
        runMenu();
    });
}

function viewRoles()
{
    var query = "SELECT * FROM role ORDER BY id";
    connection.query(query, function(err, res) {
        console.log("                                            ");
        console.log("------------- BEGINNING OF ROLES -----------");
        console.log("                                            ");
        console.table(res);
        console.log("                                            ");
        console.log("---------------- END OF ROLES --------------");
        console.log("                                            ");
        runMenu();
    });
}

function viewEmployees()
{
    var query = "SELECT * FROM employee ORDER BY id";
    connection.query(query, function(err, res) 
    {
        console.log("                                                ");
        console.log("------------- BEGINNING OF EMPLOYEES -----------");
        console.log("                                                ");
        console.table(res);
        console.log("                                                ");
        console.log("---------------- END OF EMPLOYEES --------------");
        console.log("                          ");
        runMenu();    
    });
}
function processAddDept()
{
    inquirer.prompt(
    {
        name: "dept",
        type: "input",
        message: "What department would you like to add?"
    })
    .then(function({dept}) 
    {
        var query = `INSERT INTO DEPARTMENT (name) VALUES ("${dept}")`;
        connection.query(query, function(err, res) {
            console.log("---------------------------------------------");
            console.log(`Department ${dept} has been added to database`);
            console.log("---------------------------------------------");
            runMenu();
       });
    });
}  

function processAddRole() 
{
    var depts = [];
    var query = `SELECT name FROM DEPARTMENT ORDER BY id`;
    connection.query(query, function(err, res) 
    {  
        for (var i = 0; i < res.length; i++) 
        {  
            depts.push(res[i].name); 
        }

        inquirer.prompt([
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

            connection.query(query, function(err, res) 
            {
                console.log("                                                                ");
                console.log("----------------------------------------------------------------");
                console.log(`        Role of ${roleName} has been added to database.         `);
                console.log(` With a salary of ${salary} to the following department: ${dept}`);
                console.log("----------------------------------------------------------------");
                console.log("                                                                ");
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
    var managersId = [];
    var chosenDept = "";
    var chosenRoleId = 0;
    var chosenManagerId = 0;
        
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
                                break;
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
                             
                            for (var i = 0; i < managersId.length; i ++)
                            {
                                if ((managerName[0] === managersId[i].first_name) && (managerName[1] === managersId[i].last_name))
                                {
                                    chosenManagerId = managersId[i].id;
                                    break;
                                }
                            }
                            var insertQuery = `INSERT INTO employee(first_name, last_name, role_id, manager_id) `;
                            insertQuery += `VALUES ("${firstName}", "${lastName}", ${chosenRoleId}, ${chosenManagerId});`;
                        }
                                                
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

function deleteDept()
{
    var depts = [];
    var queryDepts = `SELECT name FROM DEPARTMENT ORDER BY id`;
    
    connection.query(queryDepts, function(err, res) 
    {
        for (var i = 0; i < res.length; i++) 
        {  
            depts.push(res[i].name); 
        }     

        inquirer.prompt(
        {
            name: "dept",
            type: "list",
            message: "What department would you like to delete?",
            choices: depts
        })
        .then(function({dept}) 
        {
            var query = `DELETE FROM DEPARTMENT WHERE name = "${dept}";`;
            connection.query(query, function(err, res) 
            {
                console.log("                                                     ");
                console.log("-----------------------------------------------------");
                console.log(`Department ${dept} has been deleted from the database`);
                console.log("-----------------------------------------------------");
                console.log("                                                     ");
                runMenu();
            });
        }); 
    }); 
}     

function deleteRole() 
{
    var roles = ["None"];
    var rolesId = [];
    var depts = [];
    var chosenRoleId = 0;
    var chosenDeptId = 0;
    var query = `SELECT name FROM DEPARTMENT ORDER BY id`;
    connection.query(query, function(err, res) 
    {  
        for (var i = 0; i < res.length; i++) 
        {  
            depts.push(res[i].name); 
        }

        inquirer.prompt(
        {
            name: "dept",
            type: "list",
            message: "What department would you like to delete the role from?",
            choices: depts
        })
        .then(function({dept}) 
        {   
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
                
                inquirer.prompt(
                {
                    name: "role",
                    type: "list",
                    message: "What role would you like to delete?",
                    choices: roles
                })
                .then(function({role}) 
                {
                    if (role === "None")
                    {
                        console.log(`                                                                `);
                        console.log(`----------------------------------------------------------------`);
                        console.log(`            No Role To Delete.  Nothing has been                `);
                        console.log(`                  deleted from the database.                    `);
                        console.log(`----------------------------------------------------------------`);
                        console.log(`                                                                `);
                    }
                    else
                    {
                        for (var x = 0; x < rolesId.length; x++)
                        {
                            if (rolesId[x].title === role)
                            {
                                chosenRoleId = rolesId[x].id;
                                chosenDeptId = rolesId[x].department_id;
                                break;
                            }
                        }
                        var query = `DELETE FROM ROLE where title = "${role}" and department_id = ${chosenDeptId} `;
                            query += `and id = ${chosenRoleId};`

                        connection.query(query, function(err, res) 
                        {
                            console.log(`                                                                `);
                            console.log(`----------------------------------------------------------------`);
                            console.log(`            Role of ${role} In Department ${dept}               `);
                            console.log(`            has been deleted from the database.                 `);
                            console.log(`----------------------------------------------------------------`);
                            console.log(`                                                                `);
                        
                        });
                    }
                    runMenu();
                });
            });
        });
    });
}   

function deleteEmployee()
{
    var employees = [];
    var employeesId = [];
    var firstName = "";
    var lastName = "";
    var empId = 0;
    var queryEmployees = `SELECT id, first_name, last_name FROM EMPLOYEE ORDER BY last_name, first_name`;
    
    connection.query(queryEmployees, function(err, res) 
    {
        for (var i = 0; i < res.length; i++) 
        {  
            employees.push(res[i].id + " " + res[i].first_name + " " + res[i].last_name);             
        }     

        inquirer.prompt(
        {
            name: "employee",
            type: "list",
            message: "What is the id of the employee would you like to delete?",
            choices: employees
        })
        .then(function({employee}) 
        {
            var employeeName = employee.split(" ");
            var empId = parseInt(employeeName[0]);
            var query = `DELETE FROM EMPLOYEE WHERE id = ${empId};`;
            
            connection.query(query, function(err, res) 
            {
                console.log("                                                                    ");
                console.log("--------------------------------------------------------------------");
                console.log(`        Employee Id: ${employeeName[0]}                             `);
                console.log(`        Employee First Name: ${employeeName[1]}                     `);
                console.log(`        Employee Last Name: ${employeeName[2]}                      `);
                console.log(`        has been deleted from the database`                          );
                console.log("--------------------------------------------------------------------");
                console.log("                                                                    ");
                runMenu();
            });
        }); 
    }); 
}

function updateEmployeeRole()
{
    var employees = [];
    var employeeIds = [];
    var depts = ["None"];
    var roles = ["None"];
    var roleIds = [];
    var managers = ["None"];
    var managerIds = [];
    var deptIds = [];
     
    var queryEmployees = `SELECT id, first_name, last_name FROM employee ORDER BY id`;
    connection.query(queryEmployees, function(err, res)
    {
        for (var i=0; i < res.length; i++)
        {
            employees.push(res[i].first_name + " " + res[i].last_name);
            employeeIds.push({id: res[i].id,
                      first_name: res[i].first_name,
                       last_name: res[i].last_name});
        }

        inquirer.prompt(
        {
            name: "employee",
            type: "list",
            message: "What employee would you like to update?",
            choices: employees
        })
        .then(function({employee})  
        {
            var queryDepts = `SELECT id, name FROM DEPARTMENT ORDER BY id`;
            connection.query(queryDepts, function(err, res) 
            {
                for (var i = 0; i < res.length; i++) 
                {  
                  depts.push(res[i].name); 
                }
        
                inquirer.prompt(
                {
                    name: "dept",
                    type: "list",
                    message: "What department would you like to add the employee to?",
                    choices: depts
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
                            roleIds.push({id: res[z].id,
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
                                managerIds.push({id: res[y].id,
                                         first_name: res[y].first_name,
                                          last_name: res[y].last_name});
                            }

                            inquirer.prompt(
                            [{
                                name: "manager",
                                type: "list",
                                message: "Who will be the employee's manager?",
                                choices: managers
                            },
                            {  
                                name: "role",
                                type: "list",
                                message: "What role would you like to the employee to have?",
                                choices: roles
                            }])
                            .then(function({manager,role}) 
                            {
                                if (role !== "None")
                                {
                                    for (var i = 0; i < roleIds.length; i++)
                                    {
                                        if (role === roleIds[i].title)
                                        {
                                            roleId = roleIds[i].id;
                                            break;
                                        }
                                    }
                                }    

                                if (manager !== "None")
                                {
                                    var managerName = manager.split(" ");
                                    for (var j = 0; j < managerIds.length; j++)
                                    {
                                        if ((managerName[0] === managerIds[j].first_name) && (managerName[1] === managerIds[j].last_name))
                                        {
                                            managerId = managerIds[j].id;
                                            break;
                                        }
                                    }
                                }

                                var employeeName = employee.split(" ");
                                for (var k = 0; k < employeeIds.length; k++)
                                {
                                    if ((employeeName[0] === employeeIds[k].first_name) && (employeeName[1] === employeeIds[k].last_name))
                                    {
                                        empId = employeeIds[k].id;
                                        break;
                                    }
                                }
                                
                                var msgDept = dept;
                                var msgRole = role;
                                var msgManager = manager;
                                var finalMessage = "";
                                
                                if (role === "None" && manager === "None")
                                {                                   
                                    finalMessage = "could not be updated";
                                }
                                else if (manager === "None" & role !== "None")
                                {
                                    finalMessage = "has been updated in the database";
                                    var updateRoleQuery = `UPDATE employee SET role_id = ${roleId}` ;
                                    updateRoleQuery += ` WHERE id = ${empId};`
                                    
                                } else 
                                {   
                                    finalMessage = "has been updated in the database";
                                    var updateRoleQuery = `UPDATE employee SET role_id = ${roleId}, manager_id = ${managerId}` ;
                                        updateRoleQuery += ` WHERE id = ${empId};`
                                           
                                }        
                                 
                                if (role === "None" && manager === "None")
                                {
                                    console.log("                                                                    ");
                                    console.log("--------------------------------------------------------------------");
                                    console.log(`        Employee First Name: ${employeeName[0]}                     `);
                                    console.log(`        Employee Last Name: ${employeeName[1]}                      `);
                                    console.log(`        Department: ${msgDept}                                      `);
                                    console.log(`        Manager: ${msgManager}                                      `);
                                    console.log(`        Role: ${msgRole}                                            `);
                                    console.log(`        ${finalMessage}                                             `);
                                    console.log("--------------------------------------------------------------------");
                                    console.log("                                                                    "); 
                                    runMenu(); 
                                }
                                else
                                {
                                    connection.query(updateRoleQuery, function(err, res) 
                                    {
                                        console.log("                                                                    ");
                                        console.log("--------------------------------------------------------------------");
                                        console.log(`        Employee First Name: ${employeeName[0]}                     `);
                                        console.log(`        Employee Last Name: ${employeeName[1]}                      `);
                                        console.log(`        Department: ${msgDept}                                      `);
                                        console.log(`        Manager: ${msgManager}                                      `);
                                        console.log(`        Role: ${msgRole}                                            `);
                                        console.log(`        ${finalMessage}                                             `);
                                        console.log("--------------------------------------------------------------------");
                                        console.log("                                                                    "); 
                                        runMenu(); 
                                    });
                                }      
                            });
                        });
                    });
                });
            });    
        });
    });        
}        