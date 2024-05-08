// require purchase model
const Purchase = require("../model/purchaseModel");

// require bcrypt
const bcrypt = require("bcrypt");

// require jsonwebtoken
const jwt = require("jsonwebtoken");

// require nodemailer
const nodemailer = require("nodemailer");

// require config from config.js
const { SECRET_KEY, PORT } = require("../utilities/config");

// create purchase controller object
const purchaseController = {
    test: (req, res) => {
        return res.json({message: "purchase controller working"});
    },

    // create purchase order
    createPurchase: async (req, res) => {
        try{
            


        }catch(err){
            return res.status(500).json({message: err.message});
        }
    }

};

// export purchaseController object
module.exports = purchaseController;