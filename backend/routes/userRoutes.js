const express = require("express");
const User = require("../models/User");

const router = express.Router();

//create user

router.post("/create-user", async (req, res) => {
  //check if user fields are filled

  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(401).json({ message: "All fields are required" });
  }

  //check if the email exists
  const foundEmail = await User.findOne({ email: req.body.email });

  if (foundEmail) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const createdUser = await newUser.save();
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get all users

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Users not found" });
  }
});

//get single user

router.get("/:id", findUser, (req, res) => {
  res.json(res.user);
});

//get user by email

router.get("/email/:email", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.params.email });
    if (!foundUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "found User", user: foundUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "..something went wrong", error: error.message });
  }
});

//update a single user

router.patch("/:id", findUser, async (req, res) => {
  if (req.body.name) {
    res.user.name = req.body.name;
  }
  if (req.body.email) {
    res.user.email = req.body.email;
  }
  if (req.body.password) {
    res.user.password = req.body.password;
  }
  try {
    const updatedUser = await res.user.save();
    res
      .status(200)
      .json({ message: "User Updated Successfuly", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete user

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfuly", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//middleware to get user by id

async function findUser(req, res, next) {
  let selectedUser;
  try {
    const foundUser = await User.findById(req.params.id);
    selectedUser = foundUser;
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
  res.user = selectedUser;
  next();
}

module.exports = router;
