var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log("headers:", req.headers);
  res.send('respond with a resource ');
});

router.post('/', function(req, res, next) {
  console.log("body_", req.body.name);
  res.send('added new data' + req.body.name);
});

router.delete('/:id', function(req, res, next) {
  console.log("Param id: " + req.params.id)
  res.send('delete new data with id '+ req.params.id);
});

router.get('/detail', function(req, res, next) {
  res.send('detail');
});

module.exports = router;
