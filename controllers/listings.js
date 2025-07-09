const Listing = require("../models/listing.js");

//index
module.exports.index=async (req, res) => {
    const list = await Listing.find({});
    res.render("listings/index.ejs", { list });
};

//new listing form
module.exports.renderNewForm=async (req, res) => {
    res.render("listings/new.ejs")
};

//post request for listing creation
module.exports.createListing=async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner=req.user._id;
    await newListing.save();
    req.flash("success","Successfully added!");
    res.redirect("/listings");
};

//show a listing
module.exports.viewListing=async (req, res) => {
    let { id } = req.params;
    //console.log(id);
    const item = await Listing.findById(id).populate({path : "reviews" , populate: {path : "author"}}).populate("owner");
    if(!item){
        req.flash("error","Required Listing Doesnot Exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { item });
};

//edit form
module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    const item = await Listing.findById(id);
    if(!item){
        req.flash("error","Required Listing Doesnot Exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { item })
};

//put request for listing edit
module.exports.editListing=async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success","Successfully updated listing!");
    res.redirect(`/listings/${id}`);
};

//delete listing
module.exports.deleteListing=async (req, res) => {
    let { id } = req.params;
    let dl = await Listing.findByIdAndDelete(id);
    console.log(dl);
    req.flash("success","Successfully Deleted!");
    res.redirect("/listings");

};