const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PLM=require("passport-local-mongoose");

const userSchema=new Schema({
    email: {
        type: String,
        required: true,
    }
});
//only email as username and pass3ord are preadded by PLM--uses PDKDF2 Hashing algorithm

userSchema.plugin(PLM);

module.exports=mongoose.model("User", userSchema);