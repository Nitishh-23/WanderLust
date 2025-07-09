const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/users.js");

//complete signup process
router.route("/signup")
.get(wrapAsync(userController.renderSignupForm))
.post(wrapAsync(userController.addUser));

//complete login process
router.route("/login")
.get(wrapAsync(userController.renderLoginForm))
.post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
 wrapAsync(userController.loginUser));

//complete logut process
router.get("/logout", wrapAsync(userController.logoutUser));

module.exports = router;