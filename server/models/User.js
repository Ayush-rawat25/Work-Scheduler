const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema= new Schema({
    googleId:{
        type: String,
        required: true,
        unique:true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    accessToken: { type: String },
    refreshToken: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})
const User = mongoose.model('User',userSchema);
module.exports = User;