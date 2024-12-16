var express = require('express');
var router = express.Router();

const path = require('path');
var sqlite3 = require('sqlite3');
const dbPath = path.resolve(__dirname, 'cars.db');
const { uuid } = require('uuidv4');

console.log("__dirname");
console.log(dbPath);


let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the cars database.');
});

let cars = [];
let id = 0;

/* GET users listing. */
// localhost:3000/api/cars/
router.get('/', function(req, res, next) {
  res.send('result of car resource.');
});

// localhost:3000/api/carsdb/all
router.get('/all', function(req, res, next) {
  let query = "SELECT * FROM cars";
  db.all(query, [], (err, rows) => {
    if (err) {
      res.send( err.message );
    }
    console.log(rows);
    res.send( { success: "ok", cars: rows });
  });
});

// localhost:3000/api/carsdb/all
router.get('/name', function(req, res, next) {
  console.log (req.headers);
  let name = req.headers.name || "";
  console.log(query);
  db.all("SELECT * FROM cars WHERE name = ?", [name], (err, rows) => {
    if (err) {
      res.send( err.message );
    }
    console.log(rows);
    res.send( { success: "ok", cars: rows });
  });
});

// Get mit Params
// localhost:3000/api/cars/all
router.get('/all/:color', function(req, res, next) {
  console.log(req.params);
  res.send('send all cars with color ' + req.params.color);
});

// Get mit Header
// localhost:3000/api/cars/header
router.get('/header', function(req, res, next) {
  console.log(req.headers);
  res.send('send all cars with color ' + req.headers.color + ' of type ' + req.headers.type);
});

// Post legt neue Daten an
// localhost:3000/api/carsdb/
router.post('/newcar', function(req, res, next) {  let color = req.body.color || "black";
  console.log(req.body);
  console.log(req.body.name);

  if (  req.body.hasOwnProperty("name")
      && req.body.hasOwnProperty("type")
      && req.body.hasOwnProperty("powerKw")
      && req.body.hasOwnProperty("fin")) {
    let name = req.body.name;
    let type = req.body.type;
    let powerKw = req.body.powerKw;
    let fin = req.body.fin;
    let query = "INSERT INTO cars (name, type, fin, powerKw) VALUES ( '" + name  + "', '" + type + "', '" + fin +  "', " + powerKw + ");";
    // "INSERT INTO cars (name, type, fin, powerKw) VALUES ('BMW', '320i', 'FIN383883', 184)
    console.log(query);
    db.run (query,  function(err) {
      if (err) {
        return res.send(err.message);
      }
      // get the last insert id
      console.log("row added");
      res.send({success: "ok", message: "row added"});
    });

  } else {
    res.send({ success: "error", message: "attributes missing"});
  }
});

// Update der Daten legt neue Daten an
// localhost:3000/api/cars/header
router.put('/', function(req, res, next) {  let color = req.body.color || "black";
  console.log(uuid());

if (  req.body.hasOwnProperty("id")
     && req.body.hasOwnProperty("name")
     && req.body.hasOwnProperty("type")
     && req.body.hasOwnProperty("powerKw")
     && req.body.hasOwnProperty("fin")) {
    let carId = req.body.id;
    let name = req.body.name;
    let type = req.body.type;
    let powerKw = req.body.powerKw;
    let fin = req.body.fin;

    let query = "UPDATE cars SET name='" + name + "', type='" + type + "', powerKw=" + powerKw+ ", fin='" + fin + "' WHERE id = " + carId;
    console.log(query);
    db.run (query,  function(err) {
      if (err) {
        return res.send(err.message);
      }
      // get the last insert id
      console.log("row updated");
      res.send({success: "ok", message: "row updated"});
    });
  } else {
    res.send({ success: "error", message: "attributes missing"});
  }
});

router.delete('/:id', function(req, res, next) {  let color = req.body.color || "black";
  if (  req.params.hasOwnProperty("id")) {
    let carId = req.params.id;
    let query = "DELETE FROM cars WHERE id = " + carId;
    console.log(query);
    db.run (query,  function(err) {
      if (err) {
        return res.send(err.message);
      }
      // get the last insert id
      console.log("row deleted");
      res.send({success: "ok", message: "row deleted"});
    });
  } else {
    res.send({ success: "error", message: "attributes missing"});
  }
});

module.exports = router;
