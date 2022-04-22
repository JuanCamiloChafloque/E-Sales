const express = require("express");
const router = express.Router();

//Controllers
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/categoryControllers");

router.route("/").post(createCategory).get(getAllCategories);
router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategoryById)
  .delete(deleteCategoryById);

module.exports = router;
