const express=require("express");
const app=express();
const mongoose = require('mongoose');
const path=require("path");
const Listing=require("./models/listing.js");
const req = require("express/lib/request.js");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");

app.set("views",path.join(__dirname,("views")));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main().then(()=>{console.log("Connection to databse succeeded")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


app.get("/",(req,res)=>{
    res.send("Welcome!");
})

app.get("/listings",async(req,res)=>{
    const list= await Listing.find({});
    res.render("listings/index.ejs",{list});
})

app.get("/listings/new",async(req,res)=>{
    res.render("listings/new.ejs")
})

app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    const item=await Listing.findById(id);
    res.render("listings/show.ejs",{item});
})

app.get("/listings/:id/edit", async(req,res)=>{
    let {id}=req.params;
    const item=await Listing.findById(id);
    res.render("listings/edit.ejs", {item})
})

app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let dl=await Listing.findByIdAndDelete(id);
    console.log(dl);
    res.redirect("/listings");
    
})

app.post("/listings", async(req,res)=>{
   const newListing=new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");
})

app.listen(8080,()=>{
    console.log("Server Connection successful");
})