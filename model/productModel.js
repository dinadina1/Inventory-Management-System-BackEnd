// require mongoose
const mongoose = require("mongoose");

// create product schema
const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    invoiceNo: {
      type: Number,
      required: true,
    },
    purchaseOrder: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Purchase",
    },
    vendor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Vendors",
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
  { collection: "products" }
);

// export schema
module.exports = mongoose.model("Product", productSchema);
