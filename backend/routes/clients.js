const express = require("express");
const router = express.Router();

//Controllers
const {
  registerClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientControllers");

router.route("/").post(registerClient);
router.route("/:id").put(updateClient).delete(deleteClient);

module.exports = router;
