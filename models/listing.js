const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"default_img.jpg",
        set:(v)=>v===""?"default_img.jpg":v,
    },
    price:{
        type:Number,
        required:true,
    },
    location:String,
    country:String,
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;