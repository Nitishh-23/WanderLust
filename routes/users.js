const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

router.get("/signup", wrapAsync(async (req, res) => {
    res.render("users/signup.ejs");
}))

router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const curr = new User({ email, username });
        const regUser = await User.register(curr, password);
        console.log(regUser);
        req.login(regUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "You are Successfully registered to WanderLust!");
            res.redirect("/listings");
        });
    }
    catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login", wrapAsync(async (req, res) => {
    res.render("users/login.ejs");
}))

router.post("/login",saveRedirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }), 
wrapAsync(async (req, res) => {
    req.flash("success","Welcome back! Logged in Successfully.")
    let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);
}))

router.get("/logout", wrapAsync(async(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","Logged out Successfully!");
        res.redirect("/listings");
    })
}))

module.exports = router;