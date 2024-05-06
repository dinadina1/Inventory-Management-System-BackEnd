// require app from app.js
const app = require("./app");

// require config from config.js
const { PORT, MONGO_URI } = require("./utilities/config");

// require mongoose
const mongoose = require("mongoose");

// connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    // start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });
