const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Listing = require("./models/listing.js");
const req = require("express/lib/request.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ServerErrors = require("./utils/ServerErrors.js");
const {listingSchema,reviewSchema}=require("./schema.js");
const Review= require("./models/review.js");


app.set("views", path.join(__dirname, ("views")));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main().then(() => { console.log("Connection to databse succeeded") }).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


app.get("/", (req, res) => {
    res.send("Welcome!");
})

//validate a listing request
const validateListing=(req,res,next)=>{
     let {error}=listingSchema.validate(req.body);
    if(error){
        let msg=error.details.map((el)=> el.message).join(",");
        throw new ServerErrors(400, msg)
    }
    else{
        next();
    }
}

//validate a review request
const validateReview=(req,res,next)=>{
     let {error}=reviewSchema.validate(req.body);
    if(error){
        let msg=error.details.map((el)=> el.message).join(",");
        throw new ServerErrors(400, msg)
    }
    else{
        next();
    }
}

//show all listings
app.get("/listings", wrapAsync(async (req, res) => {
    const list = await Listing.find({});
    res.render("listings/index.ejs", { list });
}))

//new listing form
app.get("/listings/new", wrapAsync(async (req, res) => {
    res.render("listings/new.ejs")
}))

//view a listing
app.get("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    //console.log(id);
    const item = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { item });
}))

//edit a listing form
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const item = await Listing.findById(id);
    res.render("listings/edit.ejs", { item })
}))

//edited listing redirect
app.put("/listings/:id",validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}))

//delete a listing
app.delete("/listings/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let dl = await Listing.findByIdAndDelete(id);
    console.log(dl);
    res.redirect("/listings");

}))


//create a new listing
app.post("/listings",validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
})
)

// create reviews
app.post("/listings/:id/reviews",validateReview, wrapAsync(async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let rev= new Review(req.body.review);
    
    listing.reviews.push(rev);
    await rev.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`)
}));

//delete reviews
app.delete("/listings/:id/reviews/:reviewId" , wrapAsync(async(req,res)=>{
    let {id, reviewId}=req.params;

    await Listing.findByIdAndUpdate(id, {$pull :{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`)
}))

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