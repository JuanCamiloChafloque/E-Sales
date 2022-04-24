const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/jwtToken");

//@desc     Register a user
//@route    POST /api/v1/users/register
//@access   public
exports.register = catchAsyncErrors(async (req, res, next) => {
  const { name, lastName, email, password, role } = req.body;
  if (!name || !lastName || !email || !password || !role) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return next(
      new ErrorHandler("User with email " + email + " already exists", 400)
    );
  }

  const encrPassword = await bcrypt.hash(password, 10);

  const user = {
    name,
    lastName,
    email,
    password: encrPassword,
    role,
  };

  const newUser = await User.create(user);
  res.status(201).json({ success: true, user: newUser });
});

//@desc     Login a user
//@route    POST /api/v1/users/login
//@access   public
exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return next(
      new ErrorHandler("User with email " + email + " does not exist", 404)
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect Password", 400));
  }

  sendToken(user, 200, res);
});

//@desc     Get all users
//@route    GET /api/v1/users
//@access   public
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new ErrorHandler("Users not found", 404));
  }

  res.status(200).json({ success: true, users: users });
});

//@desc     Get a user by Id
//@route    GET /api/v1/users/:id
//@access   public
exports.getUserById = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return next(
      new ErrorHandler("The user with id " + id + " does not exist", 404)
    );
  }

  res.status(200).json({ success: true, user: user });
});

//@desc     Update a user
//@route    PUT /api/v1/users/:id
//@access   public
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);
  if (!user) {
    return next(
      new ErrorHandler("The user with id " + id + " does not exist", 404)
    );
  }

  user.name = req.body.name;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.role = req.body.role;

  if (req.body.password !== "") {
    const encrPassword = await bcrypt.hash(req.body.password, 10);
    user.password = encrPassword;
  }

  await user.save();
  res.status(200).json({ success: true, message: "User updated successfully" });
});
