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
  console.log("req.params");
  console.log(req.params);
  console.log(req.headers);
  let carId = req.params.carid;
  console.log("carId");
  console.log(carId);

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
  console.log(req.body);
  // let name = req.body.name || "";
  let fullname = req.body.name + " is a name";
  if (req.body.price === undefined) {
    return res.status(400).send({
      message: 'This is an error!'
    });
  }
  let sum = req.body.price * 1.19;
  res.send('post a car' + price);
});

router.put('/', function(req, res, next) {
  res.send('update/put a car');
});

router.delete('/', function(req, res, next) {
  res.send('delete a car');
});

// Base-URL: localhost:3000 --> www.myseite.de
// Route /cars
// --> localhost:3000/cars/trailers
router.get('/trailers', function(req, res, next) {
  res.send('get the trailers');
});

module.exports = router;

