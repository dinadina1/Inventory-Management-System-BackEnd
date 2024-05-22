// require dotenv
require("dotenv").config();

// create configuration object
const configuration = {
  PORT: process.env.PORT || 3500,
  MONGO_URI: process.env.MONGO_URI,
  SECRET_KEY: process.env.SECRET_KEY,
};

// export configuration object
module.exports = configuration;
