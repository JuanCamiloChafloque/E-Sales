const express = require("express");
const router = express.Router();

//Controllers
const {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
} = require("../controllers/userControllers");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(getAllUsers);
router.route("/:id").put(updateUser).get(getUserById);

module.exports = router;
