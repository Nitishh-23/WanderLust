const mongoose = require('mongoose');
const Initdata=require("./data.js");
const Listing=require("../models/listing.js");

main().then(()=>{console.log("Connection to databse succeeded")}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB=async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(Initdata.data);
    console.log("data initialised");
}

initDB();