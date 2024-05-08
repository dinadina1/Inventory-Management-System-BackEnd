// require express
const express = require('express');

// create instance of express
const app = express();

// require cors
const cors = require('cors');

// require cookie parser
const cookieParser = require('cookie-parser');

// use body parser
app.use(express.json());

// use cookie parser
app.use(cookieParser());

// use cors
app.use(cors({
    origin: '*'
}));

// express routes
app.use("/", require("./routes/users"));
app.use("/purchase", require("./routes/purchase"));
app.use("/vendor", require("./routes/vendor"));

// export app
module.exports = app;