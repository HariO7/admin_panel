const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    projects:{
        type:String
    },
    role:{
        type:String,
    },
    password:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model("User",UserSchema);