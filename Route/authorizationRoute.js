const express = require("express");
const router = express.Router();
const auth = require("../Controller/authController");

router.post("/login",auth.Login);
router.post("/changePassword",auth.changePassword);
router.post("/signup",auth.signup);

module.exports= router;