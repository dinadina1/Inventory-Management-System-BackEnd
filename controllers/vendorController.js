// require purchase model
const Vendor = require("../model/vendorModel");

// require bcrypt
const bcrypt = require("bcrypt");

// require jsonwebtoken
const jwt = require("jsonwebtoken");

// require nodemailer
const nodemailer = require("nodemailer");

// require config from config.js
const { SECRET_KEY, PORT } = require("../utilities/config");

// create vendor controller object
const vendorController = {

    test: (req, res) => {
        res.status(200).json({
          message: "vendor Controller Test",
        });
    },

    // create new vendor
    register: (req, res) => {
        try{

            return res.status(200).json(req.body);

        }catch(err){
            return res.status(500).json({message: err.message});
        }
    }

}

// export object
module.exports = vendorController;