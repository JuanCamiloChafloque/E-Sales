const Category = require("../models/Category");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//@desc     Create a category
//@route    POST /api/v1/categories
//@access   public
exports.createCategory = catchAsyncErrors(async (req, res, next) => {
  const { title, description } = req.body;
  if (!title || !description) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const category = {
    title,
    description,
  };

  const newCategory = await Category.create(category);
  res.status(201).json({ success: true, category: newCategory });
});

//@desc     Get all categories
//@route    GET /api/v1/categories?keyword={title}
//@access   public
exports.getAllCategories = catchAsyncErrors(async (req, res, next) => {
  const { keyword } = req.query;

  let categories = await Category.find({});

  if (keyword) {
    const exp = new RegExp(keyword, "i");
    categories = await Category.find({ title: exp });
  }

  res.status(200).json({ success: true, categories: categories });
});

//@desc     Get a category by Id
//@route    GET /api/v1/categories/:id
//@access   public
exports.getCategoryById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    return next(
      new ErrorHandler("The category with id " + id + " does not exist", 404)
    );
  }

  res.status(200).json({ success: true, category: category });
});

//@desc     Update a category by Id
//@route    PUT /api/v1/categories/:id
//@access   public
exports.updateCategoryById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const category = await Category.findById(id);

  if (!category) {
    return next(
      new ErrorHandler("The category with id " + id + " does not exist", 404)
    );
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { title, description },
    { new: true, runValidators: true }
  );

  res.status(200).json({ success: true, category: updatedCategory });
});

//@desc     Delete a category by Id
//@route    DELETE /api/v1/categories/:id
//@access   public
exports.deleteCategoryById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    return next(
      new ErrorHandler("The category with id " + id + " does not exist", 404)
    );
  }

  await Category.deleteOne({ _id: id });
  res
    .status(200)
    .json({ success: true, message: "Category Deleted Successfully" });
});
