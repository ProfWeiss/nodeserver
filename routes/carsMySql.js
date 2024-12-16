var express = require('express');
var router = express.Router();
const pool = require('./mysql');
const { v4: uuidv4 } = require('uuid');

// GET route to fetch all cars
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM cars');
    return res.json({status: "ok", cars: rows});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cars' });
  }
});

router.post('/', async (req, res) => {
  // Objektdestrukturierung
  const { name, type, fin, powerKw, color } = req.body;
  const id = uuidv4();

  // kürzere Alternative zu hasOwnProperty 
  if (!name || !type || !fin || !powerKw || !color) {
    return res.status(400).json({ error: 'Attributes missing' });
  }

  try {
    const query = 'INSERT INTO cars (id, name, type, fin, powerKw, color) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [id, name, type, fin, powerKw, color];
    await pool.query(query, values);
    res.status(201).json({ status: "ok", message: 'Car added successfully', id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add car' });
  }
});

// PUT route to update a car
router.put('/', async (req, res) => {
  const { id, name, type, fin, powerKw, color } = req.body;
  if (!id || !name || !type || !fin || !powerKw || !color) {
    return res.status(400).json({ error: 'Attributes missing' });
  }

  try {
    const query = 'UPDATE cars SET name = ?, type = ?, fin = ?, powerKw = ?, color = ? WHERE id = ?';
    const values = [name, type, fin, powerKw, color, id];
    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json( { status: "ok", message: 'Car updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update car' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM cars WHERE id = ?';
    const [result] = await pool.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'invalid id' });
    }

    res.json({ status: "ok", message: 'Car deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete car' });
  }
});

module.exports = router;
