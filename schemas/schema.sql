CREATE DATABASE company_db;

USE company_db;

CREATE TABLE employee(
   id INT NOT NULL AUTO_INCREMENT,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id int,
   manager_id int,
   PRIMARY KEY ( id ),
   FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE department(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL,
   PRIMARY KEY ( id )
);

CREATE TABLE role(
   id INT NOT NULL AUTO_INCREMENT,
   title VARCHAR(30) NOT NULL,
   salary DECIMAL(7,2) NOT NULL,
   department_id int,
   PRIMARY KEY ( id ),
   FOREIGN KEY (department_id) REFERENCES department(id)
);