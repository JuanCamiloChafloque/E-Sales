const express = require("express");
const db = require("./config/database");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/errors");

dotenv.config();

//Init Routes
const users = require("./routes/users");
const categories = require("./routes/categories");
const products = require("./routes/products");
const clients = require("./routes/clients");
const sales = require("./routes/sales");

//Database init
db();

//Express server init
const app = express();
const PORT = process.env.PORT || 5000;

//Multer Middleware
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(
  multer({ storage: fileStorage, fileFilter: imageFilter }).single("image")
);
app.use(
  "/uploads/products",
  express.static(path.join(__dirname, "uploads", "products"))
);

//Middlewares
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes asignation
app.use("/api/v1/users", users);
app.use("/api/v1/categories", categories);
app.use("/api/v1/products", products);
app.use("/api/v1/clients", clients);
app.use("/api/v1/sales", sales);

//Error handler middleware
app.use(errorMiddleware);

//Listener
app.listen(PORT, () => {
  console.log(
    "Node server started on " + process.env.NODE_ENV + " mode on port " + PORT
  );
});
