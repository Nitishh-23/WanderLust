const express=require("express");
const router=express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review= require("../models/review.js");
const Listing = require("../models/listing.js");
const{validateReview, isLoggedin, isAuthor}=require("../middleware.js")



// create reviews
router.post("/", isLoggedin ,validateReview, wrapAsync(async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let rev= new Review(req.body.review);
    rev.author=req.user._id;
    listing.reviews.push(rev);
    console.log(rev);
    await rev.save();
    await listing.save();
    req.flash("success","Successfully added Review!");
    res.redirect(`/listings/${listing._id}`)
}));

//delete reviews
router.delete("/:reviewId" ,isLoggedin,isAuthor,  wrapAsync(async(req,res)=>{
    let {id, reviewId}=req.params;

    await Listing.findByIdAndUpdate(id, {$pull :{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Successfully removed Review!");
    res.redirect(`/listings/${id}`)
}))

module.exports=router;