const express = require("express");
const db = require("./config/database");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

//Init Routes

//Database init
db();

//Express server init
const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes asignation

// Error handlers

//Listener
app.listen(PORT, () => {
  console.log(
    "Node server started on " + process.env.NODE_ENV + " mode on port " + PORT
  );
});
