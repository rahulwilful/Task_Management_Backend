const User = require("../models/User");
const { validationResult, matchedData } = require("express-validator");

const bcrypt = require("bcryptjs");
const secret = "test";
const jwt = require("jsonwebtoken");

const addUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const data = matchedData(req);
  console.log("data : ", data);
  const email = data.email;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const salt = await bcrypt.genSalt(10);
    const securedPass = await bcrypt.hash(data.password, salt);

    user = await User.create({
      email: data.email,
      password: securedPass,
    });

    res.status(200).json({ result: user, message: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const data = matchedData(req);
  console.log("data : ", data);
  const email = data.email;

  try {
    let oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.status(400).json({ errors: [{ msg: "Invalid credentials" }] });
    }

    const isPassCorrect = await bcrypt.compare(data.password, oldUser.password);

    if (!isPassCorrect) {
      return res.status(401).json({ error: "invalid password " });
    }
    const token = jwt.sign({ user: oldUser }, secret, { expiresIn: "12h" });

    return res.status(200).json({ result: oldUser, token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const GetCurrentUser = async (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress; //wats remote address?

  try {
    if (!req.user) {
      logger.error(`${ip}: API /api/v1/user/getcurrentuser  responnded with Error , "Unautherized user " `);
      return res.status(500).json({ message: "Unauthorized user" });
    }

    return res.status(200).json({ data: req.user, message: "User Retrived" });
  } catch (e) {
    return res.status(500).json({ message: "Something went wrong current user not found" });
  }
};

module.exports = { addUser, loginUser, GetCurrentUser };
