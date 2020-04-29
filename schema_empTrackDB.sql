DROP DATABASE if exists empTrackDB;
CREATE DATABASE empTrackDB;

USE empTrackDB;

CREATE TABLE department (
id		int			auto_increment,
name	varchar(30)	not null,
PRIMARY KEY(id)
);

CREATE TABLE employee (
id			int			auto_increment,
first_name	varchar(30)	not null,
last_name 	varchar(30) not null,
role_id		int,
manager_id	int,
PRIMARY KEY(id)
);

CREATE TABLE role (
id				int			auto_increment,
title			varchar(30),
salary			decimal(10,2),
department_id	int,
PRIMARY KEY(id)
);
