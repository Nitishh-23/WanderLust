const express=require("express");
const router=express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const ServerErrors = require("../utils/ServerErrors.js");
const {reviewSchema}=require("../schema.js");
const Review= require("../models/review.js");
const Listing = require("../models/listing.js");


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

// create reviews
router.post("/",validateReview, wrapAsync(async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let rev= new Review(req.body.review);
    
    listing.reviews.push(rev);
    await rev.save();
    await listing.save();
    req.flash("success","Successfully added Review!");
    res.redirect(`/listings/${listing._id}`)
}));

//delete reviews
router.delete("/:reviewId" , wrapAsync(async(req,res)=>{
    let {id, reviewId}=req.params;

    await Listing.findByIdAndUpdate(id, {$pull :{reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Successfully removed Review!");
    res.redirect(`/listings/${id}`)
}))

module.exports=router;