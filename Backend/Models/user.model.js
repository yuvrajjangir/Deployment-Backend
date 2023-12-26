const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email:{
        type: String,
        unique: true,
    },
    password: String,
    phone_number:String,
    department:String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;