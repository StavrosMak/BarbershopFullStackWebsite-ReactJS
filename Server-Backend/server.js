// server
const express = require('express');
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();
const port = process.env.DB_PORT;



// DB Initialize
const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
module.exports = db; // Export the db connection in order to use it to routes.


// Routes
const authRoutes = require("./routes/Authentication");
const appointmentRoute = require("./routes/Appointments");
const UserRoute = require("./routes/Users");
const EmployeesRoute = require("./routes/Employees");
const ServicesRoute = require("./routes/Services");
app.use("/", authRoutes);
app.use("/", appointmentRoute);
app.use("/", UserRoute);
app.use("/", EmployeesRoute);
app.use("/", ServicesRoute);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Display message to server's console.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

