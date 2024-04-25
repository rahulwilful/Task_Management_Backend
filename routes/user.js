const express = require("express");

const router = express.Router();
const { body } = require("express-validator");
const validateToken = require("../middleWare/validateToken.js");

const { addUser, loginUser, GetCurrentUser } = require("../controllers/user.js");
//@desc Update Itineray By Id API
//@route POST user/add
//@access Public
router.post("/add", [body("email", "email required").isEmail(), body("password", "password required")], addUser);

//@desc Update Itineray By Id API
//@route POST user/add
//@access Public
router.post("/login", [body("email", "email required").isEmail(), body("password", "password required")], loginUser);

//@desc Get Current User API
//@route /user/getcurrentuser
//@access Public
router.get("/getcurrentuser", validateToken, GetCurrentUser);

module.exports = router;
