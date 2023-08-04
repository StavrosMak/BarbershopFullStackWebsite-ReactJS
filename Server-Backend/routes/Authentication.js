const express = require("express");
const router = express.Router();
const db = require("../server"); // Correct the path to your server.js file

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM Users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      } else {
        if (result.length > 0) {
          res.json(result);
        } else {
          res.status(401).json({ message: "Wrong username/password combination!" });
        }
      }
    }
  );
});

router.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
 
  db.query(
    "INSERT INTO Users (username, password, email) VALUES (?, ?, ?)",
    [username, password, email],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      } else {
        const userID = result.insertId;
        db.query(
          "INSERT INTO Customers (UserID, name, phNumber) VALUES (?, ?, '-')",
          [userID, username],
          (err, customerResult) => {
            if (err) {
              console.log(err);
              res.send({ err: err });
            } else {
              res.send(customerResult);
            }
          }
        );
      }
    }
  );

});


module.exports = router;
