const mongoose = require("mongoose");

const fisheriesSchema = new mongoose.Schema({
    species: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    production: {
        type: Number,
        required: true
    },

    year: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Fisheries", fisheriesSchema);