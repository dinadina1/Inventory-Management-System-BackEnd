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
    },
    email: {
      type: String,
    },
    phoneNo: [(type = Number)],
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
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
  },
  { collection: "vendors" }
);

// export schema
module.exports = mongoose.model("Vendors", vendorSchema);
