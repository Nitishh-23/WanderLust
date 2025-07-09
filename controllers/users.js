const User = require("../models/user.js");

//get sign-up form
module.exports.renderSignupForm=async (req, res) => {
    res.render("users/signup.ejs");
};

//post-request for user signup
module.exports.addUser=async (req, res) => {
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
};

//get login form
module.exports.renderLoginForm=async (req, res) => {
    res.render("users/login.ejs");
};

//pos request from log-in
module.exports.loginUser=async (req, res) => {
    req.flash("success","Welcome back! Logged in Successfully.")
    let redirectUrl=res.locals.redirectUrl||"/listings";
    res.redirect(redirectUrl);
};

//log-out user
module.exports.logoutUser=async(req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","Logged out Successfully!");
        res.redirect("/listings");
    })
};