const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedin,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

//show all and create new
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedin,upload.single("listing[image]"), validateListing,wrapAsync(listingController.createListing));

//new listing form
router.get("/new",isLoggedin, wrapAsync(listingController.renderNewForm));

//show one, edit and delete
router.route("/:id")
.get(wrapAsync(listingController.viewListing))
.put(isLoggedin,isOwner,upload.single("listing[image]"), validateListing, wrapAsync(listingController.editListing))
.delete(isLoggedin,isOwner, wrapAsync(listingController.deleteListing));

//edit a listing form
router.get("/:id/edit",isLoggedin,isOwner, wrapAsync(listingController.renderEditForm));

module.exports=router;