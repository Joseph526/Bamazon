// Require dependencies
require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");

// MySQL DB Connection Information
var connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PW,
    database: process.env.MYSQL_DB
});

// Initiate MySQL Connection.
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    bamazon.start();
});

// Declare functions
var bamazon = {
    start: function() {
        // Goto display
        bamazon.display();
    },
    // Display inventory of items
    display: function() {
        var query = "SELECT * FROM products";
        connection.query(query, function(err, result) {
            for (var i = 0; i < result.length; i++) {
                console.log(result[i]);
            }
        });
    }
};