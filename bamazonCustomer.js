// Require dependencies
require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
var fs = require("fs");

// Declare global variables
var productArr = [];

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
        bamazon.display(bamazon.prompt);
    },
    // Display inventory of items
    display: function(callback) {
        var query = "SELECT * FROM products";
        connection.query(query, function(err, result) {
            // Clear the productArr for each new query
            productArr = [];
            for (var i = 0; i < result.length; i++) {
                productArr.push(result[i]);
            }
            // console.log(productArr);
            // console.table(productArr);
            console.table(result);
        });
        // Goto prompt via callback
        setTimeout(callback, 500);
    },
    // Prompt user for input
    prompt: function() {
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "Please enter the Item ID of the product you would like to buy:"
            },
            {
                name: "quantity",
                type: "input",
                message: "Please enter the quantity you would like to buy:"
            }
        ]).then(function(answer) {
            console.log(answer.id + ", " + answer.quantity);
            // Check inventory quantity against requested order
            for (var i = 0; i < productArr.length; i++) {
                if (productArr[i].item_id === parseInt(answer.id)) {
                    if (productArr[i].stock_quantity < parseInt(answer.quantity)) {
                        console.log("Insufficient quantity in stock, please try again!");
                        bamazon.prompt();
                    }
                }
            }
        });
    }
};