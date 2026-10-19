const mongoose = require("mongoose");

const marineResourceSchema = new mongoose.Schema({
    resourceName: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },

    year: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("MarineResource", marineResourceSchema);