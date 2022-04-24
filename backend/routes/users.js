const express = require("express");
const router = express.Router();

//Controllers
const {
  register,
  login,
  getAllUsers,
} = require("../controllers/userControllers");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(getAllUsers);

module.exports = router;
