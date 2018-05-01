// Require dependencies
require("dotenv").config();
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
var fs = require("fs");

// Declare global variables
var productArr = []; // Array to store queried products locally

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
                message: "Please enter the Item ID of the product you would like to buy:",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        // Check that item ID is a valid inventory item
                        for (var i = 0; i < productArr.length; i++) {
                            if (productArr[i].item_id === parseInt(value)) {
                                return true;
                            }
                        }
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "Please enter the quantity you would like to buy:",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(answer) {
            // Check inventory quantity against requested order
            for (var i = 0; i < productArr.length; i++) {
                if (productArr[i].item_id === parseInt(answer.id)) {
                    // Condition when inventory is too low
                    if (productArr[i].stock_quantity < parseInt(answer.quantity)) {
                        console.log("Insufficient quantity in stock, please try again!");
                        bamazon.prompt();
                    }
                    // Condition when inventory is OK
                    else {
                        // Update SQL database
                        var newStockQuantity = productArr[i].stock_quantity - parseInt(answer.quantity);
                        var query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?";
                        connection.query(query, [newStockQuantity, parseInt(answer.id)]);

                        // Inform user of total order cost
                        var total = productArr[i].price * parseInt(answer.quantity);
                        console.log("Thank you for your order!\nOrder total: $" + total.toFixed(2));
                        console.log("========================================");

                        // Goto checkout for new order or quit
                        bamazon.checkout();
                    }
                }
            }
        });
    },
    checkout: function() {
        inquirer.prompt({
            name: "restart",
            type: "confirm",
            message: "Would you like to place another order?"
        }).then(function(answer) {
            if (answer.restart) {
                // Restart the order process
                bamazon.start();
            }
            else {
                console.log("Thanks for shopping!");
                connection.end();
            }
        });
    }
};