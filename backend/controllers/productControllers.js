const Product = require("../models/Product");
const path = require("path");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fileHelper = require("../utils/file");

//@desc     Create a product
//@route    POST /api/v1/products
//@access   public
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let name = "";

  if (req.file) {
    name = req.file.path;
  }

  const product = {
    title: req.body.title,
    description: req.body.description,
    image: name,
    purchaseCost: req.body.purchaseCost,
    saleCost: req.body.saleCost,
    stock: req.body.stock,
    category: req.body.category,
    points: req.body.points,
  };

  const newProduct = await Product.create(product);
  res.status(201).json({ success: true, product: newProduct });
});

//@desc     Get all products
//@route    GET /api/v1/products?keyword={title}
//@access   public
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const { keyword } = req.query;

  let products = await Product.find({}).populate("category");

  if (keyword) {
    const exp = new RegExp(keyword, "i");
    products = await Product.find({ title: exp });
  }

  res.status(200).json({ success: true, products: products });
});

//@desc     Get a product by Id
//@route    GET /api/v1/products/:id
//@access   public
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return next(
      new ErrorHandler("The product with id " + id + " does not exist", 404)
    );
  }

  res.status(200).json({ success: true, product: product });
});

//@desc     Get a product image by Id
//@route    GET /api/v1/products/:id/img
//@access   public
exports.getProductImage = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return next(
      new ErrorHandler("The product with id " + id + " does not exist", 404)
    );
  }

  res.status(200).sendFile(path.resolve(product.image));
});

//@desc     Update a product by Id
//@route    PUT /api/v1/products/:id
//@access   public
exports.updateProductById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(
      new ErrorHandler("The product with id " + id + " does not exist", 404)
    );
  }

  let name = product.image;
  if (req.file) {
    fileHelper.deleteFile(product.image);
    name = req.file.path;
  }

  let updatedProduct = {
    title: req.body.title,
    description: req.body.description,
    image: name,
    purchaseCost: req.body.purchaseCost,
    saleCost: req.body.saleCost,
    stock: req.body.stock,
    category: req.body.category,
    points: req.body.points,
  };

  updatedProduct = await Product.findByIdAndUpdate(id, updatedProduct, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, product: updatedProduct });
});

//@desc     Update a product stock
//@route    PUT /api/v1/products/:id/stock
//@access   public
exports.updateProductStock = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { stock } = req.body;

  if (!stock) {
    return next(new ErrorHandler("Enter the quantity of the stock", 400));
  }

  const product = await Product.findById(id);

  if (!product) {
    return next(
      new ErrorHandler("The product with id " + id + " does not exist", 404)
    );
  }

  const newStock = product.stock + stock;

  updatedProduct = await Product.findByIdAndUpdate(
    id,
    { stock: newStock },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, product: updatedProduct });
});

//@desc     Delete a product by Id
//@route    DELETE /api/v1/products/:id
//@access   public
exports.deleteProductById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) {
    return next(
      new ErrorHandler("The product with id " + id + " does not exist", 404)
    );
  }

  fileHelper.deleteFile(product.image);

  await Product.deleteOne({ _id: id });
  res
    .status(200)
    .json({ success: true, message: "Product Deleted Successfully" });
});
