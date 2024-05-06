// require dotenv
require('dotenv').config();

// create configuration object
const configuration = {
    PORT : process.env.PORT || 3500,
    MONGO_URI: process.env.MONGO_URI
}

// export configuration object
module.exports = configuration;