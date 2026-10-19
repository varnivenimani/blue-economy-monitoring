const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const fisheriesRoutes = require("./routes/fisheriesRoutes");
const marineResourceRoutes = require("./routes/marineResourceRoutes");
const coastalIndustryRoutes = require("./routes/coastalIndustryRoutes");
const economicIndicatorRoutes = require("./routes/economicIndicatorRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/fisheries", fisheriesRoutes);
app.use("/api/marine-resources", marineResourceRoutes);
app.use("/api/coastal-industries", coastalIndustryRoutes);
app.use("/api/economic-indicators", economicIndicatorRoutes);

app.get("/", (req, res) => {
    res.send("Blue Economy Monitoring System API is running");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });