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
    origin: '*',
    // origin: ['http://localhost:5173/reset-password/x8glukc6'];
}));

// express routes
app.use("/", require("./routes/users"));
app.use("/purchase", require("./routes/purchase"));
app.use("/vendor", require("./routes/vendor"));
app.use("/product", require("./routes/product"));

// export app
module.exports = app;