// require purchase model
const Purchase = require("../model/purchaseModel");

// require exceljs
const exceljs = require("exceljs");

// require file
const fs = require("fs");

// require nodemailer
const nodemailer = require("nodemailer");

// require config from config.js
const { SECRET_KEY, PORT } = require("../utilities/config");

// create purchase controller object
const purchaseController = {
  // create purchase order
  registerPurchaseOrder: async (req, res) => {
    try {
      // update total price
      req.body.totalPrice =
        (req.body.unitPrice / 100) * (req.body.gstPercentage + 50) +
        req.body.unitPrice;
      req.body.createdBy = req.user.userId;

      //   set delivery date
      const currentDate = new Date("2024-05-08");
      currentDate.setDate(currentDate.getDate() + 10);

      req.body.deliveryDate = currentDate.toISOString();

      // update date
      req.body.orderDate = new Date(req.body.orderDate).toISOString();

      // check if invoice no already exist
      const purchase = await Purchase.findOne({
        invoiceNo: req.body.invoiceNo,
        vendor: req.body.vendor,
      });

      // return message if invoice number exist
      if (purchase)
        return res.status(404).json({ message: "Invoice no already exist" });

      // check if purchase order no already exist
      const purchaseOrder = await Purchase.findOne({
        purchaseOrderNo: req.body.purchaseOrderNo,
      });

      // return message if purchase order number exist
      if (purchaseOrder)
        return res
          .status(404)
          .json({ message: "Purchase order no already exist" });

      // insert data in db
      const newPurchase = await Purchase.create(req.body);

      return res
        .status(200)
        .json({ message: "Purchase registered successfully", newPurchase });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // update purchase order
  updatePurchaseOrder: async (req, res) => {
    try {
      // check if invoice no already exist
      const purchase = await Purchase.findOne({ _id: req.params.purchaseId });

      //   return message if invoice in not found
      if (!purchase)
        return res.status(500).json({ message: "Purchase order not found " });

      // update in db
      await Purchase.updateOne({ _id: purchase._id }, req.body);

      return res
        .status(200)
        .json({ message: "Purchase order updated Successfully" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  //   view all purchase order
  all: async (req, res) => {
    try {
      // get all purchase order
      const purchase = await Purchase.find().populate(["vendor", "createdBy"]);

      if (purchase.length === 0)
        return res.status(500).json({ message: "No purchase order found" });

      // return message
      return res.status(200).json(purchase);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  //   view all purchase order by id
  viewPurchaseOrderById: async (req, res) => {
    try {
      // get all purchase order
      const purchase = await Purchase.findOne({
        _id: req.params.purchaseId,
      }).populate(["vendor", "createdBy"]);

      if (!purchase)
        return res.status(500).json({ message: "No purchase order found" });

      // return message
      return res.status(200).json(purchase);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  //   delete purchase order using id
  delete: async (req, res) => {
    try {
      // delete purchase
      await Purchase.deleteOne({ _id: req.params.purchaseId });

      // return messages
      return res.status(200).json({ message: "Purchase order deleted" });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  //  get all order by date
  allOrderDatewise: async (req, res) => {
    try {
      // get all purchase order
      const purchase = await Purchase.find({
        orderDate: req.params.orderDate,
      }).populate(["vendor", "createdBy"]);

      if (purchase.length === 0)
        return res.status(500).json({ message: "No purchase order found" });

      // return message
      return res.status(200).json(purchase);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // view all stocks
  getStocks: async (req, res) => {
    try {
      // get all stocks
      const purchase = await Purchase.find({
        isDelivered: false,
      }).populate(["vendor", "createdBy"]);

      if (purchase.length === 0)
        return res.status(500).json({ message: "Out of stock" });

      // stock object
      const stock = [];

      purchase.forEach((ele) => {
        let stockObj = {
          productItem: ele.productItem,
          description: ele.description,
          unitPrice: ele.unitPrice,
          gstPercentage: ele.gstPercentage,
          totalPrice: ele.totalPrice,
          vendor: ele.vendor.companyName,
          invoiceNo: ele.invoiceNo,
          quantity: ele.quantity,
          location: ele.location,
        };
        stock.push(stockObj);
      });

      // return message
      return res.status(200).json(stock);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // get all purchase order
  allPurchaseOrder: async (req, res) => {
    try {
      // get all purchase order
      const purchase = await Purchase.find().populate(["vendor", "createdBy"]);

      // purchase order array
      const purchaseOrder = purchase.map((ele) => {
        return {
          productItem: ele.productItem,
          description: ele.description,
          unitPrice: ele.unitPrice,
          gstPercentage: ele.gstPercentage,
          totalPrice: ele.totalPrice,
          vendor: ele.vendor.companyName,
          invoiceNo: ele.invoiceNo,
          quantity: ele.quantity,
          location: ele.location,
          orderDate: ele.orderDate,
          deliveryDate: ele.deliveryDate,
          orderStatus:
            new Date() > new Date(ele.deliveryDate)
              ? "Delivered"
              : "Not Delivered",
          paymentStatus: ele.paymentStatus,
          createdBy: `${ele.createdBy.firstname} ${ele.createdBy.lastname}`,
        };
      });

      // return purchase orders
      return res.status(200).json(purchaseOrder);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Generate stock level excel report and download
  stockLevelExcel: async (req, res) => {
    try {
      // get all stocks
      const purchase = await Purchase.find({
        isDelivered: false,
      }).populate(["vendor", "createdBy"]);

      if (purchase.length === 0)
        return res.status(500).json({ message: "Out of stock" });

      // create new Excel workbook
      const workbook = new exceljs.Workbook();

      // create new worksheet
      const worksheet = workbook.addWorksheet("Stock Levels");

      // Set heading
      const heading = worksheet.getCell("A1");
      heading.value = "Stock Levels";
      heading.font = { size: 16, bold: true };
      heading.alignment = { horizontal: "center" };
      worksheet.mergeCells("A1:I1");

      worksheet.addRow([
        "productItem",
        "description",
        "unitPrice",
        "gstPercentage",
        "totalPrice",
        "vendor",
        "invoiceNo",
        "quantity",
        "location",
      ]);

      purchase.forEach((order) => {
        worksheet.addRow([
          order.productItem,
          order.description,
          order.unitPrice,
          order.gstPercentage,
          order.totalPrice,
          order.vendor.companyName,
          order.invoiceNo,
          order.quantity,
          order.location,
        ]);
      });

      // Generate Excel file
      const filePath = "StockLevevels.xlsx";
      await workbook.xlsx.writeFile(filePath);

      // Download the file
      return res.download(filePath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error downloading file");
        } else {
          // Delete the file after download
          setTimeout(() => {
            fs.unlinkSync(filePath);
          }, 5000);
        }
      });
    } catch (err) {
      console.log("Error generating Excel file", err);
      return res.status(500).json({ message: err.message });
    }
  },

  // Generate purchase order excel report and download
  purchaseOrderExcel: async (req, res) => {
    try {
      // get all purchase order
      const purchase = await Purchase.find().populate(["vendor", "createdBy"]);

      // return messages if purchase order not found
      if (purchase.length === 0)
        return res.status(500).json({ message: "No purchase order found" });

      // create new Excel workbook
      const workbook = new exceljs.Workbook();

      // create new worksheet
      const worksheet = workbook.addWorksheet("Purchase Orders");

      // Set heading
      const heading = worksheet.getCell("A1");
      heading.value = "Purchase Orders";
      heading.font = { size: 16, bold: true };
      heading.alignment = { horizontal: "center" };
      worksheet.mergeCells("A1:N1");

      worksheet.addRow([
        "productItem",
        "description",
        "unitPrice",
        "gstPercentage",
        "totalPrice",
        "vendor",
        "invoiceNo",
        "quantity",
        "location",
        "orderDate",
        "deliveryDate",
        "paymentStatus",
        "createdBy",
      ]);

      // add data row in worksheet
      purchase.forEach((order) => {
        worksheet.addRow([
          order.productItem,
          order.description,
          order.unitPrice,
          order.gstPercentage,
          order.totalPrice,
          order.vendor.companyName,
          order.invoiceNo,
          order.quantity,
          order.location,
          order.orderDate,
          order.deliveryDate,
          order.paymentStatus,
          `${order.createdBy.firstname} ${order.createdBy.lastname}`,
        ]);
      });

      // Generate Excel file
      const filePath = "PurchaseOrders.xlsx";
      await workbook.xlsx.writeFile(filePath);

      // Download the file
      return res.download(filePath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error downloading file");
        } else {
          // Delete the file after download
          setTimeout(() => {
            fs.unlinkSync(filePath);
          }, 5000);
        }
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // Generate turnover report
  turnoverExcel: async (req, res) => {
    try {
      // get all stocks
      const stock = await Purchase.find({ deliveryStatus: "pending" }).populate(
        ["vendor", "createdBy"]
      );

      // get all delivered
      const delivered = await Purchase.find({
        deliveryStatus: "success",
      }).populate(["vendor", "createdBy"]);

      // return messages if purchase order not found
      if (stock.length === 0)
        return res.status(500).json({ message: "No purchase order found" });

      // turnover object
      const turnOver = {};

      // Calculate stock total unit price
      turnOver.tot_StockPrice = stock.reduce(
        (acc, data) => acc + data.totalPrice,
        0
      );

      // Calculate delivered total unit price
      turnOver.tot_DeliveredPrice = delivered.reduce(
        (acc, data) => acc + data.totalPrice,
        0
      );

      turnOver.tot_PurchasedPrice =
        turnOver.tot_StockPrice + turnOver.tot_DeliveredPrice;

      // Calculate stock total quantity
      turnOver.tot_StockQuantity = stock.reduce(
        (acc, data) => acc + data.quantity,
        0
      );

      // Calculate delivered total quantity
      turnOver.tot_DeliveredQuantity = delivered.reduce(
        (acc, data) => acc + data.quantity,
        0
      );

      turnOver.tot_PurchaseQty =
        turnOver.tot_StockQuantity + turnOver.tot_DeliveredQuantity;
      turnOver.gstPercentage = 18;

      turnOver.tot_gstAmount = (turnOver.tot_PurchasedPrice / 100) * 18;
      turnOver.profit = (turnOver.tot_PurchasedPrice / 100) * 40;

      turnOver.year = `${new Date().getFullYear()}-${
        new Date().getFullYear() + 1
      }`;

      // create new Excel workbook
      const workbook = new exceljs.Workbook();

      // create new worksheet
      const worksheet = workbook.addWorksheet("Turnover");

      // Set heading
      const heading = worksheet.getCell("A1");
      heading.value = "Turnover";
      heading.font = { size: 16, bold: true };
      heading.alignment = { horizontal: "center" };
      worksheet.mergeCells("A1:N1");

      // create worksheet rows
      worksheet.addRow([
        "Stock Price",
        "Delivered Price",
        "Purchased Price",
        "Stock Quantity",
        "Delivered Quantity",
        "Purchased Quantity",
        "GST Percentage",
        "GST Amount",
        "Profit",
        "Year",
      ]);

      // add data row in worksheet
      worksheet.addRow([
        turnOver.tot_StockPrice,
        turnOver.tot_DeliveredPrice,
        turnOver.tot_PurchasedPrice,
        turnOver.tot_StockQuantity,
        turnOver.tot_DeliveredQuantity,
        turnOver.tot_PurchaseQty,
        turnOver.gstPercentage,
        turnOver.tot_gstAmount,
        turnOver.profit,
        turnOver.year,
      ]);

      // Generate Excel file
      const filePath = "Turnover.xlsx";
      await workbook.xlsx.writeFile(filePath);

      // Download the file
      return res.download(filePath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error downloading file");
        } else {
          // Delete the file after download
          setTimeout(() => {
            fs.unlinkSync(filePath);
          }, 5000);
        }
      });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // turnover
  turnover: async (req, res) => {
    try {
      // get all stocks
      const stock = await Purchase.find({ deliveryStatus: "pending" }).populate(
        ["vendor", "createdBy"]
      );

      // get all delivered
      const delivered = await Purchase.find({
        deliveryStatus: "success",
      }).populate(["vendor", "createdBy"]);

      // return messages if purchase order not found
      if (stock.length === 0)
        return res.status(500).json({ message: "No purchase order found" });

      // turnover object
      const turnOver = {};

      // Calculate stock total unit price
      turnOver.tot_StockPrice = stock.reduce(
        (acc, data) => acc + data.totalPrice,
        0
      );

      // Calculate delivered total unit price
      turnOver.tot_DeliveredPrice = delivered.reduce(
        (acc, data) => acc + data.totalPrice,
        0
      );

      turnOver.tot_PurchasedPrice =
        turnOver.tot_StockPrice + turnOver.tot_DeliveredPrice;

      // Calculate stock total quantity
      turnOver.tot_StockQuantity = stock.reduce(
        (acc, data) => acc + data.quantity,
        0
      );

      // Calculate delivered total quantity
      turnOver.tot_DeliveredQuantity = delivered.reduce(
        (acc, data) => acc + data.quantity,
        0
      );

      turnOver.tot_PurchaseQty =
        turnOver.tot_StockQuantity + turnOver.tot_DeliveredQuantity;
      turnOver.gstPercentage = 18;

      turnOver.tot_gstAmount = (turnOver.tot_PurchasedPrice / 100) * 18;
      turnOver.profit = (turnOver.tot_PurchasedPrice / 100) * 40;

      return res.status(200).json(turnOver);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

// export purchaseController object
module.exports = purchaseController;
