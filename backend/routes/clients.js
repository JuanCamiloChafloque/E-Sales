const express = require("express");
const router = express.Router();

//Controllers
const {
  registerClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clientControllers");

router.route("/").post(registerClient).get(getAllClients);
router.route("/:id").get(getClientById).put(updateClient).delete(deleteClient);

module.exports = router;
