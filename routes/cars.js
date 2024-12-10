var express = require('express');
var router = express.Router();

let cars = [
  { id: 0, name: "BMW", type: "320i", color: "blue"},
  { id: 1, name: "Audi", type: "A6", color: "black"},
  { id: 2, name: "Opel", type: "Astra", color: "white"}
];

// Base-URL: localhost:3005 --> www.mysite.de
// Route /cars
// --> localhost:3005/cars/
router.get('/', function(req, res, next) {
  res.send(cars);
});

// localhost:3005/cars/carid/2
router.get('/carid/:carid', function(req, res, next) {
  console.log("req.params",req.params);
  console.log("req.headers",req.headers);
  let carId = req.params.carid;
  console.log("carId", carId);

  let car = [];
  for (let n = 0 ; n < cars.length ; n+=1) {
    if (cars[n].id === parseInt(carId)) {
      car = cars[n];
      break
    }
  }

  car = cars.find( car => car.id === parseInt(carId) );
  if (car === undefined) {
    car = [];
  }
  console.log("car");
  console.log(car);
  res.send(car);
});

router.post('/', function(req, res, next) {
  if (req.body.hasOwnProperty("name")
      && req.body.hasOwnProperty("type")
      && req.body.hasOwnProperty("color")) {
        let id = cars[cars.length -1].id + 1;
        let newCar = { id: id, name: req.body.name, type: req.body.type, color: req.body.color}
        console.log("id ", id, " newcar: ", newCar);
        cars.push(newCar);
        res.send("new car added with id: "+ id)
  } else {
    res.status(400).send("attributes missing");
  }
});


router.put('/', function(req, res, next) {
  if (req.body.hasOwnProperty("id")
    && req.body.hasOwnProperty("name")
    && req.body.hasOwnProperty("type")
    && req.body.hasOwnProperty("color")) {
      console.log(req.body);
      let carToUpdate = cars.find(car => car.id === parseInt(req.body.id));
      console.log(carToUpdate);
      if (carToUpdate === undefined) {
        return res.send("ERROR: no car with id: "+ req.body.id)
      }
      carToUpdate.name = req.body.name; 
      carToUpdate.type = req.body.type; 
      carToUpdate.color = req.body.color; 
      res.send("new car added with id: "+ req.body.id)
    } else {
      res.status(400).send("attributes missing");
    }
});


router.delete('/:id', function(req, res, next) {
  if (req.params.hasOwnProperty("id")) {
        let id = parseInt(req.params.id);
        let idx = cars.find(car => car.id === id);
        if (idx === undefined) {
          return res.send("no car with id: "+ id)
        }
        cars = cars.filter(car => car.id !== id);
        res.send("car deleted with id: "+ id)
  } else {
    res.status(404).send("attributes missing");
  }
});

module.exports = router;

