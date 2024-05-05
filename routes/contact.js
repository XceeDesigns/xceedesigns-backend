const express = require("express");
const query = require("express-validator").query;
const { validationResult } = require("express-validator");
const router = express.Router();
const User = require("../models/User");
const cors = require("cors");

// Middleware to parse JSON and urlencoded request bodies
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(cors());


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


// Fetch users
router.get("/fetch", async(req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.send(error.message);
    }
});

// Delete User Contact
router.delete("/delete/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        res.send(user);
    } catch (error) {
        res.send(error.message);
    }
});

// Authenticate Admin
router.post("/admin", async(req, res) => {
    if(req.body.adminAuth === "@Admin123") {
        res.send("Admin Authenticated");
    }
    else res.send("Admin Not Authenticated");
});


module.exports = router;