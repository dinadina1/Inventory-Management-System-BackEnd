// require mongoose
const mongoose = require("mongoose");

// create product schema
const purchaseSchema = mongoose.Schema(
  {
    productItem: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    gstPercentage: {
      type: Number,
      default: 18,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    invoiceNo: {
      type: Number,
      required: true,
    },
    vendor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Vendors",
    },
  },
  { collection: "purchase" }
);

// export schema
module.exports = mongoose.model("Purchase", purchaseSchema);
