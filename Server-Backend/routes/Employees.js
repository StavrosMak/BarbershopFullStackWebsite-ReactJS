const express = require("express");
const router = express.Router();
const db = require("../server"); // Correct the path to your server.js file

router.get('/api/employees', (req, res) => {
  const query = 'SELECT * FROM Employees';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      res.status(500).json({ error: 'Failed to fetch data from the database' });
    } else {
      res.json(results);
    }
  });
});


module.exports = router;
