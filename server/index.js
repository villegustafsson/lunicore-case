//import { importJSON } from "./importJSON.js";

const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Create connection with SQL-server
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "carshopSystem",
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/carmodels", (req, res) => {
  console.log(req.body);
  const brand = req.body.brand;
  const model = req.body.model;
  const price = req.body.price;

  db.query(
    "INSERT INTO carmodels (brand, model, price) VALUES (?, ?, ?)",
    [brand, model, price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // Specificera vilka värden
        res.send(req.body);
      }
    }
  );
});

app.get("/carmodels", (req, res) => {
  db.query("SELECT * FROM carmodels", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// Funkar, men ger fel i terminalen
app.delete("/carmodels", (req, res) => {
  /*
  PSUEDOKOD
  Ta reda på carmodel med id's parametrar, spara dessa
  Ta bort carmodel med id
  res.send(carmodel)

  db.query("SELECT FROM carmodels WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      car = result;
      
    }
  });
  */

  var id = req.body.id;

  db.query("DELETE FROM carmodels WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/total_sales", (req, res) => {
  var employees = [];
  var sales = [];
  var carmodels = [];

  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      employees = result;

      db.query("SELECT * FROM sales", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          sales = result;

          db.query("SELECT * FROM carmodels", (err, result) => {
            if (err) {
              console.log(err);
            } else {
              carmodels = result;

              for (var i = 0; i < employees.length; i++) {
                employees[i].sales = 0;
              }

              for (var i = 0; i < sales.length; i++) {
                var sale = sales[i];

                var saleCar = carmodels[sale.carmodelId - 1];
                var saleAmount = saleCar.price;
                var employeeId = sales[i].employeeId;
                var employee = employees[employeeId - 1];

                employee.sales += saleAmount;
              }
              res.send(employees);

              //res.send("HEJ");
              res.end();
            }
          });
        }
      });
    }
  });
});

// EXTRA: endpoint for importing the data from the JSON file into SQL
app.get("/loadJSON", (req, res) => {
  importJSON(res);
  res.send("JSON imported succesfully!");
  res.end();
});

// EXTRA: endpoint for reseting the data in SQL
app.get("/emptyDB", (req, res) => {
  /* Denna funkar men då måste du lägga till den manuellt igen
  db.query("DROP DATABASE carshopSystem;", (err, result) => {
    if (err) {
      throw err;
    }
  });
  */

  // Deletes table for carmodels
  db.query("DROP TABLE carmodels;", (err, result) => {
    if (err) {
      throw err;
    }
  });

  // Deletes table for employees
  db.query("DROP TABLE employees;", (err, result) => {
    if (err) {
      throw err;
    }
  });

  // Deletes table for sales
  db.query("DROP TABLE sales;", (err, result) => {
    if (err) {
      throw err;
    }
  });

  res.send("DB emptied succesfully!");
  res.end();
});

function importJSON(res) {
  // Create database
  /*
  db.connect(function (err) {
    console.log("Connected!");
    db.query("CREATE SCHEMA `carshopSystem` ;", (err, result) => {
      if (err) {
        throw err;
      }
    });
  });
  */

  // Creates table for carmodels
  db.query(
    "CREATE TABLE `carshopSystem`.`carmodels` ( `id` INT NOT NULL AUTO_INCREMENT,`brand` TEXT(255) NOT NULL,`model` TEXT(255) NOT NULL,`price` INT NOT NULL,PRIMARY KEY (`id`));",
    (err, result) => {
      if (err) {
        throw err;
      }
    }
  );

  // Creates table for employees
  db.query(
    "CREATE TABLE `carshopSystem`.`employees` ( `id` INT NOT NULL AUTO_INCREMENT, `name` TEXT(255) NOT NULL, PRIMARY KEY (`id`));",
    (err, result) => {
      if (err) {
        throw err;
      }
    }
  );

  // Creates table for sales
  db.query(
    "CREATE TABLE `carshopSystem`.`sales` ( `id` INT NOT NULL AUTO_INCREMENT, `employeeId` INT NOT NULL, `carmodelId` INT NOT NULL, PRIMARY KEY (`id`));",
    (err, result) => {
      if (err) {
        throw err;
      }
    }
  );

  var dataToImport = require("./data.json");

  // employees
  var employeeList = dataToImport.carshop.employees;
  for (var e in employeeList) {
    const name = employeeList[e].name;
    db.query(
      "INSERT INTO employees (name) VALUES (?)",
      [name],
      (err, result) => {
        if (err) {
          //console.log("FEL: " + err);
          throw err;
        } else {
          //res.send("Employee: Name: " + name + "inserted");
        }
      }
    );
  }
  // carmodels
  var carmodelList = dataToImport.carshop.carmodels;
  for (var c in carmodelList) {
    const brand = carmodelList[c].brand;
    const model = carmodelList[c].model;
    const price = carmodelList[c].price;
    db.query(
      "INSERT INTO carmodels (brand, model, price) VALUES (?, ?, ?)",
      [brand, model, price],
      (err, result) => {
        if ((err, result)) {
          //console.log("FEL: " + err);
          return;
        } else {
          //result.send("Carmodel: Brand: " + brand + " Model: " +model + " Price: " +price +  " inserted");
        }
      }
    );
  }
  // sales
  var salesList = dataToImport.carshop.sales;
  for (var s in salesList) {
    const employeeId = salesList[s].employee_id;
    const carmodelId = salesList[s].carmodel_id;
    db.query(
      "INSERT INTO sales (employeeId, carmodelId) VALUES (?, ?)",
      [employeeId, carmodelId],
      (err, result) => {
        if ((err, result)) {
          //console.log("FEL: " + err);
        } else {
          //result.send("Sale: EmployeeId: " +employeeId +" CarmodelId: " +carmodelId + " inserted");
        }
      }
    );
  }
}

app.listen(3001, () => {
  console.log("Yey, server is running on port 3001");
});
