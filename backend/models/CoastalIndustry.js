const mongoose = require("mongoose");

const coastalIndustrySchema = new mongoose.Schema({
    industryName: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    revenue: {
        type: Number,
        required: true
    },

    year: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("CoastalIndustry", coastalIndustrySchema);