const mongoose = require('mongoose');

const venderSchema = new mongoose.Schema({
    mobile: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model('Vender', venderSchema);