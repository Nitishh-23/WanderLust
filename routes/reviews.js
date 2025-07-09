const express=require("express");
const router=express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync.js");
const{validateReview, isLoggedin, isAuthor}=require("../middleware.js")
const reviewController=require("../controllers/reviews.js");


// create reviews
router.post("/", isLoggedin ,validateReview, wrapAsync(reviewController.postReview));

//delete reviews
router.delete("/:reviewId" ,isLoggedin,isAuthor,  wrapAsync(reviewController.deleteReview));

module.exports=router;