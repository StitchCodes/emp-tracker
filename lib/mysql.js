var mysql = require('mysql');
const clear = require('clear');



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Palaponce12!",
  database: "company"
});

module.exports = {
 Select: (tablename) => {
  con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM "+tablename, function (err, result, fields) {
        if (err) throw err;
        console.log("\n");
        console.table(result);
      });
    });
  },
  SelectRoles: () => {
  con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT id,title,salary,(select name from department where id = department_id) as department FROM role", function (err, result, fields) {
        if (err) throw err;
        console.log("\n");
        console.table(result);
      });
    });
  },
  SelectEmployees: () => {
  con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT em.id, first_name, last_name, r.title role, r.salary as salary, d.name as department, (Select CONCAT(e.last_name, ', ', e.first_name) from employee e where e.id = em.manager_id) as Manager FROM company.employee em INNER JOIN role r ON em.role_id = r.id INNER JOIN department d ON d.id = r.department_id;", function (err, result, fields) {
        if (err) throw err;
        console.log("\n");
        console.table(result);
      });
    });
  },
  InsertDepartment: (department) => {
  con.connect(function(err) {
      if (err) throw err;
      con.query("INSERT INTO `company`.`department`(`id`, `name`) VALUES (NULL, '"+department+"');", function (err, result, fields) {
        if (err) throw err;
        console.log("\n Department added succesfully!");
      });
    });
  },
  InsertRole: (title,salary,department) => {
  con.connect(function(err) {
      if (err) throw err;
      con.query("INSERT INTO `company`.`role`(`id`,`title`,`salary`,`department_id`)VALUES(NULL,'"+title+"','"+salary+"',(Select id from department where name = '"+department+"'));", function (err, result, fields) {
        if (err) throw err;
        console.log("\n Role added succesfully!");
      });
    });
  },
  InsertEmployee: (first_name,last_name,role_id,manager_id) => {
  con.connect(function(err) {
      if (err) throw err;
      con.query("INSERT INTO `company`.`employee`(`id`,`first_name`,`last_name`,`role_id`,`manager_id`)VALUES(NULL,'"+first_name+"','"+last_name+"',(Select id from role where title = '"+role_id+"'),(Select id from employee e where e.first_name = '"+manager_id+"'));", function (err, result, fields) {
        if (err) throw err;
        console.log("\n Employee added succesfully");
      });
    });
  }
};

