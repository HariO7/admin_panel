const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:String,
    projects:String,
    role:String,
    password:String
});

module.exports = mongoose.model("User",UserSchema);