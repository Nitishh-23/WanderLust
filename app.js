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
const {listingSchema}=require("./schema.js");

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
    const item = await Listing.findById(id);
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