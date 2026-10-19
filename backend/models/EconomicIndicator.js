const mongoose = require("mongoose");

const economicIndicatorSchema = new mongoose.Schema({
    indicatorName: {
        type: String,
        required: true
    },

    value: {
        type: Number,
        required: true
    },

    unit: {
        type: String,
        required: true
    },

    year: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("EconomicIndicator", economicIndicatorSchema);