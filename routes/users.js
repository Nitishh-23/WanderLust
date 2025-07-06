const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");

router.get("/signup", wrapAsync(async (req, res) => {
    res.render("users/signup.ejs");
}))

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const curr = new User({ email, username });
        const regUser = await User.register(curr, password);
        console.log(regUser);
        req.flash("success", "You are Successfully registered to WanderLust!");
        res.redirect("/listings");
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login", wrapAsync(async (req, res) => {
    res.render("users/login.ejs");
}))

router.post("/login", passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), 
wrapAsync(async (req, res) => {
    req.flash("success","Welcome back! Logged in Successfully.")
    res.redirect("/listings");
}))

module.exports = router;