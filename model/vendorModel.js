// require mongoose
const mongoose = require("mongoose");

// create product schema
const vendorSchema = mongoose.Schema(
  {
    ownerName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
      lowercase: true
    },
    email: {
      type: String,
      required:true,
      lowercase: true
    },
    phoneNo: [(type = Number)],
    address: {
      street: {
        type: String,
        required: true,
        lowercase: true
      },
      city: {
        type: String,
        required: true,
        lowercase: true
      },
      state: {
        type: String,
        required: true,
        lowercase: true
      },
      country: {
        type: String,
        required: true,
        lowercase: true
      },
      pincode: {
        type: Number,
        required: true,
      },
    },
    gstNumber: {
      type: String,
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { collection: "vendors" }
);

// export schema
module.exports = mongoose.model("Vendors", vendorSchema);
