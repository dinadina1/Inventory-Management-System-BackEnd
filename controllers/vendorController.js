// require purchase model
const Vendor = require("../model/vendorModel");

// create vendor controller object
const vendorController = {

  // register new vendor
  register: async (req, res) => {
    try {
      // add user in req.body
      req.body.createdBy = req.user.userId;

      //   find vendor if exist
      const isExist = await Vendor.findOne({
        companyName: req.body.companyName,
        isDeleted: false,
      });

      if (isExist) {
        return res.status(401).json({ message: "Vendor already exists" });
      }

      //   insert vendor in db
      const newVendor = await Vendor.create(req.body);
      if (newVendor) return res.status(200).json(newVendor);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  //   update vendor
  updateVendor: async (req, res) => {
    try {
      // add user in req.body
      req.body.createdBy = req.user.userId;

      const updateVendor = await Vendor.findOneAndUpdate(
        { _id: req.params.companyId },
        req.body,
        { new: true }
      );

      if (updateVendor) {
        return res
          .status(200)
          .json({ message: "Updated Successfully", data: updateVendor });
      } else {
        return res.status(404).json({ message: "Vendor not found" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // delete vendor
  deleteVendor: async (req, res) => {
    try {
      // find vendor
      const deleteVendor = await Vendor.findOneAndUpdate(
        {
          _id: req.params.vendorId,
        },
        { isDeleted: true },
        { new: true }
      );

      if (deleteVendor) {
        return res.status(200).json({ message: "Vendor deleted successfully" });
      } else {
        return res.status(404).json({ message: "Vendor not found" });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // view all vendors
  all: async (req, res) => {
    try {
      // find all vendors in db
      const vendor = await Vendor.find({ isDeleted: false }).populate("createdBy");

      // return vendor
      return res.status(200).json(vendor);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // view particular vendor
  getVendor: async (req, res) => {
    try {
      // find all vendors in db
      const vendor = await Vendor.findOne({
        _id: req.params.vendorId,
        isDeleted: false,
      }).populate("createdBy");

      // return message if vendor not found
      if (!vendor) return res.status(404).json({ message: "Vendor not found" });

      // return vendor
      return res.status(200).json(vendor);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  // view all vendors in state
  vendorStateWise: async (req, res) => {
    try {
      // find all vendors in db
      const vendors = await Vendor.find({
        "address.state": req.params.state,
        isDeleted: false,
      }).populate("createdBy");

      // return message if no vendor found in the given state
      if (vendors.length === 0) {
        return res
          .status(404)
          .json({ message: "Vendor not found in this state" });
      }

      // return vendors
      return res.status(200).json(vendors);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

   // view all vendors in city
   vendorCityWise: async (req, res) => {
    try {
      // find all vendors in db
      const vendors = await Vendor.find({
        "address.city": req.params.city,
        isDeleted: false,
      }).populate("createdBy");

      // return message if no vendor found in the given city
      if (vendors.length === 0) {
        return res
          .status(404)
          .json({ message: "Vendor not found in this City" });
      }

      // return vendors
      return res.status(200).json(vendors);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

// export object
module.exports = vendorController;
