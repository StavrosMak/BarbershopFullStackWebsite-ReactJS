// server
const port = 3001;

const express = require('express');
const mysql = require("mysql");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "BarbershopDB2",

})

app.get('/api/cards', (req, res) => {
  const query = 'SELECT * FROM Services';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Failed to fetch data from the database' });
    } else {
      res.json(results);
    }
  });
});


app.post('/customerInfo', (req, res) => {
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

app.post('/updateCustomerInfo', (req, res) => {
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

app.post('/myappointments/cancel', (req, res) => {

  const { AppID } = req.body;

  db.query('delete from Appointments where AppointmentID=?', [AppID],

    (error, results) => {
      if (error) {
        console.log("Error on cancel.", error);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json({ message: 'Appointment cancelled successfully' });
        
      }
    }
  );
})

app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  // console.log("registered!");

  db.query(
    "INSERT INTO Users (username, password, email) VALUES (?, ?, ?)",
    [username, password, email],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      } else {
        const userID = result.insertId; 
        // console.log(result);
        // Insert into Customers table with the UserID
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




app.post('/book', (req, res) => {
  const { UserID, name, phone, email, date, time } = req.body;

  // Retrieve the barberID
  const barberID = 1; // To be Replaced

  db.query(
    `INSERT INTO Appointments (UserID, EmployeeID, Date, Time, Name, Phone, Email)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [UserID, barberID, date, time, name, phone, email],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send('Error booking appointment');
        return;
      }

      res.status(200).send('Appointment booked successfully');
    }
  );
});


app.get('/appointments', (req, res) => {
  const date = req.query.date;
  // console.log("Received:", date);
  db.query('select e.name,Date,Hours from AvailabilityList,Employees e WHERE Date = ?', [date], (err, result) => {
    if (err) {
      console.log(err);
      res.send({ err: err });
    } else {
      // console.log("Res", result);
      res.send(result);
    }
  });
});


app.post('/myappointments', (req, res) => {
  const { UserID } = req.body;
  // db.query('SELECT a.AppointmentID,a.date, u.name, u.phNumber, a.time FROM Appointments a LEFT JOIN Customers u ON a.UserID = u.UserID WHERE a.UserID = ?', [UserID], (err, result) => {
    db.query('SELECT a.AppointmentID,a.date, a.name, a.Phone, a.time FROM Appointments a WHERE a.UserID = ?', [UserID], (err, result) => {
  
  if (err) {
      console.log(err);
      res.send({ err: err });
    } else {
      // console.log("Result:", result);
      res.send(result);
    }
  });
});

app.get('/customer/:userID', (req, res) => {
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



app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;


  db.query(
    "SELECT * FROM Users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      } else {
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send({ message: "Wrong username/password combination!" });
        }
      }
    }
  );
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
