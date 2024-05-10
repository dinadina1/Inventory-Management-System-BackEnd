// require product model
const Product = require("../model/productModel");

// require purchase model
const Purchase = require("../model/purchaseModel");

// create product controller
const productController = {
  test: (req, res) => {
    return res.status(200).json({ message: "product controller working" });
  },

  // register new product
  register: async (req, res) => {
    try {
      // find if invoice no exist
      const invoiceExist = await Purchase.findOne({
        invoiceNo: req.body.invoiceNo,
      });

      if (!invoiceExist)
        return res.status(400).json({ message: "Invoice does not exist" });

      // register new product
      const product = await Product.create(req.body);

      // return response
      return res
        .status(200)
        .json({ message: "product registered", data: product });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  //   update product
  updateProduct: async (req, res) => {
    try {
      // find product
      const product = await Product.findById(req.params.productId);

      if (!product)
        return res.status(400).json({ message: "product not found" });

      // update product
      await Product.updateOne({ _id: req.params.productId }, req.body, {
        new: true,
      });

      // return messages
      return res.status(200).json({ message: "Updated Successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // delete product
  delete: async (req, res) => {
    try {
      // delete
      const isDeleted = await Product.deleteOne({ _id: req.params.productId });

      // return message
      if (isDeleted)
        return res
          .status(200)
          .json({ message: "Product Deleted Successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // view particular product
  getProduct: async (req, res) => {
    try {
      // get product
      const product = await Product.findById(req.params.productId);

      // retutn message if product not found
      if (!product)
        return res.status(404).json({ message: "Product not found" });

      // return message
      return res.status(200).json(product);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // view all products
  allProducts: async (req, res) => {
    try {
      // get all products
      const product = await Product.find();

      // return message if product not found
      if (product.length === 0)
        return res.status(404).json({ message: "Product not found" });

      // return message
      return res.status(200).json(product);

    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

// export product controller object
module.exports = productController;
