import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

import Users from "../models/user.model.js";

const SALT_ROUNDS = 10;

// Create new User
const createNewUser = asyncHandler(async (req, res) => {
  const { name, email, password, user_type } = req.body;
  let hashedPwrd = "";

  // Check if a user already exists for the given email
  const currentUser = await Users.findOne({ email: email });
  if (currentUser) return res.status(501).send("User already exists");

  // Hash the password
  try {
    hashedPwrd = bcrypt.hashSync(password, SALT_ROUNDS);
    console.log(hashedPwrd);
  } catch {
    return res.status(501).send("Password error");
  }

  const user = new Users({
    name,
    user_type,
    email,
    password: hashedPwrd,
  });

  try {
    user
      .save()
      .then((mRes) => {
        res.status(201).json(mRes);
      })
      .catch((err) => {
        res.status(501);
      });
  } catch {
    res.status(500);
  }
});

// User login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Email password request validations
  if (!email) return res.status(501).send("Email is required");
  if (!password) return res.status(501).send("Password is required");

  const user = await Users.findOne({ email: email });
  if (!user) return res.status(404).send("User does not exist");

  bcrypt.compare(password, user.password, function (err, result) {
    if (err) return res.status(500).send(err);
    if (result) {
      const token = generateToken(user)
      let param = { token: token, user_type: user.user_type, id: user._id }
      return res.status(200).json(param);
    } else {
      return res.status(501).send("Incorrect password");
    }
  });
});

// Edit user
const editUser = asyncHandler(async (req, res) => {
  const { id, name, email, password, user_type } = req.body;
  let hashedPwrd = "";

  const user = await Users.findById(id);
  if (!user) return res.status(404).send("User not found");

  // Hash the password
  try {
    hashedPwrd = bcrypt.hashSync(password, SALT_ROUNDS);
    console.log(hashedPwrd);
  } catch {
    return res.status(501).send("Password error");
  }

  try {
    const updated = await Users.updateOne(
      { _id: id },
      { name, email, password: hashedPwrd, user_type }
    );
    console.log(updated);

    if (updated) {
      res.status(200).send("Successfully updated");
    } else {
      res.status(500).send("Error");
    }
  } catch {
    res.status(500).send("Error");
  }
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Id request validation
  if (!id) return res.status(404).send("Id not found");

  try {
    const deleted = await Users.deleteOne({ _id: id });
    if (deleted.deletedCount) {
      res.status(200).send("Successfully deleted");
    } else {
      res.status(404).send("User not found");
    }
  } catch {
    res.status(501).send("Error");
  }
});

// Generate Token
const generateToken = (user) => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY
  const data = {
    _id: user._id,
    user_type: user.user_type
  }

  const token = jwt.sign(data, jwtSecretKey);
  return token;
}
export { createNewUser, login, editUser, deleteUser };
