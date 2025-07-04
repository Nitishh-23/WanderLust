const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ServerErrors = require("./utils/ServerErrors.js");
const session=require("express-session");
const flash=require("connect-flash");

const listings=require("./routes/listings.js");
const reviews=require("./routes/reviews.js");


app.set("views", path.join(__dirname, ("views")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main().then(() => { console.log("Connection to databse succeeded") }).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const sessionOptions={
    secret: "SecretCode",
    resave : false,
    saveUninitialized : true,
    cookie:{
        expires :Date.now()+7*24*3600*1000,
        maxAge : 7*24*3600*1000,
        httpOnly : true
    }
};

app.get("/", (req, res) => {
    res.send("Welcome!");
})

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
})

app.use("/listings",listings);
app.use("/listings/:id/reviews", reviews);


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