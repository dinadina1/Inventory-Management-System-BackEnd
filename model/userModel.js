// require mongoose
const mongoose = require('mongoose');

// create schema
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    resetCode: {
        type: String,
        default: null
    },
    resetCodeExpireIn: {
        type: Date,
        default: null
    }
},{collection: "users"});

// export Schema
module.exports = mongoose.model('User', userSchema);