if(process.env.NODE_ENV != "Production"){
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ServerErrors = require("./utils/ServerErrors.js");
const session=require("express-session");
const MongoStore = require('connect-mongo');
const flash=require("connect-flash");
const passport=require("passport");
const LocalStratergy=require("passport-local");
const User=require("./models/user.js");

const listingRoute=require("./routes/listings.js");
const reviewRoute=require("./routes/reviews.js");
const userRoute=require("./routes/users.js");


app.set("views", path.join(__dirname, ("views")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const DBUrl=process.env.ATLAS_URL;
main().then(() => { console.log("Connection to databse succeeded") }).catch(err => console.log(err));

async function main() {
    await mongoose.connect(DBUrl);
}

const store= MongoStore.create({
    mongoUrl: DBUrl,
    crypto: {
        secret: process.env.SESSION_SECRET,
    },
    touchAfter: 24 * 3600
});

store.on("error", ()=>{
    console.log("Error in MONGO store", err);
})

const sessionOptions={
    store,
    secret: process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : true,
    cookie:{
        expires :Date.now()+7*24*3600*1000,
        maxAge : 7*24*3600*1000,
        httpOnly : true
    }
};

app.get("/", (req, res) => {
    res.redirect("/listings");
})

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratergy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})



app.use("/listings",listingRoute);
app.use("/listings/:id/reviews", reviewRoute);
app.use("/", userRoute);


app.all("*", (req, res, next) => {
    next(new ServerErrors(404, "Page not Found!"));
})

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Oops! Something went wrong" } = err;
    res.status(statusCode).render("listings/error.ejs",{message});
    // res.status(statusCode).send(message);
})

app.listen(8080, () => {
    console.log("Server Connection successful");
})