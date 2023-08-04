const express = require("express");
const router = express.Router();
const db = require("../server"); // Correct the path to your server.js file


router.post('/api/availability', (req, res) => {
    const { EmployeeID, date, Hour } = req.body;

    db.query(
        `INSERT INTO AvailabilityList (EmployeeID, Date, Hours) VALUES (?, ?, ?)`,
        [EmployeeID, date, Hour],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send('Error inserting into availabilityList');
                return;
            }

            res.status(200).send('Inserted into availabilityList successfully');
        }
    );
});


router.delete('/myappointments/cancel', (req, res) => {

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

router.put('/appointments/:id', (req, res) => {
    const appointmentID = req.params.id;
    const { name, date, time, phone } = req.body;

    db.query(
        'UPDATE Appointments SET name = ?, date = ?, time = ?, phone= ? WHERE AppointmentID = ?',
        [name, date, time, phone, appointmentID],
        (error, results) => {
            if (error) {
                console.error('Error updating appointment:', error);
                res.status(500).json({ error: 'Internal server error' });
            } else {
                res.json({ message: 'Appointment updated successfully!' });
            }
        }
    );
});


router.post('/book', (req, res) => {
    const { UserID, EmployeeID, name, phone, email, date, time } = req.body;

    db.query(
        `INSERT INTO Appointments (UserID, EmployeeID, Date, Time, Name, Phone, Email)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [UserID, EmployeeID, date, time, name, phone, email],
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


router.get('/appointments', (req, res) => {
    const date = req.query.date;
    db.query('select e.EmployeeID,e.name,Date,Hours from AvailabilityList,Employees e WHERE Date = ?', [date], (err, result) => {
        if (err) {
            console.log(err);
            res.send({ err: err });
        } else {
            res.send(result);
        }
    });
});


router.post('/myappointments', (req, res) => {
    const { UserID } = req.body;
    db.query('SELECT a.AppointmentID,a.date, a.name, a.Phone, a.time FROM Appointments a WHERE a.UserID = ?', [UserID], (err, result) => {
        if (err) {
            console.log(err);
            res.send({ err: err });
        } else {
            res.send(result);
        }
    });
});

router.get('/allappointments', (req, res) => {
    db.query('select a.AppointmentID,a.date, a.name, a.Phone, a.time FROM Appointments a ', (err, result) => {
        if (err) {
            console.log(err);
            res.send({ err: err });
        } else {
            res.send(result);
        }
    });
});


module.exports = router;
