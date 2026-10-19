const express = require("express");
const CoastalIndustry = require("../models/CoastalIndustry");

const router = express.Router();


/* GET ALL */
router.get("/", async (req, res) => {

    try {

        const data =
            await CoastalIndustry.find();

        res.json(data);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


/* ADD */
router.post("/", async (req, res) => {

    try {

        const existing =
            await CoastalIndustry.findOne({

                industryName:
                    req.body.industryName,

                location:
                    req.body.location,

                year:
                    Number(req.body.year)

            });


        if (existing) {

            return res.status(409).json({
                message:
                    "A coastal industry record for this industry, location and year already exists."
            });

        }


        const record =
            new CoastalIndustry({

                industryName:
                    req.body.industryName,

                location:
                    req.body.location,

                revenue:
                    Number(req.body.revenue),

                year:
                    Number(req.body.year)

            });


        const saved =
            await record.save();


        res.status(201).json(saved);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


/* UPDATE */
router.put("/:id", async (req, res) => {

    try {

        const duplicate =
            await CoastalIndustry.findOne({

                industryName:
                    req.body.industryName,

                location:
                    req.body.location,

                year:
                    Number(req.body.year),

                _id: {
                    $ne: req.params.id
                }

            });


        if (duplicate) {

            return res.status(409).json({
                message:
                    "Another coastal industry record with the same industry, location and year already exists."
            });

        }


        const updated =
            await CoastalIndustry.findByIdAndUpdate(

                req.params.id,

                {
                    industryName:
                        req.body.industryName,

                    location:
                        req.body.location,

                    revenue:
                        Number(req.body.revenue),

                    year:
                        Number(req.body.year)
                },

                {
                    new: true,
                    runValidators: true
                }

            );


        if (!updated) {

            return res.status(404).json({
                message:
                    "Coastal industry record not found."
            });

        }


        res.json(updated);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


/* DELETE */
router.delete("/:id", async (req, res) => {

    try {

        const deleted =
            await CoastalIndustry.findByIdAndDelete(
                req.params.id
            );


        if (!deleted) {

            return res.status(404).json({
                message:
                    "Coastal industry record not found."
            });

        }


        res.json({
            message:
                "Coastal industry record deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;