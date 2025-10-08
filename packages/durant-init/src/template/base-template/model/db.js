// https://mongoosejs.com/docs/guide.html
const mongoose = require('mongoose');
const config = require('../config/config');

try {
    mongoose.connect(config.dbUrl);
} catch(err) {
    console.log(err, '???')
}

module.exports = mongoose;