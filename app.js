// require express
const express = require('express');

// create instance of express
const app = express();

// require cors
const cors = require('cors');

// use body parser
app.use(express.json());

// use cors
app.use(cors({
    origin: '*'
}));

// express routes
app.use("/", require("./routes/users"));

// export app
module.exports = app;