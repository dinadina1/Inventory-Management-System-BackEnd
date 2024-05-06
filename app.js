// require express
const express = require('express');

// create instance of express
const app = express();

// express routes
app.use("/", require("./routes/users"));

// export app
module.exports = app;