const express = require("express");
const router = express.Router();

//Controllers
const {
  registerSale,
  getSaleById,
  getAllSales,
} = require("../controllers/saleController");

router.route("/").post(registerSale).get(getAllSales);
router.route("/:id").get(getSaleById);

module.exports = router;
