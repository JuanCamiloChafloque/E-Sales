const express = require("express");
const db = require("./config/database");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/errors");

dotenv.config();

//Init Routes
const users = require("./routes/users");
const categories = require("./routes/categories");

//Database init
db();

//Express server init
const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes asignation
app.use("/api/v1/users", users);
app.use("/api/v1/categories", categories);

//Error handler middleware
app.use(errorMiddleware);

//Listener
app.listen(PORT, () => {
  console.log(
    "Node server started on " + process.env.NODE_ENV + " mode on port " + PORT
  );
});
