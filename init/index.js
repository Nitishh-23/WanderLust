const mongoose = require('mongoose');
const Initdata=require("./data.js");
const Listing=require("../models/listing.js");

main().then(()=>{console.log("Connection to databse succeeded")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB=async ()=>{
    await Listing.deleteMany({});
    Initdata.data=Initdata.data.map((obj)=>({...obj, owner: "686c19a25e98a92b963d3408"}));
    await Listing.insertMany(Initdata.data);
    console.log("data initialised");
}

initDB();