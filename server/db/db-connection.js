var mongoose = require('mongoose');
require('dotenv').config();
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL_LOC);

module.exports = {
    mongoose: mongoose
};