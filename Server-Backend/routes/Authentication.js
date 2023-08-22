const express = require("express");
const router = express.Router();
const db = require("../server");
const bcrypt = require('bcrypt');

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM Users WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(401).json({ message: "Wrong username/password combination!" });
      }
      const user = result[0];

      // Compare the provided password with the hashed password
      bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
        if (bcryptErr) {
          console.error('Error comparing passwords:', bcryptErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!isMatch) { return res.status(401).json({ message: 'Wrong username/password combination!' }); }
        return res.json(result);
      });
    }
  );
});

router.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  db.query('SELECT * FROM Users WHERE username = ?', [username], (error, queryResult) => {
    if (error) {return res.status(500).json({ error: 'Internal Server Error' });}

    if (queryResult.length > 0) {
      return res.json({ error: 'Username already exists' });
    } else {
      
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        db.query(
          "INSERT INTO Users (username, password, email) VALUES (?, ?, ?)",
          [username, hashedPassword, email],
          (err, result) => {
            if (err) {
              return res.status(500).json({ error: 'Internal Server Error' });
            } else {
              const userID = result.insertId;
              db.query(
                "INSERT INTO Customers (UserID, name, phNumber) VALUES (?, ?, '-')",
                [userID, username],
                (err, customerResult) => {
                  if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                  } else {
                    return res.json({ message: 'Registration successful' });
                  }
                }
              );
            }
          }
        );
      });
    }
  });
});




module.exports = router;
