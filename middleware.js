const Listing=require("./models/listing");
const Review=require("./models/review");
const ServerErrors = require("./utils/ServerErrors.js");
const {listingSchema,reviewSchema}=require("./schema.js");

module.exports.isLoggedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        //redirect url for users
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must login to gain access!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};

//validate a listing request
module.exports.isOwner= async(req,res,next)=>{
    let { id } = req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error", "Only the owner of Listing can modify the listing!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

//validate a listing request
module.exports.validateListing=(req,res,next)=>{
     let {error}=listingSchema.validate(req.body);
    if(error){
        let msg=error.details.map((el)=> el.message).join(",");
        throw new ServerErrors(400, msg)
    }
    else{
        next();
    }
};

//validate a review request
module.exports.validateReview=(req,res,next)=>{
     let {error}=reviewSchema.validate(req.body);
    if(error){
        let msg=error.details.map((el)=> el.message).join(",");
        throw new ServerErrors(400, msg)
    }
    else{
        next();
    }
};

//validate a review request
module.exports.isAuthor= async(req,res,next)=>{
    let { id, reviewId } = req.params;
    let rev=await Review.findById(reviewId);
    if(!rev.author.equals(res.locals.currUser._id)){
        req.flash("error", "Review can only be edited by it's creator!");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
