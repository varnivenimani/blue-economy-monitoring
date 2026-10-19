require("dotenv").config();
const mongoose = require("mongoose");

const Fisheries = require("./models/Fisheries");
const MarineResource = require("./models/MarineResource");
const CoastalIndustry = require("./models/CoastalIndustry");
const EconomicIndicator = require("./models/EconomicIndicator");

const locations = [
    {
        name: "Gujarat Coast",
        fish: "Pomfret",
        resource: "Marine Fish Stock",
        industry: "Port Logistics"
    },
    {
        name: "Kerala Coast",
        fish: "Mackerel",
        resource: "Marine Fish Stock",
        industry: "Fishing and Tourism"
    },
    {
        name: "Karnataka Coast",
        fish: "Sardine",
        resource: "Marine Fish Stock",
        industry: "Shipbuilding"
    },
    {
        name: "Maharashtra Coast",
        fish: "Pomfret",
        resource: "Marine Fish Stock",
        industry: "Port Logistics"
    },
    {
        name: "West Bengal Coast",
        fish: "Hilsa",
        resource: "Riverine Fish Stock",
        industry: "Port Logistics"
    },
    {
        name: "Odisha Coast",
        fish: "Hilsa",
        resource: "Marine Fish Stock",
        industry: "Fishing and Processing"
    },
    {
        name: "Andhra Pradesh Coast",
        fish: "Tuna",
        resource: "Marine Fish Stock",
        industry: "Aquaculture"
    },
    {
        name: "Goa Coast",
        fish: "Kingfish",
        resource: "Marine Fish Stock",
        industry: "Marine Tourism"
    },
    {
        name: "Chennai Coast",
        fish: "Sardine",
        resource: "Marine Fish Stock",
        industry: "Port Logistics"
    }
];

const years = [2022, 2023, 2024, 2025, 2026];

async function seedDatabase() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // Remove previous project data
        await Fisheries.deleteMany({});
        await MarineResource.deleteMany({});
        await CoastalIndustry.deleteMany({});
        await EconomicIndicator.deleteMany({});

        console.log("Old data removed");

        const fisheries = [];
        const marineResources = [];
        const industries = [];
        const indicators = [];

        locations.forEach((location, locationIndex) => {

            years.forEach((year, yearIndex) => {

                // =====================================
                // FISHERIES
                // =====================================

                let production =
                    1800 +
                    locationIndex * 350 +
                    yearIndex * 250;

                // LOW VALUES FOR MONITORING ALERTS
                if (
                    (location.name === "Kerala Coast" && year === 2024) ||
                    (location.name === "Odisha Coast" && year === 2025) ||
                    (location.name === "Chennai Coast" && year === 2026)
                ) {
                    production = 700;
                }

                fisheries.push({
                    species: location.fish,
                    location: location.name,
                    production: production,
                    year: year
                }); 


                // =====================================
                // MARINE RESOURCES
                // =====================================

                let quantity =
                    3000 +
                    locationIndex * 450 +
                    yearIndex * 300;

                // LOW VALUES FOR MONITORING ALERTS
                if (
                    (location.name === "Gujarat Coast" && year === 2023) ||
                    (location.name === "Goa Coast" && year === 2025) ||
                    (location.name === "West Bengal Coast" && year === 2026)
                ) {
                    quantity = 1200;
                }

                marineResources.push({
                    resourceName: location.resource,
                    location: location.name,
                    quantity: quantity,
                    year: year
                });


                // =====================================
                // COASTAL INDUSTRIES
                // =====================================

                let revenue =
                    7000 +
                    locationIndex * 1200 +
                    yearIndex * 1000;

                // LOW VALUES FOR MONITORING ALERTS
                if (
                    (location.name === "Karnataka Coast" && year === 2024) ||
                    (location.name === "Maharashtra Coast" && year === 2025) ||
                    (location.name === "Andhra Pradesh Coast" && year === 2026)
                ) {
                    revenue = 3500;
                }

                industries.push({
                    industryName: location.industry,
                    location: location.name,
                    revenue: revenue,
                    year: year
                });


                // =====================================
                // ECONOMIC INDICATORS
                // =====================================

                let indicatorValue =
                    Number(
                        (
                            5 +
                            locationIndex * 0.45 +
                            yearIndex * 0.5
                        ).toFixed(2)
                    );

                // LOW VALUES FOR MONITORING ALERTS
                if (
                    (location.name === "Gujarat Coast" && year === 2024) ||
                    (location.name === "Kerala Coast" && year === 2025) ||
                    (location.name === "Goa Coast" && year === 2026)
                ) {
                    indicatorValue = 3.5;
                }

                indicators.push({
                    indicatorName:
                        `${location.name} Blue Economy Contribution`,
                    value: indicatorValue,
                    unit: "Percentage",
                    year: year
                });

            });

        });


        // =====================================
        // INSERT INTO MONGODB
        // =====================================

        await Fisheries.insertMany(fisheries);

        await MarineResource.insertMany(marineResources);

        await CoastalIndustry.insertMany(industries);

        await EconomicIndicator.insertMany(indicators);


        console.log("-----------------------------------");
        console.log("DATABASE CREATED SUCCESSFULLY");
        console.log("-----------------------------------");

        console.log("Fisheries:", fisheries.length);
        console.log("Marine Resources:", marineResources.length);
        console.log("Coastal Industries:", industries.length);
        console.log("Economic Indicators:", indicators.length);

        console.log("-----------------------------------");

        console.log(
            "TOTAL RECORDS:",
            fisheries.length +
            marineResources.length +
            industries.length +
            indicators.length
        );

        console.log("-----------------------------------");

        console.log("Alert test records added successfully");

        await mongoose.connection.close();

        console.log("MongoDB connection closed");

    } catch (error) {

        console.error("Database seeding failed:");
        console.error(error.message);

        process.exit(1);
    }
}

seedDatabase();