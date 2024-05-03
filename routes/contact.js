const express = require("express");
const query = require("express-validator").query;
const { validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");

// Middleware to parse JSON and urlencoded request bodies
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


// Saves data into database
router.post("/", [query('email').isEmail(), query('name').isEmpty()], async(req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return res.send({ errors: result.array() });
    }
    try {
        const { name, email, message } = req.body;
        const newUser = new User({
            name: name,
            email: email,
            message: message
        });

        try {
            const result = await newUser.save();
            res.send(result);
        } catch (error) {
            res.send(error.message);
        }
        

    } catch (error) {
        res.send(error.message);
    }

});


module.exports = router;