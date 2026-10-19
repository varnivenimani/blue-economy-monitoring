const express = require("express");
const MarineResource = require("../models/MarineResource");

const router = express.Router();


/* GET ALL */
router.get("/", async (req, res) => {

    try {

        const data =
            await MarineResource.find();

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
            await MarineResource.findOne({

                resourceName:
                    req.body.resourceName,

                location:
                    req.body.location,

                year:
                    Number(req.body.year)

            });


        if (existing) {

            return res.status(409).json({
                message:
                    "A marine resource record for this resource, location and year already exists."
            });

        }


        const record =
            new MarineResource({

                resourceName:
                    req.body.resourceName,

                location:
                    req.body.location,

                quantity:
                    Number(req.body.quantity),

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
            await MarineResource.findOne({

                resourceName:
                    req.body.resourceName,

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
                    "Another marine resource record with the same resource, location and year already exists."
            });

        }


        const updated =
            await MarineResource.findByIdAndUpdate(

                req.params.id,

                {
                    resourceName:
                        req.body.resourceName,

                    location:
                        req.body.location,

                    quantity:
                        Number(req.body.quantity),

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
                    "Marine resource record not found."
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
            await MarineResource.findByIdAndDelete(
                req.params.id
            );


        if (!deleted) {

            return res.status(404).json({
                message:
                    "Marine resource record not found."
            });

        }


        res.json({
            message:
                "Marine resource record deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;