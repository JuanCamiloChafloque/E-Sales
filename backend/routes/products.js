const express = require("express");
const router = express.Router();

//Controllers
const {
  createProduct,
  getAllProducts,
  getProductById,
  getProductImage,
  updateProductById,
  updateProductStock,
  deleteProductById,
} = require("../controllers/productControllers");

router.route("/").post(createProduct).get(getAllProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById);

router.route("/:id/stock").put(updateProductStock);
router.route("/:id/img").get(getProductImage);

module.exports = router;
