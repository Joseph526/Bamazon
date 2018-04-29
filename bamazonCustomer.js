// Require dependencies
require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

// MySQL DB Connection Information
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PW,
    database: "bamazon"
  });
  
  // Initiate MySQL Connection.
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });