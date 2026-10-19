const express = require("express");
const EconomicIndicator = require("../models/EconomicIndicator");

const router = express.Router();


/* GET ALL */
router.get("/", async (req, res) => {

    try {

        const data =
            await EconomicIndicator.find();

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
            await EconomicIndicator.findOne({

                indicatorName:
                    req.body.indicatorName,

                year:
                    Number(req.body.year)

            });


        if (existing) {

            return res.status(409).json({
                message:
                    "An economic indicator with the same name and year already exists."
            });

        }


        const record =
            new EconomicIndicator({

                indicatorName:
                    req.body.indicatorName,

                value:
                    Number(req.body.value),

                unit:
                    req.body.unit,

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
            await EconomicIndicator.findOne({

                indicatorName:
                    req.body.indicatorName,

                year:
                    Number(req.body.year),

                _id: {
                    $ne: req.params.id
                }

            });


        if (duplicate) {

            return res.status(409).json({
                message:
                    "Another economic indicator with the same name and year already exists."
            });

        }


        const updated =
            await EconomicIndicator.findByIdAndUpdate(

                req.params.id,

                {
                    indicatorName:
                        req.body.indicatorName,

                    value:
                        Number(req.body.value),

                    unit:
                        req.body.unit,

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
                    "Economic indicator record not found."
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
            await EconomicIndicator.findByIdAndDelete(
                req.params.id
            );


        if (!deleted) {

            return res.status(404).json({
                message:
                    "Economic indicator record not found."
            });

        }


        res.json({
            message:
                "Economic indicator record deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;