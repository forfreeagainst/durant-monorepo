const mongoose = require('./db.js');

const ClockInSchema = mongoose.Schema({
    isSign: {
        type: Boolean,
        default: false
    },
    signTime: {
        type: String
    }
})

module.exports = mongoose.model('clockIn', ClockInSchema);