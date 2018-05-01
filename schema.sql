DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
  item_id int NOT NULL AUTO_INCREMENT,
  product_name varchar(30) NOT NULL,
  department_name varchar(30) NOT NULL,
  price decimal(10,2) NOT NULL,
  stock_quantity int(10) NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("baseball", "sporting_goods", 2.50, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("football", "sporting_goods", 4.00, 70);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("barbecue grill", "home_garden", 100.00, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("lawn chair", "home_garden", 30.00, 55);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("t-shirt", "men_clothing", 1.50, 225);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("gym shorts", "men_clothing", 3.00, 155);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("socks", "men_clothing", 0.50, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("t-shirt", "women_clothing", 1.25, 350);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("sneakers", "women_clothing", 50.00, 30);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("iPhone case", "electronics", 4.99, 225);