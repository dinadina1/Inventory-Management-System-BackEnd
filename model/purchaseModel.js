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
      required: true
    },
    totalPrice: {
      type: Number,
    },
    invoiceNo: {
      type: Number,
      required: true,
    },
    orderDate: {
      type: Date,
      default: new Date().toISOString(),
      required:true
    },
    deliveryDate: {
      type: Date
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
    isPaid: {
      type: Boolean,
      default: false
    },
    deliveryStatus: {
      type: String,
      default: "pending"
    },
    paymentStatus: {
      type: String,
      default: "pending"
    },
    isDelivered: {
      type: Boolean,
      default: false
    },
    location: {
      type: String,
      required: true
    }
  },
  { collection: "purchase" }
);

// export schema
module.exports = mongoose.model("Purchase", purchaseSchema);
