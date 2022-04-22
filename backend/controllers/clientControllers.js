const Client = require("../models/Client");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//@desc     Register a client
//@route    POST /api/v1/clients
//@access   public
exports.registerClient = catchAsyncErrors(async (req, res, next) => {
  const client = req.body;
  client.points = 10;

  const newClient = await Client.create(client);
  res.status(201).json({ success: true, client: newClient });
});

//@desc     Update a client
//@route    PUT /api/v1/clients/:id
//@access   public
exports.updateClient = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const client = await Client.findById(id);
  if (!client) {
    return next(
      new ErrorHandler("The client with id " + id + " does not exist", 404)
    );
  }

  const updatedClient = await Client.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, client: updatedClient });
});

//@desc     Delete a client
//@route    DELETE /api/v1/clients/:id
//@access   public
exports.deleteClient = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const client = await Client.findById(id);
  if (!client) {
    return next(
      new ErrorHandler("The client with id " + id + " does not exist", 404)
    );
  }

  await Client.deleteOne({ _id: id });
  res
    .status(200)
    .json({ success: true, message: "Client deleted successfully" });
});
