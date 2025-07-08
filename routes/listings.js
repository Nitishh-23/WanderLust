const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedin,isOwner,validateListing}=require("../middleware.js");


//show all listings
router.get("/", wrapAsync(async (req, res) => {
    const list = await Listing.find({});
    res.render("listings/index.ejs", { list });
}))

//new listing form
router.get("/new",isLoggedin, wrapAsync(async (req, res) => {
    res.render("listings/new.ejs")
}))

//view a listing
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    //console.log(id);
    const item = await Listing.findById(id).populate({path : "reviews" , populate: {path : "author"}}).populate("owner");
    if(!item){
        req.flash("error","Required Listing Doesnot Exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { item });
}))

//edit a listing form
router.get("/:id/edit",isLoggedin,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const item = await Listing.findById(id);
    if(!item){
        req.flash("error","Required Listing Doesnot Exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { item })
}))

//edited listing redirect
router.put("/:id",isLoggedin,isOwner, validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","Successfully updated listing!");
    res.redirect(`/listings/${id}`);
}))

//create a new listing
router.post("/",isLoggedin,validateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","Successfully added!");
    res.redirect("/listings");
})
)

//delete a listing
router.delete("/:id",isLoggedin,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let dl = await Listing.findByIdAndDelete(id);
    console.log(dl);
    req.flash("success","Successfully Deleted!");
    res.redirect("/listings");

}))

module.exports=router;


