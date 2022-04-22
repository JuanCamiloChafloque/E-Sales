const Sale = require("../models/Sale");
const Product = require("../models/Product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//@desc     Register a sale
//@route    POST /api/v1/sales
//@access   public
exports.registerSale = catchAsyncErrors(async (req, res, next) => {
  //TODO: Ver bien como se hace el manejo de Ids.
  //TODO: Yo diria que el user se coge del admin y el client se coge de la sesion

  const sale = {
    user: req.body.user,
    client: req.body.client,
    details: req.body.details,
  };

  const newSale = await Sale.create(sale);

  //Update Stock
  for (let i = 0; i < newSale.details.length; i++) {
    const product = await Product.findById(newSale.details[i].product);
    await Product.findByIdAndUpdate(
      product._id,
      { stock: product.stock - newSale.details[i].quantity },
      { new: true, runValidators: true }
    );
  }

  res.status(201).json({ success: true, sale: newSale });
});

//@desc     Get a sale by Id
//@route    GET /api/v1/sales/:id
//@access   public
exports.getSaleById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const sale = await Sale.findById(id).populate("details.product");
  if (!sale) {
    return next(
      new ErrorHandler("The sale with id " + id + " does not exist", 404)
    );
  }
  res.status(200).json({ success: true, sale: sale });
});
