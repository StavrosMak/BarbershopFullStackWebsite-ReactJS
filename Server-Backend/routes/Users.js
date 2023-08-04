const express = require("express");
const router = express.Router();
const db = require("../server"); // Correct the path to your server.js file


router.get('/customer/:userID', (req, res) => {
  const userID = req.params.userID;

  db.query(
    'SELECT * FROM Customers WHERE UserID = ?',
    [userID],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      } else {
        res.send(result);
      }
    }
  );
});


router.put('/updateCustomerInfo', (req, res) => {
  const { UserID, name, phNumber } = req.body;
  db.query(
    'UPDATE Customers SET name = ?, phNumber = ? WHERE UserID = ?',
    [name, phNumber, UserID],
    (error, results) => {
      if (error) {
        console.error('Error updating customer info:', error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'Profile info updated successfully!' });
      }
    }
  );
});


router.post('/customerInfo', (req, res) => {
  const { UserID } = req.body;
  db.query('SELECT * FROM Customers where UserID=?', [UserID], (error, results) => {
    if (error) {
      console.error('Error retrieving customer data:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

router.post('/role', (req, res) => {
  const { UserID } = req.body;
  db.query('SELECT Role FROM Users where UserID=?', [UserID], (error, results) => {
    if (error) {
      console.error('Error retrieving customer data:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});


module.exports = router;

