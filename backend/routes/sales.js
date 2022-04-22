const express = require("express");
const router = express.Router();

//Controllers
const { registerSale, getSaleById } = require("../controllers/saleController");

router.route("/").post(registerSale);
router.route("/:id").get(getSaleById);

module.exports = router;
