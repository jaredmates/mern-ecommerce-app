const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");

// @desc   Get all users [UserListPage.js]
// @route  GET /users
// @access Public
const getAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});

  // If no users
  if (!users?.length) {
    return res.status(400).json({ message: "No users found" });
  }

  res.json(users);
});

// @desc   Get single user [UserEditPage.js]
// @route  GET /users/:id
// @access Public
const getUser = expressAsyncHandler(async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "User ID required" });
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }

  res.json(user);
});

// @desc    Authenticate a user [SigninPage.js]
// @route   POST /users/signin
// @access  Public
const handleLogin = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email && !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for user email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw Error("User does not exist");
  }

  if (user && bcrypt.compareSync(password, user.password)) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc   Create new user [SignupPage.js]
// @route  POST /users/signup
// @access Public
const handleNewUser = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Confirm data
  if (!name && !email && !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if passwords are at least 6 characters
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hashSync(password);

  const newUser = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(hashedPassword),
  });

  // Create and store new user
  const user = await newUser.save();

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   Update a users profile [ProfilePage.js]
// @route  PATCH /users/profile
// @access Public
const updateUserProfile = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Confirm data
  if (!name && !email && !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if passwords are at least 6 characters
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters");
  }

  // Does the user exist to update?
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== req.user._id) {
    return res
      .status(409)
      .json({ message: "User with this email already exists" });
  }

  user.name = name;
  user.email = email;

  if (password) {
    // Hash password
    user.password = await bcrypt.hashSync(password);
  }

  // Update User info from profile page
  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser),
  });
});

// @desc   Update a user [UserEditPage.js]
// @route  PATCH /users/:id
// @access Public
const updateUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, email, isAdmin } = req.body;

  // Confirm data
  if (!id && !name && !email && !isAdmin) {
    return res
      .status(400)
      .json({ message: "All fields except password are required" });
  }

  // Does the user exist to update?
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check for duplicate
  const duplicate = await User.findOne({ email })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original user
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate email" });
  }

  user.name = name;
  user.email = email;
  user.isAdmin = Boolean(isAdmin);

  // Update user
  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
    token: generateToken(updatedUser),
  });
});

// @desc   Delete a user [UserListPage.js]
// @route  DELETE /users/:id
// @access Public
const deleteUser = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "User ID Required" });
  }

  // Does the user exist to delete?
  const user = await User.findById(id).exec();
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Admin permissions
  if (user.isAdmin) {
    return res.status(400).send({ message: "Can Not Delete Admin User" });
  }

  // Delete User
  const result = await user.remove();

  const reply = `Username ${result.username} with ID ${result._id} deleted`;
  res.json(reply);
});

module.exports = {
  getAllUsers,
  getUser,
  handleNewUser,
  updateUser,
  updateUserProfile,
  deleteUser,
  handleLogin,
};
